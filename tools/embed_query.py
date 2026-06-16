#!/usr/bin/env python3
# Tiny query-embedding sidecar for the embeddings API's text search.
#
# It embeds a query STRING with the *exact same* model + pooling the corpus was
# built with (Xenova/all-MiniLM-L6-v2 ONNX quantized, masked mean-pool, then
# L2-normalise — see tools/embed_scheme.py), so the query vector lands in the
# same space as deploy/fly/www/embeddings/_all.emb.f16. tools/embed_api.mjs calls
# it to answer `GET /api/search?q=…`; keeping the model in Python (onnxruntime +
# tokenizers) mirrors the build path and stays far leaner than onnxruntime-node.
#
#   GET /health        -> {"ok":true,"dim":384}
#   GET /embed?q=text  -> {"dim":384,"vec":[… 384 floats …]}
#
# Model files load from SKOSDEX_MODEL_DIR (default ~/.cache/skosdex-embed); if a
# file is missing it is fetched once (the fly image bakes them at build time).
import os, json, urllib.parse, urllib.request, numpy as np, onnxruntime as ort
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from tokenizers import Tokenizer

CACHE = os.environ.get('SKOSDEX_MODEL_DIR', os.path.expanduser('~/.cache/skosdex-embed'))
HOST = os.environ.get('EMB_QUERY_HOST', '127.0.0.1')
PORT = int(os.environ.get('EMB_QUERY_PORT', '8089'))
FILES = {  # identical to embed_scheme.py — same model => comparable vectors
    'model_quantized.onnx': 'https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/onnx/model_quantized.onnx',
    'tokenizer.json':       'https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/tokenizer.json',
}


def ensure_model():
    os.makedirs(CACHE, exist_ok=True)
    for name, url in FILES.items():
        p = os.path.join(CACHE, name)
        if not os.path.exists(p) or os.path.getsize(p) < 1000:
            print(f'  embed-query: fetching {name} …', flush=True)
            urllib.request.urlretrieve(url, p)
    return os.path.join(CACHE, 'model_quantized.onnx'), os.path.join(CACHE, 'tokenizer.json')


MODEL_PATH, TOK_PATH = ensure_model()
tok = Tokenizer.from_file(TOK_PATH)
tok.enable_truncation(max_length=128)
sess = ort.InferenceSession(MODEL_PATH, providers=['CPUExecutionProvider'])
INNAMES = {i.name for i in sess.get_inputs()}


def embed(text):
    enc = tok.encode(text)
    ii = np.array([enc.ids], dtype=np.int64)
    mm = np.array([enc.attention_mask], dtype=np.int64)
    feed = {'input_ids': ii, 'attention_mask': mm}
    if 'token_type_ids' in INNAMES:
        feed['token_type_ids'] = np.zeros_like(ii)
    out = sess.run(None, feed)[0]
    m = mm[:, :, None].astype(np.float32)
    v = (out * m).sum(1) / np.clip(m.sum(1), 1e-9, None)   # masked mean pool
    v /= np.clip(np.linalg.norm(v, axis=1, keepdims=True), 1e-9, None)  # L2
    return v[0].astype(np.float32)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _send(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path == '/health':
            return self._send(200, {'ok': True, 'dim': 384})
        if u.path == '/embed':
            q = urllib.parse.parse_qs(u.query).get('q', [''])[0]
            if not q:
                return self._send(400, {'error': 'missing q'})
            v = embed(q)
            return self._send(200, {'dim': int(v.shape[0]), 'vec': v.tolist()})
        return self._send(404, {'error': 'not found'})


if __name__ == '__main__':
    print(f'embed-query: http://{HOST}:{PORT}/embed  (model {MODEL_PATH})', flush=True)
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()

#!/usr/bin/env python3
# Embed one scheme's concepts (prefLabel [+ definition]) with all-MiniLM-L6-v2
# (ONNX, Apache-2.0 — open model) and write compact float16 vectors for
# in-browser semantic KNN ("similar concepts" / meaning-based search).
#
# Input : dist/solr-cache/<slug>.ndjson  (already-parsed concept docs)
# Output: deploy/fly/www/embeddings/<slug>.emb.json  (metadata + id list)
#         deploy/fly/www/embeddings/<slug>.emb.f16   (n*dim float16, little-endian)
#
# The ONNX model + tokenizer are fetched once into ~/.cache/skosdex-embed
# (override with SKOSDEX_MODEL_DIR). Usage: embed_scheme.py <slug> [max]
import sys, os, json, urllib.request, numpy as np, onnxruntime as ort
from tokenizers import Tokenizer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.environ.get('SKOSDEX_MODEL_DIR', os.path.expanduser('~/.cache/skosdex-embed'))
FILES = {
    'model_quantized.onnx': 'https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/onnx/model_quantized.onnx',
    'tokenizer.json':       'https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/tokenizer.json',
}

def ensure_model():
    os.makedirs(CACHE, exist_ok=True)
    for name, url in FILES.items():
        p = os.path.join(CACHE, name)
        if not os.path.exists(p) or os.path.getsize(p) < 1000:
            print(f'  embed: fetching {name} …', flush=True)
            urllib.request.urlretrieve(url, p)
    return os.path.join(CACHE, 'model_quantized.onnx'), os.path.join(CACHE, 'tokenizer.json')

def main():
    slug = sys.argv[1]
    cap = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    nd = os.path.join(ROOT, 'dist', 'solr-cache', f'{slug}.ndjson')
    if not os.path.exists(nd):
        sys.exit(f'no {nd} — run `skosdex graphed && skosdex solr-docs` first')

    ids, labels, texts = [], [], []
    for line in open(nd, encoding='utf-8'):
        line = line.strip()
        if not line:
            continue
        d = json.loads(line)
        lbl = d.get('exactLabel') or (d.get('prefLabel') or [None])[0]
        if not lbl:
            continue
        defi = (d.get('definition') or [''])[0]
        ids.append(d['id'])
        labels.append(lbl)
        texts.append(lbl + (' — ' + defi[:240] if defi else ''))
        if cap and len(ids) >= cap:
            break

    model_path, tok_path = ensure_model()
    tok = Tokenizer.from_file(tok_path)
    tok.enable_padding(); tok.enable_truncation(max_length=128)
    sess = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
    innames = {i.name for i in sess.get_inputs()}

    def embed(batch):
        enc = tok.encode_batch(batch)
        ii = np.array([e.ids for e in enc], dtype=np.int64)
        mm = np.array([e.attention_mask for e in enc], dtype=np.int64)
        feed = {'input_ids': ii, 'attention_mask': mm}
        if 'token_type_ids' in innames:
            feed['token_type_ids'] = np.zeros_like(ii)
        out = sess.run(None, feed)[0]
        m = mm[:, :, None].astype(np.float32)
        v = (out * m).sum(1) / np.clip(m.sum(1), 1e-9, None)
        v /= np.clip(np.linalg.norm(v, axis=1, keepdims=True), 1e-9, None)
        return v.astype(np.float32)

    import time; t0 = time.time()
    vecs = np.vstack([embed(texts[i:i+128]) for i in range(0, len(texts), 128)]) if texts else np.zeros((0, 384), np.float32)
    dim = vecs.shape[1]
    print(f'  embed {slug}: {len(ids)} concepts -> {vecs.shape} in {time.time()-t0:.1f}s', flush=True)

    outdir = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')
    os.makedirs(outdir, exist_ok=True)
    vecs.astype('<f2').tofile(os.path.join(outdir, f'{slug}.emb.f16'))     # float16 LE
    json.dump({'model': 'all-MiniLM-L6-v2', 'dim': int(dim), 'n': len(ids), 'ids': ids, 'labels': labels},
              open(os.path.join(outdir, f'{slug}.emb.json'), 'w'))
    # registry of embedded schemes, for the UI to discover which have vectors
    reg = os.path.join(outdir, 'index.json')
    have = sorted(set((json.load(open(reg)) if os.path.exists(reg) else []) + [slug]))
    json.dump(have, open(reg, 'w'))
    sz = os.path.getsize(os.path.join(outdir, f'{slug}.emb.f16'))
    print(f'  embed {slug}: wrote www/embeddings/{slug}.emb.f16 ({sz//1024} KB) + .emb.json', flush=True)

if __name__ == '__main__':
    main()

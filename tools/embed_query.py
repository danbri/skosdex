#!/usr/bin/env python3
# Query-embedding sidecar for the embeddings API's text search (/api/search).
# Embeds a query STRING with the shared model (tools/embed_model.py —
# multilingual-e5-large-instruct) so the vector lands in the same space as the
# corpus embeddings (which embed_scheme.py built as DOCUMENTS). Queries get the
# e5-instruct prompt, documents don't — that asymmetry lives in embed_model.
#   GET /health        -> {ok, dim, model, cache:{hits,misses,size,max}}
#   GET /embed?q=text  -> {dim, vec:[…]}
import os, sys, json, time, urllib.parse
from functools import lru_cache
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import embed_model as em

HOST = os.environ.get('EMB_QUERY_HOST', '127.0.0.1')
PORT = int(os.environ.get('EMB_QUERY_PORT', '8089'))
CACHE_SIZE = int(os.environ.get('EMB_CACHE_SIZE', '4096'))   # LRU of recent queries


# LRU-cached: repeat queries skip inference entirely. Returned array is read-only
# (callers only .tolist() it).
@lru_cache(maxsize=CACHE_SIZE)
def embed_query(text):
    return em.embed([text], is_query=True)[0]


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
            ci = embed_query.cache_info()
            return self._send(200, {'ok': True, 'dim': em.dim(), 'model': em.MODEL,
                                    'cache': {'hits': ci.hits, 'misses': ci.misses,
                                              'size': ci.currsize, 'max': ci.maxsize}})
        if u.path == '/embed':
            q = urllib.parse.parse_qs(u.query).get('q', [''])[0]
            if not q:
                return self._send(400, {'error': 'missing q'})
            v = embed_query(q)
            return self._send(200, {'dim': int(v.shape[0]), 'vec': v.tolist()})
        return self._send(404, {'error': 'not found'})


if __name__ == '__main__':
    # warm the model at boot so the first real /embed isn't a cold start
    _t = time.perf_counter()
    em.load()
    embed_query('warm up'); embed_query.cache_clear()
    print(f'  embed-query: model {em.MODEL} dim {em.dim()} warmed in {time.perf_counter()-_t:.1f}s', flush=True)
    print(f'embed-query: http://{HOST}:{PORT}/embed  (cache {CACHE_SIZE})', flush=True)
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()

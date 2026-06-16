# Embeddings: one shared space + a similarity REST API

## One space for all terms

Every scheme is embedded with the **same** model — `all-MiniLM-L6-v2` (ONNX,
Apache-2.0), 384 dimensions, vectors **L2-normalised** by `tools/embed_scheme.py`.
Because the model and normalisation are identical across schemes, the vectors are
directly comparable: cosine similarity is a plain dot product, and
nearest-neighbour search works *across* scheme boundaries. So "one space for all
terms" needs no re-embedding or re-projection — it is just the concatenation of
the per-scheme vectors plus a combined id/label/scheme index.

```
tools/embed_scheme.py <slug>      # dist/solr-cache/<slug>.ndjson -> <slug>.emb.{json,f16}
tools/combine_embeddings.mjs      # all <slug>.emb.* -> _all.emb.{json,f16}
```

### Artifacts (`deploy/fly/www/embeddings/`)

| File | What |
|------|------|
| `<slug>.emb.f16` | `n×384` float16 (LE) vectors for one scheme |
| `<slug>.emb.json` | `{model, dim, n, ids, labels}` |
| `<slug>.layout.json` | UMAP 2D/3D + k-means clusters for the galaxy view |
| `_all.emb.f16` | **combined** vectors (all schemes concatenated) |
| `_all.emb.json` | `{model, dim, n, schemes:{slug:{start,count}}, ids, labels, scheme}` |
| `index.json` | registry of embedded slugs (`_all` = the combined blob) |

`_all.emb.json.scheme[i]` is the source slug of row `i`; `schemes[slug]` gives the
contiguous `[start, start+count)` range, so a single scheme can be sliced out of
the combined blob without reloading its file.

## REST API — **live** at `https://skosdex.fly.dev/api/`

`tools/embed_api.mjs` is a dependency-free server over `_all.emb.*`. It loads the
float16 blob once and answers KNN queries; cosine == dot product. It runs **in
the fly container** (Debian `nodejs`, started by `start.sh`, proxied by nginx at
`/api/`) and also locally:

```
node tools/embed_api.mjs 8088                 # reads deploy/fly/www/embeddings/
EMB_DIR=/path/to/embeddings node tools/embed_api.mjs 8088   # override the data dir
curl -s https://skosdex.fly.dev/api/health    # {"ok":true,"n":...,"dim":384,"schemes":3}
```

| Endpoint | Returns |
|----------|---------|
| `GET /api/health` | `{ok, n, dim, schemes}` |
| `GET /api/schemes` | per-scheme `{start, count}` |
| `GET /api/concept?id=<IRI>` | `{id, label, scheme}` |
| `GET /api/similar?id=<IRI>&k=10` | k nearest concepts (any scheme) |
| `GET /api/similar?...&scheme=<slug>` | …restricted to one scheme |
| `GET /api/similar?...&cross=1` | …**excluding** the source scheme — cross-vocabulary analogues |
| `GET /api/search?q=text&k=10` | **free-text search**: embeds `q` (same model) then KNN; `&scheme=<slug>` restricts |

Examples:

```
GET /api/search?q=global warming policy&k=5
→ esco:"environmental policy" (0.68), gemet:"climate change mitigation" (0.66), gemet:"global warming" (0.60), …

GET /api/similar?id=http://www.eionet.europa.eu/gemet/concept/1471&cross=1
→ esco:"climate change impact" (0.41), esco:"carry out meteorological research" (0.40), …
```

### Text search (`/api/search?q=…`) — how it works

`/similar` is concept-to-concept and needs no model. `/search` embeds the query
string at request time with the **same** model the corpus used, then runs the same
KNN — so a web page or arbitrary text maps straight onto skosdex concepts.

The embedding is done by a tiny Python sidecar, **`tools/embed_query.py`**, which
loads the same `model_quantized.onnx` + `tokenizer.json` and the identical
masked-mean-pool + L2-norm as `embed_scheme.py` (verified: `embed(label)` vs the
stored vector cosines ≈ 0.99, the residual being float16 storage). The node API
calls it over localhost (`EMB_QUERY_URL`, default `http://127.0.0.1:8089`) and
degrades to `501` if the sidecar is down (e.g. running `embed_api.mjs` alone
locally). Run it locally with:

```
SKOSDEX_MODEL_DIR=~/.cache/skosdex-embed python3 tools/embed_query.py   # :8089
node tools/embed_api.mjs 8088                                           # /api/search now works
```

A pure-JS alternative (onnxruntime-node in `embed_api.mjs`, no Python) works too
but its `node_modules` is ~700 MB vs the Python wheel's ~16 MB, so the sidecar wins.

The sidecar **warms the model at boot** (the first inference pays ONNX arena init,
~hundreds of ms; done once at startup so real requests don't) and keeps an **LRU
cache** of recent query→vector (size `EMB_CACHE_SIZE`, default 4096): a repeat
query skips inference entirely (~32 ms → ~2 ms locally). `GET /health` reports
`{cache:{hits,misses,size,max}}`.

## How it's deployed (already wired)

The fly stack runs the API alongside nginx + Oxigraph + Solr — all three pieces
are in the repo, so a normal deploy from `claude/main` ships it:

1. **Dockerfile** installs Debian `nodejs` and copies `tools/embed_api.mjs` to
   `/opt/skosdex/embed_api.mjs` (the `_all.emb.*` files already ship under
   `www/embeddings/`).
2. **start.sh** launches it in the **background** before nginx (it's
   non-essential and must never gate the serving path):
   ```sh
   EMB_DIR=/opt/skosdex/www/embeddings node /opt/skosdex/embed_api.mjs 8088 &
   ```
3. **nginx.conf** proxies it (read-only, CORS-open) and also serves
   `/embeddings/` with CORS so other origins can fetch the raw vectors:
   ```nginx
   location /api/        { limit_except GET { deny all; } proxy_pass http://127.0.0.1:8088; add_header Access-Control-Allow-Origin *; }
   location /embeddings/ { add_header Access-Control-Allow-Origin *; try_files $uri =404; }
   ```

Verify after deploy with `node scripts/check.mjs --api` (or curl `/api/health`).

Memory: `_all.emb.f16` is `n×384×2` bytes (~20 MB for 26k concepts); the server
expands it to float32 (~40 MB) at startup. Linear KNN over 26k vectors is sub-ms;
past a few hundred-k concepts, switch to an ANN index (hnswlib).

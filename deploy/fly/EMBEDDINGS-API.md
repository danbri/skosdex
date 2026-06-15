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

## REST API

`tools/embed_api.mjs` is a dependency-free reference server over `_all.emb.*`. It
loads the float16 blob once and answers KNN queries; cosine == dot product.

```
node tools/embed_api.mjs 8088
```

| Endpoint | Returns |
|----------|---------|
| `GET /api/health` | `{ok, n, dim, schemes}` |
| `GET /api/schemes` | per-scheme `{start, count}` |
| `GET /api/concept?id=<IRI>` | `{id, label, scheme}` |
| `GET /api/similar?id=<IRI>&k=10` | k nearest concepts (any scheme) |
| `GET /api/similar?...&scheme=<slug>` | …restricted to one scheme |
| `GET /api/similar?...&cross=1` | …**excluding** the source scheme — cross-vocabulary analogues |

Example — cross-vocabulary analogues of GEMET *climate change*:

```
GET /api/similar?id=http://www.eionet.europa.eu/gemet/concept/1471&cross=1
→ esco:"climate change impact" (0.41), esco:"carry out meteorological research" (0.40), …
```

### Text search (`/api/search?q=…`) — TODO

`/similar` is concept-to-concept and needs no model at query time. Free-text
search must embed the query with the *same* MiniLM model first, then run the same
KNN. Two ways to wire it:

1. **onnxruntime-node** — load `model_quantized.onnx` (already fetched by
   `embed_scheme.py` into `~/.cache/skosdex-embed`) in-process and embed the
   query string. No Python at serve time.
2. **sidecar** — a tiny Python service reusing `embed_scheme.py`'s embed path.

The stub returns `501` for `/api/search` until one of these is added.

## Deploying it (when you want the live service)

The current fly stack (`deploy/fly/`) is nginx + Oxigraph + Solr; embeddings are
served as static files and KNN runs in the browser. To expose the API server-side
(the "full REST service" option):

1. Add a small service running `node tools/embed_api.mjs` (the `_all.emb.*` files
   ship in the image already, under `www/embeddings/`).
2. Proxy it in `deploy/fly/nginx.conf`:
   ```nginx
   location /api/ { proxy_pass http://127.0.0.1:8088; }
   ```
3. The browser galaxy/search can then call `/api/similar` instead of (or in
   addition to) loading `_all.emb.f16` client-side.

Memory: `_all.emb.f16` is `n×384×2` bytes (~19 MB for 26k concepts); the server
expands it to float32 (~38 MB) at startup. Linear KNN over 26k vectors is sub-ms;
past a few hundred-k concepts, switch to an ANN index (hnswlib).

---
name: embeddings-api
description: Use when working with skosdex concept embeddings — the per-scheme and combined vectors, their JSON formats, the in-browser "similar by meaning" / galaxy consumers, or the server-side similarity REST API (tools/embed_api.mjs). Covers how to build, combine, query, and extend them.
license: Apache-2.0
---

# skosdex embeddings: vectors, JSON formats, and the REST API

Every concept can be embedded into one shared semantic space and queried for
nearest neighbours (cross-scheme), browsed as a 3D "galaxy", or served over a
small REST API. All schemes use the **same** model (`all-MiniLM-L6-v2`, ONNX,
Apache-2.0), 384-dim, **L2-normalised** — so vectors are directly comparable and
cosine similarity == dot product, across scheme boundaries.

## Build pipeline

```bash
python3 tools/embed_scheme.py <slug> [max]   # dist/solr-cache/<slug>.ndjson -> <slug>.emb.{json,f16}
python3 tools/layout_scheme.py <slug> [K]    # -> <slug>.layout.json (UMAP 2D/3D + k-means themes)
node    tools/combine_embeddings.mjs         # all <slug>.emb.* -> _all.emb.{json,f16}
```

Embeds `exactLabel || prefLabel[0]` (+ a definition snippet). Needs Python deps
`numpy onnxruntime tokenizers scikit-learn umap-learn`; the ONNX model is fetched
once to `~/.cache/skosdex-embed`. Artifacts live in `deploy/fly/www/embeddings/`
and ship in the image (served as static files).

## JSON / binary formats (`deploy/fly/www/embeddings/`)

| File | Shape |
|------|-------|
| `index.json` | `["esco","gemet","uk-parliament-thesaurus","_all"]` — registry of embedded slugs (`_all` = combined) |
| `<slug>.emb.json` | `{ "model","dim":384,"n", "ids":[…], "labels":[…] }` |
| `<slug>.emb.f16` | raw `n×384` **float16 little-endian** vectors (row i ↔ ids[i]) |
| `<slug>.layout.json` | `{ slug,n,k, ids,labels, coords3[n*3], coords2[n*2], cluster[n], clusterNames[k], clusterSizes[k], colors[k] }` |
| `_all.emb.json` | `{ model,dim,n, schemes:{slug:{start,count}}, ids,labels, scheme[] }` — `scheme[i]` is row i's slug; `schemes[slug]` is its contiguous `[start,start+count)` range |
| `_all.emb.f16` | combined `n×384` float16 (all schemes concatenated, same order as `_all.emb.json`) |

Decode f16 → float32 in JS with a half-float expander (see `half2float` in
`deploy/fly/www/index.html`); browsers can also use `Float16Array`.

## Consumers already wired

- **In-browser "similar by meaning"** (`deploy/fly/www/index.html`): loads the
  current concept's scheme `<slug>.emb.*`, does cosine-KNN client-side
  (`embSimilar`), keyed off `index.json`. New embedded schemes light up
  automatically — no code change.
- **Galaxy** (`deploy/fly/www/galaxy.html?scheme=<slug>`): renders `<slug>.layout.json`
  in Three.js; the header dropdown lists every non-`_all` entry of `index.json`.

## REST API (`tools/embed_api.mjs`) — **live** at `https://skosdex.fly.dev/api/`

Dependency-free Node server; loads `_all.emb.*` once (float16 → float32),
cosine == dot product. Runs in the fly container (background process started by
`start.sh`, proxied by nginx at `/api/`) and locally: `node tools/embed_api.mjs
[port]` (default 8088; `EMB_DIR=…` overrides the data dir).

| Endpoint | Returns |
|----------|---------|
| `GET /api/health` | `{ok,n,dim,schemes}` |
| `GET /api/schemes` | `{ slug:{start,count}, … }` |
| `GET /api/concept?id=<IRI>` | `{id,label,scheme}` |
| `GET /api/similar?id=<IRI>&k=10` | k nearest concepts (any scheme): `[{id,label,scheme,score}]` |
| `GET /api/similar?…&scheme=<slug>` | …restricted to one scheme |
| `GET /api/similar?…&cross=1` | …**excluding** the source scheme — cross-vocabulary analogues |
| `GET /api/search?q=text&k=10[&scheme=<slug>]` | **free-text search** — embeds `q` with the same model (via the `embed_query.py` sidecar) then KNN: `[{id,label,scheme,score}]` |

Example (cross-vocabulary): GEMET *climate change* → `cross=1` →
`esco:"climate change impact"`, `esco:"carry out meteorological research"`, …

### How it's deployed (already wired)

A deploy from `claude/main` ships the API. The **Dockerfile** installs Debian
`nodejs` (KNN server) + `python3`/`onnxruntime`/`tokenizers` (query-embed sidecar)
and bakes the MiniLM model into `/opt/skosdex/models`. **start.sh** runs both in
the background before nginx so they never gate serving:
`embed_query.py` (`:8089`, text→vector, same model as the corpus) and
`embed_api.mjs` (`:8088`, KNN; calls the sidecar for `/api/search`). **nginx.conf**
proxies `/api/` and serves `/embeddings/` (both CORS-open). The raw vectors are
*also* a static API at `/embeddings/*.emb.{json,f16}`. Text search degrades to
`501` if the sidecar is down. Verify with `node scripts/check.mjs --api`.
Memory ≈ `n×384×4` bytes float32 (~40 MB for 26k); linear KNN is sub-ms to a few
hundred-k — past that switch to an ANN index (hnswlib). Full notes:
`deploy/fly/EMBEDDINGS-API.md`.

## Other JSON query APIs (not embeddings, but adjacent)

- **Solr search**: `GET /solr/skos/select?q=…&wt=json` (read-only; supports the
  language filters — `fq=lang:en`, `qf=prefLabel_en`). See `docker/solr/README.md`.
- **Autocomplete**: `GET /autocomplete?q=<term>` → Solr-shaped JSON (`response.docs[]`).
- **SPARQL**: `POST /query` (Oxigraph), JSON results; cookbook in
  `deploy/fly/www/queries.html`.

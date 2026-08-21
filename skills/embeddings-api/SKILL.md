---
name: embeddings-api
description: Use when working with skosdex concept embeddings — the per-scheme and combined vectors, their JSON formats, the in-browser "similar by meaning" / viz consumers, or the server-side similarity REST API (tools/embed_api.mjs). Covers how to build, combine, query, and extend them.
license: Apache-2.0
---

# skosdex embeddings: vectors, JSON formats, and the REST API

Every concept can be embedded into one shared semantic space and queried for
nearest neighbours (cross-scheme), browsed as a 3D map (viz.html), or served over a
small REST API. All schemes use the **same** multilingual model
(`multilingual-e5-large-instruct`, Microsoft, MIT, ONNX), 1024-dim,
**L2-normalised** via the shared `tools/embed_model.py` — so vectors are directly
comparable and cosine == dot product, across **scheme and language** boundaries.
Concept labels are embedded as documents; free-text queries get the e5 instruct
prompt. (Note: e5 cosines sit in a high, compressed band — only *relative*
ranking is meaningful, so use top-k, not absolute thresholds.)

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
| `<slug>.emb.json` | `{ "model","dim":1024,"n", "ids":[…], "labels":[…] }` |
| `<slug>.emb.f16` | raw `n×1024` **float16 little-endian** vectors (row i ↔ ids[i]) |
| `<slug>.layout.json` | `{ slug,n,k, ids,labels, coords3[n*3], coords2[n*2], cluster[n], clusterNames[k], clusterSizes[k], colors[k] }` |
| `_all.emb.json` | `{ model,dim,n, schemes:{slug:{start,count}}, ids,labels, scheme[] }` — `scheme[i]` is row i's slug; `schemes[slug]` is its contiguous `[start,start+count)` range |
| `_all.emb.f16` | combined `n×1024` float16 (all schemes concatenated, same order as `_all.emb.json`) |

Decode f16 → float32 in JS with a half-float expander (see `half2float` in
`deploy/fly/www/index.html`); browsers can also use `Float16Array`.

## Consumers already wired

- **In-browser "similar by meaning"** (`deploy/fly/www/index.html`): loads the
  current concept's scheme `<slug>.emb.*`, does cosine-KNN client-side
  (`embSimilar`), keyed off `index.json`. New embedded schemes light up
  automatically — no code change.
- **Viz** (`deploy/fly/www/viz.html?scheme=<slug>`): renders `<slug>.layout.json`
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
and bakes the e5-large-instruct fp32 ONNX (~2.2GB) into `/opt/skosdex/models`. **start.sh** runs both in
the background before nginx so they never gate serving:
`embed_query.py` (`:8089`, text→vector, same model as the corpus) and
`embed_api.mjs` (`:8088`, KNN; calls the sidecar for `/api/search`). **nginx.conf**
proxies `/api/` and serves `/embeddings/` (both CORS-open). The raw vectors are
*also* a static API at `/embeddings/*.emb.{json,f16}`. Text search degrades to
`501` if the sidecar is down. Verify with `node scripts/check.mjs --api`.
Memory ≈ `n×1024×4` bytes float32 (~108 MB for 26k); linear KNN is sub-ms to a few
hundred-k — past that switch to an ANN index (hnswlib). Full notes:
`deploy/fly/EMBEDDINGS-API.md`.

## Other JSON query APIs (not embeddings, but adjacent)

- **Solr search**: `GET /solr/skos/select?q=…&wt=json` (read-only; supports the
  language filters — `fq=lang:en`, `qf=prefLabel_en`). See `docker/solr/README.md`.
- **Autocomplete**: `GET /autocomplete?q=<term>` → Solr-shaped JSON (`response.docs[]`).
- **SPARQL**: `POST /query` (Oxigraph), JSON results; cookbook in
  `deploy/fly/www/queries.html`.

## The materialized similarity graph (route 1, 2026-08-21)

`tools/precompute_similar.py` turns the combined space into RDF the container
serves: per concept, top-`SIM_KX` (default 3) neighbours **per other scheme**
(never same-scheme — SKOS structure and browser KNN cover that; a flat global
top-K lets a rich scheme crowd out all slots), ranked by **CSLS**
(hub-corrected: `2cos − r(a) − r(b)`), floored at raw cosine `SIM_TAU` (0.75).
Note the tension with the "cosines sit in a high compressed band" caveat
above: TAU is a coarse junk gate, the *ranking* is what matters — revisit TAU
against real data rather than trusting it.

Outputs: `embeddings/similar/<slug>.json` (static lookups) and
`embeddings/similar.nq.gz` — RDF-star quads in graph
`<https://danbri.org/ns/skosdex#embedding-similarity>`:
`<A> skosdex:crossSchemeMatch <B>` + `<< <A> … <B> >> skosdex:score "0.83"`.
The Dockerfile bakes the .nq.gz into `/seed/graphed/emb-similarity.nq.gz`, so
the standard stage-1 loader ships it; ONLY Oxigraph ever parses it (RDF-star
never passes through n3.js). Grow the pool with
`EXTRA_SLUGS="stw hasset …"` (appends per-scheme vectors to `_all` without
re-curating the compare set). Oxigraph supports **LATERAL**, so per-row top-N
works: see the "Embedding similarity as a graph" cookbook section. The
concept card falls back to SPARQL over this graph when `/api` is down, and
shows a visible "unavailable" state if both paths fail.

## UMAP ensemble "wobble mode" (2026-08-21)

`tools/layout_ensemble.py <slug>` computes 10 layouts (canonical params +
seed jitter + n_neighbors 5/30/50 sweep), **Procrustes-aligns** them to the
canonical frame (without alignment, interpolation mostly shows UMAP's
arbitrary rotation/reflection and overstates instability), and writes
`<slug>.layout-ens.bin` (f16 frames, LFS) + `.layout-ens.json` (params +
per-concept stability = mean post-alignment displacement, p95-normalised).
viz.html auto-detects the files: `〰 wobble` morphs among frames (what holds
still is trustworthy; what swims is projection artifact), `σ stability`
colours cyan→magenta by placement noise. Deliberately NOT AlignedUMAP (it
suppresses the disagreement being displayed). Frame 0 reproduces
layout.json's cloud. Rolled out per scheme — run the tool, commit, deploy.

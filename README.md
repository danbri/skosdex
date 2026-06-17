# skosdex

A skills-first toolkit and index for **SKOS** ([Simple Knowledge Organization
System](https://www.w3.org/TR/skos-reference/)) concept schemes — collect,
normalize, query, and browse the many SKOS vocabularies published around the web.

skosdex lets you:

- track an arbitrary number of third-party SKOS schemes, one folder each;
- fetch and cache each scheme from its canonical source;
- normalize every scheme to consistent **N-Quads**, then **canonicalize** blank
  nodes (W3C RDFC-1.0) for a stable, hashable form;
- bundle the **openly-licensed** schemes into one dataset; and
- serve that dataset over a **SPARQL** endpoint (Oxigraph) + **Solr** index with
  a simple **web frontend**, packaged as Docker containers.

## Setup

skosdex needs **Node ≥ 20**, **Git LFS** (the canonical N-Quads are stored
gzipped via LFS), and **unzip/gzip** (to decompress upstream dumps). In Claude
Code on the web these are installed automatically by the SessionStart hook
(`.claude/hooks/session-start.sh`). Locally:

```bash
git lfs install && git lfs pull   # materialize the *.nq.gz data (not just pointers)
npm install
npm test                          # offline smoke test
```

## Try it in 30 seconds (no Docker)

```bash
node scripts/skosdex build   # fetch + normalize + canonicalize + bundle + solr-docs + demo
open dist/demo.html          # standalone, searchable SKOS browser — no server needed
```

`dist/demo.html` is a single self-contained file with the bundled concepts
embedded: search labels/definitions and click ↑/↓ to walk the SKOS hierarchy.
Run `node scripts/skosdex demo` on its own to rebuild just the demo.

### Hosted demo (GitHub Pages)

The demo is published from the committed [`docs/`](docs/) folder via classic
branch-based Pages (no Actions deploy job to fail). `docs/index.html` is the
demo; `docs/` also serves `bundle.nq`, `solr-docs.json`, and `manifest.json`.

**One-time setup:** repo **Settings → Pages → Build and deployment →
Source: Deploy from a branch**, then pick **`claude/main`** and **`/docs`**.
Site goes live at `https://<owner>.github.io/skosdex/`.

**Regenerate** `docs/` after changing bundled data:

```bash
npm run site      # rebuild bundle + demo into docs/, then commit docs/
```


## Quick start (full stack)

```bash
npm install
npm run build              # fetch + normalize + canonicalize + bundle + solr-docs
docker compose up --build  # SPARQL + Solr + web, dataset baked in
```

- Web frontend → http://localhost:8080
- SPARQL query → http://localhost:7878/query
- Solr admin → http://localhost:8983/solr

## Live service: SPARQL, Solr, viz + embeddings API

The hosted stack is **https://skosdex.fly.dev** (Oxigraph + Solr + nginx, one box):

| Path | What |
|------|------|
| `POST /query` | SPARQL (Oxigraph) |
| `GET /solr/skos/select` | Solr search (read-only) + `/autocomplete?q=` |
| `GET /viz.html?scheme=<slug>` | 3D/2D embedding map (`_all` = all schemes overlaid; `/galaxy.html` redirects here) |
| `GET /api/…` | **embeddings similarity API** (below) |
| `GET /embeddings/…` | raw vectors + UMAP layouts (CORS-open static files) |

### Embeddings & similarity API

Every concept is embedded with one shared **multilingual** model —
**`multilingual-e5-large-instruct`** (Microsoft; MIT; ONNX, 1024-dim,
L2-normalised) — so vectors are directly comparable *across* schemes **and across
languages** (e.g. "climate change" ≈ "changement climatique" ≈ "Klimawandel" ≈
"ilmastonmuutos"): cosine is a plain dot product and nearest-neighbour search
crosses both vocabulary and language boundaries. Documents (concept labels) are
embedded verbatim; free-text queries get the e5 instruct prompt. The combined
space (`_all.emb.*`) is served two ways.

**1. JSON REST API** (`tools/embed_api.mjs`, KNN in-process; cosine == dot):

| Endpoint | Returns |
|----------|---------|
| `GET /api/health` | `{ok, n, dim, schemes}` |
| `GET /api/schemes` | per-scheme `{start, count}` in the combined blob |
| `GET /api/concept?id=<IRI>` | `{id, label, scheme}` |
| `GET /api/similar?id=<IRI>&k=10` | k nearest concepts (any scheme) |
| `GET /api/similar?…&scheme=<slug>` | …restricted to one scheme |
| `GET /api/similar?…&cross=1` | …**excluding** the source scheme — cross-vocabulary analogues |
| `GET /api/search?q=text&k=10[&scheme=<slug>]` | **free-text search** — embeds your text with the same model, returns nearest concepts |

```bash
# free-text → nearest concepts (any scheme)
curl -s 'https://skosdex.fly.dev/api/search?q=global%20warming%20policy&k=5'
# → esco:"environmental policy" (0.68), gemet:"climate change mitigation" (0.66), …

# cross-vocabulary analogues of GEMET "climate change"
curl -s 'https://skosdex.fly.dev/api/similar?id=http://www.eionet.europa.eu/gemet/concept/1471&cross=1&k=5'
# → esco:"climate change impact" (0.41), esco:"carry out meteorological research" (0.40), …

curl -s https://skosdex.fly.dev/api/health      # {"ok":true,"n":26360,"dim":1024,"schemes":3}
```

Run it locally with `node tools/embed_api.mjs 8088` (reads `deploy/fly/www/embeddings/`).

**2. Raw vectors as static files** (`/embeddings/`, CORS-open) — fetch the
`n×1024` float16 blob + `{ids, labels, scheme}` and run your own KNN client-side
(this is what the viz does):

```
/embeddings/index.json          # registry of embedded slugs (_all = combined)
/embeddings/_all.emb.f16        # n×1024 float16 (LE) vectors, all schemes
/embeddings/_all.emb.json       # {model, dim, n, schemes, ids, labels, scheme}
/embeddings/<slug>.layout.json  # UMAP 2D/3D + clusters for the viz
```

*Text search* (`/api/search?q=…`) embeds your query at request time with the same
model (a small Python sidecar, `tools/embed_query.py`, sharing the corpus's ONNX
model + pooling), then runs the same KNN — so a web page or query string maps
straight onto skosdex concepts. Concept-to-concept `/api/similar` needs no model.

Full reference: [`deploy/fly/EMBEDDINGS-API.md`](deploy/fly/EMBEDDINGS-API.md) and
the [`embeddings-api`](skills/embeddings-api/SKILL.md) skill. Probe it with
`node scripts/check.mjs --api`.

## Skills first

The repeatable workflows live in [`skills/`](skills/) as
[Agent Skills](https://agentskills.io) (`SKILL.md` + nearby files), usable by
humans and agents alike:

| Skill | For |
|-------|-----|
| [`curate-vocabularies`](skills/curate-vocabularies/SKILL.md) | discovering + license-checking candidate vocabularies |
| [`add-skos-scheme`](skills/add-skos-scheme/SKILL.md) | adding a vocabulary + its `meta.ttl` |
| [`normalize-skos`](skills/normalize-skos/SKILL.md) | fetch / normalize / canonicalize |
| [`build-data-bundle`](skills/build-data-bundle/SKILL.md) | produce the shippable `dist/` dataset |
| [`run-endpoints`](skills/run-endpoints/SKILL.md) | bring up SPARQL + Solr + web |
| [`embeddings-api`](skills/embeddings-api/SKILL.md) | the multilingual embedding space + `/api/` similarity service |
| [`deploy-fly`](skills/deploy-fly/SKILL.md) | (re)deploy the live skosdex.fly.dev stack |

## Repository layout

```
skills/                     # skills-first workflows (SKILL.md + templates)
scripts/skosdex             # Node CLI: list / fetch / normalize / canonicalize / bundle / solr-docs
ns/skosdex.ttl              # the skosdex metadata vocabulary used in meta.ttl
third_party/skos/<slug>/
  meta.ttl                  # source, format, license — single source of truth
  source/  tools/  cache/   # committed source / per-scheme helpers / fetched data (gitignored)
  normalized.nq             # parsed, sorted N-Quads            (generated)
  canonical.nq              # RDFC-1.0 canonicalized N-Quads     (generated)
docker/sparql/Dockerfile    # Oxigraph image with dist/bundle.nq baked in
docker/solr/                # Solr core notes
web/                        # static frontend + nginx reverse proxy
docker-compose.yml          # sparql (Oxigraph) + solr + web
dist/                       # bundle.nq, solr-docs.json, manifest.json (generated)
```

## How it works

1. **Describe** each scheme in `third_party/skos/<slug>/meta.ttl` — source URL or
   committed file, format, and license. This is the only file needed for the
   common case; `scripts/skosdex` acts on it with no per-scheme code.
2. **Fetch & cache** the upstream scheme (`skosdex fetch`). Schemes with unusual
   sources can ship helpers in their own `tools/` (py or js).
3. **Normalize** to sorted N-Quads (`normalized.nq`).
4. **Canonicalize** blank nodes via W3C RDFC-1.0 (`canonical.nq`) — deterministic
   and diffable.
5. **Bundle** the openly-licensed schemes into `dist/bundle.nq` (one named graph
   per scheme) plus `dist/solr-docs.json`.
6. **Serve** via Oxigraph (or Apache Jena Fuseki — see the `run-endpoints`
   skill), Solr, and the web frontend, all wired together with Docker Compose.

## Data licensing — open data only

The repository carries **only openly-licensed data**. Each scheme's
`skosdex:licenseClass` gates inclusion:

- ✅ `public-domain` (CC0) and `open` (permissive, commercial-OK, no
  share-alike) → committed / bundled.
- ❌ `copyleft` (viral / share-alike), `noncommercial`, `proprietary` →
  **metadata only**. Their `meta.ttl` lets others fetch them under their own
  terms; their data is never committed here and never reaches `dist/`.

The bundler enforces this regardless of the per-scheme `bundle` flag. See
[`third_party/skos/README.md`](third_party/skos/README.md).

The skosdex **code** is licensed Apache-2.0 ([`LICENSE`](LICENSE)).

## Background

New to SKOS? See [`docs/skos-background.md`](docs/skos-background.md) for a
short, cited history of the standard and the people behind it.

## Status

Early but working: the fetch → normalize → canonicalize → bundle → Solr pipeline
runs end-to-end on the bundled `example-colors` scheme, and the Docker stack is
scaffolded. Adding real-world vocabularies is mostly a matter of dropping in new
`meta.ttl` files.

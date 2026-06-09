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

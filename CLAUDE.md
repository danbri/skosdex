# CLAUDE.md — working in skosdex

Guidance for AI agents and contributors. Read this before changing the data
pipeline or committing data.

## What this repo is

A skills-first toolkit and index for **SKOS** concept schemes: fetch each
vocabulary, normalize to N-Quads, canonicalize blank nodes (RDFC-1.0), bundle
the openly-licensed ones, and serve over SPARQL (Oxigraph) + Solr with a web
demo. Per-scheme metadata lives in `third_party/skos/<slug>/meta.ttl`; the CLI
is `scripts/skosdex`. Workflows are documented as skills in `skills/*/SKILL.md`.

## Setup / dependencies (IMPORTANT)

This project has hard dependencies beyond npm. New sessions are provisioned by
the **SessionStart hook** (`.claude/hooks/session-start.sh`, registered in
`.claude/settings.json`) which installs them automatically in Claude Code on
the web. If working locally, ensure you have:

| Dependency | Why | Install |
|------------|-----|---------|
| **Node ≥ 20** + `npm install` | runs the CLI (`n3`, `rdf-canonize`) | nvm / system |
| **Git LFS** | stores the gzipped N-Quads artifacts (`*.nq.gz`). Without it, `third_party/skos/**/canonical.nq.gz` are pointer files, not data. | `apt-get install git-lfs && git lfs install && git lfs pull` |
| **unzip**, **gzip** | `skosdex fetch` decompresses zipped/gzipped upstream dumps | usually preinstalled; `apt-get install unzip` |

After cloning fresh, **always run `git lfs pull`** before building, or the
smoke test (`npm test`) will fail with an "unresolved LFS pointer" error.

## Data practices — non-negotiable

### 1. Always gzip N-Quads; store via Git LFS
- **All N-Quads artifacts are gzipped** (`.nq.gz`), never plain `.nq`. N-Quads
  is verbose and gzips ~16×. Plain `*.nq` is gitignored to prevent accidents.
- **`third_party/skos/**/canonical.nq.gz` is tracked by Git LFS** (see
  `.gitattributes`). This keeps even large schemes (NALT ≈ 9 MB gzipped, vs
  142 MB raw) well under GitHub's 100 MB per-file limit.
- Intermediate `normalized.nq.gz` is a build artifact (gitignored); only the
  `canonical.nq.gz` is committed.
- The CLI reads/writes gzip transparently via `readText`/`writeText` (path ends
  in `.gz` ⇒ (de)compress). Add new artifacts the same way.
- **Exception:** `docs/` is served by GitHub Pages, which serves LFS *pointers*
  not content — so the LFS pattern is scoped to `third_party/` only, and
  `docs/bundle.nq.gz` is a normal (small) committed file.

### 2. Open data only — license gates bundling
Only `public-domain` and `open` (permissive, non-share-alike, commercial-OK)
scheme data is committed/bundled. `copyleft` (viral / share-alike, e.g.
CC BY-SA, ODbL), `noncommercial`, and `proprietary` schemes stay
**metadata-only**: their `meta.ttl` is kept so others can fetch them, but their
data is never committed and never reaches the bundle. The bundler enforces this
regardless of the per-scheme `bundle` flag. See `third_party/skos/README.md`.

## Commands

```bash
npm install            # deps
git lfs pull           # materialize *.nq.gz content (after a fresh clone)
npm test               # offline smoke test (bundle + solr-docs + demo)
npm run build          # full pipeline for all eligible schemes
npm run site           # bundle + demo -> docs/ for GitHub Pages
node scripts/skosdex build <slug>   # one scheme
```

## Git / branch

- Work on **`claude/main`** (the default branch) unless told otherwise.
- Commit gzipped `.nq.gz` (LFS) — never plain `.nq`.
- `dist/` and `_site/` are gitignored build outputs; `docs/` IS committed
  (it's the Pages site).

## Where things live

- `scripts/skosdex` — the CLI (fetch/normalize/canonicalize/bundle/solr-docs/demo/site)
- `third_party/skos/<slug>/meta.ttl` — per-scheme metadata (source, license, compression)
- `third_party/skos/<slug>/canonical.nq.gz` — committed canonical data (LFS)
- `ns/skosdex.ttl` — the metadata vocabulary
- `skills/*/SKILL.md` — workflows (add-skos-scheme, normalize-skos, build-data-bundle, run-endpoints, curate-vocabularies)
- `docs/` — the published GitHub Pages site
- `CANDIDATES.md`, `AUDIT.md` — vocabulary backlog and data audit

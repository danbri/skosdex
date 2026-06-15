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

### 2. License policy (v2, 2026-06-10) — explicit licensing gates everything
Bundleable into the **container** (SPARQL/Solr endpoint): `public-domain`,
`open`, **and** — per explicit owner decision — `copyleft` (CC BY-SA) and
`noncommercial` (CC BY-NC-ND), provided (a) the license is explicit in the
scheme's `third_party/skos/<slug>/meta.ttl` and in `dist/manifest.json`
(baked into the image), and (b) content is semantically unchanged — the
pipeline performs N-Quads syntax normalization only.

**Static artifacts** (the Pages demo / `docs/` site, anything redistributed
outside the container) carry **open/public-domain data only** — the demo
builder filters container-only schemes out automatically.

`proprietary`/`unknown` are excluded everywhere; ODbL has not been granted.

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

## Deploy / redeploy (live endpoints)

The live stack (https://skosdex.fly.dev — Oxigraph + Solr + web) is deployed by
**CI from `claude/main`**, never by hand. Land changes on `claude/main` (merge /
PR) and `.github/workflows/deploy-fly.yml` builds the GHCR image and deploys.

The one decision that matters: **direct vs cutover**. A direct deploy reloads +
`oxigraph optimize`s on the prod box (a serving blackout); the **cutover** path
(`deploy/fly/cutover.sh`) does that on a forked volume via a temp "second box",
then swaps in ~1–2 min (zero downtime). `auto` mode only sizes the *current push*,
so a **big catch-up** (live well behind main) needs cutover forced:
`gh variable set CUTOVER --body 1` before merging, or
`gh workflow run deploy-fly.yml --ref claude/main -f cutover=1`.
**See `skills/deploy-fly/SKILL.md`** for the full how-to, monitoring, verify, and
recovery.


## Where things live

- `scripts/skosdex` — the CLI (fetch/normalize/canonicalize/bundle/solr-docs/demo/site)
- `third_party/skos/<slug>/meta.ttl` — per-scheme metadata (source, license, compression)
- `third_party/skos/<slug>/canonical.nq.gz` — committed canonical data (LFS)
- `ns/skosdex.ttl` — the metadata vocabulary
- `skills/*/SKILL.md` — workflows (add-skos-scheme, normalize-skos, build-data-bundle, run-endpoints, deploy-fly, embeddings-api, curate-vocabularies). **deploy-fly** has a "Debugging the live box / gotchas" section — read it before touching the Solr schema or the seed flow.
- `deploy/fly/` — live deployment (Dockerfile, start.sh, cutover.sh, EMBEDDINGS-API.md); CI in `.github/workflows/deploy-fly.yml`
- `docs/` — the published GitHub Pages site
- `CANDIDATES.md`, `AUDIT.md` — vocabulary backlog and data audit

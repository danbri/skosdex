# fly.io deployment — Oxigraph + Solr on one box

Serves the bundled SKOS corpus from a single Fly machine:

- **Oxigraph** (SPARQL) on `:7878` — `https://skosdex.fly.dev/query?query=...`
- **Solr** (search) on `:8983`

Data lives on a persistent Fly **volume** (`/data`): the gzipped bundle is
loaded into Oxigraph's RocksDB store and the concept docs into a Solr core on
first boot (`start.sh`), then reused on restart.

## Files

| File | Role |
|------|------|
| `Dockerfile` | Solr 9 base + Oxigraph binary (from its official image); bakes in `dist/bundle.nq.gz` + `dist/solr-docs.json` |
| `start.sh` | first-boot seed (load bundle → Oxigraph, post docs → Solr), then run both |
| `fly.toml` | app config: volume mount, two services, VM size |

## Setup — one secret, that's it

Everything runs through GitHub CI, and the Fly **app** (`skosdex`, org
`contextris`) + **volume** (`skosdex_data`, 20 GB, iad) already exist. The
**only** remaining manual step is adding the Fly deploy token as a repo secret
named `FLY_API_TOKEN` — the CI build/bundle steps all pass; deploy fails only
because this secret is currently empty (`Error: no access token available`).

```bash
# create a deploy token scoped to the app (or reuse one you already minted)
flyctl tokens create deploy -a skosdex
# set it as the repo secret (web UI: Settings → Secrets and variables → Actions)
gh secret set FLY_API_TOKEN --repo danbri/skosdex
```

Once set, re-run the latest **Deploy corpus to fly.io** workflow (or push any
change under the trigger paths) and it will deploy. The workflow also
self-bootstraps the app + volume if they're ever missing (idempotent), so no
local flyctl is needed for normal operation.

## Deploy

`.github/workflows/deploy-fly.yml` builds the bundle from the committed Git LFS
`canonical.nq.gz` files, ensures the app + volume exist, then runs
`flyctl deploy`. It triggers on pushes that touch the corpus or `deploy/fly/`,
or manually via the Actions "Run workflow" button (`workflow_dispatch`).

## Notes / scaling

- The corpus is ~37.8M quads. Loading into Oxigraph and indexing Solr happens
  once per volume; size the VM (`[[vm]]` in `fly.toml`) and volume accordingly.
- `dist/bundle.nq.gz` (~316MB) and `dist/solr-docs.json` are baked into the
  image at build time — large but cached. An alternative is to fetch them from
  a release asset at boot to keep the image lean.
- Posting the full `solr-docs.json` in one request can be memory-heavy; if Solr
  OOMs, split the post into batches in `start.sh`.

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

## One-time setup

```bash
flyctl apps create skosdex
flyctl volumes create skosdex_data --size 10 --region iad
flyctl secrets set ...        # none required for read-only serving
# add FLY_API_TOKEN to the GitHub repo secrets (flyctl tokens create deploy)
```

## Deploy

CI (`.github/workflows/deploy-fly.yml`) builds the bundle from the committed
Git LFS `canonical.nq.gz` files and runs `flyctl deploy` on changes to the
corpus or this directory. Manual: `flyctl deploy --config deploy/fly/fly.toml`.

## Notes / scaling

- The corpus is ~37.8M quads. Loading into Oxigraph and indexing Solr happens
  once per volume; size the VM (`[[vm]]` in `fly.toml`) and volume accordingly.
- `dist/bundle.nq.gz` (~316MB) and `dist/solr-docs.json` are baked into the
  image at build time — large but cached. An alternative is to fetch them from
  a release asset at boot to keep the image lean.
- Posting the full `solr-docs.json` in one request can be memory-heavy; if Solr
  OOMs, split the post into batches in `start.sh`.

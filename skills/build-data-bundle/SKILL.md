---
name: build-data-bundle
description: Use when producing the shippable skosdex dataset — merging openly-licensed canonical N-Quads into dist/bundle.nq, generating dist/solr-docs.json, or understanding which schemes are included/excluded and why.
license: Apache-2.0
---

# Build the data bundle

The bundle is the deployable dataset that the SPARQL + Solr container ships.

```bash
node scripts/skosdex bundle      # merge eligible canonical.nq -> dist/bundle.nq (+ manifest.json)
node scripts/skosdex solr-docs   # derive dist/solr-docs.json from the bundle
node scripts/skosdex build       # full pipeline, ending with both of the above
```

## What `bundle` does

- Includes a scheme only if its `licenseClass` is `open`/`public-domain` **and**
  `skosdex:bundle` is not `false`. Everything else is excluded with a reason.
- Places each scheme's triples in a **named graph** equal to its
  `conceptSchemeURI`, and prefixes blank node labels per-scheme, so multiple
  schemes merge without collisions.
- Writes `dist/manifest.json` listing included/excluded schemes, licenses, and
  quad counts — check this to confirm no copyleft/NC data slipped in.

## Outputs (in `dist/`, gitignored)

| File | Consumed by |
|------|-------------|
| `bundle.nq` | Oxigraph (baked into `skosdex/sparql` image at build) |
| `solr-docs.json` | Solr (posted by the `solr-init` container) |
| `manifest.json` | provenance / license audit |

Run this before `docker compose build` (see the `run-endpoints` skill).

---
name: build-data-bundle
description: Use when producing the shippable skosdex dataset — merging openly-licensed canonical N-Quads into dist/bundle.nq.gz, generating dist/solr-docs.json, building the docs/ site, or understanding which schemes are included/excluded and why.
license: Apache-2.0
---

# Build the data bundle

The bundle is the deployable dataset that the SPARQL + Solr container ships.

```bash
node scripts/skosdex bundle      # merge eligible canonical.nq.gz -> dist/bundle.nq.gz (+ manifest.json)
node scripts/skosdex solr-docs   # derive dist/solr-docs.json from the bundle
node scripts/skosdex demo        # bake dist/demo.html (standalone browser)
node scripts/skosdex site        # bundle + solr-docs + demo, publish into docs/ (GitHub Pages)
node scripts/skosdex build       # full pipeline incl. fetch/normalize/canonicalize
```

Prereq: the committed `canonical.nq.gz` files are Git LFS objects — run
`git lfs pull` after a fresh clone or `bundle` reads empty pointer files.

## What `bundle` does

- Includes a scheme only if its `licenseClass` is `open`/`public-domain` **and**
  `skosdex:bundle` is not `false`. Everything else is excluded with a reason.
- Reads each scheme's **gzipped** `canonical.nq.gz`, places its triples in a
  **named graph** equal to its `conceptSchemeURI`, and prefixes blank node
  labels per-scheme, so multiple schemes merge without collisions.
- Writes **gzipped** `dist/bundle.nq.gz` plus `dist/manifest.json` listing
  included/excluded schemes, licenses, and quad counts — check the manifest to
  confirm no copyleft/NC data slipped in.

## Outputs

| File | Committed? | Consumed by |
|------|-----------|-------------|
| `dist/bundle.nq.gz` | no (gitignored) | Oxigraph (gunzipped + baked into the `skosdex/sparql` image) |
| `dist/solr-docs.json` | no | Solr (posted by the `solr-init` container) |
| `dist/manifest.json` | no | provenance / license audit |
| `dist/demo.html` | no | standalone browser; copied to `docs/index.html` |
| `docs/` (index.html, bundle.nq.gz, solr-docs.json, manifest.json) | **yes** | GitHub Pages site |

Note: everything in `dist/` is a gitignored build output. `docs/` IS committed
(it's the published site) and holds **plain** (non-LFS) small files, because
GitHub Pages serves LFS pointers, not content.

Run `bundle`/`build` before `docker compose build` (see the `run-endpoints`
skill), and `site` to refresh the Pages demo.

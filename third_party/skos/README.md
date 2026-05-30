# third_party/skos

One folder per SKOS concept scheme. Each folder has a `meta.ttl` (described by
`ns/skosdex.ttl`) and, after a build, its `normalized.nq` / `canonical.nq`.

```
<slug>/
  meta.ttl          # source, format, license — the single source of truth
  source/           # optional: committed source, for small open schemes
  tools/            # optional: per-scheme helpers (py or js) for odd sources
  cache/            # fetched upstream data (gitignored)
  normalized.nq     # parsed, sorted N-Quads          (generated)
  canonical.nq      # RDFC-1.0 canonicalized N-Quads   (generated)
```

## Data license policy

**The repository carries only openly-licensed data.** A scheme's
`skosdex:licenseClass` decides what may be committed and bundled:

| licenseClass | examples | data in repo / bundle? |
|--------------|----------|------------------------|
| `public-domain` | CC0, US Gov works | ✅ yes |
| `open` | CC BY, OGL, Apache, MIT | ✅ yes |
| `copyleft` | CC BY-SA, ODbL, GPL | ❌ metadata only |
| `noncommercial` | CC BY-NC, CC BY-NC-SA | ❌ metadata only |
| `proprietary` / `unknown` | all rights reserved | ❌ metadata only |

Viral (share-alike/copyleft) and anti-commercial (NC) schemes stay
**metadata-only**: the `meta.ttl` record lets others find and fetch them under
their own terms, but their data is never committed here and never reaches
`dist/`. The bundler (`scripts/skosdex bundle`) enforces this independently of
the per-scheme `skosdex:bundle` flag.

See [`CANDIDATES.md`](CANDIDATES.md) for the maintained backlog of vocabularies
worth onboarding, with verified licenses and sources.

## Current schemes

- `example-colors` — CC0 sample scheme (bundled); exercises the pipeline.
- `lcsh` — Library of Congress Subject Headings; public domain but opted out of
  the bundle by default due to size.
- `unesco-thesaurus` — CC BY-SA (copyleft); metadata-only, not bundled.

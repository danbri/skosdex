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

### Group folders

Related schemes may share a parent folder, which has no `meta.ttl` of its own:
for example `dpp/` (Digital Product Passport vocabularies), with one subfolder
per publisher, as in `dpp/ec/<scheme>/`. The CLI searches group folders, up to
three levels deep. Each scheme gets a flat slug made from its path
(`dpp/ec/battery-category` -> `dpp-ec-battery-category`), used in file names
and blank-node prefixes. `skosdex build dpp/ec` builds a whole group, and the
manifest records each scheme's `group` so the UI can cluster related
vocabularies. Put a `README.md` in each group folder saying what it holds.

## Data license policy (v2, 2026-06-10)

**Explicit licensing gates everything.** A scheme's `skosdex:licenseClass`
decides where its data may go:

| licenseClass | examples | container (SPARQL/Solr) | static (Pages demo) |
|--------------|----------|------------------------|---------------------|
| `public-domain` | CC0, US Gov works | ✅ | ✅ |
| `open` | CC BY, ODC-By, OGL | ✅ | ✅ |
| `copyleft` | CC BY-SA | ✅ container-only | ❌ |
| `noncommercial` | CC BY-NC-ND | ✅ container-only | ❌ |
| `proprietary` / `unknown` | all rights reserved; ODbL (not granted) | ❌ | ❌ |

Container-only conditions (owner decision, 2026-06-10): the license must be
explicit in the scheme's `meta.ttl` and in the image-baked `manifest.json`,
and content must be semantically unchanged — the pipeline performs N-Quads
syntax normalization only. The demo/site builders filter container-only
schemes out of all static artifacts automatically.

## Current schemes

| slug | license | class | bundled | note |
|------|---------|-------|---------|------|
| `example-colors` | CC0 | public-domain | ✅ | sample scheme; exercises the pipeline |
| `nalt` | CC0 | public-domain | ⏸ `bundle:false` | dump is zipped Turtle; needs an unzip helper |
| `agrovoc` | CC BY 4.0 | open | ⏸ `bundle:false` | large; zipped dump needs an unzip helper |
| `getty-aat` | ODC-By 1.0 | open | ⏸ `bundle:false` | large; zipped dump needs an unzip helper |
| `iptc-media-topics` | CC BY 4.0 | open | ⏸ `bundle:false` | Turtle via content negotiation; ready to flip on |
| `lcsh` | public domain | public-domain | ⏸ `bundle:false` | very large |
| `unesco-thesaurus` | CC BY-SA | copyleft | 🚫 | metadata-only (viral license) |

`bundle:false` schemes are tracked metadata only until deliberately turned on;
flip `skosdex:bundle` to `true` in the scheme's `meta.ttl` and run
`skosdex build <slug>`. See [`CANDIDATES.md`](CANDIDATES.md) for more to onboard.

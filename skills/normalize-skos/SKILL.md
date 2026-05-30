---
name: normalize-skos
description: Use when fetching, parsing, normalizing, or canonicalizing a SKOS scheme into N-Quads in skosdex — i.e. running the scripts/skosdex fetch/normalize/canonicalize pipeline or debugging its normalized.nq / canonical.nq output.
license: Apache-2.0
---

# Normalize & canonicalize a scheme

`scripts/skosdex` (Node, ESM; deps: `n3`, `rdf-canonize`) turns each scheme's
source RDF into two artifacts in its folder:

- `normalized.nq` — parsed, sorted, de-duplicated N-Quads (default graph).
- `canonical.nq` — `normalized.nq` with blank nodes canonicalized using
  **W3C RDF Dataset Canonicalization (RDFC-1.0)**, giving a stable, hashable,
  diff-friendly form.

## Commands

```bash
node scripts/skosdex fetch        <slug>   # download sourceURL -> cache/ (skipped if sourceFile)
node scripts/skosdex normalize    <slug>   # source -> normalized.nq
node scripts/skosdex canonicalize <slug>   # normalized.nq -> canonical.nq
node scripts/skosdex build        [slug]   # all of the above for eligible schemes, then bundle + solr-docs
```

Omit `<slug>` to act on every scheme. `build` skips data steps for
metadata-only (non-open / `bundle:false`) schemes automatically.

## Notes

- Supported source formats (parsed by `n3`): Turtle, N-Triples, N-Quads, TriG,
  N3. RDF/XML is **not** supported — convert upstream first (e.g. with
  `rapper`/`riot`) or add a per-scheme helper in the scheme's `tools/` folder.
- `cache/` is gitignored; never commit fetched third-party data unless it is
  openly licensed and intentionally tracked.
- Re-running is idempotent: canonical output is deterministic, so `canonical.nq`
  only changes when the source does.

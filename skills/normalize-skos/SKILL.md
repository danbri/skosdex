---
name: normalize-skos
description: Use when fetching, parsing, normalizing, or canonicalizing a SKOS scheme into N-Quads in skosdex — i.e. running the scripts/skosdex fetch/normalize/canonicalize pipeline or debugging its normalized.nq.gz / canonical.nq.gz output, including the gzip + Git LFS storage and zip/gz source decompression.
license: Apache-2.0
---

# Normalize & canonicalize a scheme

`scripts/skosdex` (Node, ESM; deps: `n3`, `rdf-canonize`) turns each scheme's
source RDF into two **gzipped** artifacts in its folder:

- `normalized.nq.gz` — parsed, sorted, de-duplicated N-Quads (build artifact,
  gitignored).
- `canonical.nq.gz` — `normalized.nq.gz` with blank nodes canonicalized using
  **W3C RDF Dataset Canonicalization (RDFC-1.0)**, giving a stable, hashable,
  diff-friendly form. **Committed via Git LFS.**

## Storage: always gzip, always LFS (IMPORTANT)

- All N-Quads artifacts are **gzipped** (`.nq.gz`), never plain `.nq` (which is
  gitignored). N-Quads gzips ~16×. The CLI reads/writes gzip transparently.
- `third_party/skos/**/canonical.nq.gz` is tracked by **Git LFS**
  (`.gitattributes`). After a fresh clone run `git lfs pull` or the files are
  just pointers (the smoke test `npm test` will flag this).
- See `CLAUDE.md` for the full data-storage policy.

## Commands

```bash
node scripts/skosdex fetch        <slug>   # download sourceURL -> cache/ (decompresses zip/gz)
node scripts/skosdex normalize    <slug>   # source -> normalized.nq.gz
node scripts/skosdex canonicalize <slug>   # normalized.nq.gz -> canonical.nq.gz
node scripts/skosdex build        [slug]   # all of the above, then bundle + solr-docs
```

Omit `<slug>` to act on every scheme. `build` skips data steps for
metadata-only (non-open / `bundle:false`) schemes automatically.

## Notes

- **Compressed sources:** set `skosdex:compression` to `zip` or `gzip` in
  `meta.ttl` and `fetch` decompresses automatically (uses `unzip` for zip,
  needs it on PATH). `skosdex:sourceEntry` picks the member of a multi-file zip.
- Supported source formats (parsed by `n3`): Turtle, N-Triples, N-Quads, TriG,
  N3. RDF/XML is **not** supported — convert upstream first (`rapper`/`riot`) or
  add a per-scheme helper in the scheme's `tools/` folder.
- **Canonicalization fast-path:** schemes with no blank nodes (most IRI-based
  SKOS, e.g. NALT, IPTC) skip RDFC-1.0 — the sorted normalized form already IS
  canonical. This turns a multi-minute pass into ~1s on large schemes.
- `cache/` is gitignored; never commit fetched third-party data unless it is
  openly licensed and intentionally tracked.
- Re-running is idempotent: canonical output is deterministic, so
  `canonical.nq.gz` only changes when the source does.

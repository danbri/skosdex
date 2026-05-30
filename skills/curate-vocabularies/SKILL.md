---
name: curate-vocabularies
description: Use when discovering, researching, triaging, or maintaining the list of candidate SKOS vocabularies for skosdex — i.e. updating third_party/skos/CANDIDATES.md, verifying a scheme's license, or deciding whether a vocabulary can be bundled or must stay metadata-only.
license: Apache-2.0
---

# Curate candidate vocabularies

The backlog of SKOS schemes lives in
[`third_party/skos/CANDIDATES.md`](../../third_party/skos/CANDIDATES.md). This
skill keeps it accurate and decides what may be onboarded.

## Workflow

1. **Discover** candidates from registries: BARTOC (<https://bartoc.org/>),
   Linked Open Vocabularies (<https://lov.linkeddata.es/>), the W3C SKOS/Datasets
   wiki, and domain ontology portals (AgroPortal, BioPortal).
2. **Verify the license at the source** — do not trust third-party summaries.
   Find the publisher's own download/terms page and record the exact license.
3. **Classify** into the gate that controls bundling:
   | class | examples | bundle? |
   |-------|----------|---------|
   | `public-domain` | CC0, US-gov works | ✅ |
   | `open` | CC BY, ODC-By, OGL, Apache/MIT | ✅ |
   | `copyleft` | CC BY-SA, ODbL, GPL | ❌ metadata only |
   | `noncommercial` | CC BY-NC, BY-NC-ND, BY-NC-SA | ❌ metadata only |
   | `proprietary` / `unknown` | all rights reserved | ❌ metadata only |
   When in doubt, treat as not bundleable and mark "To investigate".
4. **Record** the scheme in the right table in `CANDIDATES.md` with publisher,
   license, class, formats, and a working source URL. Note the review date.
5. **Onboard** (graduate) by creating `third_party/skos/<slug>/meta.ttl` via the
   `add-skos-scheme` skill. For large dumps, start with `skosdex:bundle false`.

## Rules

- The open-data-only policy is non-negotiable: copyleft / NC / proprietary data
  is never committed or bundled — only its metadata.
- Prefer SKOS-native serializations (Turtle / N-Triples / N-Quads); `n3` cannot
  parse RDF/XML, so RDF/XML-only sources need conversion (`riot`, `rapper`) or a
  per-scheme helper in the scheme's `tools/` folder.
- Keep the "Last reviewed" date in `CANDIDATES.md` current when you touch it.

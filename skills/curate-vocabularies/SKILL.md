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
   | class | examples | container | static (demo/Pages) |
   |-------|----------|-----------|---------------------|
   | `public-domain` | CC0, US-gov works | ✅ | ✅ |
   | `open` | CC BY, ODC-By, OGL, Apache/MIT | ✅ | ✅ |
   | `copyleft` | CC BY-SA | ✅ container-only | ❌ |
   | `noncommercial` | CC BY-NC, BY-NC-ND | ✅ container-only | ❌ |
   | `proprietary` / `unknown` | all rights reserved; ODbL (not granted) | ❌ | ❌ |
   Container-only (policy v2, 2026-06-10): license explicit in meta.ttl +
   manifest.json; no semantic changes (N-Quads formatting only); never in
   static artifacts — the demo builder filters these schemes automatically.
   When in doubt, treat as not bundleable and mark "To investigate".
4. **Record** the scheme in the right table in `CANDIDATES.md` with publisher,
   license, class, formats, and a working source URL. Note the review date.
5. **Onboard** (graduate) by creating `third_party/skos/<slug>/meta.ttl` via the
   `add-skos-scheme` skill. For large dumps, start with `skosdex:bundle false`.

## Licenses rot — re-verify before trusting our own records

A recorded license classification is a snapshot, not a fact. Case in point:
STW Thesaurus for Economics sat excluded as "ODbL (not granted)" in our
2026-06 records, but ZBW had relicensed it **CC BY 4.0 back in 2021** (v9.12)
— five years stale, and it cost us a flagship scheme plus its mappings.
TheSoz similarly moved CC BY-NC-ND → CC BY 4.0. So:

- Before excluding (or leaving excluded) any scheme on license grounds,
  check the publisher's **current** terms AND their version-history /
  "what's new" page (e.g. `zbw.eu/stw/version/changes/`) — relicensing is
  usually announced there even when old badge markup lingers in the HTML.
- **Do not trust `rel="license"` / RDFa markup over the visible prose.** The
  STW download page still carries the old ODbL `<a rel="license">` + BY-NC-SA
  badge *inside an HTML comment*, ten lines above the real "licensed under
  CC BY 4.0" sentence. A scraper (or model reading raw HTML) that keys on the
  machine-readable annotation gets the 2015-era answer. Read the rendered,
  human-visible statement, and quote it verbatim in the record.
- Exclusion is self-sealing: a scheme classed unbundleable never enters the
  onboarding flow whose verify step would catch the error (that is exactly
  how STW stayed wrongly excluded while TheSoz — onboarded — was caught).
  Hence the periodic re-sweep of blocked lists below.
- Record the verification **date** and the exact page URL in `meta.ttl` /
  `CANDIDATES.md` so staleness is visible later.
- Periodically re-sweep the "metadata-only / blocked" lists — they are the
  highest-yield place for license changes.

## Mappings are first-class candidates (and often better-licensed)

Cross-scheme mapping dumps (skos:exactMatch etc.) are onboarded as their own
scheme dirs (see `stw-mapping-*`: one dir per target, graph URI per mapping,
`bundle true`). Check the **per-mapping** license page, not just the scheme's:
ZBW's STW→GND/Wikidata/DBpedia/JEL/SDMX mappings are **CC0** even though STW
itself is CC BY 4.0. A mapping can be bundleable even when its target scheme
is not (the CC0 STW→JEL mapping is in; AEA's JEL scheme itself is not).

## Rules

- Licensing is non-negotiable: every bundled scheme carries an explicit
  license in meta.ttl; copyleft/NC data is container-only; proprietary and
  ODbL data is never committed or bundled — only its metadata.
- Prefer SKOS-native serializations (Turtle / N-Triples / N-Quads); `n3` cannot
  parse RDF/XML, so RDF/XML-only sources need conversion (`riot`, `rapper`) or a
  per-scheme helper in the scheme's `tools/` folder.
- Keep the "Last reviewed" date in `CANDIDATES.md` current when you touch it.

# Data audit

Verification of every scheme tracked in `third_party/skos/`: metadata, live
source reachability, license, and bundle integrity. Regenerate the checks with
the commands shown; this snapshot was taken **2026-05-30**.

## 1. Scheme registry (from each `meta.ttl`)

| slug | license | class | bundle | source reachable? | notes |
|------|---------|-------|--------|-------------------|-------|
| `example-colors` | CC0 1.0 | public-domain | ✅ true | n/a (local file) | sample; **bundled** |
| `iptc-media-topics` | CC BY 4.0 | open | ✅ true | ✅ 200 (Turtle via `Accept`) | **bundled**, 1398 concepts |
| `agrovoc` | CC BY 4.0 | open | ⏸ false | ✅ 200 `application/zip` (~95 MB) | needs unzip helper |
| `getty-aat` | ODC-By 1.0 | open | ⏸ false | ✅ 200 zip (~252 MB) | needs unzip helper |
| `nalt` | CC0 1.0 | public-domain | ⏸ false | ✅ 200 `application/zip` (~5.7 MB) | needs unzip helper |
| `lcsh` | LoC (US gov, PD) | public-domain | ⏸ false | ✅ 200 gzip (~101 MB) | **URL fixed** (see below); needs gunzip helper |
| `unesco-thesaurus` | CC BY-SA 3.0 IGO | copyleft | 🚫 false | ✅ 200 Turtle (~3.2 MB) | metadata-only (viral license) |

## 2. Findings & fixes

- **LCSH source URL was dead (404).** The Library of Congress changed its bulk
  download layout from `…subjects.skosrdf.nt.zip` to
  `…subjects.skosrdf.nt.gz`. Corrected in `lcsh/meta.ttl` (verified 200). The
  file is **gzip**, so onboarding needs a gunzip helper.
- **IPTC plain GET returns HTML**, but the pipeline sends `Accept: text/turtle`
  and gets 200 Turtle — confirmed working. (A naive `curl` without the header is
  misleading.)
- **All other sources reachable** as of the audit date.
- **All five license deed URLs resolve** (CC0, CC BY 4.0, ODC-By 1.0,
  CC BY-SA 3.0 IGO, loc.gov/legal) → 200.

## 3. Bundle integrity (`dist/bundle.nq`)

```
total quads:            16997
named graphs:           2
  16960  http://cv.iptc.org/newscodes/mediatopic/
     37  https://danbri.org/skosdex/examples/colors#scheme
skos:Concept:           1398
skos:ConceptScheme:     2
blank nodes remaining:  0      (RDFC-1.0 canonicalization clean)
```

Manifest cross-check: included quad counts (37 + 16960) sum exactly to the
bundle total. Canonical vs normalized line counts match per scheme (idempotent).

## 4. License-policy invariant ✅

**No copyleft / non-commercial / proprietary data reached the bundle.**
Programmatic check over `dist/manifest.json`: included schemes with a
non-`open`/`public-domain` license class = **0**. `unesco-thesaurus` (CC BY-SA)
is correctly excluded by license regardless of its `bundle` flag.

## 5. Reproduce

```bash
node scripts/skosdex build            # rebuild bundle + manifest
# source probes:
curl -sIL -H 'Accept: text/turtle' '<sourceURL>'
# integrity + policy checks: see commands in this repo's audit commit
```

## Outstanding (not blockers)

- AGROVOC, Getty AAT, NALT, LCSH all ship **compressed** dumps (zip/gz). The
  default pipeline does not decompress, so each needs a small `tools/` helper
  (or a pre-decompressed `sourceFile`) before `bundle:true` will work. This is
  the single remaining gap to bundling more real data.
- EuroVoc and GEMET (in `CANDIDATES.md`) still need their exact data-license
  text confirmed at source before onboarding.

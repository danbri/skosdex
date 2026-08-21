---
name: harvest-skos-registries
description: Use when bulk-harvesting SKOS vocabularies from registries and vocabulary services (Loterre, Research Vocabularies Australia, AgroPortal, Finto, DANTE, ESCO, EU Publications Office) — the verified download recipes, URL patterns, and gotchas for each source.
license: Apache-2.0
---

# Harvest SKOS registries

Verified bulk-download recipes for multi-vocabulary sources (each verified
with live HTTP checks; date noted). Enumerate → verify license per vocab →
graduate via `add-skos-scheme`. General caution: registries' own Skosmos
`/data` endpoints are usually **disabled stubs** — the RDF lives elsewhere.

## Loterre (INIST-CNRS, ~74 French scientific terminologies, CC BY 4.0) — verified 2026-08-21

- Enumerate: `https://loterre.istex.fr/rest/v1/vocabularies?lang=en`
  (the `lang` param is mandatory).
- Bulk RDF lives in **ORTOLANG**, workspace = lowercased vocab id:
  `https://repository.ortolang.fr/api/content/<id-lc>/latest/<ID>.xml` (RDF/XML),
  fall back to `.../<ID>.jsonld`. Directory listing at `.../latest/`.
- 60/74 resolve; the rest (45G BQ7 GT HTR INS JLC JVN JVR KFP N9J QJP SCO SEN
  ZHG) have no ORTOLANG workspace — mostly third-party-derived, likely
  deliberate. Licenses are embedded as `cc:` triples in each dump.
- Dead ends: Skosmos `/rest/v1/<id>/data` = 63-byte 404 stub; ARK conneg
  redirects to HTML; the public SPARQL endpoint now holds only one vocab.

## Research Vocabularies Australia (ARDC, ~493 vocabs, ~257 open) — verified 2026-08-21

- List (with license class per record):
  `https://vocabs.ardc.edu.au/registry/api/resource/vocabularies`
- Per vocab id (the list endpoint SILENTLY IGNORES these params):
  `.../vocabularies/<id>?includeVersions=true&includeAccessPoints=true`
  → take the `status=="current"` version's `access-point[]`:
  - `sesameDownload`: append a format ext (`.ttl`, `.rdf`, `.nt`) to
    `ap-sesame-download.url-prefix` (sesame exports prepend RDF/RDFS
    axiomatic triples — harmless);
  - `file`: direct URL in `ap-file.url`.
  Vocabs with only `webPage` access points are metadata-only.
- The download server ignores Range headers; stream to disk.

## AgroPortal (SKOS-format agri ontologies) — verified 2026-08-21

- API host: `https://data.agroportal.eu` (the lirmm.fr host redirects).
  Keyless calls 401. Get a personal key via https://agroportal.eu/account;
  the web UI's embedded public browsing key works for light metadata calls.
- All licenses in one call:
  `GET /submissions?apikey=<KEY>&display=hasLicense,hasOntologyLanguage,ontology&display_links=false&display_context=false`
  Keep CC-BY/CC0 etc.; `hasLicense: null` = do NOT bundle (explicit-license gate).
- Download (no longer key-free): `/ontologies/<ACR>/download?apikey=<KEY>`.

## ESCO (EU skills/occupations, CC BY 4.0) — verified 2026-08-21

The email form is cosmetic; direct stable URLs exist (URL-encoded, note the
double space before the format token):
`https://ec.europa.eu/esco/download/ESCO%20dataset%20-%20v1.2.1%20-%20classification%20-%20%20-%20ttl.zip`
(~173 MB zip, full multilingual Turtle; `rdf` variant and older versions
v1.0.3–v1.2.0 follow the same pattern).

## Finto (National Library of Finland, ~51 vocabs) — onboarded 2026-06

The one Skosmos that genuinely exports:
`https://api.finto.fi/rest/v1/<id>/data?format=text/turtle`. API metadata
returns null licence — verify the licence triples inside each dump.

## DANTE (VZG/GBV vocabulary farm, incl. Basisklassifikation) — noted 2026-08-21

`https://api.dante.gbv.de/export/download/<vocab>/default/` →
`<vocab>__default.turtle.ttl(.gz)` / ntriples. Mostly CC0/open but check per
vocab. Related: coli-conc concordances (JSKOS NDJSON) at
`https://coli-conc.gbv.de/api/` — cross-scheme mappings, convertible to SKOS
mapping triples.

## TriplyDB portals (KB Netherlands, RCE heritage) — verified 2026-08-21

Per-graph gzipped TriG dumps, no auth:
`https://<host>/_api/datasets/<org>/<dataset>/download.trig.gz?graph=<url-encoded graph>`
- KB: `data.bibliotheken.nl/_api/datasets/KB/Production/download.trig.gz?graph=http%3A%2F%2Fdata.bibliotheken.nl%2F{brinkman,gtt}` (portal CC0; ignore the in-data `"n.v.t."` license literal).
- RCE: `linkeddata.cultureelerfgoed.nl/_api/datasets/thesauri/{cht,referentienetwerk,archeologischbasisregister,oorlogsbronnen}/download.trig.gz` (dataset API says CC0 — trust it over the stale in-data CC-BY VoID triple; AVOID the legacy `Cultuurhistorische-Thesaurus-CHT` dataset, that one is ODC-By).
- KOOP OWMS via `api.linkeddata.cultureelerfgoed.nl/datasets/koop/owms/download.trig.gz` (CC BY-SA → container-only).

## IVOA (17 small astronomy vocabularies) — verified 2026-08-21

`Accept: text/turtle` on `https://www.ivoa.net/rdf/<name>` → 303 to a dated
`.ttl`. All CC0 per the `<p id="license">` on ivoa.net/rdf — EXCEPT `uat`,
which is AAS-owned CC BY-SA 3.0 (held separately as `uat/`, container-only).

## PoolParty instances (ILO) — verified 2026-08-21

No Skosmos REST, no dump page. Bulk route is SPARQL CONSTRUCT on the
project endpoint: `https://metadata.ilo.org/PoolParty/sparql/thesaurus` with
`query=CONSTRUCT {?s ?p ?o} WHERE { GRAPH <…/thesaurus/thesaurus> {?s ?p ?o} }`
and `Accept: text/turtle`.

## Misc verified single-source recipes (2026-08-21)

- **CESSDA vocabularies**: `Accept: application/rdf+xml` conneg on the
  versioned REST URL (`/v2/vocabularies/<id>/<ver>?languageVersion=en-<ver>`);
  the `/download?type=SKOS` path returns the SPA shell.
- **NASA GCMD KMS** (~15 schemes): `gcmd.earthdata.nasa.gov/kms/concepts/concept_scheme/<name>?format=rdf`.
- **Heritage Data / FISH** (~16 UK heritage schemes, CC BY 3.0 in-RDF): files
  under `heritagedata.org/live/…`; index at heritagedata.org/blog/vocabularies-provided/.
- **Opentheso (huma-num)**: `opentheso.huma-num.fr/api/all/theso?id=th<N>&format=rdf`
  (French Culture Ministry thesauri, Licence ouverte).
- **semantics.gr (EKT Greece)**: append `/n-triples` to the vocabulary URL.
- **NERC NVS**: per-collection conneg `vocab.nerc.ac.uk/collection/<ID>/current/`
  + `Accept: application/rdf+xml`; the `/downloads` page is 403 — no bulk dump.
- **UN SDG**: direct TTL on S3 `unbis-thesaurus.s3.amazonaws.com/sdg-<date>.ttl`
  (linked from research.un.org/en/thesaurus/downloads; Skosmos REST is dead).
- **skosmos.bartoc.org** mirrors ~250 vocabs but every `/data` is a 404 stub —
  scouting index only, never a source.
- **DANTE reality (2026-08)**: ~500 vocabs, 262 CC0, but only ~60 have
  configured exports and the CC0 tail is tiny museum code lists; the substance
  is BK, ETIRAS (JSKOS-only), Hornbostel-Sachs, IxTheo, ISIL.

## EU Publications Office (EuroVoc, NALs, EuroSciVoc…) — onboarded 2026-06

`https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=<uri>&fileName=<file>`;
everything is also in the Cellar SPARQL endpoint
(`https://publications.europa.eu/webapi/rdf/sparql`). Table URLs
enumerable via the data.europa.eu API.

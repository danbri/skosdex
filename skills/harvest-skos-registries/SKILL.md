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

## EU Publications Office (EuroVoc, NALs, EuroSciVoc…) — onboarded 2026-06

`https://op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=<uri>&fileName=<file>`;
everything is also in the Cellar SPARQL endpoint
(`https://publications.europa.eu/webapi/rdf/sparql`). Table URLs
enumerable via the data.europa.eu API.

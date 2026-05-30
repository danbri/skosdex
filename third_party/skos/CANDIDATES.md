# Candidate SKOS vocabularies

A maintained backlog of SKOS concept schemes worth tracking in skosdex. This is
the triage list; a scheme "graduates" by getting its own
`third_party/skos/<slug>/meta.ttl` (see the `add-skos-scheme` and
`curate-vocabularies` skills).

**License gates bundling** (see [README.md](README.md)): only `public-domain`
and `open` (permissive, commercial-OK, non-share-alike) data is committed and
bundled. `copyleft` (viral / share-alike), `noncommercial`, and `proprietary`
schemes stay **metadata-only** — their record lets others fetch them under their
own terms.

Licenses change; re-verify before onboarding. Last reviewed: **2026-05**.

## ✅ Bundleable — open / public-domain (ready to onboard)

| Scheme | Publisher | License | Class | Formats | Source |
|--------|-----------|---------|-------|---------|--------|
| NAL Agricultural Thesaurus (NALT) | USDA NAL | CC0 1.0 | public-domain | RDF/XML, N-Triples, Turtle | **onboarded** — `nalt/` (bundle:false) |
| AGROVOC | FAO | CC BY 4.0 | open | N-Triples, N-Quads, RDF/XML, TriX | **onboarded** — `agrovoc/` (bundle:false) |
| Getty AAT (Art & Architecture Thesaurus) | Getty Research Institute | ODC-By 1.0 | open | N-Triples (monthly full dump) | **onboarded** — `getty-aat/` (bundle:false) |
| IPTC Media Topics (NewsCodes) | IPTC | CC BY 4.0 | open | SKOS RDF/XML, Turtle, JSON-LD | **onboarded** — `iptc-media-topics/` (bundle:false) |
| Getty TGN (Thesaurus of Geographic Names) | Getty Research Institute | ODC-By 1.0 | open | N-Triples | <https://www.getty.edu/research/tools/vocabularies/obtain/download.html> |
| Getty ULAN (Union List of Artist Names) | Getty Research Institute | ODC-By 1.0 | open | N-Triples | <https://www.getty.edu/research/tools/vocabularies/obtain/download.html> |
| FAST (Faceted Application of Subject Terminology) | OCLC | ODC-By | open | N-Triples (per facet or full) | <https://www.oclc.org/research/areas/data-science/fast/download.html> |
| GeoNames Ontology / Feature Codes | GeoNames | CC BY 4.0 | open | RDF/XML, dumps | <https://www.geonames.org/ontology/> |
| EuroVoc | EU Publications Office | EU reuse (Dec. 2011/833/EU; CC BY 4.0) — verify | open | SKOS-Core RDF, SKOS-AP-EU | <https://op.europa.eu/en/web/eu-vocabularies/dataset/-/resource?uri=http://publications.europa.eu/resource/dataset/eurovoc> |
| GEMET (environment thesaurus) | EEA / Eionet | EEA reuse — verify data terms | open | SKOS RDF | <https://www.eionet.europa.eu/gemet/en/exports/rdf/latest> |
| LCSH (Library of Congress Subject Headings) | Library of Congress | Public domain (US gov) | public-domain | N-Triples (zip) | already onboarded — `lcsh/` (bundle:false, size) |
| MeSH (Medical Subject Headings) | US NLM | NLM terms; US gov, no domestic copyright | public-domain (note attribution norms) | N-Triples | <https://id.nlm.nih.gov/mesh/> |

> Large dumps (AGROVOC, Getty, FAST, LCSH, MeSH) should usually be onboarded
> with `skosdex:bundle false` first, then flipped on deliberately — see
> `lcsh/meta.ttl` as the pattern.

## 🚫 Metadata-only — copyleft / non-commercial / proprietary

Never bundle the data; keep a `meta.ttl` record so others can fetch it.

| Scheme | Publisher | License | Class | Source |
|--------|-----------|---------|-------|--------|
| UNESCO Thesaurus | UNESCO | CC BY-SA 3.0 IGO | copyleft | already onboarded — `unesco-thesaurus/` |
| STW Thesaurus for Economics | ZBW | ODbL 1.0 (share-alike) | copyleft | <https://zbw.eu/stw/version/latest/download/about.en.html> |
| Homosaurus | Digital Transgender Archive | CC BY-NC-ND 4.0 | noncommercial | <https://homosaurus.org/> |
| TheSoz (Thesaurus for the Social Sciences) | GESIS | CC BY-NC-ND | noncommercial | <https://lod.gesis.org/thesoz/> |
| Dewey Decimal Classification (DDC) | OCLC | proprietary | proprietary | <https://www.oclc.org/en/dewey.html> |

## 🔍 To investigate (license/format unconfirmed)

- **RAMEAU** (BnF French subject headings) — <https://data.bnf.fr/>
- **LC Genre/Form Terms (LCGFT)**, **LC Demographic Group Terms (LCDGT)**,
  **Thesaurus for Graphic Materials (TGM)** — id.loc.gov, likely public domain
- **Wikidata** items as SKOS (CC0) — huge; needs a scoping strategy
- **Iconclass** — iconography classification; check terms
- **GACS / Global Agricultural Concept Scheme** — CC BY, FAO/CABI/NAL
- **UNBIS Thesaurus** (UN), **EuroSciVoc**, **CPV / NACE / NUTS** (EU code lists)
- **Princeton WordNet** as RDF/SKOS (WordNet license, permissive)

## Discovery / registries to mine

- **BARTOC** — basic register of thesauri/classifications: <https://bartoc.org/>
- **Linked Open Vocabularies (LOV)**: <https://lov.linkeddata.es/>
- **W3C SKOS/Datasets wiki**: <https://www.w3.org/2001/sw/wiki/SKOS/Datasets>
- **AgroPortal / BioPortal / EarthPortal** ontology repositories

Sources for licenses above: FAO/AIMS (AGROVOC), Getty Research Institute,
OCLC FAST, IPTC, GeoNames/Creative Commons, EU Publications Office, EEA Eionet,
USDA NAL Ag Data Commons, US NLM, ZBW, Homosaurus.org, GESIS.

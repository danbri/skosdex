# Candidate SKOS vocabularies

A maintained backlog of SKOS concept schemes worth tracking in skosdex. This is
the triage list; a scheme "graduates" by getting its own
`third_party/skos/<slug>/meta.ttl` (see the `add-skos-scheme` and
`curate-vocabularies` skills).

**License gates bundling** (policy v2, 2026-06-10 — see [README.md](README.md)
and the `curate-vocabularies` skill): `public-domain` and `open` data is
committed, bundled, and may appear in static artifacts; `copyleft` (share-alike)
and `noncommercial` data is bundleable **container-only** (explicit license in
meta.ttl + manifest, N-Quads formatting only, never in static artifacts);
`proprietary`/`unknown` (and ODbL, which has not been granted — owner
decision reaffirmed 2026-08-21) stay **metadata-only** — their record lets
others fetch them under their own terms.

Licenses change; re-verify before onboarding **and periodically re-sweep the
blocked lists** — exclusion is self-sealing (see the STW case study in the
`curate-vocabularies` skill: recorded ODbL in 2026-05 from stale commented-out
`rel="license"` markup, but actually CC BY 4.0 since 2021; caught 2026-08).
Last reviewed: **2026-08-21**.

## 📦 Corpus built so far (committed via Git LFS)

| Scheme | License | Quads | Where |
|--------|---------|------:|-------|
| Getty AAT | ODC-By 1.0 | 26,679,064 | everywhere |
| MeSH | public domain (US gov) | 18,334,034 | everywhere |
| AGROVOC | CC BY 4.0 | 10,089,090 | everywhere |
| LCSH | public domain | 9,735,460 | everywhere |
| NALT | CC0 | 1,153,267 | everywhere |
| GEMET | CC BY 4.0 | 323,635 | everywhere |
| UNESCO Thesaurus | CC BY-SA 3.0 IGO | 99,685 | container-only |
| Homosaurus v4 | CC BY-NC-ND 4.0 | 69,781 | container-only |
| UDC Summary | CC BY-SA 3.0 | 28,196 | container-only |
| IPTC Media Topics | CC BY 4.0 | 16,960 | everywhere |
| example-colors | CC0 | 37 | everywhere |
| **Total** | | **66,529,209** | |

Eleven SKOS schemes, **66.5M quads**, gzipped (small in-repo, large via Git
LFS), live at <https://skosdex.fly.dev/> (Oxigraph; Solr on-box, see issue #1).
Container-only = policy v2: explicit license in meta.ttl + manifest, N-Quads
formatting only, never in static artifacts. Metadata-only: GTAA, Iconclass
(ODbL — not granted), DDC (proprietary). (This table is the 2026-06-10
snapshot; the corpus has since grown to ~600 schemes — `dist/manifest.json`
from a fresh bundle is the authoritative list.)


## 📰 IPTC NewsCodes — complete set (218 CVs)

All 218 real IPTC NewsCodes controlled vocabularies are ingested (CC BY 4.0):
Media Topics, Subject Codes, Genre, Scene, plus the full set of technical /
control / sports-statistics CVs — "all the SKOS", not just the subject ones.
~66k quads total. (`dummy` and `groups` excluded — placeholder/listing, not
vocabularies.)

Onboarding note: IPTC's `?format=turtle` URL param serves **HTML, not Turtle**
(only `Accept: text/turtle` content-negotiation returns valid Turtle); we fetch
the clean **RDF/XML** serialization
(`?format=rdfxml`) via rapper and commit `source.rdf` per CV for reproducible
rebuilds.

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

## 🛒 Commerce, trade & compliance codelists (researched 2026-06)

Modern e-commerce / product-standards / regulatory-compliance vocabularies (EU
and global), triaged for "is it actually SKOS, and is it openly licensed". The
honest headline: **the EU Publications Office is the motherlode of clean, open
SKOS here** (SKOS-AP-EU, reuse under Decision 2011/833/EU ≈ CC BY); most
industry classifications (HS, UNSPSC, GPC, eCl@ss, Incoterms) are either
non-RDF or license-blocked.

### ✅ Bundleable — open + genuinely SKOS (onboard these first)

| Scheme | Publisher | Covers | Format | License | Source |
|--------|-----------|--------|--------|---------|--------|
| **EU List of Wastes 2015 (LoW)** ⭐ | EU Publications Office / Eurostat | European Waste Catalogue, 842 waste types, 6-digit EWC codes, hazardous flags (Dec. 2014/955/EU) | SKOS RDF/XML | open (2011/833/EU) | **onboarded** — `eu-low2015/` (173k quads) |
| **EWC-Stat Rev.4 + waste categories** | Eurostat | substance-oriented statistical waste nomenclature (51 cats) | SKOS/XKOS RDF | open (2011/833/EU) | **onboarded** — `eu-ewc4/` (28k quads) |
| **EU authority tables — complete set (135 NALs)** ⭐ | EU Publications Office | the FULL Named Authority List collection: all eForms/eProcurement codelists (procedure type, exclusion ground, award/selection criterion, legal basis, notice type…) PLUS general tables (place, corporate-body, atu, file-type, frequency, licence, resource-type, role, script, continent, human-sex, grammatical-*, …) | SKOS-core RDF/XML | open (2011/833/EU) | **onboarded** — 135 `eu-*` schemes (URLs via data.europa.eu API; one graph per table, UI-grouped) |
| **EU Authority tables (NALs)** | EU Publications Office | currency (ISO 4217), measurement-unit (UN/ECE Rec 20), place, corporate-body, file-type, frequency… | SKOS-AP-EU RDF/XML | open (2011/833/EU) | **onboarded** `eu-currency/` (19k), `eu-measurement-unit/` (4k); already held country, language, CPV |
| **EuroSciVoc** | OP / CORDIS | fields-of-science taxonomy (Frascati-based, 1000+ cats, 6 langs) | SKOS Turtle + RDF/XML | open (2011/833/EU) | **onboarded** — `euroscivoc/` |
| ~~UN/LOCODE~~ (ga-group) | UNECE / UN/CEFACT (RDF by ga-group) | trade & transport location codes | ~~SKOS~~ **OWL, not SKOS** | CC BY 4.0 | <https://github.com/ga-group/un-locode> — see note below |
| **NACE Rev. 2.1 / CN / CPA / PRODCOM** | Eurostat (via ShowVoc) | economic activities; Combined Nomenclature (customs); products-by-activity; industrial production | SKOS + **XKOS** RDF | open (2011/833/EU) | <https://showvoc.op.europa.eu> ; SPARQL `https://publications.europa.eu/webapi/rdf/sparql` |

Download mechanics: NAL/EuroVoc/EuroSciVoc use
`op.europa.eu/o/opportal-service/euvoc-download-handler?cellarURI=<uri>&fileName=<file>`;
all OP vocabularies are also in the **Cellar SPARQL** endpoint above. Eurostat
classifications (NACE/CN/…) are XKOS — loadable but the extra XKOS predicates
need handling (hence the existing `getty-aat` is the ODC-By precedent; note
**we already bundle ODC-By data via Getty AAT**, so ODC-By is de-facto granted
even though the policy line still singles out ODbL).

### 🔶 Open RDF but **OWL, not SKOS** (out of strict SKOS scope — would need SKOS-ification)

| Scheme | License | Note |
|--------|---------|------|
| GS1 Web Vocabulary | Apache-2.0 | product-data property/class ontology; **GPC is *not* in it** |
| GoodRelations | CC BY 3.0 | e-commerce offers/prices ontology (now folded into schema.org) |
| Product Types Ontology (PTO) | CC BY-SA 3.0 (copyleft) | ~300k product classes from Wikipedia; container-eligible if SKOS-ified |
| QUDT / OM | CC BY 4.0 | units/quantities (OWL). For units-as-SKOS prefer EU **measurement-unit** NAL |
| DPPO (Digital Product Passport Ontology) | unstated — verify GitHub LICENSE | academic OWL (LiU), informs CIRPASS-2; *not* an official EU deliverable, not SKOS |

### 🚫 License-blocked or not-a-vocabulary (exclude)

| Scheme | Why excluded |
|--------|--------------|
| **HS (Harmonized System)** | WCO © — nomenclature not freely redistributable; no official RDF |
| **UNSPSC** | UNDP; free-with-account, no open redistribution licence; no official SKOS |
| **Incoterms®** | ICC trademark + © (bare 3-char codes only obtainable via UN/CEFACT Rec 5) |
| **eCl@ss** | paid / membership-walled; eClassOWL is a research wrapper over proprietary data |
| **GS1 GPC** | free download but GS1 IP terms, not an open-data licence; JSON/XML only |
| **Google Product Taxonomy** | no explicit licence → "unknown" → excluded; `.txt` only |
| **NIGP Code** | proprietary |

### 🛠 Needs conversion — open data, but no SKOS yet (build a derivative)

| Scheme | Format | License | Note |
|--------|--------|---------|------|
| Safety Gate / RAPEX (GPSR) | Excel → CSV/JSON | open (data.europa.eu) | risk/product-category taxonomy is *embedded* in alerts, not published as SKOS |
| ECHA SVHC candidate list / CLP C&L | CSV/XML, web DB | reusable w/ attribution | substance lists convertible; no official SKOS |
| EU Taxonomy for sustainable activities | XBRL / Excel / JSON | open | NACE-linked, but criteria are not RDF; the NACE backbone *is* SKOS |
| EPREL (energy labels) | REST JSON API (key) | restrictive T&C — **not** open | container-only at best; energy-class enum is tiny if hand-modelled |
| TARIC | daily XML / Excel | EU reuse | built on CN; the **CN layer is the SKOS part** |
| CLP/GHS hazard classes & H-statements | regulation text | public | small, stable; only a third-party SHACL-SKOS prototype exists |

**UN/LOCODE — checked 2026-06-12, NOT onboarded (OWL, not SKOS):** the ga-group
RDF (`un-locode.ttl`, 47 MB, CC BY 4.0) is an `owl:Ontology`; locations are
`owl:Individual` / `uncefact:Location` carrying `rdfs:label` + `skos:notation`
(an annotation prop) — there is **no `skos:ConceptScheme`, no `skos:Concept`, no
`skos:prefLabel`**. Loading it yields **zero Solr concept docs** (extraction keys
on `skos:prefLabel`); it fails the "is it actually SKOS" gate, same as
GS1/GoodRelations. Would need genuine SKOS-ification (derive Concept+prefLabel
from the individuals) — a derivative build, deferred.

**Top picks to onboard next (open, native SKOS, high commerce/compliance value):**
1. **EU List of Wastes 2015** + EWC-Stat — clean SKOS, CC BY, real compliance use.
2. **eForms/eProcurement codelists** — native SKOS, directly extends our CPV.
3. **EU Currency + Measurement-unit authority tables** — same pipeline as our existing country/language NALs; trivial.
4. **EuroVoc** — flagship EU multilingual thesaurus, native SKOS-AP-EU, CC BY (download via OP Cellar; in progress).
5. **EuroSciVoc** — clean Turtle, one-shot add (**onboarded**).
6. **NACE** (+ CN) — high trade value; medium effort (XKOS normalization).

## 🎓 Skills, education & labour-market (researched 2026-06)

| Scheme | Publisher | Covers | SKOS? format | License | Status |
|--------|-----------|--------|--------------|---------|--------|
| **LRMI** (5 concept schemes) | DCMI Learning Resource Metadata Initiative | educational-resource metadata values: alignment-type, educational-audience-role, educational-use, interactivity-type, learning-resource-type | SKOS Turtle | CC BY 4.0 (open) | **onboarded** — `lrmi-*` |
| **GACS** | FAO / CABI / USDA NAL | Global Agricultural Concept Scheme, ~15.4k concepts merging AGROVOC+CAB+NALT | SKOS + SKOS-XL + skos-thes (Turtle, ~108 MB) | CC BY 4.0 (open) | **onboarded** — `gacs/` (2.7M quads, AgroPortal direct download) |
| **ESCO** | EU Commission DG EMPL | European Skills, Competences, Qualifications & Occupations + ISCO-08; ~6.5M triples | SKOS RDF/Turtle | **CC BY 4.0** (open) | **blocked on access** — see note |
| **UN/CEFACT code lists** (Rec 20/21/24) | UNECE / UN/CEFACT | units of measure, package types, transport status | RDF (vocabulary.uncefact.org) | **no explicit licence on the pages** → unconfirmed | **deferred** — needs licence confirmation before bundling (policy requires explicit licence) |

**ESCO access note:** ESCO is genuinely open (CC BY 4.0, so redistribution is
permitted), but there is **no directly-fetchable authoritative bulk-RDF URL**: the
data.europa.eu record only carries HTML landing pages, the `ec.europa.eu/esco/api`
download endpoint is per-resource (no bulk), and the official portal
(`esco.ec.europa.eu/en/use-esco/download`) gates the TTL/RDF dataset behind an
email step. So it can't drop into the reproducible `skosdex fetch` pipeline as-is.
Path to onboard: a one-time manual download of the v1.2.1 full-TTL bundle (CC BY
4.0 lets us host it), then ingest like any committed source. The tabiya GitHub
mirror exists but is CSV-transformed (not faithful SKOS), so not preferred.

## 🌏 International / non-European (researched 2026-06: UN, JP, CN, African)

| Scheme | Region | Covers | SKOS? | License | Status |
|--------|--------|--------|-------|---------|--------|
| **NDLSH** | Japan | National Diet Library Subject Headings, ~20.8k concepts, Japanese (SKOS-XL) | native SKOS RDF/XML | NDL terms — permissive, attribution, commercial-OK (not CC) → open | **onboarded** — `ndlsh/` (517k quads) |
| **中國圖書分類法 (Chinese Library Classification)** | Taiwan | NCL CLC 2007, ~28.3k concepts, Chinese prefLabels + notation | native SKOS Turtle | Taiwan OGDL v1 (commercial-OK, attribution) → open | **onboarded** — `ncl-clc/` (221k quads) |
| **UN SDG taxonomy** | UN (UNSD) | SDG goals→targets→indicators→series | native SKOS (Skosmos) | **no explicit open licence** (pages show only "Copyright") → blocked under policy | **blocked** — needs explicit licence + a bulk export before it can be onboarded |
| **FAO LandVoc** | UN (FAO) | land-governance thesaurus, 326 concepts, multilingual (incl. Swahili/Arabic) | native SKOS RDF/XML | CC BY 4.0 (AGROVOC family) | **onboarded** — `landvoc/` (54k quads, AgroPortal download) |
| **FAO ASFA** | UN (FAO) | aquatic sciences & fisheries | — | — | **not distinct** — the AgroPortal "ASFA" download is AGROVOC concepts re-exported (agrovoc/c_* URIs we already hold); no standalone-URI ASFA dump found |
| 中文主題詞表 (Chinese Subject Headings) | Taiwan | NCL subject thesaurus, ~17.9k records | MADS/RDF (not SKOS) | Taiwan OGDL v1 | needs MADS→SKOS conversion (labels mis-tagged `@en` but Chinese) |
| DBpedia Swahili `skos_categories` | African | Swahili Wikipedia category graph | native SKOS | CC BY-SA (copyleft) | container-only; category graph, not a curated thesaurus |
| African Wordnet | African (ZA) | 9 SA languages lexical net | WordNet-LMF (not SKOS) | CC BY-NC-SA (some items) | convert + noncommercial → container-only at best |

**Blocked / not viable:** ICD-11 (CC BY-**ND** — our pipeline emits derivative N-Quads); SDGIO (no licence, OWL not SKOS); ILO ISCO-08 & WIPO IPC (not published as native SKOS — ISCO only exists as SKOS *inside* ESCO); mainland-PRC vocabularies 中图法 / 汉语主题词表(ISTIC) / Shenzhen CCT (commercial, login-walled, or no open licence). **African SKOS is genuinely near-empty** — realistic African-language coverage comes from language slices of multilingual holdings (AGROVOC), not net-new schemes. **UNBIS** is already held (`unbis/`, noncommercial, container-only).

## 🇫🇮 Finto — Finnish national vocabulary service (onboarded 2026-06)

[Finto](https://finto.fi) (National Library of Finland) hosts 51 SKOS
vocabularies via a REST API (`api.finto.fi/rest/v1/<id>/data?format=text/turtle`).
**41 onboarded** as `finto-*`, each license verified in its own RDF dump (the API
metadata returns null for licence) — CC BY 3.0/4.0 or CC0, all "open". Flagships:
**YSO** (general ontology, trilingual), **KOKO** (merged upper ontology), plus
domain ontologies (afo, geo, tero, maotao, muso, oma, pto, liiko, valo, juho,
jupo, oiko, soto, puho, kito, kulo, kto, keko, kauno, tsr…), legacy thesauri
(ysa, allars, kaunokki — CC0), and small sets (slm genre/form, musa, seko, ykl,
yso-paikat places, yso-aika, lapponica, hero, mts, tt, cer, kkaa, hklj, kassu,
lajisto, yse). ~15M quads total.

**Kept metadata-only (policy-excluded, verified in-data):** `lexvo` & `udcs`
(CC BY-**SA** = copyleft), `ucum` (custom non-CC terms), `okm-tieteenala` &
`ponduskategorier` (no licence triple). **Skipped as dup/already-held:** `iptc`,
`mesh` (Finnish MeSH translation), `ic` (Iconclass, also ODbL). **Skipped as
name-authorities** (not concept schemes, huge): `finaf` (KANTO, ~175 MB), `cn`
(corporate names). (`kassu`/`lajisto` plant/species names were *kept* — they
carry 112k/56k real `skos:Concept`, not just taxa.)

## 🌐 Frontier — open SKOS veins to mine next (updated 2026-08-21)

The four stalled access problems below were **CRACKED 2026-08-21**; the full
verified recipes (URL patterns, gotchas) live in the
**`harvest-skos-registries` skill** — headline pointers here:

- **Loterre** — CRACKED: bulk RDF/XML is in ORTOLANG,
  `repository.ortolang.fr/api/content/<id-lc>/latest/<ID>.xml` (60/74 resolve;
  14 have no workspace, mostly third-party-derived). The `loterre-*` schemes
  already held came via this route.
- **Research Vocabularies Australia** — CRACKED: the apId↔vocab mapping is on
  the per-vocabulary endpoint (`?includeVersions=true&includeAccessPoints=true`
  — the LIST endpoint silently ignores those params); `sesameDownload` and
  `file` access points yield direct RDF.
- **AgroPortal** — CRACKED: `data.agroportal.eu/submissions?apikey=…&display=hasLicense,…`
  returns all licenses in one call. 2026-08 sweep: CC-BY/CC0 = INRAETHES, AFO,
  ASCOPAIN-T, DATA4CPLUS, VOCGEO, AGFOOD, BIODIVTHES, MEAT-T, SHKG, X-RISKS,
  CVO (CC0), MILKOLIGO (Etalab-2.0) — onboardable; hasLicense **null** = CLC,
  FPCD, GACS*, ICC, THESAGRO, FOODEX2, THESAE, WCACROPS, HVDC, T-SITA, FPOSOFT
  (blocked by explicit-license gate; *GACS already held via its own CC BY page).
  NOTE: `/ontologies/<ACR>/download` now REQUIRES an apikey (was key-free).
- **ESCO** — CRACKED: direct stable URL, no email form —
  `ec.europa.eu/esco/download/ESCO%20dataset%20-%20v1.2.1%20-%20classification%20-%20%20-%20ttl.zip`
  (~173 MB multilingual Turtle, CC BY 4.0). Ready to onboard.
- **CESSDA ELSST** — onboarded (`cessda-elsst/`, CC BY-SA → container-only).
- **BARTOC Skosmos** (~250 vocabs) — REGISTRY only; `/data` returns 0 bytes (it
  points to external sources, doesn't host triples). Not a bulk-download vein.
- **Pattern note:** Loterre-Skosmos, RVA, and BARTOC are all *registries* whose
  Skosmos `/data` is disabled — the actual RDF lives at the original publishers
  (ORTOLANG cracked it for Loterre). Finto is the exception that truly hosts +
  exports. So "scrape a Skosmos" is not a general strategy.
- **AgroPortal** SKOS (not OWL) ontologies beyond GACS/LandVoc — `/ontologies/<ACR>/download`.
- **Getty TGN / ULAN / FAST** — open (ODC-By) but disk-blocked here (38.8 GB /
  10.5 GB uncompressed / host-blocked); need a bigger build box.
- **GND** (DNB, CC0), **Wikidata** (CC0, needs scoping) — large, deferred.


## 🌍 Gap survey 2026-08-21 — "all the SKOS" sweep (licenses spot-verified at publishers; re-verify on onboarding)

Ranked candidates found missing from the corpus. ✔ = download URL verified live.

| Scheme | Publisher | ~Size | License | Class | Source |
|--------|-----------|-------|---------|-------|--------|
| ~~STW Thesaurus for Economics~~ | ZBW | 6k descriptors | CC BY 4.0 (since v9.12/2021) | open | **onboarded 2026-08-21** — `stw/` + 8 `stw-mapping-*` (5 CC0) |
| NASA Thesaurus | NASA STI | ~18k terms | US gov public use | public-domain | ✔ <https://sti.nasa.gov/docs/thesaurus/thesaurus-SKOS.xml> (33 MB RDF/XML) |
| Unified Astronomy Thesaurus | AAS/IVOA/ADS | ~2.6k | CC BY-SA 3.0 | copyleft (container-only) | ✔ <https://raw.githubusercontent.com/astrothesaurus/UAT/master/UAT.rdf> |
| Basisklassifikation (BK) | VZG/GBV | ~2.1k | CC0 | public-domain | ✔ `api.dante.gbv.de/export/download/bk/default/` (Turtle) |
| Humord | UiO Library | ~13k (no) | CC0 | public-domain | ✔ <https://data.ub.uio.no/dumps/humord.complete.ttl> |
| Realfagstermer | UiO+NTNU | ~10–14k | CC0 | public-domain | ✔ <https://data.ub.uio.no/dumps/realfagstermer.complete.ttl> (+ mapping .nt files) |
| PhySH (Physics Subject Headings) | APS | ~3.7k | CC0 | public-domain | ✔ github physh-org/PhySH `physh.ttl` + `physh_skos_compat.ttl` |
| ILO Thesaurus | ILO | 4.8k, multilingual | CC BY 4.0 (since 2023) | open | Skosmos `metadata.ilo.org/thesaurus/` REST data export |
| COAR vocabularies (3) | COAR | ~100 total, 14 langs | CC BY 4.0 | open | github coar-repositories/vocabularies |
| CESSDA Topic Classification | CESSDA | ~90 | CC BY | open | vocabularies.cessda.eu per-version SKOS export |
| Svenska ämnesord (SAO) | KB Sweden | ~36k | CC0 | public-domain | id.kb.se — no simple dump; harvest via Libris XL API/OAI-PMH |
| EMBNE subject headings | BNE Spain | large | CC0 | public-domain | datos.bne.es dumps (bot-blocked; fetch manually) |
| Brinkman thesaurus | KB Netherlands | ~12k | CC0 | public-domain | data.bibliotheken.nl (dump + SPARQL) |
| PSH subject headings | NTK Prague | ~13.9k cs/en | CC BY 3.0 CZ | open | techlib.cz — old zip 404s; get current link / email psh@techlib.cz |
| RVK classification | UB Regensburg | huge | CC0 | public-domain | MARC21-XML only — needs mc2skos conversion |
| ~~HASSET~~ | UK Data Service | 4,770 concepts | CC BY-SA 4.0 | copyleft (container-only) | **onboarded 2026-08-21** — `hasset/` (43,627 quads). HASSET was RETIRED by UKDS (announced 2025-01) in favour of ELSST (already held as `cessda-elsst` — HASSET is ELSST's British-English ancestor). The live hosts now just point to CESSDA; the final public dump (`HASSET_20210819.zip`, from the CC-BY-SA-4.0 2021 Skosmos platform) survives ONLY as a single Wayback Machine capture (2022-04-02) — rescued from there. Project background: <https://www.data-archive.ac.uk/about/grants-and-projects/metadata-and-data-discovery/skos-hasset/> (the CC BY-NC-SA badge on that legacy 2012 project page predates the 2021 relicensing). |
| DDI Controlled Vocabularies | DDI Alliance | ~20 small CVs | CC BY-SA 3.0 | copyleft (container-only) | github linked-statistics/DDI-controlled-vocabularies |
| IVOA vocabularies | IVOA | ~30–40 small | CC0 | public-domain | <http://www.ivoa.net/rdf/> (conneg per vocab) |
| Tesauros Patrimonio Cultural España (9) | Ministerio de Cultura | tens of k | open-data (verify exact) | open (verify) | tesauros.cultura.gob.es/tesauros/descarga (RDF/XML) |
| RCE Erfgoedthesauri (NL heritage) | RCE | ~15k+ | CC0 | public-domain | linkeddata.cultureelerfgoed.nl (+ SPARQL) |
| coli-conc concordances | VZG | tens of k mappings | CC0 (verify per set) | public-domain (verify) | coli-conc.gbv.de/api/ (JSKOS NDJSON → convert) |
| UN SDG taxonomy | UN DHL | ~700, 6 langs | UN terms, no CC | unknown (like unbis) | TTL via research.un.org/en/thesaurus/downloads |
| NB Norway vocabs (~10) | Nasjonalbiblioteket | small–few k | verify per vocab (likely CC0) | unknown | Skosmos nb.no/nbvok |
| MIMO instruments + Hornbostel-Sachs | MIMO Intl | ~2.5k | unstated — ask | unknown | vocabulary.mimo-international.com; H-S also on DANTE |
| ESCO v1.2.1 | EU DG EMPL | ~6.5M triples | CC BY 4.0 | open | ✔ direct URL — see frontier section (access now CRACKED) |

**Blocked (license):** Iconclass (ODbL+DbCL), GTAA (ODbL), PACTOLS (~62k
concepts — GitHub says ODbL but some pages say CC BY-SA; conflicting, worth an
email: the biggest blocked prize), DeCS (signed agreement), ICD-11 (CC BY-ND),
Thema (bespoke terms), DDC/SNOMED (proprietary), JEL scheme (AEA
scholarly-use-only; the CC0 STW→JEL *mapping* is onboarded). **Not native
SKOS:** ERIC (XML/API), OpenAlex topics (CSV/JSON, CC0 — conversion
candidate), Polish DBN (MARC API), RVK (MARC — see table). **Genuine gaps
needing outreach, not downloads:** Danish, Korean, Hebrew, Arabic, Indian,
Ukrainian, mainland-Chinese national schemes.

## 🌾 AgroPortal SKOS ontologies — licence-verification pending

AgroPortal's SKOS filter (`ontologies_filter?format=SKOS`, found via headless
browser; key-free `/ontologies/<ACR>/download` works) yields ~26 SKOS ontologies.
~20 are NEW (FOODEX2, AFO, INRAETHES, THESAGRO, VOCGEO, MEAT-T, CVO, BIODIVTHES,
ICC, SHKG, WCACROPS, …). **Built then REMOVED**: their licences are NOT reliably
recoverable without the AgroPortal API key — the public pages render licence
inconsistently and at least FOODEX2 shows **"No license"**. Under the
explicit-licence gate we won't bundle these with a guessed licence. Re-onboard
with a (free) AgroPortal API key: `data.agroportal.eu/ontologies/<ACR>/latest_submission?apikey=…`
returns `omv:hasLicense` cleanly per ontology → keep CC-BY/CC0, drop "No license"/
copyleft. (The 3 already held — anaeethes, biorefinery, cropusage — were licence-
verified earlier and stay.)

## 🚫 Metadata-only — copyleft / non-commercial / proprietary

Never bundle the data; keep a `meta.ttl` record so others can fetch it.

| Scheme | Publisher | License | Class | Source |
|--------|-----------|---------|-------|--------|
| UNESCO Thesaurus | UNESCO | CC BY-SA 3.0 IGO | copyleft | already onboarded — `unesco-thesaurus/` |
| Homosaurus | Digital Transgender Archive | CC BY-NC-ND 4.0 | noncommercial | <https://homosaurus.org/> |

~~STW Thesaurus for Economics~~ — **GRADUATED 2026-08-21** (`stw/` +
`stw-mapping-{gnd,wikidata,dbpedia,eurovoc,thesoz,agrovoc,jel,sdmx}/`): the
2026-05 "ODbL 1.0" record was stale — CC BY 4.0 since v9.12 (2021-10-15), and
five of the eight mappings are CC0. ~~TheSoz~~ — license likewise now CC BY 4.0
(verified 2026-06-10, see `thesoz/meta.ttl`); held metadata-only ONLY because
GESIS offers no public bulk dump, not for license reasons.
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

## 🎓 VU University Amsterdam (Vrije Universiteit) lineage

VU Amsterdam's Web & Media / KR&R groups are the academic home of SKOS itself —
**Antoine Isaac** and **Guus Schreiber** co-authored the W3C SKOS Reference
there, and **Mark van Assem, Victor de Boer, Jacco van Ossenbruggen, Jan
Wielemaker, Albert Meroño-Peñuela** built many of the datasets below. Most are
cultural-heritage / digital-humanities concept schemes published as SKOS.

| Scheme | VU people / project | License | Class | Source |
|--------|---------------------|---------|-------|--------|
| WordNet 3.0 in RDF/SKOS | van Assem, Gangemi, Schreiber (VU) | WordNet license (permissive, attribution) | open | <https://semanticweb.cs.vu.nl/lod/wn30/> |
| Amsterdam Museum LOD (incl. AAT-Ned thesaurus + person authorities) | de Boer, Isaac, van Ossenbruggen, Wielemaker, Schreiber (VU) | check — dataset terms unconfirmed | investigate | <https://semanticweb.cs.vu.nl/lod/am/> |
| GTAA (Common Thesaurus for AV Archives) | NISV (Sound & Vision) w/ de Boer (VU) | ODbL | copyleft | <https://data.beeldengeluid.nl/datasets/gtaa> |
| Iconclass (iconography classification) as LOD | RKD; VU-affiliated LOD/AI work | ODbL | copyleft | <https://iconclass.org/help/lod> |
| HISCO (occupations) RDF/SKOS via CEDAR | Meroño-Peñuela, Ashkpour et al. (VU) | check — likely open, confirm | investigate | <https://github.com/CEDAR-project> |
| RAMEAU (BnF) SKOS prototype (STITCH) | van Assem, Isaac (VU) | BnF terms; prototype | investigate | <http://stitch.cs.vu.nl/rameau> |

Notes:
- **WordNet** is the cleanest open candidate here (permissive license) and was
  already on the general "to investigate" list — VU is the canonical RDF/SKOS
  publisher, so prefer their distribution.
- **GTAA** and **Iconclass** are **ODbL (share-alike → copyleft)**: metadata-only
  under the open-data policy, no matter the VU connection.
- **Amsterdam Museum** and **HISCO/CEDAR** need their exact data licenses
  confirmed at source before onboarding; treat as not-bundleable until then.

## Discovery / registries to mine

- **BARTOC** — basic register of thesauri/classifications: <https://bartoc.org/>
- **Linked Open Vocabularies (LOV)**: <https://lov.linkeddata.es/>
- **W3C SKOS/Datasets wiki**: <https://www.w3.org/2001/sw/wiki/SKOS/Datasets>
- **AgroPortal / BioPortal / EarthPortal** ontology repositories
- **VU Amsterdam LOD host**: <https://semanticweb.cs.vu.nl/lod/> (WordNet,
  Amsterdam Museum, and other VU-published linked datasets)

Sources for licenses above: FAO/AIMS (AGROVOC), Getty Research Institute,
OCLC FAST, IPTC, GeoNames/Creative Commons, EU Publications Office, EEA Eionet,
USDA NAL Ag Data Commons, US NLM, ZBW, Homosaurus.org, GESIS.

## 🔗 Federated, not ingested (entity/authority hubs)

Our concepts carry ~205k `owl:sameAs` + match links into these hubs. They are
**entity-identifier services**, not concept schemes, and are far too large to
clone — so we reach them at query time via SPARQL `SERVICE` (Oxigraph 0.5.2
runs federation; verified live 2026-06). No local copy, always current.

| Hub | Endpoint used | Reached via |
|-----|---------------|-------------|
| Wikidata | `https://qlever.dev/api/wikidata` (QLever) | our `owl:sameAs` → Wikidata Q-ids |
| DBpedia | `https://dbpedia.org/sparql` (OpenLink Virtuoso) | Wikidata Q-id ↔ DBpedia `owl:sameAs` bridge |
| VIAF, idref.fr, datos.bne.es | resolve per-URI / their SPARQL | mapping targets; federate as needed |

**Wikidata↔DBpedia bridge confirmed**: a RAMEAU concept `owl:sameAs` Q5090 →
`SERVICE dbpedia.org` → `dbpedia.org/resource/Rice`. Wikidata is the hub; two of
our schemes sharing a Q-id are de-facto mapped without a direct exactMatch. See
the live "Federation (SERVICE)" queries in the cookbook (`/queries.html`).

**Genuine SKOS thesauri to ingest** (concept schemes, mapping targets): BNCF
(Nuovo Soggettario, Italian), CAB Thesaurus (CABI, agriculture) — in progress.

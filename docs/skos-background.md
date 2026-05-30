# Background: the origins of SKOS

A short, cited history of **SKOS** (Simple Knowledge Organization System), the
W3C standard this project is built around. Every claim below links to a primary
or authoritative source.

## What SKOS is for

SKOS is a lightweight RDF vocabulary for publishing existing *knowledge
organization systems* (KOS) — thesauri, subject heading lists, taxonomies,
classification schemes — on the web as linked data, **without** re-modelling
them as formal OWL ontologies. It centres on `skos:Concept`, labels
(`skos:prefLabel` / `skos:altLabel`) and informal semantic relations
(`skos:broader` / `skos:narrower` / `skos:related`).
([SKOS Reference](https://www.w3.org/TR/skos-reference/))

## Lineage before SKOS (1997–2001)

SKOS's most direct ancestor was the **RDF Thesaurus work in the EU DESIRE
project** (second phase), later continued through the **SOSIG** (ILRT, Bristol)
and **LIMBER** (CCLRC) projects.
([SWAD-Europe Thesaurus Activity](https://www.w3.org/2001/sw/Europe/reports/thes/Overview.html);
[Wikipedia: SKOS](https://en.wikipedia.org/wiki/Simple_Knowledge_Organization_System))

## SWAD-Europe: where SKOS began (2002–2004)

SKOS as a distinct initiative started in the **Thesaurus Activity work package of
the Semantic Web Advanced Development for Europe (SWAD-Europe)** project —
EU-funded under the Information Society Technologies programme, running **May
2002 – October 2004**, with partners ERCIM, ILRT (Bristol), HP Labs, CCLRC and
Stilo. The **first release of SKOS Core and SKOS Mapping came at the end of
2003**.
([SWAD-Europe Final Report](https://www.w3.org/2001/sw/Europe/reports/final_report/);
[SWAD-Europe home](https://www.w3.org/2001/sw/Europe/))

Foundational deliverables and their authors:

- **D8.2 _Review of RDF Thesaurus Work_** — B. Matthews & A. Miles, 2003
- **D8.1 _An RDF Schema for Thesauri (SKOS-Core 1.0 Guide)_** — Miles, Matthews,
  Wilson ([SWAD-E Deliverable 8.1](https://www.w3.org/2001/sw/Europe/reports/thes/8.1/))

## W3C standardization (2006–2009)

After SWAD-Europe ended, the work moved into the W3C **Semantic Web Deployment
Working Group** (first teleconference 10 October 2006), which took SKOS to
Recommendation. Draft timeline: First Public Working Draft of the Reference
**25 Jan 2008** → Candidate Recommendation **17 Mar 2009** → Proposed
Recommendation **15 Jun 2009** → **W3C Recommendation 18 August 2009**.
([W3C SKOS home / announcements](https://www.w3.org/2004/02/skos/))

The two standard documents:

- [**SKOS Reference**](https://www.w3.org/TR/skos-reference/) (Recommendation,
  18 Aug 2009) — editors **Alistair Miles** (STFC Rutherford Appleton Laboratory
  / University of Oxford) and **Sean Bechhofer** (University of Manchester).
- [**SKOS Primer**](https://www.w3.org/TR/skos-primer/) (Working Group Note,
  same date) — editors **Antoine Isaac** (Vrije Universiteit Amsterdam) and
  **Ed Summers** (Library of Congress); based on the SKOS Core Guide edited by
  Alistair Miles and Dan Brickley.

## Key people

| Person | Affiliation (at the time) | Role |
|--------|---------------------------|------|
| **Alistair Miles** | CCLRC Rutherford Appleton Laboratory → Oxford | Creator (SWAD-Europe); lead editor of the Reference |
| **Dan Brickley** | W3C / ILRT | Initial principal editor; SWAD-Europe |
| **Sean Bechhofer** | University of Manchester | Co-editor of the Reference |
| **Antoine Isaac** | Vrije Universiteit Amsterdam / Europeana | Design; co-editor of the Primer |
| **Guus Schreiber** | Vrije Universiteit Amsterdam | Design; SWD Working Group |
| **Ed Summers** | Library of Congress | Co-editor of the Primer |

The retrospective design rationale is documented in *Key Choices in the Design
of SKOS* — Baker, Bechhofer, Isaac, Miles, Schreiber, Summers.
([arXiv:1302.1224](https://arxiv.org/pdf/1302.1224))

## Why it stuck

SKOS deliberately stayed simple and tolerant: `skos:Concept` instead of OWL
classes, informal hierarchy instead of strict subsumption, and a near-mechanical
path from a legacy thesaurus to linked data. That low barrier is exactly why the
vocabularies in this project's [candidate list](../third_party/skos/CANDIDATES.md)
exist — AGROVOC, LCSH, Getty AAT, EuroVoc, GEMET and many others were converted
to SKOS in the wave that followed the 2009 Recommendation.

It builds on RDF (graph model), RDFS (classes/properties), and lessons from the
ISO thesaurus standards (ISO 2788 / ISO 25964) and Dublin Core.

---

*Sources are linked inline. Where a primary W3C document was unavailable, the
[English Wikipedia SKOS article](https://en.wikipedia.org/wiki/Simple_Knowledge_Organization_System)
is cited as a secondary source. Last verified: 2026-05.*

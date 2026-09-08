# Updated 3 enumeration values to have 'LegalValue' in their name.

[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)

First observed source declaration: 2017-05-19. Recorded commit author: **Dan Brickley**. [Commit](https://github.com/schemaorg/schemaorg/commit/ab0ad56d2a4d7dc7b6a5f4d3aa4fedd5532d610d).

<a id="term-AuthoritativeLegalValue"></a>
## AuthoritativeLegalValue

Typed value · current · [Schema.org](https://schema.org/AuthoritativeLegalValue)

Indicates that the publisher gives some special status to the publication of the document. ("The Queens Printer" version of a UK Act of Parliament, or the PDF version of a Directive published by the EU Office of Publications). Something "Authoritative" is considered to be also [[OfficialLegalValue]]".

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.3, 2017-08-14](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.3/all-layers.nt). This is an upper bound on introduction.

### Recorded acknowledgements

- [ELI ontology](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/collab/ELI.md): This entry is derived from the [ELI ontology](http://publications.europa.eu/mdr/eli/index.html) (European Legislation Identifier). ELI is an initiative of some national legislation publishers endorsed by EU countries and Institutions, to identify, describe and link legislation on the web, and is led by the [ELI taskforce](http://eur-lex.europa.eu/eli-register/about.html).

### Proposal and implementation trail

- [#1156: Legislation : Proposed extension](https://github.com/schemaorg/schemaorg/issues/1156) — Issue opener: **tfrancart**, opened 2016-05-11. The recorded role does not establish original authorship.

Attribution assessment: Explicit acknowledgement; role described by linked credit.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1156](https://github.com/schemaorg/schemaorg/issues/1156)
- [https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli](https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli)
- [http://publications.europa.eu/mdr/eli/index.html](http://publications.europa.eu/mdr/eli/index.html)
- [https://schema.org/docs/collab/ELI](https://schema.org/docs/collab/ELI)

External vocabulary mappings:
- http://www.w3.org/2004/02/skos/core#exactMatch: [http://data.europa.eu/eli/ontology#LegalValue-authoritative](http://data.europa.eu/eli/ontology#LegalValue-authoritative)

<a id="term-OfficialLegalValue"></a>
## OfficialLegalValue

Typed value · current · [Schema.org](https://schema.org/OfficialLegalValue)

All the documents published by an official publisher should have at least the legal value level "OfficialLegalValue". This indicates that the document was published by an organisation with the public task of making it available (e.g. a consolidated version of a EU directive published by the EU Office of Publications).

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.3, 2017-08-14](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.3/all-layers.nt). This is an upper bound on introduction.

### Recorded acknowledgements

- [ELI ontology](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/collab/ELI.md): This entry is derived from the [ELI ontology](http://publications.europa.eu/mdr/eli/index.html) (European Legislation Identifier). ELI is an initiative of some national legislation publishers endorsed by EU countries and Institutions, to identify, describe and link legislation on the web, and is led by the [ELI taskforce](http://eur-lex.europa.eu/eli-register/about.html).

### Proposal and implementation trail

- [#1156: Legislation : Proposed extension](https://github.com/schemaorg/schemaorg/issues/1156) — Issue opener: **tfrancart**, opened 2016-05-11. The recorded role does not establish original authorship.

Attribution assessment: Explicit acknowledgement; role described by linked credit.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1156](https://github.com/schemaorg/schemaorg/issues/1156)
- [https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli](https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli)
- [http://publications.europa.eu/mdr/eli/index.html](http://publications.europa.eu/mdr/eli/index.html)
- [https://schema.org/docs/collab/ELI](https://schema.org/docs/collab/ELI)

External vocabulary mappings:
- http://www.w3.org/2004/02/skos/core#exactMatch: [http://data.europa.eu/eli/ontology#LegalValue-official](http://data.europa.eu/eli/ontology#LegalValue-official)

<a id="term-UnofficialLegalValue"></a>
## UnofficialLegalValue

Typed value · current · [Schema.org](https://schema.org/UnofficialLegalValue)

Indicates that a document has no particular or special standing (e.g. a republication of a law by a private publisher).

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.3, 2017-08-14](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.3/all-layers.nt). This is an upper bound on introduction.

### Recorded acknowledgements

- [ELI ontology](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/collab/ELI.md): This entry is derived from the [ELI ontology](http://publications.europa.eu/mdr/eli/index.html) (European Legislation Identifier). ELI is an initiative of some national legislation publishers endorsed by EU countries and Institutions, to identify, describe and link legislation on the web, and is led by the [ELI taskforce](http://eur-lex.europa.eu/eli-register/about.html).

### Proposal and implementation trail

- [#1156: Legislation : Proposed extension](https://github.com/schemaorg/schemaorg/issues/1156) — Issue opener: **tfrancart**, opened 2016-05-11. The recorded role does not establish original authorship.

Attribution assessment: Explicit acknowledgement; role described by linked credit.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1156](https://github.com/schemaorg/schemaorg/issues/1156)
- [https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli](https://op.europa.eu/en/web/eu-vocabularies/model/-/resource/dataset/eli)
- [http://publications.europa.eu/mdr/eli/index.html](http://publications.europa.eu/mdr/eli/index.html)
- [https://schema.org/docs/collab/ELI](https://schema.org/docs/collab/ELI)

External vocabulary mappings:
- http://www.w3.org/2004/02/skos/core#exactMatch: [http://data.europa.eu/eli/ontology#LegalValue-unofficial](http://data.europa.eu/eli/ontology#LegalValue-unofficial)


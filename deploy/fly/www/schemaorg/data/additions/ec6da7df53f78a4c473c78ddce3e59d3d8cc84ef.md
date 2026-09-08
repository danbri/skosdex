# Issue #767: Added countryOfOrigin.

[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)

First observed source declaration: 2015-09-15. Recorded commit author: **Vicki Tardif Holland**. [Commit](https://github.com/schemaorg/schemaorg/commit/ec6da7df53f78a4c473c78ddce3e59d3d8cc84ef).

<a id="term-countryOfOrigin"></a>
## countryOfOrigin

Property · current · [Schema.org](https://schema.org/countryOfOrigin)

The country of origin of something, including products as well as creative  works such as movie and TV content.

In the case of TV and movie, this would be the country of the principle offices of the production company or individual responsible for the movie. For other kinds of [[CreativeWork]] it is difficult to provide fully general guidance, and properties such as [[contentLocation]] and [[locationCreated]] may be more applicable.

In the case of products, the country of origin of the product. The exact interpretation of this may vary by context and product type, and cannot be fully enumerated here.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [2.2, 2015-11-05](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/2.2/all-layers.nq). This is an upper bound on introduction.

### Proposal and implementation trail

- [#767: Add countryOfOrigin to TVSeries and Movie[done] + Product [todo]](https://github.com/schemaorg/schemaorg/issues/767) — Issue opener: **vickitardif**, opened 2015-09-11. The recorded role does not establish original authorship.

Attribution assessment: Git declaration found; original designer not established.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

External vocabulary mappings:
- http://www.w3.org/2002/07/owl#equivalentProperty: [http://unece.org/vocab#originCountry](http://unece.org/vocab#originCountry)


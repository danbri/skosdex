# Moving along the Observation-based vocabulary in light of feedback from datacommons and their partners.

[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)

First observed source declaration: 2023-04-05. Recorded commit author: **Dan Brickley**. [Commit](https://github.com/schemaorg/schemaorg/commit/58802bbbfc3e1ed3ef4fdba59cef474bbf555d74).

<a id="term-StatisticalVariable"></a>
## StatisticalVariable

Type · current · [Schema.org](https://schema.org/StatisticalVariable)

[[StatisticalVariable]] represents any type of statistical metric that can be measured at a place and time. The usage pattern for [[StatisticalVariable]] is typically expressed using [[Observation]] with an explicit [[populationType]], which is a type, typically drawn from Schema.org. Each [[StatisticalVariable]] is marked as a [[ConstraintNode]], meaning that some properties (those listed using [[constraintProperty]]) serve in this setting solely to define the statistical variable rather than literally describe a specific person, place or thing. For example, a [[StatisticalVariable]] Median_Height_Person_Female representing the median height of women, could be written as follows: the population type is [[Person]]; the measuredProperty [[height]]; the [[statType]] [[median]]; the [[gender]] [[Female]]. It is important to note that there are many kinds of scientific quantitative observation which are not fully, perfectly or unambiguously described following this pattern, or with solely Schema.org terminology. The approach taken here is designed to allow partial, incremental or minimal description of [[StatisticalVariable]]s, and the use of detailed sets of entity and property IDs from external repositories. The [[measurementMethod]], [[unitCode]] and [[unitText]] properties can also be used to clarify the specific nature and notation of an observed measurement. 

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [16.0, 2023-05-16](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/16.0/schemaorg-all-https.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#2291: Proposal for representing Aggregate Statistical Data](https://github.com/schemaorg/schemaorg/issues/2291) — Issue opener: **danbri**, opened 2019-06-25. The recorded role does not establish original authorship.
- [#2564: Update /Observation in light of pending experience including datacommons.org](https://github.com/schemaorg/schemaorg/issues/2564) — Issue opener: **danbri**, opened 2020-05-12. The recorded role does not establish original authorship.
- [#3298: Markup errors in AggregateOffer examples](https://github.com/schemaorg/schemaorg/issues/3298) — Issue opener: **jvandriel**, opened 2023-04-22. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/2564](https://github.com/schemaorg/schemaorg/issues/2564)

<a id="term-statType"></a>
## statType

Property · current · [Schema.org](https://schema.org/statType)

Indicates the kind of statistic represented by a [[StatisticalVariable]], e.g. mean, count etc. The value of statType is a property, either from within Schema.org (e.g. [[median]], [[marginOfError]], [[maxValue]], [[minValue]]) or from other compatible (e.g. RDF) systems such as DataCommons.org or Wikidata.org. 

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [16.0, 2023-05-16](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/16.0/schemaorg-all-https.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#2291: Proposal for representing Aggregate Statistical Data](https://github.com/schemaorg/schemaorg/issues/2291) — Issue opener: **danbri**, opened 2019-06-25. The recorded role does not establish original authorship.
- [#2564: Update /Observation in light of pending experience including datacommons.org](https://github.com/schemaorg/schemaorg/issues/2564) — Issue opener: **danbri**, opened 2020-05-12. The recorded role does not establish original authorship.
- [#3298: Markup errors in AggregateOffer examples](https://github.com/schemaorg/schemaorg/issues/3298) — Issue opener: **jvandriel**, opened 2023-04-22. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/2564](https://github.com/schemaorg/schemaorg/issues/2564)


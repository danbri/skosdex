# Added a draft design for 'speakable' sections of a page.

[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)

First observed source declaration: 2016-10-05. Recorded commit author: **Dan Brickley**. [Commit](https://github.com/schemaorg/schemaorg/commit/a0faddee52879c569fcec54b203af4fbcf2de1ff).

<a id="term-cssSelector"></a>
## cssSelector

Property · current · [Schema.org](https://schema.org/cssSelector)

A CSS selector, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element".

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.2, 2017-03-23](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.2/all-layers.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#1389: Add vocabulary to indicate which sections of a document are particularly 'speakable'](https://github.com/schemaorg/schemaorg/issues/1389) — Issue opener: **danbri**, opened 2016-10-05. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1389](https://github.com/schemaorg/schemaorg/issues/1389)

<a id="term-speakable"></a>
## speakable

Property · current · [Schema.org](https://schema.org/speakable)

Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.

The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:

1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned.

2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the [[cssSelector]] property.

3.)  XPaths - addresses content via XPaths (assuming an XML view of the content). Use the [[xpath]] property.


For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this
we define a supporting type, [[SpeakableSpecification]]  which is defined to be a possible value of the *speakable* property.
         

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.2, 2017-03-23](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.2/all-layers.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#1389: Add vocabulary to indicate which sections of a document are particularly 'speakable'](https://github.com/schemaorg/schemaorg/issues/1389) — Issue opener: **danbri**, opened 2016-10-05. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1389](https://github.com/schemaorg/schemaorg/issues/1389)

<a id="term-SpeakableSpecification"></a>
## SpeakableSpecification

Type · current · [Schema.org](https://schema.org/SpeakableSpecification)

A SpeakableSpecification indicates (typically via [[xpath]] or [[cssSelector]]) sections of a document that are highlighted as particularly [[speakable]]. Instances of this type are expected to be used primarily as values of the [[speakable]] property.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.2, 2017-03-23](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.2/all-layers.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#1389: Add vocabulary to indicate which sections of a document are particularly 'speakable'](https://github.com/schemaorg/schemaorg/issues/1389) — Issue opener: **danbri**, opened 2016-10-05. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1389](https://github.com/schemaorg/schemaorg/issues/1389)

<a id="term-xpath"></a>
## xpath

Property · current · [Schema.org](https://schema.org/xpath)

An XPath, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element".

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [3.2, 2017-03-23](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/3.2/all-layers.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#1389: Add vocabulary to indicate which sections of a document are particularly 'speakable'](https://github.com/schemaorg/schemaorg/issues/1389) — Issue opener: **danbri**, opened 2016-10-05. The recorded role does not establish original authorship.

Attribution assessment: Source trail found; individual originator needs interpretation.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

Additional source trails:
- [https://github.com/schemaorg/schemaorg/issues/1389](https://github.com/schemaorg/schemaorg/issues/1389)


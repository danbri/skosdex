# Issue #266: Merged in proposed additions with minor name changes to avoid conflicts.

[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)

First observed source declaration: 2015-02-05. Recorded commit author: **Vicki Tardif Holland**. [Commit](https://github.com/schemaorg/schemaorg/commit/5fc5760edb6c201ff98f2dabccdce894e801f7fc).

<a id="term-orderDelivery"></a>
## orderDelivery

Property · current · [Schema.org](https://schema.org/orderDelivery)

The delivery of the parcel related to this order or order item.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [2.0, 2015-05-12](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/2.0/schema.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#266: Orders schema updates](https://github.com/schemaorg/schemaorg/issues/266) — Issue opener: **danbri**, opened 2015-01-22. The recorded role does not establish original authorship.

Attribution assessment: Git declaration found; original designer not established.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

<a id="term-OrderItem"></a>
## OrderItem

Type · current · [Schema.org](https://schema.org/OrderItem)

An order item is a line of an order. It includes the quantity and shipping details of a bought offer.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [2.0, 2015-05-12](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/2.0/schema.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#266: Orders schema updates](https://github.com/schemaorg/schemaorg/issues/266) — Issue opener: **danbri**, opened 2015-01-22. The recorded role does not establish original authorship.

Attribution assessment: Git declaration found; original designer not established.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

External vocabulary mappings:
- http://www.w3.org/2002/07/owl#equivalentClass: [http://unece.org/vocab#LineTradeAgreement](http://unece.org/vocab#LineTradeAgreement)

<a id="term-orderItemStatus"></a>
## orderItemStatus

Property · current · [Schema.org](https://schema.org/orderItemStatus)

The current status of the order item.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [2.0, 2015-05-12](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/2.0/schema.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#266: Orders schema updates](https://github.com/schemaorg/schemaorg/issues/266) — Issue opener: **danbri**, opened 2015-01-22. The recorded role does not establish original authorship.

Attribution assessment: Git declaration found; original designer not established.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

<a id="term-orderQuantity"></a>
## orderQuantity

Property · current · [Schema.org](https://schema.org/orderQuantity)

The number of the item ordered. If the property is not set, assume the quantity is one.

Date evidence: First observed source declaration; it may precede release and does not establish invention.

Earliest available release snapshot: [2.0, 2015-05-12](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/releases/2.0/schema.nt). This is an upper bound on introduction.

### Proposal and implementation trail

- [#266: Orders schema updates](https://github.com/schemaorg/schemaorg/issues/266) — Issue opener: **danbri**, opened 2015-01-22. The recorded role does not establish original authorship.

Attribution assessment: Git declaration found; original designer not established.

Source definitions:
- [data/schema.ttl](https://github.com/schemaorg/schemaorg/blob/10be955038f15bf0df3d378db00ae3038691cfb3/data/schema.ttl)

External vocabulary mappings:
- http://www.w3.org/2000/01/rdf-schema#subPropertyOf: [https://www.omg.org/spec/Commons/Quantities/hasQuantity](https://www.omg.org/spec/Commons/Quantities/hasQuantity)
- http://www.w3.org/2002/07/owl#equivalentProperty: [http://unece.org/vocab#orderQuantity](http://unece.org/vocab#orderQuantity)


# QA and completion review

Checked 2026-09-08. [Developers page](https://schema.org/docs/developers.html).

| Scope | Types and properties |
|---|---:|
| Published current | 2454 |
| Published all, including retired | 2466 |
| Checkout, including newer declarations | 2480 |
| Published terms missing from audit | 0 |

Factoidal @factoidal/core@0.7.1 parsed and queried both downloaded N-Triples graphs; explicit N-Triples declaration sets agree. The original SPARQL check compared Factoidal query results with iteration over the same Factoidal-parsed dataset. It was not independent parser verification.

The downloaded tree contains 52 repeated occurrences. In the optional source and release audit modes, the explorer chooses the first display occurrence per type and supplements 21 missing types from RDF parent declarations. All declared parents remain in Term details. Those audit modes project today’s hierarchy through dated evidence. The default Evolution view instead uses the reconstructed historical snapshots, starting with the June 2011 community scrape and preserving archived parent relationships. See the [historical reconstruction notes](../history/README.md).

Source mode animates first observed git declarations. Imported baseline terms remain an undated foundation, and are not counted as newly invented in 2014. Release mode uses earliest available snapshots, leaving v2.0's preexisting vocabulary undated. Neither view establishes precise invention dates.

Every 2480 type/property and 546 typed value has a readable record in [additions](../additions/README.md). Recorded acknowledgements and issue/PR authors are connected to terms. Attribution research remains incomplete: issue comments, relayed proposals and pre-git origins require interpretation. The timeline remains a curated selection of 116 milestones rather than an exhaustive history of all contributions.

Retired published terms: StupidType, ProductReturnPolicy, ProductReturnEnumeration, DeliveryTimeSettings, variablesMeasured, transitTimeLabel, stupidProperty, shippingSettingsLink, shippingLabel, productReturnLink, productReturnDays, hasProductReturnPolicy.

Checkout additions absent from the published all download: authorizedRepresentative, consumerNotice, DeclarationOfConformity, DigitalProductPassport, EnvironmentalProductDeclaration, hasDigitalProductPassport, importer, isOftenBoughtWith, itemPopularity, minimumOrderValue, recycledContentPercentage, specification, substanceOfConcern, valueGroup.

Missing linked issues in the cached issue-body collection: 2543, 2358, 2348, 271, 2500.

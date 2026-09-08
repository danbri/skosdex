# Schema.org contribution timeline

[Interactive timeline](schemaorg-growth.html) starts at the June 2011 DERI / Schema.RDFS.org snapshot. It reconstructs 63 quarterly vocabularies, using explicit early estimates and archived sources/releases. D3 tree, radial-cluster and treemap views interpolate between states; new types fly in from the edges and are named in the ticker. Then/now examples, vocabulary browsing, settings and sources have separate tabs.

The SPARQL tab runs six editable queries in a browser worker using the installed `@factoidal/core` 0.7.1 NPM package. Both named graphs and all engine files stay on the local server. `t:then` is the selected reconstructed quarter and `t:now` is the cached published vocabulary. The normalized query graph represents all explorer type nodes, including datatype nodes, as `rdfs:Class`; it also includes properties, definitions, parents, domains and ranges. `t:ancestor` is a derived reflexive/transitive parent closure for each snapshot, materialized in the worker to avoid the engine’s recursive property-path stack limit. It is a queryable projection of the historical records, not a byte-for-byte copy of their original RDF.

Run `npm run serve`, then open <http://127.0.0.1:8000/schemaorg-growth.html>. Use `npm run render` for UI edits, `npm run history` to rebuild historical snapshots, and `npm run growth` to rerun the publication checks and render. `npm run test:growth` verifies the exported snapshots and the live browser interactions (requires Chrome and the server). The SPARQL tab requires the local server; the embedded visualization itself can be opened offline.

[Historical reconstruction and sources](data/history/README.md) · [Quarterly D3 trees](data/history/index.json) · [Early date estimates](data/history/early-date-estimates.json)

[HTML timeline](schemaorg-timeline.html) · [Markdown timeline](schemaorg-timeline.md) · [Project records](data/README.md) · [Exhaustive vocabulary provenance](data/audit/vocabulary-provenance.json) · [Inspected source files](data/audit/source-files.md)

A source-linked, at-a-glance selection of significant Schema.org contributions from 2011 to **8 September 2026**, organized by year and quarter. Each collaboration has a Markdown record under `data/`, with separate dated entries for its additions and their supporting evidence.

The brief is in [sources-sdo-timeline.txt](sources-sdo-timeline.txt). It contains research instructions and source categories rather than a pre-existing factual timeline.

## Scope and attribution

- **Non-Google**: the reviewed sources explicitly credit an outside organization, community or identifiable outside affiliation. This includes mixed collaborations with Google and contributions integrated by maintainers.
- **Alignment**: an external vocabulary, identifier system or data format is reused. This alone does not prove participation or endorsement by its owner.
- **Named contributor**: a person or handle is credited, but affiliation at the time has not been established in this review.
- **Project**: significant context without a specific external attribution established here. This does not imply Google-only authorship.

Statuses distinguish proposals, draft integrations, released Pending terms, promotions to core, external extensions, tools and other milestones. Multiple stages of one contribution are not separate claims of invention. Routine bug fixes are excluded; substantial documentation, infrastructure and recorded provenance are included.

This is a researched selection, **not an exhaustive inventory of every non-Google contribution**. Sparse quarters mean no milestone was selected, not that no work happened. 2026 Q3 is partial at the cutoff; Q4 is in the future. Unknown affiliations and oral agreements are not inferred. The Trust Project record includes a documented relayed proposal, but the evidence does not establish the medium of that exchange.

The companion exhaustive audit covers every current type and property (2,480 terms) in the repository vocabulary, plus 546 other typed vocabulary values. It records source files, definitions, acknowledgements, mappings, linked issue numbers, first release snapshot, and first git declaration where available. The machine-readable report was generated with `@factoidal/core` 0.7.1: Factoidal parsed the 64 Turtle source files and ran the independent SPARQL inventory check over the resulting dataset. Historical release coverage is limited to snapshots present in this checkout; 14 terms have no numbered-release snapshot in the available history.

## Evidence and date policy

The main evidence is the [release index](https://schema.org/docs/releases.html), [Schema.org blog](https://blog.schema.org/), linked W3C wiki material and mailing-list discussions, project statements, git history, and the repository's [contributor acknowledgements](https://github.com/schemaorg/schemaorg/tree/main/data/collab). Public links appear in every dated record. Selected sources were checked on 2026-09-08; not every outbound link has been independently checked for availability.

Local repository inspected: `../`, commit `10be955038f15bf0df3d378db00ae3038691cfb3` (2026-09-03). The latest numbered release found is **30.0, 2026-03-19**. Later repository additions are labelled merged drafts unless a publication milestone is separately documented. No git staging or commit is part of this work.

For released vocabulary, dates normally follow the release index. An announcement, attribution commit or external publication uses its own date and is labelled accordingly. Known discrepancies are explained in the project records. In particular:

- The release index explicitly omits parts of 2011–2012; contemporary blogs supplement it.
- v1.1 is printed as 2014-05-04 despite preceding an April v1.2 release. The Q2 placement is robust, but the exact day needs archival reconciliation.
- v7.0's blog and release index differ by one day; this timeline uses the index for release dating.
- Some issue numbers recur in multiple releases. Duplicated listings are not automatically treated as new contributions.
- Current acknowledgement markup proves credited lineage, not necessarily the original contribution date. WikiDoc's original date remains unassigned.

## Updating the output

Edit the project Markdown files in `data/`, then run:

```sh
python3 build_timeline.py
```

The script generates both timelines and the project index using only the Python standard library. The HTML is self-contained and opens directly from disk; source details, search, category filtering and printing require no external assets or services. It remains readable without JavaScript.

To regenerate the exhaustive vocabulary audit (including git-history provenance), run `npm run audit`. The audit uses `@factoidal/core`; no second RDF/SPARQL implementation is involved in the validation query.

Each dated record has a heading `## YYYY-MM-DD — Title`, followed by `Category:`, `Status:` and a one-line `Summary:`. Evidence paragraphs and a Markdown `Sources:` list follow. This keeps the research editable as ordinary Markdown while letting both overviews stay synchronized.

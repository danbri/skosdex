# DPP / EC — European Commission DPP vocabularies

The 17 SKOS concept schemes (294 concepts) in the EU DPP Registry
"Semantic Data Artifacts", release 1.0.0 (30 Oct 2026), from DG GROW:
https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/resources-documentation_en

- **Licence:** each file declares EUPL-1.2 (`dct:license`). That is copyleft,
  so these schemes are container-only (SPARQL/Solr) and are kept out of the
  static Pages demo, as the skosdex licence policy requires. Content is unchanged.
- **Source:** the official zip. The scheme IRIs
  (`https://repository.product-passport.ec.europa.eu/...`) did not resolve when
  checked on 2026-11-03.
- **Layers:** `core` (shared by every product group) and `batteries` (the
  Battery Regulation passport, mandatory from 18 Feb 2027).

| folder | concepts | scheme IRI |
|---|---|---|
| `common-error-code` | 13 | `https://repository.product-passport.ec.europa.eu/core/vocabs/common-error-code` |
| `common-vocabulary` | 11 | `https://repository.product-passport.ec.europa.eu/core/vocabs/common-vocabulary` |
| `core-error-code` | 6 | `https://repository.product-passport.ec.europa.eu/core/vocabs/core-error-code` |
| `core-vocabulary` | 11 | `https://repository.product-passport.ec.europa.eu/core/vocabs/core-vocabulary` |
| `critical-raw-material` | 34 | `https://repository.product-passport.ec.europa.eu/core/vocabs/critical-raw-material` |
| `granularity-level` | 3 | `https://repository.product-passport.ec.europa.eu/core/vocabs/granularity-level` |
| `information-type` | 2 | `https://repository.product-passport.ec.europa.eu/core/vocabs/information-type` |
| `instance-status` | 2 | `https://repository.product-passport.ec.europa.eu/core/vocabs/instance-status` |
| `measurement-unit` | 11 | `https://repository.product-passport.ec.europa.eu/core/vocabs/measurement-unit` |
| `observed-characteristic` | 1 | `https://repository.product-passport.ec.europa.eu/core/vocabs/observed-characteristic` |
| `battery-category` | 3 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-category` |
| `battery-chemical-symbol` | 3 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-chemical-symbol` |
| `battery-chemistry` | 10 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-chemistry` |
| `battery-error-code` | 88 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-error-code` |
| `battery-information-type` | 3 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-information-type` |
| `battery-status` | 5 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-status` |
| `battery-vocabulary` | 88 | `https://repository.product-passport.ec.europa.eu/product/batteries/vocabs/battery-vocabulary` |

To move to a newer EC release, update `sourceEntry` (and the comments) in each
`meta.ttl`, then rebuild with `node scripts/skosdex build dpp/ec`.

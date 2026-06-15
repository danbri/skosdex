# Solr core: `skos`

The `solr` service in `docker-compose.yml` runs the official `solr:9` image and
creates a schemaless core named `skos` via `solr-precreate skos`. The one-shot
`solr-init` service waits for the core and posts `dist/solr-docs.json`.

Each doc is one `skos:Concept` flattened from the bundle:

```json
{ "id": "<concept IRI>", "scheme": "<conceptScheme IRI>",
  "prefLabel": [...], "altLabel": [...], "definition": [...],
  "broader": [...], "narrower": [...],
  "prefLabel_en": [...], "prefLabel_fr": [...], "altLabel_de": [...],
  "definition_es": [...], "lang": ["en","fr","de", ...] }
```

**Language tags are preserved.** The combined `prefLabel`/`altLabel`/`definition`
fields keep every language (for back-compat search), and each text value is also
emitted into a per-language subfield — `prefLabel_<lang>`, `altLabel_<lang>`,
`definition_<lang>` (BCP47 tag lowercased, `-`→`_`, e.g. `pt-BR`→`prefLabel_pt_br`).
The `lang` multivalued field lists the doc's distinct languages, with the primary
subtag added (so `en-GB` also yields `en`). This makes language filtering possible:

```
fq=lang:en                         # concepts that have any English text
q=climate&qf=prefLabel_en          # search English prefLabels only
fl=id,prefLabel_fr                 # return just the French prefLabels
```

Regenerate the docs with `node scripts/skosdex solr-docs` (or `npm run build`).
The full corpus is multi-GB, so `solr-docs` also writes `dist/solr-parts/part-*.json`
(50k docs each); `docker compose up` posts those parts then commits.

For a managed (non-schemaless) schema, drop a `conf/` configset here and switch
`solr-precreate skos` to reference it.

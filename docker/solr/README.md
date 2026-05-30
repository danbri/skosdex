# Solr core: `skos`

The `solr` service in `docker-compose.yml` runs the official `solr:9` image and
creates a schemaless core named `skos` via `solr-precreate skos`. The one-shot
`solr-init` service waits for the core and posts `dist/solr-docs.json`.

Each doc is one `skos:Concept` flattened from the bundle:

```json
{ "id": "<concept IRI>", "scheme": "<conceptScheme IRI>",
  "prefLabel": [...], "altLabel": [...], "definition": [...],
  "broader": [...], "narrower": [...] }
```

Regenerate the docs with `node scripts/skosdex solr-docs` (or `npm run build`),
then `docker compose up` re-posts them.

For a managed (non-schemaless) schema, drop a `conf/` configset here and switch
`solr-precreate skos` to reference it.

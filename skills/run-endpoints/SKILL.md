---
name: run-endpoints
description: Use when bringing up, configuring, or troubleshooting the skosdex services — the Oxigraph SPARQL endpoint, the Solr index, and the web frontend via docker compose (or swapping Oxigraph for Apache Jena Fuseki).
license: Apache-2.0
---

# Run the SPARQL + Solr + web endpoints

The dataset is served by a small docker compose stack.

```bash
npm run build              # produce dist/bundle.nq + dist/solr-docs.json first
docker compose up --build
```

| Service | URL | Notes |
|---------|-----|-------|
| web | http://localhost:8080 | static frontend, same-origin proxy to the others |
| sparql (Oxigraph) | http://localhost:7878/query | `dist/bundle.nq` baked into the image |
| solr | http://localhost:8983/solr | core `skos`, loaded by the one-shot `solr-init` |

The web frontend talks to `sparql` and `solr` through nginx proxies
(`/sparql/`, `/solr/`) so the browser hits a single origin (no CORS).

## Notes & alternatives

- **Rebuild data:** re-run `npm run build`, then `docker compose up --build`
  (the SPARQL image bakes in `dist/bundle.nq`; `solr-init` re-posts the docs).
- **Read/write store:** the image serves `serve-read-only`. For a writable
  endpoint, change the `CMD` in `docker/sparql/Dockerfile` to `serve`.
- **Jena Fuseki instead of Oxigraph:** swap the `sparql` service for
  `image: stain/jena-fuseki` (or `secoresearch/fuseki`), mount `dist/bundle.nq`,
  and load it via Fuseki's `--file`/TDB loader. The rest of the stack and the
  `/sparql/` proxy target are unchanged.
- **Oxigraph image tag:** pinned via the `OXIGRAPH_TAG` build arg in
  `docker/sparql/Dockerfile`; bump it there.

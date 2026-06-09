# Bundles the canonicalized N-Quads (dist/bundle.nq.gz, gzipped) into an
# Oxigraph store at build time, then serves it read-only. Build context must be
# the repo root so that dist/bundle.nq.gz is visible — see docker-compose.yml.
#
# Run `npm run build` first to (re)generate dist/bundle.nq.gz.
ARG OXIGRAPH_TAG=0.4.11

FROM ghcr.io/oxigraph/oxigraph:${OXIGRAPH_TAG} AS loader
COPY dist/bundle.nq.gz /tmp/bundle.nq.gz
RUN gunzip /tmp/bundle.nq.gz \
 && /usr/local/bin/oxigraph load --location /data --file /tmp/bundle.nq

FROM ghcr.io/oxigraph/oxigraph:${OXIGRAPH_TAG}
COPY --from=loader /data /data
EXPOSE 7878
# SPARQL query endpoint: http://localhost:7878/query
CMD ["serve-read-only", "--location", "/data", "--bind", "0.0.0.0:7878"]

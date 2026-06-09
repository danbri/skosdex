# skosdex single-box deployment for fly.io: Oxigraph (SPARQL) + Solr (search)
# in one image, both serving the bundled SKOS corpus from a persistent volume.
#
# The gzipped bundle + solr docs are baked into the image (built in CI from the
# Git LFS canonical.nq.gz files). On first boot start.sh loads them into the
# volume-backed Oxigraph store and Solr core; subsequent boots reuse the volume.
# Pull the Oxigraph binary from its official image (robust vs. release-asset
# naming churn).
ARG OXIGRAPH_TAG=0.4.11
FROM ghcr.io/oxigraph/oxigraph:${OXIGRAPH_TAG} AS oxigraph

FROM solr:9 AS base

USER root

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates gzip \
 && rm -rf /var/lib/apt/lists/*

# Oxigraph SPARQL server binary (RocksDB-backed).
COPY --from=oxigraph /usr/local/bin/oxigraph /usr/local/bin/oxigraph

# Data artifacts produced by `skosdex bundle` + `skosdex solr-docs` in CI.
COPY dist/bundle.nq.gz   /seed/bundle.nq.gz
COPY dist/solr-docs.json /seed/solr-docs.json
COPY deploy/fly/start.sh /usr/local/bin/skosdex-start
RUN chmod +x /usr/local/bin/skosdex-start

# Persistent data lives here (Fly volume mounts at /data).
ENV SKOSDEX_DATA=/data
EXPOSE 7878 8983

ENTRYPOINT ["/usr/local/bin/skosdex-start"]

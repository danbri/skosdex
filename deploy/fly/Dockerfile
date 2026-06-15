# skosdex single-box deployment for fly.io: Oxigraph (SPARQL) + Solr (search)
# in one image, both serving the bundled SKOS corpus from a persistent volume.
#
# The gzipped bundle + solr docs are baked into the image (built in CI from the
# Git LFS canonical.nq.gz files). On first boot start.sh loads them into the
# volume-backed Oxigraph store and Solr core; subsequent boots reuse the volume.
# Pull the Oxigraph binary from its official image (robust vs. release-asset
# naming churn).
ARG OXIGRAPH_TAG=0.5.2
FROM ghcr.io/oxigraph/oxigraph:${OXIGRAPH_TAG} AS oxigraph

FROM solr:9 AS base

USER root

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates gzip nginx \
 && rm -rf /var/lib/apt/lists/*

# Oxigraph SPARQL server binary (RocksDB-backed).
COPY --from=oxigraph /usr/local/bin/oxigraph /usr/local/bin/oxigraph

# Data artifacts produced by `skosdex bundle` + `skosdex solr-docs` in CI.
# Solr docs ship as part files (<=50k docs each): one ~180MB POST kills Solr's
# default heap, so start.sh posts the parts sequentially.
COPY dist/graphed/       /seed/graphed/
# Build-time fingerprint of the whole graphed set (md5 of all per-scheme md5s).
# start.sh compares it to the volume's last-loaded fingerprint to skip the
# ~650-file boot hash when nothing changed — so code/UI redeploys boot in seconds.
RUN md5sum /seed/graphed/*.nq.gz | md5sum | cut -d' ' -f1 > /seed/graphed.fp
COPY dist/solr-parts/    /seed/solr-parts/
# Per-scheme license manifest: makes every bundled scheme's license explicit
# inside the container (policy: BY-SA / NC-ND data ships container-only, with
# licensing declared and no semantic changes — N-Quads formatting only).
COPY dist/manifest.json  /seed/manifest.json
COPY deploy/fly/nginx.conf /etc/nginx/conf.d/skosdex.conf
COPY deploy/fly/www/ /opt/skosdex/www/
RUN rm -f /etc/nginx/sites-enabled/default
COPY deploy/fly/start.sh /usr/local/bin/skosdex-start
RUN chmod +x /usr/local/bin/skosdex-start

# Persistent data lives here (Fly volume mounts at /data).
ENV SKOSDEX_DATA=/data
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/skosdex-start"]

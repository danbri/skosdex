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

# nodejs runs the embeddings similarity API (tools/embed_api.mjs, stdlib-only).
# python3 + onnxruntime/tokenizers run the query-embed sidecar (embed_query.py)
# for /api/search text search — the same model used to build the corpus, far
# leaner than onnxruntime-node (~16MB wheel vs ~700MB node_modules).
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates gzip nginx nodejs python3 python3-pip \
 && pip3 install --no-cache-dir onnxruntime tokenizers numpy \
 && rm -rf /var/lib/apt/lists/* /root/.cache/pip

# Oxigraph SPARQL server binary (RocksDB-backed).
COPY --from=oxigraph /usr/local/bin/oxigraph /usr/local/bin/oxigraph

# Data artifacts produced by `skosdex bundle` + `skosdex solr-docs` in CI.
# Solr docs ship as part files (<=50k docs each): one ~180MB POST kills Solr's
# default heap, so start.sh posts the parts sequentially.
COPY dist/graphed/       /seed/graphed/
# The precomputed cross-scheme embedding-similarity graph (RDF-star scored
# edges; tools/precompute_similar.py) rides the same stage-1 loader as any
# scheme — quads already carry their named graph, oxigraph is the only parser
# that ever reads this file. ~tens of MB, LFS-tracked, CC0 derived data.
COPY deploy/fly/www/embeddings/similar.nq.gz /seed/graphed/emb-similarity.nq.gz
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
# www carries the UI + the SMALL embedding files (index.json, *.layout.json for
# the galaxies, *.emb.json metas). The big *.emb.f16 vectors are excluded by
# .dockerignore — start.sh syncs them onto the volume at boot (see below), so the
# image stays well under Fly's 8 GB limit.
COPY deploy/fly/www/ /opt/skosdex/www/
# Git ref the running box pulls the LFS .emb.f16 vectors from (media.github...).
# CI passes the exact commit SHA; defaults to the working branch for manual builds.
ARG GIT_SHA=claude/main
ENV EMB_REF=${GIT_SHA}
# Embeddings similarity API server (KNN over the combined _all.emb.* baked above
# into www/embeddings); start.sh runs it in the background, nginx proxies /api/.
COPY tools/embed_api.mjs /opt/skosdex/embed_api.mjs
# Query-embed sidecar (/api/search) + shared model module. The e5 model is NOT
# baked — model + corpus + embeddings together exceed Fly's 8 GB uncompressed
# image limit. Instead the sidecar fetches it once from HuggingFace into the
# MOUNTED VOLUME at /data/models (persists across reboots; see start.sh).
COPY tools/embed_query.py /opt/skosdex/embed_query.py
COPY tools/embed_model.py /opt/skosdex/embed_model.py
ENV SKOSDEX_MODEL_DIR=/data/models
RUN rm -f /etc/nginx/sites-enabled/default
COPY deploy/fly/start.sh /usr/local/bin/skosdex-start
RUN chmod +x /usr/local/bin/skosdex-start

# Persistent data lives here (Fly volume mounts at /data).
ENV SKOSDEX_DATA=/data
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/skosdex-start"]

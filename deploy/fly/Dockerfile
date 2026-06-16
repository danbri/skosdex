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
 && pip3 install --no-cache-dir --break-system-packages onnxruntime tokenizers numpy \
 && rm -rf /var/lib/apt/lists/* /root/.cache/pip

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
# Embeddings similarity API server (KNN over the combined _all.emb.* baked above
# into www/embeddings); start.sh runs it in the background, nginx proxies /api/.
COPY tools/embed_api.mjs /opt/skosdex/embed_api.mjs
# Query-embed sidecar (/api/search text search) + its MiniLM model baked at build
# time (CI has network) so the box never fetches from HuggingFace at runtime.
COPY tools/embed_query.py /opt/skosdex/embed_query.py
ENV SKOSDEX_MODEL_DIR=/opt/skosdex/models
RUN mkdir -p /opt/skosdex/models \
 && curl -fsSL -o /opt/skosdex/models/model_quantized.onnx https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/onnx/model_quantized.onnx \
 && curl -fsSL -o /opt/skosdex/models/tokenizer.json       https://huggingface.co/Xenova/all-MiniLM-L6-v2/resolve/main/tokenizer.json
RUN rm -f /etc/nginx/sites-enabled/default
COPY deploy/fly/start.sh /usr/local/bin/skosdex-start
RUN chmod +x /usr/local/bin/skosdex-start

# Persistent data lives here (Fly volume mounts at /data).
ENV SKOSDEX_DATA=/data
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/skosdex-start"]

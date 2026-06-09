#!/bin/bash
# Boot Oxigraph + Solr on one box, seeding the SKOS corpus into the persistent
# volume on first run. Idempotent: a marker file skips reload on later boots.
set -euo pipefail

DATA="${SKOSDEX_DATA:-/data}"
OX_STORE="$DATA/oxigraph"
SOLR_HOME="$DATA/solr"
SEED_MARKER="$DATA/.seeded-v1"

mkdir -p "$OX_STORE" "$SOLR_HOME"

# --- Solr -----------------------------------------------------------------
# Use the volume as Solr home so the core persists across machine restarts.
export SOLR_HOME
solr start -force
# Wait for Solr to answer.
until curl -sf "http://localhost:8983/solr/admin/info/system" >/dev/null 2>&1; do
  echo "waiting for solr..."; sleep 2
done

if [ ! -f "$SEED_MARKER" ]; then
  echo "seeding: first boot"

  # Oxigraph: load the bundle into the RocksDB store on the volume. Decompress
  # to a .nq first so the loader infers the format from the extension (matches
  # the proven docker/sparql pattern).
  echo "loading bundle into oxigraph..."
  gzip -dc /seed/bundle.nq.gz > /tmp/bundle.nq
  /usr/local/bin/oxigraph load --location "$OX_STORE" --file /tmp/bundle.nq
  rm -f /tmp/bundle.nq

  # Solr: create the core (if absent) and post the concept docs. solr-docs.json
  # is a JSON array of docs keyed by `id` with multi-valued string fields —
  # Solr's standard /update format (schemaless _default config infers fields).
  curl -sf "http://localhost:8983/solr/admin/cores?action=CREATE&name=skos&configSet=_default" >/dev/null 2>&1 || true
  echo "indexing solr docs..."
  curl -sf "http://localhost:8983/solr/skos/update?commit=true" \
       -H 'Content-Type: application/json' --data-binary @/seed/solr-docs.json

  touch "$SEED_MARKER"
  echo "seeding complete"
else
  echo "already seeded; reusing volume"
fi

# --- Oxigraph (foreground) -------------------------------------------------
# Solr already runs in the background; keep the container alive on Oxigraph.
echo "starting oxigraph SPARQL server on :7878"
exec /usr/local/bin/oxigraph serve-read-only --location "$OX_STORE" --bind 0.0.0.0:7878

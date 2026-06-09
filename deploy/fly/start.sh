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
# 2GB heap: the default 512m cannot index the corpus (the VM has 8GB+).
export SOLR_HOME
export SOLR_HEAP="${SOLR_HEAP:-2g}"
solr start -force
# Wait for Solr to answer.
until curl -sf "http://localhost:8983/solr/admin/info/system" >/dev/null 2>&1; do
  echo "waiting for solr..."; sleep 2
done

if [ ! -f "$SEED_MARKER" ]; then
  echo "seeding: first boot"

  # Oxigraph: load the bundle into the RocksDB store on the volume. Decompress
  # to a .nq first so the loader infers the format from the extension.
  # --lenient: skip-and-log a malformed quad rather than abort 47.7M triples
  # over one bad line. Any reported Error still aborts BEFORE the marker is
  # written — a truncated store must never be stamped seeded. (This exact
  # failure shipped once: oxigraph 0.4.11 rejected valid @es-419 language tags,
  # died at line 2.8M, and the script blithely carried on. 0.5.2 parses them;
  # lenient + the grep below are the backstop.)
  echo "loading bundle into oxigraph..."
  gzip -dc /seed/bundle.nq.gz > /tmp/bundle.nq
  if ! /usr/local/bin/oxigraph load --lenient --location "$OX_STORE" --file /tmp/bundle.nq 2>&1 | tee /tmp/oxload.out; then
    echo "FATAL: oxigraph load exited non-zero; not marking seeded"; exit 1
  fi
  if grep -qi "error" /tmp/oxload.out; then
    echo "FATAL: oxigraph load reported errors; not marking seeded"; exit 1
  fi
  rm -f /tmp/bundle.nq /tmp/oxload.out

  # Solr: create the core (if absent) and post the concept docs in parts —
  # each /seed/solr-parts/part-NNNN.json is a JSON array of <=50k docs
  # (schemaless _default config infers fields). One giant POST is what failed
  # before (curl exit 22). Commit once at the end.
  curl -sf "http://localhost:8983/solr/admin/cores?action=CREATE&name=skos&configSet=_default" >/dev/null 2>&1 || true
  echo "indexing solr docs..."
  for part in /seed/solr-parts/part-*.json; do
    echo "  posting $(basename "$part")"
    if ! curl -sf -m 600 "http://localhost:8983/solr/skos/update" \
         -H 'Content-Type: application/json' --data-binary @"$part" >/dev/null; then
      echo "FATAL: solr rejected $(basename "$part"); not marking seeded"; exit 1
    fi
  done
  curl -sf "http://localhost:8983/solr/skos/update?commit=true" \
       -H 'Content-Type: application/json' --data '[]' >/dev/null

  touch "$SEED_MARKER"
  echo "seeding complete"
else
  echo "already seeded; reusing volume"
fi

# --- Oxigraph (foreground) -------------------------------------------------
# Solr already runs in the background; keep the container alive on Oxigraph.
echo "starting oxigraph SPARQL server on :7878"
exec /usr/local/bin/oxigraph serve-read-only --location "$OX_STORE" --bind 0.0.0.0:7878

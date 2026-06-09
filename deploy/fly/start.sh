#!/bin/bash
# Boot Oxigraph + Solr on one box, seeding the SKOS corpus into the persistent
# volume on first run. Stage markers make retries cheap and partial states
# impossible to mistake for complete ones.
set -euo pipefail

DATA="${SKOSDEX_DATA:-/data}"
OX_STORE="$DATA/oxigraph"
SOLR_HOME="$DATA/solr"
OX_MARKER="$DATA/.oxigraph-loaded-v1"
SEED_MARKER="$DATA/.seeded-v1"

mkdir -p "$OX_STORE" "$SOLR_HOME"

# --- Solr -----------------------------------------------------------------
# SOLR_HOME lives on the volume so the core persists — but a fresh volume is
# EMPTY: no solr.xml, no configsets/, so core CREATE with configSet=_default
# fails (this shipped: every part-post 404'd against a core that never
# existed). Initialize the home from the image's skeleton, once.
if [ ! -f "$SOLR_HOME/solr.xml" ]; then
  echo "initializing solr home from image skeleton"
  cp -r /opt/solr/server/solr/* "$SOLR_HOME/"
fi
export SOLR_HOME
export SOLR_HEAP="${SOLR_HEAP:-2g}"
solr start -force
until curl -sf "http://localhost:8983/solr/admin/info/system" >/dev/null 2>&1; do
  echo "waiting for solr..."; sleep 2
done

# --- Stage 1: Oxigraph bulk load (skipped on retry once loaded) ------------
if [ ! -f "$OX_MARKER" ]; then
  # A store without the marker is unverified leftovers from an interrupted or
  # failed load — wipe it. Loading on top of an existing full store doubles the
  # SST footprint and blew a 25GB volume once ("No space left on device").
  if [ -n "$(ls -A "$OX_STORE" 2>/dev/null)" ]; then
    echo "unmarked oxigraph store found — wiping before fresh load"
    rm -rf "$OX_STORE"; mkdir -p "$OX_STORE"
  fi
  # --lenient: skip-and-log a malformed quad rather than abort 47.7M triples
  # over one bad line. Any reported Error still aborts BEFORE the marker is
  # written — a truncated store must never be stamped loaded. (Shipped once:
  # oxigraph 0.4.11 rejected valid @es-419 language tags at line 2.8M and the
  # script carried on. 0.5.2 parses them; lenient + grep are the backstop.)
  echo "loading bundle into oxigraph..."
  gzip -dc /seed/bundle.nq.gz > /tmp/bundle.nq
  if ! /usr/local/bin/oxigraph load --lenient --location "$OX_STORE" --file /tmp/bundle.nq 2>&1 | tee /tmp/oxload.out; then
    echo "FATAL: oxigraph load exited non-zero; not marking loaded"; exit 1
  fi
  if grep -qi "error" /tmp/oxload.out; then
    echo "FATAL: oxigraph load reported errors; not marking loaded"; exit 1
  fi
  rm -f /tmp/bundle.nq /tmp/oxload.out
  touch "$OX_MARKER"
  echo "oxigraph load complete"
else
  echo "oxigraph store already loaded; skipping"
fi

# --- Stage 2: Solr core + docs (parts of <=50k docs) ------------------------
if [ ! -f "$SEED_MARKER" ]; then
  echo "creating solr core..."
  create=$(curl -s "http://localhost:8983/solr/admin/cores?action=CREATE&name=skos&configSet=_default")
  echo "$create" | grep -q '"status":0' \
    || echo "$create" | grep -qi "already exists" \
    || { echo "FATAL: core create failed: $(echo "$create" | head -c 400)"; exit 1; }

  echo "indexing solr docs..."
  for part in /seed/solr-parts/part-*.json; do
    echo "  posting $(basename "$part")"
    resp=$(curl -s -m 600 "http://localhost:8983/solr/skos/update" \
           -H 'Content-Type: application/json' --data-binary @"$part")
    echo "$resp" | grep -q '"status":0' \
      || { echo "FATAL: solr rejected $(basename "$part"): $(echo "$resp" | head -c 400)"; exit 1; }
  done
  curl -s "http://localhost:8983/solr/skos/update?commit=true" \
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

#!/bin/bash
# Boot Oxigraph + Solr on one box, seeding the SKOS corpus into the persistent
# volume on first run. Stage markers make retries cheap and partial states
# impossible to mistake for complete ones.
set -euo pipefail

DATA="${SKOSDEX_DATA:-/data}"
OX_STORE="$DATA/oxigraph"
SOLR_HOME="$DATA/solr"
OX_MARKER="$DATA/.oxigraph-loaded-v1"
SEED_MARKER="$DATA/.seeded-solr"

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
# 4g (machine has 16 GB): the per-language label subfields enlarged each indexed
# doc and the posted parts, OOM'ing a 2g heap mid-reindex. RocksDB/Oxigraph use
# the OS page cache, not this heap, so 4g leaves ample room.
export SOLR_HEAP="${SOLR_HEAP:-4g}"
solr start -force
until curl -sf "http://localhost:8983/solr/admin/info/system" >/dev/null 2>&1; do
  echo "waiting for solr..."; sleep 2
done

# --- Stage 1: per-scheme incremental Oxigraph loads ---------------------------
# Each /seed/graphed/<slug>.nq.gz carries one scheme in its named graph. A
# content-hash marker per scheme on the volume means: new scheme -> load just
# its quads into the EXISTING store (no volume swap, no full reseed); changed
# scheme -> full rebuild (named-graph surgery isn't worth the complexity yet);
# unchanged -> skip. Legacy monolithic-marker volumes also trigger a rebuild.
CHANGED=0
NEED_WIPE=0
LOADED_BYTES=0   # gzipped bytes loaded this boot — drives the optimize gate
if [ -f "$DATA/.oxigraph-loaded-v1" ]; then
  echo "legacy monolithic store detected — full rebuild"
  NEED_WIPE=1
fi
for f in /seed/graphed/*.nq.gz; do
  slug=$(basename "$f" .nq.gz)
  sum=$(md5sum < "$f" | cut -d' ' -f1)
  marker="$DATA/.loaded-$slug"
  if [ -f "$marker" ] && [ "$(cat "$marker")" != "$sum" ]; then
    echo "scheme $slug changed upstream — full rebuild"
    NEED_WIPE=1
  fi
done
if [ "$NEED_WIPE" = 1 ]; then
  rm -rf "$OX_STORE"; mkdir -p "$OX_STORE"
  rm -f "$DATA"/.loaded-* "$DATA/.oxigraph-loaded-v1" "$DATA/.optimized-v1" "$DATA/.seeded-v1"
fi
for f in /seed/graphed/*.nq.gz; do
  slug=$(basename "$f" .nq.gz)
  sum=$(md5sum < "$f" | cut -d' ' -f1)
  marker="$DATA/.loaded-$slug"
  if [ -f "$marker" ]; then
    echo "scheme $slug already loaded; skipping"
    continue
  fi
  echo "loading scheme $slug (streamed)..."
  if ! gzip -dc "$f" \
     | /usr/local/bin/oxigraph load --lenient --location "$OX_STORE" --format nq 2>&1 \
     | tee /tmp/oxload.out; then
    echo "FATAL: oxigraph load failed for $slug"; exit 1
  fi
  if grep -qi "error" /tmp/oxload.out; then
    echo "FATAL: oxigraph load reported errors for $slug"; exit 1
  fi
  rm -f /tmp/oxload.out
  echo "$sum" > "$marker"
  CHANGED=1
  LOADED_BYTES=$(( LOADED_BYTES + $(stat -c%s "$f") ))
  echo "scheme $slug load complete"
done

# --- Stage 2: Solr core + docs (parts of <=50k docs) ------------------------
# seed_solr posts every part (idempotent upsert by id) into the core. Returns
# non-zero on failure so the caller decides whether that's fatal.
PARTS_SUM=$(cat /seed/solr-parts/part-*.json | md5sum | cut -d" " -f1)
seed_solr() {
  echo "creating solr core..."
  local create
  create=$(curl -s "http://localhost:8983/solr/admin/cores?action=CREATE&name=skos&configSet=_default")
  echo "$create" | grep -q '"status":0' \
    || echo "$create" | grep -qi "already exists" \
    || { echo "ERROR: core create failed: $(echo "$create" | head -c 400)"; return 1; }
  echo "indexing solr docs..."
  local part resp
  for part in /seed/solr-parts/part-*.json; do
    echo "  posting $(basename "$part")"
    resp=$(curl -s -m 600 "http://localhost:8983/solr/skos/update" \
           -H 'Content-Type: application/json' --data-binary @"$part")
    echo "$resp" | grep -q '"status":0' \
      || { echo "ERROR: solr rejected $(basename "$part"): $(echo "$resp" | head -c 400)"; return 1; }
  done
  curl -s "http://localhost:8983/solr/skos/update?commit=true" \
       -H 'Content-Type: application/json' --data '[]' >/dev/null
  echo "$PARTS_SUM" > "$SEED_MARKER"
  echo "solr seeding complete"
}

if [ ! -f "$SEED_MARKER" ]; then
  # First seed on this volume: the core is empty, so block until it's populated
  # (there's nothing to serve otherwise).
  seed_solr || { echo "FATAL: initial solr seed failed"; exit 1; }
elif [ "$(cat "$SEED_MARKER")" != "$PARTS_SUM" ]; then
  if [ "${SEED_AND_EXIT:-0}" = 1 ]; then
    # Cutover staging must finish seeding before it exits.
    seed_solr || { echo "FATAL: staged solr seed failed"; exit 1; }
  else
    # The core already persists on the volume and stays queryable, so re-index
    # the (upsert) parts in the BACKGROUND — search keeps serving the existing
    # docs and converges as parts commit. No search blackout on a data deploy.
    echo "solr parts changed — re-indexing in background (core stays queryable)"
    ( seed_solr || echo "WARN: background solr re-index failed (see logs)" ) \
      >/tmp/solr-seed.log 2>&1 &
  fi
else
  echo "already seeded; reusing volume"
fi

# --- Stage 3: optimize the store (gated on large deltas) --------------------
# A bulk-loaded RocksDB store is uncompacted; `oxigraph optimize` compacts it
# so queries don't pay heavy seek costs. BUT optimize needs exclusive store
# access, so it blocks the server (port 8080 down) for its whole run — and with
# a single machine + immediate deploys, that means the site is offline while it
# runs. To stop every small data change from knocking the site offline, we
# optimize only on a *large delta*: a full rebuild, or once the gzipped bytes
# loaded since the last optimize cross a threshold. Smaller incremental adds
# accumulate (marker on the volume) and ride the next threshold crossing; the
# site comes straight up instead. Force a compaction any time with
# FORCE_OPTIMIZE=1, or tune the threshold with OPTIMIZE_BYTES.
# Cutover staging machines always fully compact the volume they hand to prod.
[ "${SEED_AND_EXIT:-0}" = 1 ] && FORCE_OPTIMIZE=1
PENDING_FILE="$DATA/.pending-optimize-bytes"
OPTIMIZE_BYTES="${OPTIMIZE_BYTES:-20000000}"   # ~20 MB gz (~a few M quads)
if [ "$CHANGED" = 1 ] || [ "${FORCE_OPTIMIZE:-0}" = 1 ]; then
  pending=$(( $(cat "$PENDING_FILE" 2>/dev/null || echo 0) + LOADED_BYTES ))
  if [ "$NEED_WIPE" = 1 ] || [ "${FORCE_OPTIMIZE:-0}" = 1 ] || [ "$pending" -ge "$OPTIMIZE_BYTES" ]; then
    echo "optimizing oxigraph store (pending ${pending}B >= ${OPTIMIZE_BYTES}B, or wipe/forced)..."
    /usr/local/bin/oxigraph optimize --location "$OX_STORE"
    echo "optimize complete"
    echo 0 > "$PENDING_FILE"
  else
    echo "skipping optimize: pending ${pending}B < ${OPTIMIZE_BYTES}B — site comes up now (compacts on the next large delta)"
    echo "$pending" > "$PENDING_FILE"
  fi
fi

# --- Cutover staging: seed+optimize-only, then exit (no serving) -------------
# A temporary "indexer" machine (deploy/fly/cutover.sh) boots this image against
# a FORK of the production volume, seeds the new schemes + optimizes (above),
# then exits. Production is later pointed at that pre-seeded volume and boots
# straight past stages 1-3 (everything already loaded) into serving — so the
# 30-min seed+optimize happens off to the side and prod only pays a ~1-min
# reboot. The Solr core + Oxigraph store both live on the volume, so both are
# ready for prod.
if [ "${SEED_AND_EXIT:-0}" = 1 ]; then
  echo "SEED_AND_EXIT: staged volume is seeded + optimized; shutting down (not serving)."
  solr stop -all >/dev/null 2>&1 || true
  exit 0
fi

# --- nginx front proxy -------------------------------------------------------
# One public port (8080 -> Fly 443): / entrance page, /query + /sparql/ ->
# Oxigraph, /solr/skos/select (GET+POST) -> Solr. Oxigraph + Solr stay local.
echo "starting nginx front proxy on :8080"
nginx

# --- Oxigraph (foreground) -------------------------------------------------
# Solr + nginx run in the background; keep the container alive on Oxigraph.
echo "starting oxigraph SPARQL server on 127.0.0.1:7878"
exec /usr/local/bin/oxigraph serve-read-only --location "$OX_STORE" --bind 127.0.0.1:7878

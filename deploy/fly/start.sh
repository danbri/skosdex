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
# 6g (machine has 16 GB): heavy multilingual schemes (AGROVOC) need headroom to
# index the largest parts without OOM. RocksDB/Oxigraph use the OS page cache, not
# this JVM heap, so 6g still leaves ample room.
export SOLR_HEAP="${SOLR_HEAP:-6g}"
# Raise the open-file limit — Solr warns the default 10240 is too low, and a large
# index with many language subfields opens many segment files; exhausting FDs makes
# the heavy part posts fail (which stalled the reseed at ~76%). Best-effort, capped
# by the container hard limit; SOLR_ULIMIT_CHECKS=false silences the (now-handled) warning.
ulimit -n 65535 2>/dev/null || ulimit -n "$(ulimit -Hn 2>/dev/null || echo 65535)" 2>/dev/null || true
export SOLR_ULIMIT_CHECKS=false
# NOTE: Solr is started + (re)seeded LATER, OFF the boot critical path (see the
# end of this script). The previous version started Solr and *waited* for it here,
# so the slow Solr JVM start + core load gated nginx/Oxigraph and the box was down
# for minutes on every reboot. Now only the cutover indexer (SEED_AND_EXIT) runs
# Solr in the foreground; a serving boot brings it up in the background and comes
# up to serve within seconds.

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
# FAST PATH: /seed/graphed.fp is a build-time fingerprint of the whole graphed set
# (md5 of all per-scheme md5s, baked by the Dockerfile). If it matches the
# last-loaded fingerprint on the volume — and the store exists with no legacy
# marker — then every scheme is already loaded, so skip the ~650-file hash+load
# pass entirely. This is what makes a code/UI redeploy boot in seconds instead of
# minutes (the per-file md5 over ~1.7 GB was the gate before nginx came up).
FP_IMG=$([ -f /seed/graphed.fp ] && cat /seed/graphed.fp || true)
FP_VOL="$DATA/.graphed-fp"
if [ -n "$FP_IMG" ] && [ "$NEED_WIPE" != 1 ] && [ -d "$OX_STORE" ] && [ -f "$FP_VOL" ] && [ "$(<"$FP_VOL")" = "$FP_IMG" ]; then
  echo "oxigraph stage 1: graphed set unchanged (fp ${FP_IMG}) — skipping per-scheme hash + load"
else
  # Pass 1: hash every scheme ONCE (reused below) to detect any changed scheme.
  declare -A SUM
  for f in /seed/graphed/*.nq.gz; do
    slug=${f##*/}; slug=${slug%.nq.gz}
    s=$(md5sum < "$f"); SUM["$slug"]="${s%% *}"
    marker="$DATA/.loaded-$slug"
    if [ -f "$marker" ] && [ "$(<"$marker")" != "${SUM[$slug]}" ]; then
      echo "scheme $slug changed upstream — full rebuild"
      NEED_WIPE=1
    fi
  done
  if [ "$NEED_WIPE" = 1 ]; then
    rm -rf "$OX_STORE"; mkdir -p "$OX_STORE"
    rm -f "$DATA"/.loaded-* "$DATA/.oxigraph-loaded-v1" "$DATA/.optimized-v1" "$DATA/.seeded-v1" "$FP_VOL"
  fi
  # Pass 2: load only schemes without an up-to-date marker (reuse the hashes above).
  loaded=0; skipped=0
  for f in /seed/graphed/*.nq.gz; do
    slug=${f##*/}; slug=${slug%.nq.gz}
    marker="$DATA/.loaded-$slug"
    if [ -f "$marker" ]; then skipped=$((skipped+1)); continue; fi
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
    echo "${SUM[$slug]}" > "$marker"
    CHANGED=1
    LOADED_BYTES=$(( LOADED_BYTES + $(stat -c%s "$f") ))
    loaded=$((loaded+1))
  done
  echo "oxigraph stage 1: $loaded scheme(s) loaded, $skipped already present"
  # Record the fingerprint so the next unchanged boot takes the fast path.
  [ -n "$FP_IMG" ] && printf '%s' "$FP_IMG" > "$FP_VOL"
fi

# --- Stage 2: Solr core + docs (parts of <=50k docs) ------------------------
# seed_solr posts every part (idempotent upsert by id) into the core. Returns
# non-zero on failure so the caller decides whether that's fatal.
# PARTS_SUM (md5 over all ~2.2 GB of parts) is computed inside solr_bringup, NOT
# here — doing it in the foreground would read 2.2 GB and delay the boot.

# Bump to force a one-time clean core rebuild with the typed schema below.
SOLR_SCHEMA_VER="v3-typed-langfields"
SCHEMA_MARKER="$DATA/.solr-schema-$SOLR_SCHEMA_VER"

# Explicit field types. Schemaless Solr INFERS a field's type from its first
# value, which mis-typed per-language subfields (e.g. altLabel_is) and codes
# (notation "10002" vs "ID") as numbers — then rejected entire parts with
# NumberFormatException, silently dropping docs. Define types up front: labels =
# tokenised text, codes/links/langs = strings, and dynamic prefLabel_*/altLabel_*/
# definition_* so EVERY language subfield is text regardless of its first value.
# CRITICAL: the dynamic-field rules must exist BEFORE any doc is posted, and we
# must VERIFY they landed (the core can be briefly not-ready right after CREATE) —
# otherwise schemaless guessing silently wins. Returns non-zero if unverified.
apply_schema() {
  local i
  for i in $(seq 1 20); do
    # dynamic rules first (the actual fix), then explicit field types (best-effort)
    curl -s "http://localhost:8983/solr/skos/schema" -H 'Content-Type: application/json' --data-binary '{
      "add-dynamic-field":[
        {"name":"prefLabel_*","type":"text_general","multiValued":true},
        {"name":"altLabel_*","type":"text_general","multiValued":true},
        {"name":"definition_*","type":"text_general","multiValued":true}
      ]}' >/dev/null 2>&1
    curl -s "http://localhost:8983/solr/skos/schema" -H 'Content-Type: application/json' --data-binary '{
      "add-field":[
        {"name":"prefLabel","type":"text_general","multiValued":true},
        {"name":"altLabel","type":"text_general","multiValued":true},
        {"name":"definition","type":"text_general","multiValued":true},
        {"name":"exactLabel","type":"text_general","multiValued":true},
        {"name":"notation","type":"strings"},{"name":"scheme","type":"strings"},{"name":"lang","type":"strings"},
        {"name":"broader","type":"strings"},{"name":"narrower","type":"strings"},
        {"name":"related","type":"strings"},{"name":"mapping","type":"strings"},
        {"name":"exactMatch","type":"strings"},{"name":"closeMatch","type":"strings"},
        {"name":"broadMatch","type":"strings"},{"name":"narrowMatch","type":"strings"},
        {"name":"relatedMatch","type":"strings"},{"name":"sameAs","type":"strings"},
        {"name":"equivalentClass","type":"strings"},{"name":"equivalentProperty","type":"strings"},
        {"name":"focus","type":"strings"}
      ]}' >/dev/null 2>&1
    if curl -s "http://localhost:8983/solr/skos/schema/dynamicfields" 2>/dev/null | grep -q 'prefLabel_'; then
      echo "  apply_schema: typed per-language fields verified (try $i)"; return 0
    fi
    sleep 3
  done
  echo "  apply_schema: FAILED to verify dynamic fields"; return 1
}

# Wait until Solr's admin endpoint responds. Solr is started inside solr_bringup
# (off the boot critical path), so this is only called from there. ~360s ceiling.
wait_for_solr() {
  local i; for i in $(seq 1 180); do
    curl -sf "http://localhost:8983/solr/admin/info/system" >/dev/null 2>&1 && return 0
    sleep 2
  done; echo "WARN: solr not ready after ~360s"; return 1
}

seed_solr() {
  echo "ensuring solr core + typed schema..."
  local create
  create=$(curl -s "http://localhost:8983/solr/admin/cores?action=CREATE&name=skos&configSet=_default")
  if echo "$create" | grep -q '"status":0' || echo "$create" | grep -qi "already exists"; then
    if [ ! -f "$SCHEMA_MARKER" ]; then
      # Only mark the schema version once the typed fields are VERIFIED present —
      # otherwise leave it unmarked so the next boot re-wipes and retries.
      if apply_schema; then echo "$SOLR_SCHEMA_VER" > "$SCHEMA_MARKER"; else echo "  schema unverified — not marking (re-wipe + retry next boot)"; fi
    fi
  else
    echo "ERROR: core create failed: $(echo "$create" | head -c 400)"; return 1
  fi
  local total; total=$(ls /seed/solr-parts/part-*.json | wc -l)
  echo "indexing solr docs ($total parts)..."
  local part resp failed=0 n=0 ok try
  for part in /seed/solr-parts/part-*.json; do
    n=$((n+1)); ok=0
    # Commit after EVERY part so progress is durable + visible (lang:* climbs as
    # parts land) and a later failure can't lose earlier parts. Retry a part a few
    # times, then SKIP it and continue — one bad/oversized part must not block the
    # whole corpus (that silent abort is what stalled the reindex at ~80k docs).
    for try in 1 2 3; do
      resp=$(curl -s -m 600 "http://localhost:8983/solr/skos/update?commit=true" \
             -H 'Content-Type: application/json' --data-binary @"$part")
      if echo "$resp" | grep -q '"status":0'; then ok=1; break; fi
      echo "  WARN part $n/$total $(basename "$part") try $try rejected: $(echo "$resp" | head -c 300)"
      sleep 5
    done
    if [ "$ok" = 1 ]; then echo "  ok   part $n/$total $(basename "$part")"
    else echo "  FAIL part $n/$total $(basename "$part") after 3 tries"; failed=$((failed+1)); fi
  done
  curl -s "http://localhost:8983/solr/skos/update?commit=true" \
       -H 'Content-Type: application/json' --data '[]' >/dev/null
  if [ "$failed" -eq 0 ]; then echo "$PARTS_SUM" > "$SEED_MARKER"; echo "solr seeding complete ($total parts)"; return 0; fi
  echo "solr seeding finished with $failed/$total failed part(s) — marker NOT written (retries next boot)"; return 1
}

# Full Solr bring-up: start the JVM, wait for it, drop a stale-schema core, then
# (re)seed. A serving boot runs this in the BACKGROUND (caller adds `&`) so it
# never gates nginx/Oxigraph; the cutover indexer (SEED_AND_EXIT) runs it foreground.
solr_bringup() {
  solr start -force
  wait_for_solr || { echo "WARN: solr never came up — skipping seed this boot"; return 1; }
  # md5 over all parts (~2.2 GB) — computed here (background) so it never delays boot.
  PARTS_SUM=$(cat /seed/solr-parts/part-*.json | md5sum | cut -d" " -f1)
  # One-time clean rebuild if the typed-schema version isn't recorded on the volume
  # (a failed reseed leaves a mis-typed core but no seed marker). UNLOAD is harmless
  # if no core exists yet. Must run AFTER Solr is up.
  if [ ! -f "$SCHEMA_MARKER" ]; then
    echo "typed schema $SOLR_SCHEMA_VER not applied — dropping any existing core for a clean rebuild"
    curl -s "http://localhost:8983/solr/admin/cores?action=UNLOAD&core=skos&deleteIndex=true&deleteDataDir=true&deleteInstanceDir=true" >/dev/null 2>&1 || true
    rm -f "$SEED_MARKER"
  fi
  if [ ! -f "$SEED_MARKER" ]; then
    echo "solr core empty — seeding"
    seed_solr || { echo "WARN: solr seed failed"; return 1; }
  elif [ "$(cat "$SEED_MARKER")" != "$PARTS_SUM" ]; then
    echo "solr parts changed — re-indexing (core stays queryable)"
    seed_solr || { echo "WARN: solr re-index failed"; return 1; }
  else
    echo "solr already seeded; reusing volume"
  fi
}

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
  # Cutover indexer: seed Solr in the FOREGROUND (this machine never serves), then
  # exit so the seeded+optimized volume can be handed to prod.
  solr_bringup || { echo "FATAL: staged solr seed failed"; exit 1; }
  echo "SEED_AND_EXIT: staged volume is seeded + optimized; shutting down (not serving)."
  solr stop -all >/dev/null 2>&1 || true
  exit 0
fi

# Serving boot: bring Solr up + (re)seed in the BACKGROUND so nginx + Oxigraph come
# up immediately (health check passes in seconds). Solr search serves the existing
# core meanwhile and converges; output is tee'd to the log + stdout for `fly logs`.
( solr_bringup 2>&1 | tee /tmp/solr-seed.log | sed 's/^/[solr-seed] /' ) &

# --- embeddings APIs (background; non-essential, never gate serving) ---------
# query-embed sidecar (Python, same model as the corpus) powers /api/search text
# search; the node KNN server answers /api/similar etc. and calls the sidecar.
if command -v python3 >/dev/null 2>&1 && [ -f /opt/skosdex/embed_query.py ]; then
  echo "starting query-embed sidecar on 127.0.0.1:8089"
  SKOSDEX_MODEL_DIR=/opt/skosdex/models EMB_QUERY_PORT=8089 \
    python3 /opt/skosdex/embed_query.py > /tmp/embed-query.log 2>&1 &
else
  echo "WARN: python3 or embed_query.py missing — /api/search text search disabled"
fi
# KNN over the combined MiniLM space (_all.emb.*). nginx proxies /api/ -> :8088.
if command -v node >/dev/null 2>&1 && [ -f /opt/skosdex/embed_api.mjs ]; then
  echo "starting embeddings API on 127.0.0.1:8088"
  EMB_DIR=/opt/skosdex/www/embeddings node /opt/skosdex/embed_api.mjs 8088 \
    > /tmp/embed-api.log 2>&1 &
else
  echo "WARN: node or embed_api.mjs missing — /api/ similarity disabled"
fi

# --- nginx front proxy -------------------------------------------------------
# One public port (8080 -> Fly 443): / entrance page, /query + /sparql/ ->
# Oxigraph, /solr/skos/select (GET+POST) -> Solr, /api/ -> embeddings KNN.
echo "starting nginx front proxy on :8080"
nginx

# --- Oxigraph (foreground) -------------------------------------------------
# Solr + nginx run in the background; keep the container alive on Oxigraph.
echo "starting oxigraph SPARQL server on 127.0.0.1:7878"
exec /usr/local/bin/oxigraph serve-read-only --location "$OX_STORE" --bind 127.0.0.1:7878

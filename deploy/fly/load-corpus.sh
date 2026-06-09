#!/bin/bash
# Resumable, paced loader: pushes each scheme's canonical.nq.gz into the live
# Oxigraph store at skosdex.fly.dev over HTTP, one named graph per scheme, in
# chunks small enough to avoid OOM, waiting for the server to stay healthy
# between chunks. Safe to re-run — it reloads graphs, but Oxigraph dedupes.
#
# Usage: deploy/fly/load-corpus.sh [scheme ...]   (default: all bundle:true)
set -uo pipefail
cd "$(dirname "$0")/../.."

BASE="${SKOSDEX_BASE:-https://skosdex.fly.dev}"
CHUNK="${CHUNK:-250000}"        # triples per POST
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

ask() { curl -s -m 20 "$BASE/query?query=ASK%7B%7D" 2>/dev/null | grep -qi true; }
wait_healthy() {
  for _ in $(seq 1 30); do ask && return 0; sleep 5; done
  return 1
}
count() {
  curl -s -m 40 --data-urlencode \
    'query=SELECT (COUNT(*) AS ?n) WHERE { GRAPH ?g { ?s ?p ?o } }' \
    -H 'Accept: text/csv' "$BASE/query" 2>/dev/null | tail -1
}

schemes=("$@")
if [ ${#schemes[@]} -eq 0 ]; then
  schemes=()
  for d in third_party/skos/*/; do
    s=$(basename "$d")
    [ -f "$d/canonical.nq.gz" ] || continue
    grep -q 'skosdex:bundle false' "$d/meta.ttl" && continue
    schemes+=("$s")
  done
fi

echo "target: $BASE  (chunk=$CHUNK triples)"
echo "loading: ${schemes[*]}"

graph_count() {
  curl -s -m 60 --data-urlencode \
    "query=SELECT (COUNT(*) AS ?n) WHERE { GRAPH <$1> { ?s ?p ?o } }" \
    -H 'Accept: text/csv' "$BASE/query" 2>/dev/null | tail -1
}

for s in "${schemes[@]}"; do
  graph=$(grep -oP 'conceptSchemeURI\s+<\K[^>]+' "third_party/skos/$s/meta.ttl")
  enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=''))" "$graph")
  url="$BASE/store?graph=$enc"
  total=$(zcat "third_party/skos/$s/canonical.nq.gz" | wc -l)
  echo "=== $s: $total triples -> <$graph> ==="
  # Idempotent: if the graph already holds >= the expected count, skip. Otherwise
  # CLEAR it first so a resumed/re-run load can't inflate via appended dupes.
  have=$(graph_count "$graph"); have=${have:-0}
  echo "  graph currently has: $have"
  if [ "${have//[^0-9]/}" -ge "$total" ] 2>/dev/null; then
    echo "  already loaded — skipping"; continue
  fi
  if [ "${have//[^0-9]/}" -gt 0 ] 2>/dev/null; then
    echo "  partial/dirty — clearing graph first"
    wait_healthy
    curl -s -m 300 -X POST -H "Content-Type: application/sparql-update" \
      --data "CLEAR GRAPH <$graph>" "$BASE/update" >/dev/null 2>&1 || true
    sleep 5
  fi
  rm -f "$TMP"/part_*
  zcat "third_party/skos/$s/canonical.nq.gz" | split -l "$CHUNK" - "$TMP/part_"
  n=$(ls "$TMP"/part_* | wc -l); i=0
  for p in "$TMP"/part_*; do
    i=$((i+1))
    gzip -c "$p" > "$p.gz"; rm -f "$p"
    ok=0
    for attempt in 1 2 3 4 5; do
      wait_healthy || { echo "  server unhealthy, waiting..."; sleep 20; }
      code=$(curl -s --max-time 200 -o /dev/null -w "%{http_code}" -X POST \
        -H "Content-Type: application/n-triples" -H "Content-Encoding: gzip" \
        --data-binary @"$p.gz" "$url")
      if [ "$code" = "204" ] || [ "$code" = "201" ]; then ok=1; break; fi
      echo "  chunk $i/$n attempt $attempt: HTTP $code — backing off"
      sleep $((attempt * 15))
    done
    rm -f "$p.gz"
    [ "$ok" = 1 ] && echo "  chunk $i/$n: ok" || { echo "  chunk $i/$n: FAILED after retries"; }
    sleep 3   # let RocksDB breathe between chunks
  done
  echo "  total now: $(count)"
done

echo "=== DONE. final count: $(count) ==="

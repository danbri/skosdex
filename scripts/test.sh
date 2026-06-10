#!/bin/bash
# Smoke test: exercises the offline pipeline (bundle -> solr-docs -> demo) from
# the committed gzipped canonical.nq.gz files and checks the outputs. No network.
set -euo pipefail
cd "$(dirname "$0")/.."

fail() { echo "FAIL: $1" >&2; exit 1; }

# git-lfs content must be materialized, or canonical.nq.gz is a pointer file.
canon="third_party/skos/iptc-media-topics/canonical.nq.gz"
if head -c 64 "$canon" | grep -q "git-lfs"; then
  fail "$canon is an unresolved LFS pointer — run 'git lfs pull'"
fi

node scripts/skosdex graphed >/dev/null
node scripts/skosdex solr-docs >/dev/null
node scripts/skosdex demo    >/dev/null

ls dist/graphed/*.nq.gz >/dev/null 2>&1 || fail "dist/graphed/*.nq.gz not produced"
[ -f dist/demo.html ]    || fail "dist/demo.html not produced"

# bundle must be gzip — verify the magic bytes (1f 8b) and that it gunzips.
for g in dist/graphed/*.nq.gz; do gzip -t "$g" || fail "$g failed gzip integrity check"; done

docs=$(node -e 'console.log(require("./dist/solr-docs.json").length)')
[ "$docs" -gt 1000 ] || fail "expected >1000 solr docs, got $docs"

echo "ok: bundle + solr-docs ($docs concepts) + demo built from gzipped LFS artifacts"

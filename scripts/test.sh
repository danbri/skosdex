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

# Count docs by line — solrDocs writes one doc per line, so this streams instead
# of require()-ing the whole array (which overflows V8's ~512MB string limit now
# that per-language label subfields make the full-corpus file multi-GB).
docs=$(grep -c '"id"' dist/solr-docs.json)
[ "$docs" -gt 1000 ] || fail "expected >1000 solr docs, got $docs"

# Per-language fix: every text field's language tag is preserved as a per-language
# subfield (prefLabel_en, ...) plus a distinct-language `lang` facet. Assert both
# survived into the docs so a regression that drops them again is caught here.
grep -q '"lang"' dist/solr-docs.json || fail "no 'lang' facet in solr-docs.json — language metadata dropped"
grep -q '"prefLabel_en"' dist/solr-docs.json || fail "no per-language subfield (prefLabel_en) in solr-docs.json"
# Untagged literals must be bucketed under 'und', not lost to language queries.
grep -q '"prefLabel_und"' dist/solr-docs.json || fail "no 'und' bucket — untagged labels lost from the language view"

echo "ok: bundle + solr-docs ($docs concepts; lang facet + per-language subfields) + demo built from gzipped LFS artifacts"

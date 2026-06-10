#!/usr/bin/env bash
# Fetch the DNB GND Sachbegriff (subject-term) authority dump and transform it
# to SKOS, staging cache/source.nt for `skosdex normalize gnd-subjects`.
#
# The raw dump is typed with the GND ontology (gndo:SubjectHeadingSensoStricto,
# gndo:preferredNameForTheSubjectHeading, ...), not skos:Concept / skos:prefLabel,
# so tools/to-skos.mjs relabels it onto SKOS (semantics-preserving) first.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$DIR/cache"
URL="https://data.dnb.de/opendata/authorities-gnd-sachbegriff_lds.ttl.gz"
mkdir -p "$CACHE"

echo "1/2 download $URL"
curl -fsSL --max-time 600 -A "Mozilla/5.0" "$URL" -o "$CACHE/sachbegriff.ttl.gz"

echo "2/2 transform GND ontology -> SKOS (cache/source.nt)"
node "$DIR/tools/to-skos.mjs"

echo "done: $CACHE/source.nt ($(wc -l < "$CACHE/source.nt") triples)"

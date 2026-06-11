#!/usr/bin/env bash
# Fetch the Nuovo Soggettario (BNCF Thesaurus) SKOS dump and stage it as
# cache/source.nt for `skosdex normalize`.
#
# Why this helper exists: BNCF publishes the whole thesaurus as a single ZIP
# (https://thes.bncf.firenze.sbn.it/dati/NS-SKOS.zip) that contains 14 RDF/XML
# members — one void:Dataset/skos:ConceptScheme header (NS-Thes.xml) plus 13
# partition files (Azioni-*, Cose-*, Agenti-*, Tempo). skosdex's built-in zip
# handling extracts only a single entry, and n3 cannot parse RDF/XML, so this
# script downloads the zip, converts every member to N-Triples with `rapper`
# (raptor2-utils), and concatenates them into cache/source.nt. The meta.ttl
# declares sourceFormat application/n-triples so `skosdex normalize` consumes
# this file directly. Re-run to refresh.
#
# Output: cache/source.nt
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$DIR/cache"
URL="https://thes.bncf.firenze.sbn.it/dati/NS-SKOS.zip"
ZIP="$CACHE/NS-SKOS.zip"
XMLDIR="$CACHE/xml"
OUT="$CACHE/source.nt"
mkdir -p "$CACHE" "$XMLDIR"

echo "1/3 download $URL"
curl -fsSL --max-time 600 "$URL" -o "$ZIP"

echo "2/3 extract RDF/XML members"
unzip -o -q "$ZIP" -d "$XMLDIR"

echo "3/3 rapper rdfxml -> ntriples (per member) -> cache/source.nt"
: > "$OUT"
for f in "$XMLDIR"/*.xml; do
  echo "    rapper $(basename "$f")"
  rapper -q -i rdfxml -o ntriples "$f" >> "$OUT"
done
rm -rf "$XMLDIR" "$ZIP"

echo "done: $OUT ($(wc -l < "$OUT") triples)"

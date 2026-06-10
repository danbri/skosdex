#!/usr/bin/env bash
# Fetch the RAMEAU N-Triples dump from the official data.bnf.fr dump
# distribution and stage it as cache/source.nt for `skosdex normalize`.
#
# Why this helper exists: data.bnf.fr's bulk dumps are served by a
# PrimeFaces/GoDrive JSF app (https://pef.bnf.fr/link/<uuid>) that streams files
# only in response to a stateful form POST (ViewState + the file row's component
# id), then 302-redirects to /link/godrivedownload. There is no stable plain-GET
# URL, so skosdex:sourceURL can't fetch it directly — this script does.
#
# Output: cache/source.nt  (~2.4 GB, the 205 databnf_rameau__skos_*.nt members
# of databnf_rameau_nt.tar.gz, concatenated). Re-run to refresh.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$DIR/cache"
LINK="https://pef.bnf.fr/link/539d6d59-c2e3-4e17-b24c-d8a83ca11944"
UA="Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0"
CJ="$(mktemp)"
PAGE="$(mktemp)"
mkdir -p "$CACHE"

echo "1/4 GET dump-listing page (establish JSF session + ViewState)"
curl -fsSL --max-time 120 -c "$CJ" -b "$CJ" -A "$UA" "$LINK" -o "$PAGE"

# Extract the current ViewState and the row component id for
# databnf_rameau_nt.tar.gz (the full RAMEAU SKOS dump, N-Triples).
VS="$(python3 -c "import re,sys;t=open('$PAGE',encoding='utf-8').read();m=re.search(r'name=\"javax.faces.ViewState\"[^>]*value=\"([^\"]*)\"',t);print(m.group(1) if m else '')")"
RID="$(python3 -c "import re;t=open('$PAGE',encoding='utf-8').read();i=t.find('databnf_rameau_nt.tar.gz');seg=t[max(0,i-800):i];mm=re.findall(r\"addSubmitParam\('fileList',\{'(fileTable:\d+:[a-zA-Z0-9_]+)'\",seg);print(mm[-1] if mm else '')")"
[ -n "$VS" ] && [ -n "$RID" ] || { echo "ERROR: could not locate ViewState / row id (page layout changed?)" >&2; exit 1; }
echo "    ViewState ok, row id = $RID"

echo "2/4 POST download request (non-ajax; follow 302 -> godrivedownload)"
TAR="$CACHE/databnf_rameau_nt.tar.gz"
curl -fsSL --max-time 1800 -c "$CJ" -b "$CJ" -A "$UA" \
  -H "Accept: text/html,application/xhtml+xml" -X POST \
  --data-urlencode "fileList=fileList" \
  --data-urlencode "fileTable_selection=" \
  --data-urlencode "fileList_SUBMIT=1" \
  --data-urlencode "${RID}=${RID}" \
  --data-urlencode "javax.faces.ViewState=${VS}" \
  "https://pef.bnf.fr/webclient/godrive/PublicGoDrive.xhtml" -o "$TAR"

echo "3/4 extract .nt members"
tar xzf "$TAR" -C "$CACHE"

echo "4/4 concatenate -> cache/source.nt"
cat "$CACHE"/databnf_rameau__skos_*.nt > "$CACHE/source.nt"
rm -f "$CACHE"/databnf_rameau__skos_*.nt "$PAGE" "$CJ"

echo "done: $CACHE/source.nt ($(wc -l < "$CACHE/source.nt") triples)"

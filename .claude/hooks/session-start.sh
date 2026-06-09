#!/bin/bash
# SessionStart hook — prepares a Claude Code (web) session to work on skosdex.
#
# skosdex depends on:
#   - Node deps (n3, rdf-canonize)            -> npm install
#   - Git LFS                                 -> stores the gzipped N-Quads
#                                                (*.nq.gz) artifacts; without it,
#                                                third_party/skos/**/canonical.nq.gz
#                                                are just pointer files.
#   - unzip / gzip                            -> decompress upstream SKOS dumps
#                                                (zip/gz) during `skosdex fetch`.
#
# Idempotent and non-interactive: safe to re-run.
set -euo pipefail

# Only auto-provision in the remote (web) environment; locals manage their own.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# 1. Git LFS: install the binary if missing, then init + pull artifact content.
if ! git lfs version >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update -y >/dev/null 2>&1 || apt-get update -y >/dev/null 2>&1 || true
    sudo apt-get install -y git-lfs >/dev/null 2>&1 || apt-get install -y git-lfs >/dev/null 2>&1 || true
  fi
fi
if git lfs version >/dev/null 2>&1; then
  git lfs install --local >/dev/null 2>&1 || true
  # Materialize *.nq.gz content (best-effort; needs network to the LFS store).
  git lfs pull >/dev/null 2>&1 || true
fi

# 2. Decompression tools used by `skosdex fetch` for zipped/gzipped sources.
for tool in unzip gzip; do
  if ! command -v "$tool" >/dev/null 2>&1 && command -v apt-get >/dev/null 2>&1; then
    sudo apt-get install -y "$tool" >/dev/null 2>&1 || apt-get install -y "$tool" >/dev/null 2>&1 || true
  fi
done

# 3. Node dependencies (npm install caches well in the container snapshot).
npm install

echo "skosdex session ready: node deps installed, git-lfs $(git lfs version 2>/dev/null | awk '{print $1}' || echo 'MISSING'), unzip $(command -v unzip >/dev/null && echo ok || echo MISSING)."

#!/usr/bin/env bash
# Zero-downtime cutover for skosdex on Fly.io.
#
# Problem: the single production machine seeds + optimizes the corpus into its
# volume on boot, and can't serve during that ~30-min window — so every data
# deploy is a blackout.
#
# This script moves the seed+optimize OFF the production machine:
#   1. fork the production volume               (instant copy-on-write clone)
#   2. run a temporary "indexer" machine on the new image against the fork,
#      with SEED_AND_EXIT=1 — it loads the new schemes + optimizes, then exits
#      (start.sh handles that mode). Production keeps serving throughout.
#   3. SWAP: stop+destroy prod machine, destroy the old volume, recreate prod
#      from the seeded fork. Prod boots straight past seeding (everything's
#      already loaded+optimized) into serving — a ~1-2 min reboot, not 30 min.
#   4. destroy the temporary indexer machine.
#
# Billing: the temp machine bills only while it runs (~30 min) and the forked
# volume only while it exists — both destroyed after. No ongoing add.
#
# Usage:  FLY_API_TOKEN=... IMAGE=ghcr.io/danbri/skosdex-fly:<sha> \
#         deploy/fly/cutover.sh [--no-swap]
#   --no-swap : do everything EXCEPT the destructive swap (step 3) — seeds the
#               fork and leaves it, for inspection. Use for the first dry run.
set -euo pipefail

APP="${FLY_APP:-skosdex}"
REGION="${FLY_REGION:-iad}"
VM_SIZE="${FLY_VM_SIZE:-performance-4x}"
VOL_NAME="${FLY_VOL_NAME:-skosdex_data}"
IMAGE="${IMAGE:?set IMAGE=ghcr.io/danbri/skosdex-fly:<sha>}"
NO_SWAP=0; [ "${1:-}" = "--no-swap" ] && NO_SWAP=1

say(){ echo -e "\n\033[1m[cutover]\033[0m $*"; }

# --- locate prod machine + its volume ---------------------------------------
PROD_MACHINE=$(flyctl machines list --app "$APP" --json | python3 -c \
  "import sys,json;m=[x for x in json.load(sys.stdin) if x.get('state')=='started'];print(m[0]['id'] if m else '')")
PROD_VOL=$(flyctl volumes list --app "$APP" --json | python3 -c \
  "import sys,json;v=[x for x in json.load(sys.stdin) if x.get('attached_machine_id')];print(v[0]['id'] if v else '')")
[ -n "$PROD_MACHINE" ] && [ -n "$PROD_VOL" ] || { echo "could not find prod machine/volume"; exit 1; }
say "prod machine=$PROD_MACHINE  prod volume=$PROD_VOL  image=$IMAGE"

# --- 1. fork the production volume ------------------------------------------
say "forking production volume…"
STAGE_VOL=$(flyctl volumes fork "$PROD_VOL" --app "$APP" --json | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
say "staged volume=$STAGE_VOL (clone of prod, all existing data)"
cleanup_stage(){ flyctl volumes destroy "$STAGE_VOL" --app "$APP" --yes >/dev/null 2>&1 || true; }

# --- 2. temp indexer machine seeds the fork + optimizes, then exits ----------
# (machine run/status don't support --json on this flyctl; use a fixed --name and
#  read state from `machines list --json`.)
IDX_NAME="skosdex-indexer"
mstate(){ flyctl machines list --app "$APP" --json 2>/dev/null \
  | python3 -c "import sys,json;m=[x for x in json.load(sys.stdin) if x.get('name')=='$IDX_NAME'];print(m[0]['state'] if m else 'none')"; }
mid(){ flyctl machines list --app "$APP" --json 2>/dev/null \
  | python3 -c "import sys,json;m=[x for x in json.load(sys.stdin) if x.get('name')=='$IDX_NAME'];print(m[0]['id'] if m else '')"; }
# clean any stale indexer from a previous run
OLD=$(mid); [ -n "$OLD" ] && flyctl machine destroy "$OLD" --app "$APP" --force >/dev/null 2>&1 || true
say "starting temporary indexer machine '$IDX_NAME' on the staged volume (SEED_AND_EXIT)…"
# NB: a slow image pull (the corpus image is multi-GB) can make `machine run`
# exceed its internal start-wait and return non-zero EVEN WHEN the machine then
# comes up fine. Don't let set -e abort on that — verify the machine exists and
# let the state-poll below be the real gate.
flyctl machine run "$IMAGE" \
  --app "$APP" --name "$IDX_NAME" --region "$REGION" --vm-size "$VM_SIZE" \
  --volume "$STAGE_VOL:/data" --env SEED_AND_EXIT=1 --restart no --detach \
  || say "note: 'machine run' returned non-zero (often just a slow image pull past the start-wait) — verifying the machine came up anyway…"
sleep 10
IDX_MACHINE=$(mid)
[ -n "$IDX_MACHINE" ] || { echo "indexer machine was never created — aborting, prod untouched"; cleanup_stage; exit 1; }
say "indexer machine=$IDX_MACHINE — waiting for it to finish seeding (stopped state)…"
gone=0
for i in $(seq 1 180); do   # up to 90 min
  st=$(mstate)
  echo "  indexer state: $st ($((i*30))s)"
  [ "$st" = "stopped" ] && { say "indexer finished seeding+optimizing the fork."; break; }
  [ "$st" = "failed" ] && { echo "indexer FAILED — aborting, prod untouched"; flyctl machine destroy "$IDX_MACHINE" --app "$APP" --force >/dev/null 2>&1; cleanup_stage; exit 1; }
  # 'none' = machine vanished unexpectedly; tolerate a couple of transient polls
  if [ "$st" = "none" ]; then gone=$((gone+1)); [ "$gone" -ge 3 ] && { echo "indexer disappeared — aborting, prod untouched"; cleanup_stage; exit 1; }; else gone=0; fi
  sleep 30
done

if [ "$NO_SWAP" = 1 ]; then
  say "--no-swap: staged+seeded volume $STAGE_VOL left for inspection. Indexer left stopped ($IDX_MACHINE)."
  exit 0
fi

# --- 3. SWAP (the only downtime: a ~1-2 min prod recreate) -------------------
# Destroy the indexer first so the staged volume is free to attach to prod.
say "destroying indexer machine…"; flyctl machine destroy "$IDX_MACHINE" --app "$APP" --force >/dev/null 2>&1 || true

# CRITICAL: a freshly forked volume keeps its SOURCE (the prod volume) locked
# until Fly finishes copying ("hydrating") it. Destroying the source while the
# fork hydrates fails with "volume is being used for fork" — which once stranded
# prod with no machine. Wait for the fork to leave 'hydrating' first.
vstate(){ flyctl volumes list --app "$APP" --json 2>/dev/null \
  | python3 -c "import sys,json;v=[x for x in json.load(sys.stdin) if x.get('id')=='$STAGE_VOL'];print(v[0]['state'] if v else 'gone')"; }
say "waiting for staged fork to finish hydrating (unlocks the prod volume)…"
for i in $(seq 1 160); do   # up to 40 min (80 GB fork copy)
  st=$(vstate)
  echo "  staged fork state: $st ($((i*15))s)"
  [ "$st" != "hydrating" ] && { say "fork hydrated (state=$st)."; break; }
  sleep 15
done

say "SWAP: pointing production at the pre-seeded volume (brief reboot)…"
flyctl machine destroy "$PROD_MACHINE" --app "$APP" --force
# Best-effort: free the old volume so only the seeded fork remains for deploy to
# attach. If it's still transiently locked, retry — but NEVER abort here, or prod
# stays down. Worst case both volumes survive and we clean the loser up after.
for i in $(seq 1 20); do
  flyctl volumes destroy "$PROD_VOL" --app "$APP" --yes && { say "old volume destroyed."; break; }
  flyctl volumes list --app "$APP" --json | grep -q "$PROD_VOL" || { say "old volume already gone."; break; }
  echo "  old-volume destroy blocked, retry in 15s ($i)"; sleep 15
done
# Recreate prod against the remaining skosdex_data volume (the seeded fork).
flyctl deploy --image "$IMAGE" --config deploy/fly/fly.toml --strategy immediate --app "$APP"

# --- 4. verify ---------------------------------------------------------------
say "verifying endpoint…"
for i in $(seq 1 20); do
  curl -sf -m 10 "https://$APP.fly.dev/query?query=ASK%7B%7D" 2>/dev/null | grep -qi true && { say "LIVE ✅ (cutover complete)"; exit 0; }
  sleep 10
done
echo "endpoint not up yet — check 'flyctl logs'"; exit 1

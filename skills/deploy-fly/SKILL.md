---
name: deploy-fly
description: Use when redeploying the live skosdex stack (skosdex.fly.dev — Oxigraph + Solr + web) on Fly.io, choosing between a direct deploy and the zero-downtime cutover, forcing/monitoring a deploy, or recovering a broken one. The deploy is CI-driven from claude/main.
license: Apache-2.0
---

# Redeploy skosdex (Fly.io)

Production is the Fly.io app **`skosdex`** (https://skosdex.fly.dev) — one machine
running Oxigraph (SPARQL) + Solr + an nginx front proxy, with the corpus on an
80 GB persistent volume (`skosdex_data`). It is deployed by **CI**, never by hand:
`.github/workflows/deploy-fly.yml`. The Fly token lives in the `FLY_API_TOKEN`
GitHub secret — there is no local flyctl access.

## What triggers a deploy

- **Push to `claude/main`** touching `third_party/skos/**/canonical.nq.gz`,
  `scripts/skosdex`, `deploy/fly/**`, or the workflow. So: **land changes on
  `claude/main`** (merge your branch / PR) and CI builds + deploys automatically.
- **Manual**: Actions → "Deploy corpus to fly.io" → Run workflow (or
  `gh workflow run deploy-fly.yml --ref claude/main`).

Two stages: **build-image** bakes the corpus (LFS `canonical.nq.gz` → graphed +
`solr-parts`) into a GHCR image; **deploy** points the app at that image.
First boot seeds the volume via `deploy/fly/start.sh`.

## Direct vs cutover (the important choice)

`start.sh` seeds on boot. Solr re-indexes the parts in the **background** (no
search blackout). The blackout risk is **Oxigraph**: a large load + `oxigraph
optimize` needs exclusive store access and blocks serving for its whole run.

- **DIRECT** — `flyctl deploy` in place. Fine for small/code-only deltas, where
  the optimize-gate skips compaction and the box just reboots (~1–2 min).
- **CUTOVER** — `deploy/fly/cutover.sh`, the zero-downtime "second box": forks the
  prod volume, runs a temporary indexer machine that seeds + optimizes the fork
  while prod keeps serving, then swaps prod onto the pre-seeded volume (~1–2 min
  reboot). Use this for a **large data deploy or a big catch-up** (live volume
  well behind `claude/main`) — otherwise the on-prod load+optimize is a blackout.

### How the mode is chosen

`CUTOVER = ${{ github.event.inputs.cutover || vars.CUTOVER || 'auto' }}`:

| Source | Effect |
|--------|--------|
| `auto` (default) | CUTOVER if the **canonical bytes changed in this push** ≥ `CUTOVER_BYTES` (50 MB gz), else DIRECT |
| workflow_dispatch input `cutover` = `1` \| `0` \| `dry` \| `auto` | overrides for one manual run |
| repo **variable** `CUTOVER` = `1` \| `0` \| `dry` \| `auto` | overrides every run until changed |

⚠️ **`auto` only sizes the current push's delta**, not the gap vs what's live. If
the live volume is far behind `claude/main` (many undeployed schemes), `auto`
under-counts and picks DIRECT → blackout. **Force cutover** in that case.

## Recipes

**Normal small change (code or one small scheme):** merge to `claude/main`; the
auto deploy runs DIRECT. Done.

**Big data deploy / catch-up (force cutover):** because a push to `claude/main`
auto-fires immediately, set the override *before* the push so that run uses it:

```bash
gh variable set CUTOVER --repo danbri/skosdex --body 1   # force cutover for the next run(s)
# ...merge your branch into claude/main (the push deploy now runs cutover)...
gh variable set CUTOVER --repo danbri/skosdex --body auto # reset when it's live
```

Or trigger manually after main is up to date (no repo var needed):

```bash
gh workflow run deploy-fly.yml --ref claude/main -f cutover=1
```

`dry` runs the cutover but skips the destructive swap (seeds a fork for
inspection) — good for a first run on a big new scheme.

## Monitor

```bash
gh run watch                       # the running deploy
gh run list --workflow deploy-fly.yml
```

The cutover logs each phase (`[cutover] …`): fork → indexer seeding (state polls)
→ fork hydrate → swap → verify. The temp indexer + forked volume are destroyed at
the end (they bill only while alive).

## Verify it's live

```bash
E=https://skosdex.fly.dev
curl -s -X POST $E/query -H 'Content-Type: application/sparql-query' --data 'ASK {}'      # {"boolean":true}
curl -s "$E/solr/skos/select?q=*:*&rows=0" | grep -o '"numFound":[0-9]*'                  # ~3.16M
curl -s "$E/solr/skos/select?q=*:*&fq=lang:en&rows=0" | grep -o '"numFound":[0-9]*'       # >0 (language fields live)
npm run check                                                                              # cookbook SPARQL+Solr probes
```

## Recover

If a deploy strands prod (no machine / wedged volume), run the
`recover-fly.yml` workflow. Cutover itself is conservative — it aborts before the
swap if the indexer fails (prod untouched) and waits for the fork to finish
hydrating before destroying the source volume.

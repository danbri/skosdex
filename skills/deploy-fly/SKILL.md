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
  `scripts/skosdex`, `deploy/fly/**`, `tools/embed_api.mjs`,
  `tools/embed_query.py` (both baked into the image), or the workflow. So:
  **land changes on `claude/main`** (merge your branch / PR) and CI builds +
  deploys automatically. ⚠️ A code file baked into the image but *not* in this
  paths list won't trigger a deploy — add it there when you bake something new.
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

## Debugging the live box (you'll need this)

CI only sees the *deploy*; the corpus load + Solr seed happen **on the machine**
(`deploy/fly/start.sh`), and that log is **not** in GitHub Actions. To see it you
need a **Fly token** (`fly tokens create deploy -a skosdex`), then locally:

```bash
export FLY_API_TOKEN='FlyV1 …'
curl -L https://fly.io/install.sh | sh        # if no flyctl
fly logs -a skosdex | grep -E 'solr-seed|oxigraph|Health'   # tail boot + seed
fly machines list -a skosdex                  # STATE + CHECKS (1/1 = healthy)
```

- `start.sh` streams the Solr reindex as `[solr-seed] ok part N/92` / `WARN … rejected: <err>`.
- **`fly ssh console` needs an org/wireguard token** — an app deploy token gives a
  `503` building the tunnel. `fly logs`/`machines` work with the app token.
- The browser/CI route only exposes `/solr/skos/select` (read-only) and
  `/query` — there is **no** way to post to Solr or read `/solr/.../schema` from
  outside; you must be on the box (or read the seed log via `fly logs`).

## Gotchas / lessons learned (the hard way)

- **Solr is schemaless → it GUESSES field types from the first value.** A numeric-
  looking first value (a code like notation `"10002"`, or a label that parses as a
  number) makes the field numeric, then later text values throw
  `NumberFormatException` and Solr rejects the **whole part**. `start.sh` now
  **predefines + verifies** types (labels=text, codes/links/lang=strings, dynamic
  `prefLabel_*`/`altLabel_*`/`definition_*`=text) on a fresh core *before* seeding.
  If you add fields, type them there too. Bump `SOLR_SCHEMA_VER` to force a clean
  rebuild; the seed marker is only written once the types are verified.
- **`numFound` ≈ 2.55M, not the ~3.16M doc-line count.** Solr's unique key is the
  concept IRI, so the same IRI across schemes de-dupes (~615k dupes). "Complete"
  means `unique-ids ≈ original + any new scheme`, not the `solr-docs.json` length.
- **Seeding an empty/wiped core must be BACKGROUND**, or start.sh blocks before
  nginx, the `:8080` health check fails, and Fly takes the site down (and may
  restart-loop). Only `SEED_AND_EXIT` cutover staging seeds in the foreground.
- **Parts are byte-capped (~24 MB)** and Solr runs `SOLR_HEAP=6g` + `ulimit -n
  65535` — heavy multilingual parts (AGROVOC) OOM'd / hit FD limits otherwise.
- **Reindex resilience:** the seed commits per part, retries 3×, and skips a bad
  part rather than aborting the whole corpus (a marker is only written on a fully
  clean pass, so it retries skipped parts next boot).
- **Keep the boot critical path tiny — serve FIRST.** Every deploy reboots the one
  machine, and it can't serve until `start.sh` reaches `exec oxigraph serve`. The
  old script blocked there for *minutes*: it waited for the Solr JVM + core load,
  hashed ~1.7 GB of graphed files, and md5'd ~2.2 GB of parts, all in the
  foreground → a multi-minute blackout on every single deploy. The lesson: nothing
  slow may sit before nginx/oxigraph.

## Boot flow (serve-first — how `start.sh` is ordered)

1. **Stage 1 (oxigraph):** a build-time fingerprint `/seed/graphed.fp` (md5 of all
   per-scheme md5s, baked by the Dockerfile) is compared to the volume's
   `.graphed-fp`. **Match → skip the ~650-file hash+load entirely.** Only a changed
   corpus does the per-scheme hash/load.
2. **Stage 3 (optimize):** gated — skipped unless a large delta / `FORCE_OPTIMIZE`.
3. **`exec oxigraph serve` + `nginx`** come up here → health check (`/query`) passes
   in **seconds**.
4. **Solr is decoupled:** `solr_bringup()` (start JVM, wait, schema wipe-gate,
   `PARTS_SUM`, reseed) runs in the **background** for a serving boot; search serves
   the existing core and converges. It runs **foreground only for `SEED_AND_EXIT`**
   (the cutover indexer, which never serves).

So a code/UI redeploy: first reboot records the fingerprint (one slightly slower
boot, no reseed); every reboot after is **near-instant**. A *data* change (new/changed
`canonical.nq.gz`) invalidates the fingerprint → Stage 1 reloads only the changed
schemes, and Solr reseeds in the background.

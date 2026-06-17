---
name: embed-at-scale
description: Use when (re)building skosdex concept embeddings for many or all schemes at once — a one-off GPU batch box to embed the whole corpus ASAP, or a parallel CI matrix for incremental per-scheme additions. Covers the embed pipeline, where to run it (and why not the prod box), model parity, committing + deploying the vectors with no blackout, and — critically — tearing the GPU box down afterwards so it stops billing.
license: Apache-2.0
---

# Building skosdex embeddings at scale

skosdex embeds every concept's label into one shared multilingual space
(**`intfloat/multilingual-e5-large-instruct`**, 1024-dim, mean-pool + L2, via
`tools/embed_model.py`) for `/api/similar`, `/api/search`, and the `viz.html`
map. The corpus is **~3.16M concepts / 211M quads across ~650 schemes**, so a
full embed is a real batch job. This skill is how to run it big (GPU, one-off)
or incrementally (CI matrix), and how to ship the result safely.

For the *serving* side (the `/api/` service, formats, query sidecar) see the
**`embeddings-api`** skill. This skill is only about **producing** the vectors.

## The pipeline (per scheme, then combine)

Prereq: the scheme is built so `dist/solr-cache/<slug>.ndjson` exists
(`node scripts/skosdex graphed && node scripts/skosdex solr-docs`).

```bash
python3 tools/embed_scheme.py  <slug>   # -> deploy/fly/www/embeddings/<slug>.emb.{json,f16}
python3 tools/layout_scheme.py <slug>   # -> <slug>.layout.json  (UMAP 2D/3D + k-means)
# after all schemes:
node    tools/combine_embeddings.mjs    # -> _all.emb.{json,f16}  (the shared space)
python3 tools/layout_combined.py        # -> _all.layout.json     (overlay map)
```

All four read the shared model from `tools/embed_model.py`. **Model parity is
non-negotiable:** every vector — corpus and query — must come from the *same*
model/pooling or the space is incoherent. Don't mix a GPU-built scheme with a
CPU-built one unless both use this exact model (they will, since they share
`embed_model.py`).

## Where to run it — and the ceiling

| Runtime | Parallelism | Use for | Notes |
|---|---|---|---|
| **Claude sandbox** (here) | 4 cores, **serial** | 1 small scheme | one e5-large job already saturates 4 cores; a 2nd in parallel buys nothing. fp32 CPU ≈ tens of labels/s → 130k ≈ ~1–2 h. |
| **CI matrix** (GitHub Actions) | up to ~20 runners | **incremental** adds | one job per scheme in parallel; each commits its vectors. Free-ish; 6 h/job; re-downloads model unless cached. |
| **GPU batch box** (one-off) | 1 GPU, huge throughput | **the whole corpus ASAP** | e5-large on an A100/L40S ≈ 10–50× CPU; full corpus well under an hour. **Costs $/hr — destroy it after.** |
| **prod fly box** | — | **never** | it's a 4-core machine busy serving; embedding there steals from serving (and we've seen it choke). |

Don't quantize for GPU (run fp32/fp16 on-device); int8 is a CPU-only mitigation.

## A) GPU batch box — embed everything, then TEAR IT DOWN

Goal: a throwaway CUDA box that builds **all** `*.emb.*` + layouts, pushes them,
and is **destroyed the same session**. The vectors are the only durable output.

### 1. Provision (pick one)

- **Fly GPU** (same org/token family we already use). Needs GPU quota in the org
  and an **org/deploy** token (the app-deploy token may not authorize machine
  creation — check `fly orgs list`):
  ```bash
  fly machine run ghcr.io/<owner>/skosdex-embed-gpu:latest \
     --vm-gpu-kind l40s --region ord --app skosdex-embed --rm
  # or a100-40gb / a100-80gb where available; see `fly platform vm-sizes`
  ```
- **Generic cloud GPU** (Lambda/RunPod/Modal/AWS g5/GCP) — any box with a recent
  NVIDIA GPU + CUDA. Provider creds are NOT in this repo; the operator supplies
  them. This is the portable path.

### 2. Set up on the box

```bash
git clone <repo> skosdex && cd skosdex
git lfs install && git lfs pull            # canonical.nq.gz (for graphed/solr-docs)
npm ci
pip install onnxruntime-gpu tokenizers numpy umap-learn scikit-learn
# bake/fetch the model once (embed_model.py auto-fetches if absent):
export SKOSDEX_MODEL_DIR=$HOME/.cache/skosdex-e5
export SKOSDEX_EMB_PROVIDERS=CUDAExecutionProvider   # <- the GPU switch (embed_model.py)
export SKOSDEX_EMB_BATCH=256                          # bigger batches on GPU
node scripts/skosdex graphed && node scripts/skosdex solr-docs   # -> dist/solr-cache/*.ndjson
```

### 3. Embed every scheme + combine

```bash
for nd in dist/solr-cache/*.ndjson; do
  slug=$(basename "$nd" .ndjson)
  python3 tools/embed_scheme.py  "$slug"
  python3 tools/layout_scheme.py "$slug"   # skip for huge schemes you won't render
done
node tools/combine_embeddings.mjs
python3 tools/layout_combined.py            # see "viz at scale" gotcha for >~250k pts
```

### 4. Commit + push the vectors (NO deploy blackout)

`*.emb.f16` are Git LFS (`.gitattributes`); `*.emb.json`/`*.layout.json` are
normal. These live under `deploy/fly/www/` → a push touching **only** those is a
**UI-only** change → the deploy workflow's fast path layers them onto `:latest`
with **no corpus reload** (the 211M-reload blackout is *only* for
`canonical.nq.gz` changes — see the `deploy-fly` skill / issue #6). So embeddings
ship fast and safe:

```bash
git add deploy/fly/www/embeddings/
git commit -m "embeddings: bulk rebuild (all schemes, e5-large)"   # author per repo policy
git push                                   # UI fast path; auto-deploys, no blackout
```

(If you also changed code/canonical, that's not UI-only — deploy via cutover.)

### 5. ⚠️ TEAR DOWN THE GPU BOX — do this every time

A GPU box bills **per second**; forgetting it is the expensive mistake. Destroy
it **immediately** after the push, and **verify**:

```bash
# Fly:
fly machine list  --app skosdex-embed
fly machine destroy <id> --force --app skosdex-embed
fly machine list  --app skosdex-embed        # MUST be empty
fly apps destroy   skosdex-embed --yes       # if it was a throwaway app
# Generic cloud: terminate the instance in the provider console/CLI AND confirm
#   it's gone (stopped != billing-stopped for GPU; destroy, don't just stop).
```

Checklist before you walk away: **(1)** vectors pushed & visible on the remote;
**(2)** GPU machine `destroyed` (not merely `stopped`); **(3)** any throwaway
app/volume/disk removed; **(4)** note the box's wall-clock runtime so the cost is
known. If in doubt, destroy — re-provisioning is cheap, an idle A100 is not.

## B) CI matrix — incremental, parallel per scheme

For adding a few schemes (EuroVoc, AGROVOC, NALT, …) without a GPU box. One
workflow, a matrix over slugs, each job embeds + lays out one scheme and commits
its files; a final job combines. Sketch (`.github/workflows/embed.yml`):

```yaml
on: { workflow_dispatch: { inputs: { slugs: { description: "space-separated slugs" } } } }
jobs:
  embed:
    strategy: { matrix: { slug: ${{ fromJSON(...) }} }, max-parallel: 8 }
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4            # lfs: true (needs canonical for graphed)
      - run: npm ci && git lfs pull
      - uses: actions/cache@v4               # cache ~/.cache/skosdex-e5 (the model)
        with: { path: ~/.cache/skosdex-e5, key: e5-model }
      - run: pip install onnxruntime tokenizers numpy umap-learn scikit-learn
      - run: node scripts/skosdex graphed && node scripts/skosdex solr-docs
      - run: python3 tools/embed_scheme.py  ${{ matrix.slug }}
      - run: python3 tools/layout_scheme.py ${{ matrix.slug }}
      - uses: actions/upload-artifact@v4     # or commit on a branch
        with: { name: emb-${{ matrix.slug }}, path: deploy/fly/www/embeddings/${{ matrix.slug }}.* }
  combine:
    needs: embed
    runs-on: ubuntu-latest
    steps:
      - ... download all artifacts into deploy/fly/www/embeddings/
      - run: node tools/combine_embeddings.mjs && python3 tools/layout_combined.py
      - run: git add deploy/fly/www/embeddings && git commit -m "embeddings: + <slugs>" && git push
```

Notes: cache the model (~2.2 GB) so each job doesn't re-download it; CPU runners
are slow for e5-large, so keep matrix jobs to mid-size schemes (≤ ~100k) or the
6 h limit bites — bigger ones go to the GPU box.

## Deploy + ordering

- Embeddings = **www files** → UI fast path → fast, no reload. Push freely.
- The viz/`/api` pick up new schemes automatically (`index.json` registry +
  `_all` rebuilt). The query sidecar already serves the same model.
- If a re-embed accompanies a **canonical** change, the canonical part must go
  via **cutover** (per `deploy-fly`); the embeddings ride the same image.

## Gotchas

- **Model parity** — corpus and query vectors must share `embed_model.py`'s
  model + pooling + prompt convention. Re-embed *all* schemes when the model
  changes; never mix models in `_all`.
- **Storage** — 1024-dim f16 = 2 KB/concept → full corpus ≈ **6.3 GB** of
  `.emb.f16` (LFS). At that scale move vectors out of the image (object store /
  mounted volume) rather than baking them in; and the API KNN needs ANN
  (hnswlib) past a few hundred-k.
- **viz at scale** — UMAP + a three.js scene choke past ~250k points. For big
  schemes, fit UMAP on a representative sample and `transform()` the rest, cache
  the layout, and serve the viz on curated subsets, not the whole corpus.
- **Don't embed on the prod box**, and **don't forget the GPU teardown** (§A.5).

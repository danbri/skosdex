#!/usr/bin/env python3
# UMAP ensemble for the "wobble mode" honesty view (danbri, 2026-08-21):
# UMAP layouts are locally faithful but globally unreliable — communicate that
# by SHOWING it. Compute N layouts of the same scheme (seed jitter + an
# n_neighbors sweep for scale-dependence), Procrustes-align them (raw UMAP
# output is only defined up to rotation/reflection/translation/scale — without
# alignment an interpolation animation would mostly show that arbitrary rigid
# motion and OVERSTATE instability), and ship the aligned frames so viz.html
# can interpolate among them. What still moves after alignment is genuine
# structural disagreement; what holds still is trustworthy.
#
# Deliberately NOT umap.AlignedUMAP: it constrains runs toward agreement,
# suppressing exactly the signal this view exists to display.
#
# Frame 0 uses the same params as layout_scheme.py (seed 42, nn=15, same
# LAYOUT_MAX sampling seed), so it reproduces the canonical layout.json cloud
# and everything aligns to what the galaxy already shows.
#
# Outputs (per scheme):
#   <slug>.layout-ens.bin   float16 little-endian, shape (frames, n, 3),
#                           each frame mean-centred and scaled to [-1,1]
#   <slug>.layout-ens.json  { frames, n, params: [{seed,nn}…],
#                             stability: [0..1 per concept] }
# stability = mean distance of a point from its own across-frame mean position,
# normalised by the 95th percentile (1 = among the most unstable placements).
import json, sys, os
import numpy as np

ROOT = __file__.rsplit('/tools/', 1)[0]
slug = sys.argv[1] if len(sys.argv) > 1 else 'gemet'
base = f'{ROOT}/deploy/fly/www/embeddings/{slug}'
meta = json.load(open(f'{base}.emb.json'))
n, dim = meta['n'], meta['dim']
V = np.fromfile(f'{base}.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)
LAYOUT_MAX = int(os.environ.get('SKOSDEX_LAYOUT_MAX', '0'))
if LAYOUT_MAX and n > LAYOUT_MAX:   # same sampling as layout_scheme.py (seed 42)
    sel = np.sort(np.random.RandomState(42).choice(n, LAYOUT_MAX, replace=False))
    V = V[sel]; n = LAYOUT_MAX
    print(f'  ens: sampled {LAYOUT_MAX} (same seed-42 sample as layout.json)', flush=True)

# 10 runs: frame 0 = canonical params; seeds jitter stochasticity; the
# n_neighbors sweep shows the local-vs-global scale tradeoff.
NN_DEF = min(15, n - 1)
RUNS = ([{'seed': 42, 'nn': NN_DEF}] +
        [{'seed': s, 'nn': NN_DEF} for s in (1, 2, 3, 4, 5)] +
        [{'seed': 42, 'nn': min(k, n - 1)} for k in (5, 30, 50)] +
        [{'seed': 7, 'nn': NN_DEF}])

import umap
def norm(c):
    c = np.asarray(c, dtype=np.float32)
    c = c - c.mean(0)
    return c / (np.abs(c).max() + 1e-9)

frames = []
for i, p in enumerate(RUNS):
    init = 'random' if n < 60 else 'spectral'
    print(f'  run {i}: seed={p["seed"]} nn={p["nn"]}…', flush=True)
    c = umap.UMAP(n_components=3, n_neighbors=p['nn'], min_dist=0.12,
                  metric='cosine', random_state=p['seed'], init=init).fit_transform(V)
    frames.append(norm(c))

# Orthogonal Procrustes onto frame 0 (rotation + reflection allowed — both are
# part of UMAP's arbitrary symmetry group). Re-normalise after rotating.
ref = frames[0]
for i in range(1, len(frames)):
    M = frames[i].T @ ref
    U, _, Vt = np.linalg.svd(M)
    frames[i] = norm(frames[i] @ (U @ Vt))
F = np.stack(frames)                                   # (N, n, 3)

mean_pos = F.mean(axis=0)                              # (n, 3)
disp = np.linalg.norm(F - mean_pos[None], axis=2).mean(axis=0)   # (n,)
p95 = np.percentile(disp, 95) + 1e-9
stability = np.clip(disp / p95, 0, 1)                  # 0 = rock solid, 1 = noisy

F.astype('<f2').tofile(f'{base}.layout-ens.bin')
json.dump({'frames': len(RUNS), 'n': n, 'params': RUNS,
           'stability': [round(float(x), 3) for x in stability]},
          open(f'{base}.layout-ens.json', 'w'))
kb = os.path.getsize(f'{base}.layout-ens.bin') // 1024
print(f'  wrote {slug}.layout-ens.bin ({kb} KB, {len(RUNS)} frames) + .layout-ens.json; '
      f'median instability {np.median(disp):.3f}, p95 {p95:.3f}', flush=True)

#!/usr/bin/env python3
# Build a 2D + 3D semantic layout of an embedded scheme for the Three.js "galaxy"
# view. Reduces the concept embeddings with UMAP (cosine) to 3D and 2D, clusters
# them with k-means, names each cluster by its most DISTINCTIVE words (tf-idf) or
# — for Name/Place-Authority clusters — a high-level entity CODE (Person, Org,
# Place, City, Country, Event, Period), and assigns a curated colour.
# Output: deploy/fly/www/embeddings/<slug>.layout.json
import json, sys, os, numpy as np
from sklearn.cluster import KMeans

ROOT = __file__.rsplit('/tools/', 1)[0]
slug = sys.argv[1] if len(sys.argv) > 1 else 'gemet'
K = int(sys.argv[2]) if len(sys.argv) > 2 else 16
base = f'{ROOT}/deploy/fly/www/embeddings/{slug}'
meta = json.load(open(f'{base}.emb.json'))
n, dim = meta['n'], meta['dim']
V = np.fromfile(f'{base}.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)
# Giants (lcsh 512k, getty-ulan 402k, …): a full UMAP chokes and the layout.json
# would be ~100MB / unrenderable on a phone. Lay out a representative SAMPLE for
# the galaxy view (the full vectors stay in .emb.f16 for server-side /api KNN).
LAYOUT_MAX = int(os.environ.get('SKOSDEX_LAYOUT_MAX', '0'))
if LAYOUT_MAX and n > LAYOUT_MAX:
    sel = np.sort(np.random.RandomState(42).choice(n, LAYOUT_MAX, replace=False))
    V = V[sel]
    meta['ids'] = [meta['ids'][i] for i in sel]
    if meta.get('labels'): meta['labels'] = [meta['labels'][i] for i in sel]
    n = LAYOUT_MAX
    print(f'  layout: sampled {LAYOUT_MAX} of {meta["n"]} for a renderable giant galaxy', flush=True)
K = max(1, min(K, n))                          # can't have more clusters than concepts

import umap
def _fallback(d):
    # too few points for a meaningful UMAP manifold: PCA (SVD) when we can,
    # else a deterministic spread (circle in xy, line in z) so tiny schemes
    # still render a stable galaxy instead of crashing the whole run.
    if n > d:
        X = V - V.mean(0)
        U, S, _ = np.linalg.svd(X, full_matrices=False)
        return (U[:, :d] * S[:d]).astype(np.float32)
    ang = np.linspace(0, 2 * np.pi, n, endpoint=False)
    c = np.zeros((n, d), dtype=np.float32)
    if d >= 1: c[:, 0] = np.cos(ang)
    if d >= 2: c[:, 1] = np.sin(ang)
    if d >= 3: c[:, 2] = np.linspace(-1, 1, n)
    return c

def reduce(d):
    if n < 10 or n <= d + 1:                    # UMAP is meaningless/unstable here
        c = _fallback(d)
    else:
        nn = min(15, n - 1)
        init = 'random' if n < 60 else 'spectral'   # spectral eigsh fails for small N
        try:
            c = umap.UMAP(n_components=d, n_neighbors=nn, min_dist=0.12, metric='cosine',
                          random_state=42, init=init).fit_transform(V)
        except Exception as e:
            print(f'  umap {d}d failed ({e}); using PCA/fallback', flush=True)
            c = _fallback(d)
    c = np.asarray(c, dtype=np.float32)
    c = c - c.mean(0)
    c = c / (np.abs(c).max() + 1e-9)           # fit into [-1,1]
    return np.round(c, 4)
print('  umap 3d…', flush=True); c3 = reduce(3)
print('  umap 2d…', flush=True); c2 = reduce(2)

# Cluster in the DISPLAY (3D layout) space, not raw embedding space, so the
# colours form clean spatial islands instead of intermixing across the cloud —
# UMAP already preserves semantic neighbourhoods, so the regions stay coherent.
print('  kmeans (on layout)…', flush=True)
km = KMeans(n_clusters=K, n_init=10, random_state=42).fit(c3)
cl = km.labels_

# Type each cluster + concept (entity vs topic) and name each cluster, via the
# shared, config-driven module (tools/entity_types.py + entity_anchors.json).
# Same algorithm/params as the post-embedding re-typer (tools/retype.py), so a
# tweak to the anchors/thresholds applies to fresh layouts and re-typed ones
# alike. Returns codes/names in cl's index order; reordered by size below.
print('  typing + naming (entity vs topic, e5 anchors)…', flush=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import entity_types as et
typed = et.compute(V, cl, meta['labels'], slug=slug)
cluster_types = typed['clusterTypes']
entity_types = typed['entityTypes']
names = typed['clusterNames']
from collections import Counter as _C
print('    cluster codes:', dict(_C(t for t in cluster_types if t)), flush=True)
print('    concept codes:', dict(_C(t for t in entity_types if t).most_common()), flush=True)

# a vivid-on-dark categorical palette (distinct hues, good saturation/lightness)
PALETTE = ['#ff5d73','#ffa24b','#ffd24b','#7bd650','#36c98a','#33c5d6','#3f8cff',
           '#6c6cff','#a96bff','#e96bff','#ff6bb3','#ff8a5c','#b8e04b','#4be0c0',
           '#5ab0ff','#c98aff','#ff9ecb','#9ad14b','#4bd0e0','#8c9bff']
colors = [PALETTE[c % len(PALETTE)] for c in range(K)]
# order clusters by size so the legend reads big->small
order = sorted(range(K), key=lambda c: -int((cl == c).sum()))
remap = {old: new for new, old in enumerate(order)}
cl = np.array([remap[c] for c in cl])
names = [names[o] for o in order]
cluster_types = [cluster_types[o] for o in order]
sizes = [int((cl == c).sum()) for c in range(K)]

out = {
    'slug': slug, 'n': n, 'k': K, 'method': 'umap',
    'ids': meta['ids'], 'labels': meta['labels'],
    'coords3': c3.flatten().tolist(), 'coords2': c2.flatten().tolist(),
    'cluster': cl.tolist(), 'clusterNames': names, 'clusterSizes': sizes,
    'clusterTypes': cluster_types,   # high-level entity code per cluster (or null)
    'entityTypes': entity_types,     # per-concept code (advisory): foaf:focus etc.
    'colors': colors[:K],
}
json.dump(out, open(f'{base}.layout.json', 'w'))
print(f'  wrote {slug}.layout.json ({os.path.getsize(f"{base}.layout.json")//1024} KB) — {K} clusters')
for c in range(K):
    print(f'    {colors[c]}  {sizes[c]:4d}  {names[c]}')

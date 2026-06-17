#!/usr/bin/env python3
# Build a 2D + 3D semantic layout of an embedded scheme for the Three.js "galaxy"
# view. Reduces the concept embeddings with UMAP (cosine) to 3D and 2D, clusters
# them with k-means, names each cluster by its most central concept, and assigns
# a curated colour. Output: deploy/fly/www/embeddings/<slug>.layout.json
import json, sys, numpy as np
from sklearn.cluster import KMeans

ROOT = __file__.rsplit('/tools/', 1)[0]
slug = sys.argv[1] if len(sys.argv) > 1 else 'gemet'
K = int(sys.argv[2]) if len(sys.argv) > 2 else 16
base = f'{ROOT}/deploy/fly/www/embeddings/{slug}'
meta = json.load(open(f'{base}.emb.json'))
n, dim = meta['n'], meta['dim']
V = np.fromfile(f'{base}.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)

import umap
def reduce(d):
    c = umap.UMAP(n_components=d, n_neighbors=15, min_dist=0.12,
                  metric='cosine', random_state=42).fit_transform(V)
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
# Name each cluster by its most DISTINCTIVE words (tf-idf across clusters) so the
# legend reads as themes ("energy · oil · nuclear") instead of one random member
# concept ("Holborn, Paul") — important for entity-heavy schemes like Parliament.
print('  labelling clusters (tf-idf keywords)…', flush=True)
import re
from collections import Counter
STOP = set(("the of and to in a for on with by at as is are be an or from new uk "
            "british national committee commission group ltd plc co inc trust limited "
            "council association society department office service services act bill "
            "amendment lord baron sir dame mr mrs ms dr rt hon and de la el").split())
def toks(s):
    return [w for w in re.findall(r"[a-z][a-z'\-]{2,}", s.lower()) if w not in STOP]
clus_wc, docfreq = [], Counter()
for c in range(K):
    idx = np.where(cl == c)[0]
    wc = Counter()
    for i in idx:
        wc.update(set(toks(meta['labels'][i])))   # presence per label
    clus_wc.append(wc)
    for w in wc:
        docfreq[w] += 1
names = []
for c in range(K):
    idx = np.where(cl == c)[0]
    floor = max(3, len(idx) // 40)                 # ignore one-off words
    scored = [(w, cnt * np.log((K + 1) / docfreq[w])) for w, cnt in clus_wc[c].items() if cnt >= floor]
    scored.sort(key=lambda x: -x[1])
    top = [w.title() for w, _ in scored[:3]]
    # fallback: most central concept if no distinctive words (rare/tiny cluster)
    if not top:
        cen = V[idx].mean(0); cen /= (np.linalg.norm(cen) + 1e-9)
        top = [meta['labels'][idx[int(np.argmax(V[idx] @ cen))]]]
    names.append(' · '.join(top))

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
sizes = [int((cl == c).sum()) for c in range(K)]

out = {
    'slug': slug, 'n': n, 'k': K, 'method': 'umap',
    'ids': meta['ids'], 'labels': meta['labels'],
    'coords3': c3.flatten().tolist(), 'coords2': c2.flatten().tolist(),
    'cluster': cl.tolist(), 'clusterNames': names, 'clusterSizes': sizes,
    'colors': colors[:K],
}
json.dump(out, open(f'{base}.layout.json', 'w'))
import os
print(f'  wrote {slug}.layout.json ({os.path.getsize(f"{base}.layout.json")//1024} KB) — {K} clusters')
for c in range(K):
    print(f'    {colors[c]}  {sizes[c]:4d}  {names[c]}')

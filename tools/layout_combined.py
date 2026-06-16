#!/usr/bin/env python3
# Combined "shared space" layout for the galaxy OVERLAY mode: one UMAP over the
# COMBINED embeddings (_all.emb.*, every scheme's MiniLM vectors together) so the
# schemes sit in ONE comparable frame and you can see whether/where they overlap
# or sit offset. Unlike per-scheme layout_scheme.py (independent UMAPs that can't
# be overlaid), this is a single projection; points are coloured BY SOURCE SCHEME
# (not by k-means theme), and the per-row scheme is kept so the viewer can filter
# which schemes are shown. Output: deploy/fly/www/embeddings/_all.layout.json
import json, sys, numpy as np
ROOT = __file__.rsplit('/tools/', 1)[0]
base = f'{ROOT}/deploy/fly/www/embeddings/_all'
meta = json.load(open(f'{base}.emb.json'))
n, dim = meta['n'], meta['dim']
V = np.fromfile(f'{base}.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)

import umap
def reduce(d):
    c = umap.UMAP(n_components=d, n_neighbors=15, min_dist=0.12,
                  metric='cosine', random_state=42).fit_transform(V)
    c = c - c.mean(0)
    c = c / (np.abs(c).max() + 1e-9)        # fit into [-1,1], same as per-scheme
    return np.round(c, 4)
print('  combined umap 3d…', flush=True); c3 = reduce(3)
print('  combined umap 2d…', flush=True); c2 = reduce(2)

# colour groups = source schemes (in the combined blob's declared order)
schemes = meta['scheme']                    # per-row source slug
order = list(meta['schemes'].keys())        # esco, gemet, uk-parliament-thesaurus
idx = {s: i for i, s in enumerate(order)}
cluster = [idx[s] for s in schemes]
# a distinct, vivid hue per scheme
PALETTE = ['#36c98a', '#3f8cff', '#ff8a5c', '#e96bff', '#ffd24b', '#ff5d73',
           '#7bd650', '#33c5d6', '#a96bff', '#ff6bb3']
colors = [PALETTE[i % len(PALETTE)] for i in range(len(order))]
sizes = [meta['schemes'][s]['count'] for s in order]

out = {
    'slug': '_all', 'n': n, 'k': len(order), 'method': 'umap-combined',
    'ids': meta['ids'], 'labels': meta['labels'],
    'coords3': c3.flatten().tolist(), 'coords2': c2.flatten().tolist(),
    'cluster': cluster, 'clusterNames': order, 'clusterSizes': sizes,
    'colors': colors[:len(order)],
    'scheme': schemes,                       # per-row slug — lets the viewer filter
}
json.dump(out, open(f'{base}.layout.json', 'w'))
import os
print(f'  wrote _all.layout.json ({os.path.getsize(f"{base}.layout.json")//1024} KB) — {n} pts, {len(order)} schemes')
for i, s in enumerate(order): print(f'    {colors[i]}  {sizes[i]:6d}  {s}')

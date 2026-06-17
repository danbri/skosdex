#!/usr/bin/env python3
# Re-derive entity/topic type codes + legend names for one or all EXISTING
# layouts, using the current params in tools/entity_anchors.json — WITHOUT
# re-embedding and WITHOUT re-running UMAP. This is the post-embedding tuning
# loop: edit entity_anchors.json (by hand or with an AI in the loop), run this,
# eyeball the legend, repeat. Reuses each layout's saved cluster assignments and
# vectors, and overwrites only the type/name fields:
#     clusterTypes  (per cluster, high-level code or null)
#     entityTypes   (per concept, advisory code or null)
#     clusterNames  (legend, re-labelled with codes + tf-idf keywords)
#
# Usage:
#   python3 tools/retype.py <slug> [<slug> …]   # specific schemes
#   python3 tools/retype.py --all               # every <slug>.layout.json (skips _all)
import os, sys, json
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import entity_types as et

ROOT = os.path.dirname(HERE)
EMB = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')


def retype(slug, cfg):
    lp = os.path.join(EMB, f'{slug}.layout.json')
    ep = os.path.join(EMB, f'{slug}.emb.json')
    fp = os.path.join(EMB, f'{slug}.emb.f16')
    if not (os.path.exists(lp) and os.path.exists(fp)):
        print(f'  {slug}: skip (missing layout or emb)'); return
    d = json.load(open(lp))
    if d.get('method') == 'umap-combined':
        # combined overlay clusters are SOURCE SCHEMES, not themes — only the
        # per-concept entityTypes are meaningful here (no cluster codes/names).
        meta = json.load(open(ep)); n, dim = meta['n'], meta['dim']
        V = np.fromfile(fp, dtype='<f2').astype(np.float32).reshape(n, dim)
        cl = np.zeros(n, dtype=int)
        res = et.compute(V, cl, d['labels'], cfg=cfg)
        d['entityTypes'] = res['entityTypes']
        json.dump(d, open(lp, 'w'))
        from collections import Counter
        print(f'  {slug}: entityTypes only (combined) — {dict(Counter(t for t in d["entityTypes"] if t).most_common())}')
        return
    meta = json.load(open(ep)); n, dim = meta['n'], meta['dim']
    V = np.fromfile(fp, dtype='<f2').astype(np.float32).reshape(n, dim)
    cl = np.array(d['cluster'])
    res = et.compute(V, cl, d['labels'], cfg=cfg)
    d['clusterTypes'] = res['clusterTypes']
    d['entityTypes'] = res['entityTypes']
    d['clusterNames'] = res['clusterNames']
    json.dump(d, open(lp, 'w'))
    coded = sum(t is not None for t in res['entityTypes'])
    print(f'  {slug}: {n} concepts, {coded} typed ({100*coded//max(n,1)}%); '
          f'cluster codes: {[t for t in res["clusterTypes"] if t]}')
    for c, nm in enumerate(d['clusterNames']):
        print(f'      {d["clusterSizes"][c]:6d}  {nm}')


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit('usage: retype.py <slug> [<slug> …] | --all')
    if args == ['--all']:
        slugs = sorted(os.path.basename(p)[:-len('.layout.json')]
                       for p in __import__('glob').glob(f'{EMB}/*.layout.json'))
    else:
        slugs = args
    cfg = et.load_cfg()  # base cfg; retype() re-merges per-scheme override below
    for slug in slugs:
        retype(slug, et.load_cfg(slug))


if __name__ == '__main__':
    main()

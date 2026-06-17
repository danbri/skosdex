#!/usr/bin/env python3
# Precompute embedding similarity as STATIC artifacts, so the live box never has
# to hold _all vectors in RAM for /api/similar. Reads the combined space
# (_all.emb.{json,f16}) and, per concept, finds the top-K nearest overall and the
# top-K nearest in OTHER schemes (cross-vocabulary analogues). Two outputs:
#
#   1) deploy/fly/www/embeddings/similar/<slug>.json   — per scheme:
#        { "<conceptIRI>": { "sim": [["<iri>", score], …],   # top-K overall
#                            "x":   [["<iri>", score], …] } } # top-K cross-scheme
#      Served statically; the API just looks up by id (no KNN, no vectors in RAM).
#
#   2) deploy/fly/www/embeddings/similar.nq.gz         — a named graph of the same
#      edges for the KG layer (load into Oxigraph; query with SPARQL):
#        <A> skosdex:similarTo       <B> <graph> .   # top-K overall neighbour
#        <A> skosdex:crossSchemeMatch <B> <graph> .  # top-K cross-scheme analogue
#      (scores live in the JSON; the graph carries the ranked edge set.)
#
# Cosine == dot product (vectors are L2-normalised). Brute force is fine at the
# current scale; past a few hundred-k, swap the inner matmul for an ANN index.
import os, json, gzip, time, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMB = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')
SK = 'https://danbri.org/ns/skosdex#'
GRAPH = 'https://danbri.org/ns/skosdex#embedding-similarity'
KW = int(os.environ.get('SIM_K', '15'))     # top-K overall
KX = int(os.environ.get('SIM_KX', '10'))    # top-K cross-scheme
BATCH = int(os.environ.get('SIM_BATCH', '512'))

meta = json.load(open(f'{EMB}/_all.emb.json'))
n, dim, ids, scheme = meta['n'], meta['dim'], meta['ids'], meta['scheme']
V = np.fromfile(f'{EMB}/_all.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)
schemes = sorted(set(scheme))
sidx = np.array([schemes.index(s) for s in scheme])
print(f'{n} concepts, {len(schemes)} schemes, dim {dim}; K={KW} Kx={KX}', flush=True)

per_scheme = {s: {} for s in schemes}
os.makedirs(f'{EMB}/similar', exist_ok=True)
gz = gzip.open(f'{EMB}/similar.nq.gz', 'wt')
nq = 0
t0 = time.time()
for s0 in range(0, n, BATCH):
    s1 = min(s0 + BATCH, n)
    S = V[s0:s1] @ V.T                              # (b, n) cosine
    for r in range(s1 - s0):
        i = s0 + r
        row = S[r]; row[i] = -2.0                   # exclude self
        top = np.argpartition(-row, KW)[:KW]
        top = top[np.argsort(-row[top])]
        sim = [[ids[j], round(float(row[j]), 4)] for j in top]
        rc = np.where(sidx != sidx[i], row, -2.0)   # mask same-scheme
        kx = min(KX, int((sidx != sidx[i]).sum()))
        x = []
        if kx > 0:
            tx = np.argpartition(-rc, kx - 1)[:kx]
            tx = tx[np.argsort(-rc[tx])]
            x = [[ids[j], round(float(rc[j]), 4)] for j in tx]
        a = ids[i]
        per_scheme[scheme[i]][a] = {'sim': sim, 'x': x}
        for j, _ in sim:
            gz.write(f'<{a}> <{SK}similarTo> <{j}> <{GRAPH}> .\n'); nq += 1
        for j, _ in x:
            gz.write(f'<{a}> <{SK}crossSchemeMatch> <{j}> <{GRAPH}> .\n'); nq += 1
    if s0 % (BATCH * 40) == 0:
        print(f'  {s1}/{n} ({time.time()-t0:.0f}s)', flush=True)
gz.close()

for s, d in per_scheme.items():
    p = f'{EMB}/similar/{s}.json'
    json.dump(d, open(p, 'w'))
    print(f'  wrote similar/{s}.json: {len(d)} concepts, {os.path.getsize(p)//1024} KB')
print(f'wrote similar.nq.gz: {nq} quads, {os.path.getsize(f"{EMB}/similar.nq.gz")//1024} KB, {time.time()-t0:.0f}s total', flush=True)

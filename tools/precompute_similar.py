#!/usr/bin/env python3
# Precompute embedding similarity as STATIC artifacts — the "route 1" design
# (2026-08-21, supersedes the 2026-07 flat-top-K version whose rollout stalled
# at 3 schemes):
#
#   * CROSS-SCHEME ONLY in the RDF layer: same-scheme similarity already lives
#     in SKOS structure + the in-browser per-scheme KNN; a fixed global top-K
#     lets a rich scheme's own siblings crowd out every slot (the serendipity
#     killer). The KG layer is reserved for cross-vocabulary hops.
#   * STRATIFIED top-K per TARGET SCHEME (SIM_KX per other scheme), gated by an
#     absolute cosine floor SIM_TAU — every vocabulary pair gets a fair chance
#     at a connection; junk edges to unrelated schemes are pruned.
#   * CSLS hub correction (Conneau et al.): rank by 2*cos - r(a) - r(b) where
#     r(x) = mean cosine of x's SIM_CSLS_R nearest pool neighbours. Demotes
#     promiscuous hub concepts that would otherwise appear in everyone's top-K.
#   * RDF-star scores: edges carry raw cosine so SPARQL decides cutoffs at
#     query time; per-row top-N via LATERAL (supported by our Oxigraph):
#       ?c ... LATERAL { SELECT ?b ?s WHERE {
#         GRAPH <...#embedding-similarity> {
#           ?c skosdex:crossSchemeMatch ?b .
#           << ?c skosdex:crossSchemeMatch ?b >> skosdex:score ?s } }
#         ORDER BY DESC(?s) LIMIT 3 }
#
# Outputs:
#   1) deploy/fly/www/embeddings/similar/<slug>.json — per scheme:
#        { "<iri>": { "sim": [["<iri>", cos], ...],          # top-K overall
#                     "x":   [["<iri>", cos, "<scheme>"], ...] } }  # stratified cross
#      Static lookup for the concept-card fallback and /api-less consumers.
#   2) deploy/fly/www/embeddings/similar.nq.gz — the KG layer (loaded into
#      Oxigraph by start.sh as its own named graph):
#        <A> skosdex:crossSchemeMatch <B> <G> .
#        << <A> skosdex:crossSchemeMatch <B> >> skosdex:score "0.83"^^xsd:decimal <G> .
#
# Pool = the curated _all space, plus EXTRA_SLUGS (space-separated scheme slugs
# whose per-scheme .emb.{json,f16} are appended — the way new schemes like stw
# join the cross-vocabulary layer without waiting for an _all re-curation).
#
# Cosine == dot (vectors L2-normalised). Two brute-force passes (CSLS radii,
# then stratified top-K); fine at ~250k, swap for ANN past ~1M.
import os, json, gzip, time, sys
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMB = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')
SK = 'https://danbri.org/ns/skosdex#'
GRAPH = 'https://danbri.org/ns/skosdex#embedding-similarity'
XSD_DEC = 'http://www.w3.org/2001/XMLSchema#decimal'
KW = int(os.environ.get('SIM_K', '15'))          # top-K overall (JSON only)
KX = int(os.environ.get('SIM_KX', '3'))          # top-K per OTHER scheme
TAU = float(os.environ.get('SIM_TAU', '0.75'))   # absolute cosine floor for cross edges
CSLS_R = int(os.environ.get('SIM_CSLS_R', '10')) # neighbourhood radius for hub penalty
BATCH = int(os.environ.get('SIM_BATCH', '512'))
EXTRA = os.environ.get('EXTRA_SLUGS', '').split()

meta = json.load(open(f'{EMB}/_all.emb.json'))
n, dim, ids, scheme = meta['n'], meta['dim'], list(meta['ids']), list(meta['scheme'])
V = np.fromfile(f'{EMB}/_all.emb.f16', dtype='<f2').astype(np.float32).reshape(n, dim)
for slug in EXTRA:
    m = json.load(open(f'{EMB}/{slug}.emb.json'))
    ex_n = m['n'] if 'n' in m else len(m['ids'])
    Vx = np.fromfile(f'{EMB}/{slug}.emb.f16', dtype='<f2').astype(np.float32).reshape(ex_n, m['dim'])
    assert m['dim'] == dim, f'{slug}: dim {m["dim"]} != {dim}'
    V = np.vstack([V, Vx]); ids += list(m['ids']); scheme += [slug] * ex_n; n += ex_n
    print(f'pool += {slug}: {ex_n} vectors', flush=True)
schemes = sorted(set(scheme))
smap = {s: k for k, s in enumerate(schemes)}
sidx = np.array([smap[s] for s in scheme])
print(f'{n} concepts, {len(schemes)} schemes, dim {dim}; K={KW} Kx={KX}/scheme tau={TAU} cslsR={CSLS_R}', flush=True)

# Pass 1: CSLS radii r(x) = mean cosine of top-CSLS_R pool neighbours (global,
# same-scheme included — hubness is a property of the space, not the scheme).
r = np.zeros(n, dtype=np.float32)
t0 = time.time()
for s0 in range(0, n, BATCH):
    s1 = min(s0 + BATCH, n)
    S = V[s0:s1] @ V.T
    for i in range(s1 - s0):
        S[i, s0 + i] = -2.0
    part = -np.partition(-S, CSLS_R, axis=1)[:, :CSLS_R]
    r[s0:s1] = part.mean(axis=1)
    if s0 % (BATCH * 40) == 0:
        print(f'  pass1 {s1}/{n} ({time.time()-t0:.0f}s)', flush=True)
print(f'pass1 done ({time.time()-t0:.0f}s); mean r={r.mean():.3f}', flush=True)

# Pass 2: per concept — overall top-K (JSON), stratified per-scheme cross top-K
# ranked by CSLS, floored at TAU on RAW cosine (scores stay interpretable).
per_scheme = {s: {} for s in schemes}
os.makedirs(f'{EMB}/similar', exist_ok=True)
gz = gzip.open(f'{EMB}/similar.nq.gz', 'wt')
nq = edges = 0
t0 = time.time()
for s0 in range(0, n, BATCH):
    s1 = min(s0 + BATCH, n)
    S = V[s0:s1] @ V.T
    for row_i in range(s1 - s0):
        i = s0 + row_i
        row = S[row_i]; row[i] = -2.0
        top = np.argpartition(-row, KW)[:KW]
        top = top[np.argsort(-row[top])]
        sim = [[ids[j], round(float(row[j]), 4)] for j in top]
        csls = 2.0 * row - r[i] - r          # rank by hub-corrected score
        x = []
        a = ids[i]
        for tgt in range(len(schemes)):
            if tgt == sidx[i]:
                continue
            mask = (sidx == tgt) & (row >= TAU)
            cnt = int(mask.sum())
            if cnt == 0:
                continue
            cand = np.where(mask)[0]
            k = min(KX, cnt)
            pick = cand[np.argpartition(-csls[cand], k - 1)[:k]]
            pick = pick[np.argsort(-csls[pick])]
            for j in pick:
                x.append([ids[j], round(float(row[j]), 4), schemes[tgt]])
                b = ids[j]; sc = f'{row[j]:.4f}'
                gz.write(f'<{a}> <{SK}crossSchemeMatch> <{b}> <{GRAPH}> .\n')
                gz.write(f'<< <{a}> <{SK}crossSchemeMatch> <{b}> >> <{SK}score> "{sc}"^^<{XSD_DEC}> <{GRAPH}> .\n')
                nq += 2; edges += 1
        x.sort(key=lambda e: -e[1])
        per_scheme[scheme[i]][a] = {'sim': sim, 'x': x}
    if s0 % (BATCH * 40) == 0:
        print(f'  pass2 {s1}/{n} ({time.time()-t0:.0f}s, {edges} edges)', flush=True)
gz.close()

for s, d in per_scheme.items():
    p = f'{EMB}/similar/{s}.json'
    json.dump(d, open(p, 'w'))
    print(f'  wrote similar/{s}.json: {len(d)} concepts, {os.path.getsize(p)//1024} KB')
print(f'wrote similar.nq.gz: {edges} cross-scheme edges, {nq} quads, '
      f'{os.path.getsize(f"{EMB}/similar.nq.gz")//1024} KB, {time.time()-t0:.0f}s', flush=True)

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

# --- entity vs topic typing (zero-shot, via the SAME e5 model) --------------
# Controlled vocabularies mix true SUBJECT/topical concepts with Name & Place
# Authority entries that merely STAND FOR an individual thing — a person, place,
# city, country, organisation, event or period. We tag each cluster (and each
# concept) by cosine to a few natural-language TYPE ANCHORS embedded with the
# same model, de-biased by each anchor's average similarity over the scheme.
# Person/Org separate cleanly so they're coded on a small margin; geographic /
# event / period codes need a much wider margin (so a medical-TOPIC cluster is
# never mislabelled "Place"); everything else stays a topic ("let topics be
# topics"). Purely semantic — no character-level clues, so it works across
# languages/scripts. These high-level codes are candidates for foaf:focus,
# Wikidata alignment, map/timeline views, dedicated aggregations, or filtering.
print('  typing (entity vs topic, e5 anchors)…', flush=True)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import embed_model as em
TYPE_ANCHORS = {
    'Person':  'a person; an individual human being; a personal name of someone',
    'Org':     'an organisation, company, institution, agency, committee or political party',
    'Place':   'a place or geographic feature: a region, area, sea, river or territory',
    'City':    'a named city, town or settlement',
    'Country': 'a country, nation or sovereign state',
    'Event':   'a named event: a war, battle, conference, disaster or historical occurrence',
    'Period':  'a span of time: a year, date, decade, century or historical era',
}
TOPIC_ANCHOR = 'a general subject, topic, theme, policy area or abstract concept'
RELIABLE = {'Person', 'Org'}                  # separate cleanly -> small margin ok
GAP_T = {True: 0.010, False: 0.035}           # winner over 'topic'   (reliable / strict)
GAP_2 = {True: 0.008, False: 0.018}           # winner over 2nd type  (reliable / strict)
tkeys = list(TYPE_ANCHORS); tcodes = tkeys + ['Topic']; TI = len(tkeys)
A = em.embed([TYPE_ANCHORS[k] for k in tkeys] + [TOPIC_ANCHOR], is_query=False)
rng = np.random.RandomState(0)
off = (V[rng.choice(n, min(8000, n), replace=False)] @ A.T).mean(0)   # de-bias anchors
rel_mask = np.array([c in RELIABLE for c in tcodes])

def _accept(win, second, s):
    if win == TI:
        return None
    rel = bool(rel_mask[win])
    if (s[win] - s[TI]) >= GAP_T[rel] and (s[win] - s[second]) >= GAP_2[rel]:
        return tcodes[win]
    return None

# per-CLUSTER code (robust: centroids cancel per-concept noise)
cluster_types = []
for c in range(K):
    idx = np.where(cl == c)[0]
    cen = V[idx].mean(0); cen /= (np.linalg.norm(cen) + 1e-9)
    s = cen @ A.T - off; o = np.argsort(-s)
    cluster_types.append(_accept(o[0], o[1], s))
# per-CONCEPT code (advisory: candidates for foaf:focus / Wikidata / map+timeline)
Sc = V @ A.T - off
csort = np.argsort(-Sc, axis=1)
ar = np.arange(n)
win = csort[:, 0]; sec = csort[:, 1]
rel = rel_mask[win]
g_t = Sc[ar, win] - Sc[:, TI]
g_2 = Sc[ar, win] - Sc[ar, sec]
ok = (win != TI) & (g_t >= np.where(rel, GAP_T[True], GAP_T[False])) \
                  & (g_2 >= np.where(rel, GAP_2[True], GAP_2[False]))
entity_types = [tcodes[win[i]] if ok[i] else None for i in range(n)]
from collections import Counter as _C
print('    cluster codes:', dict(_C(t for t in cluster_types if t)), flush=True)
print('    concept codes:', dict(_C(t for t in entity_types if t).most_common()), flush=True)
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
    label = ' · '.join(top)
    # prefix a high-level entity CODE for Name/Place-Authority clusters, keeping
    # the keywords so the legend reads e.g. "PERSON · john · david · michael".
    if cluster_types[c]:
        label = cluster_types[c].upper() + (' · ' + label if label else '')
    names.append(label)

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

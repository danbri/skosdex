#!/usr/bin/env python3
# Entity-vs-topic typing for skosdex layouts — the canonical, reusable implementation.
#
# Controlled vocabularies mix true SUBJECT/topical concepts with Name & Place
# Authority entries that merely STAND FOR an individual thing — a person, place,
# city, country, organisation, event or period. We tag each cluster (and each
# concept) by cosine to a few natural-language TYPE ANCHORS embedded with the
# SAME e5 model, de-biased by each anchor's average similarity over the scheme.
# Person/Org separate cleanly so they're coded on a small margin; geographic /
# event / period codes need a much wider margin (so a medical-TOPIC cluster is
# never mislabelled "Place"); everything else stays a topic ("let topics be
# topics"). Purely semantic — no character-level clues, so it works across
# languages/scripts. These high-level codes are candidates for foaf:focus,
# Wikidata alignment, map/timeline views, dedicated aggregations, or filtering.
#
# Crucially, this is DECOUPLED from the (expensive) embedding step: it only needs
# the already-computed vectors + cluster assignments, so params (tools/
# entity_anchors.json) can be re-tuned post-embedding via `tools/retype.py`
# without re-embedding or re-running UMAP. Both layout_scheme.py (fresh layouts)
# and retype.py (re-tuning existing ones) call compute() here, so there is ONE
# source of truth for the algorithm and the params.
import os, json, re
import numpy as np
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
CFG_PATH = os.environ.get('SKOSDEX_ENTITY_CFG', os.path.join(HERE, 'entity_anchors.json'))


def load_cfg(slug=None):
    """Load anchor/threshold params, shallow-merging any per-scheme override."""
    cfg = json.load(open(CFG_PATH))
    ov = cfg.get('overrides', {}).get(slug) if slug else None
    if ov:
        anchors = {**cfg['anchors'], **ov.get('anchors', {})}
        cfg = {**cfg, **{k: v for k, v in ov.items() if k != 'anchors'}, 'anchors': anchors}
    return cfg


def _topic_anchors(cfg):
    """Topic = the NON-coding bucket. Several decoy phrases (chemical substance,
    organism/species, device, process, …) give the model better-matching targets
    than the entity anchors, so non-entities (e.g. chemistry terms) don't fall to
    'Person' for lack of anywhere better. A concept/cluster is 'topic' iff its
    best ENTITY anchor doesn't beat the best of these by the margin."""
    t = cfg['topic']
    return t if isinstance(t, list) else [t]


def _anchors(cfg):
    import sys
    sys.path.insert(0, HERE)
    import embed_model as em
    keys = list(cfg['anchors'])                       # coding anchors (Person, Org, …)
    topics = _topic_anchors(cfg)                      # non-coding decoy anchors
    A = em.embed([cfg['anchors'][k] for k in keys] + topics, is_query=False)
    return A, keys, len(keys)                         # nC coding columns, then topics


def keyword_names(labels, cl, K, cluster_types, cfg, V):
    """Per-cluster legend names: most DISTINCTIVE words (tf-idf), prefixed with a
    high-level entity CODE for Name/Place-Authority clusters. cl indexes 0..K-1."""
    STOP = set(cfg['stopwords'].split())
    def toks(s):
        return [w for w in re.findall(r"[a-z][a-z'\-]{2,}", s.lower()) if w not in STOP]
    clus_wc, docfreq = [], Counter()
    for c in range(K):
        wc = Counter()
        for i in np.where(cl == c)[0]:
            wc.update(set(toks(labels[i])))      # presence per label
        clus_wc.append(wc)
        for w in wc:
            docfreq[w] += 1
    names = []
    for c in range(K):
        idx = np.where(cl == c)[0]
        floor = max(3, min(len(idx) // 200, 8))  # ignore one-offs; cap so big
        scored = [(w, cnt * np.log((K + 1) / docfreq[w])) for w, cnt in clus_wc[c].items() if cnt >= floor]
        scored.sort(key=lambda x: -x[1])
        top = [w.title() for w, _ in scored[:3]]
        if not top:                              # fallback: most central concept
            cen = V[idx].mean(0); cen /= (np.linalg.norm(cen) + 1e-9)
            top = [labels[idx[int(np.argmax(V[idx] @ cen))]]]
        label = ' · '.join(top)
        if cluster_types[c]:
            label = cluster_types[c].upper() + (' · ' + label if label else '')
        names.append(label)
    return names


def compute(V, cl, labels, cfg=None, slug=None):
    """Type clusters + concepts and build legend names from vectors + clusters.

    V       (n, dim) float32, L2-normalised (rows match labels / cl)
    cl      (n,) int cluster id in 0..K-1
    labels  list[str] of length n
    Returns {clusterTypes:[K], entityTypes:[n], clusterNames:[K]} in cl's own
    index order (caller reorders to taste).
    """
    if cfg is None:
        cfg = load_cfg(slug)
    A, codes, nC = _anchors(cfg)                  # codes = entity anchor names; cols nC.. = topics
    reliable = set(cfg['reliable'])
    rel_codes = np.array([c in reliable for c in codes])
    gT, g2 = cfg['gap_topic'], cfg['gap_second']
    minf = cfg.get('cluster_min_frac', {'reliable': 0.0, 'strict': 0.0})
    n = len(V)
    rng = np.random.RandomState(0)
    off = (V[rng.choice(n, min(8000, n), replace=False)] @ A.T).mean(0)   # de-bias anchors
    K = int(cl.max()) + 1

    def decide(s):
        """s: anchor scores (nC codes + topics). Return code idx in 0..nC-1, or -1
        for topic/none. Coded iff best ENTITY anchor beats the best TOPIC anchor by
        gap_topic AND the 2nd-best entity anchor by gap_second (margins per code)."""
        code_s = s[:nC]; topic = float(s[nC:].max())
        w = int(np.argmax(code_s))
        second = float(np.sort(code_s)[-2]) if nC > 1 else -1e9
        rc = bool(rel_codes[w])
        if (code_s[w] - topic) >= (gT['reliable'] if rc else gT['strict']) \
           and (code_s[w] - second) >= (g2['reliable'] if rc else g2['strict']):
            return w
        return -1

    # per-CONCEPT code (advisory: foaf:focus / Wikidata / map+timeline) — also
    # feeds the cluster consistency gate below.
    Sc = V @ A.T - off
    codeS = Sc[:, :nC]; topicS = Sc[:, nC:].max(1)
    ar = np.arange(n); win = codeS.argmax(1)
    second = np.sort(codeS, axis=1)[:, -2] if nC > 1 else np.full(n, -1e9)
    rel = rel_codes[win]
    ok = ((codeS[ar, win] - topicS) >= np.where(rel, gT['reliable'], gT['strict'])) \
       & ((codeS[ar, win] - second) >= np.where(rel, g2['reliable'], g2['strict']))
    entity_codes = np.where(ok, win, -1)          # int code idx per concept (-1 = none)
    entity_types = [codes[win[i]] if ok[i] else None for i in range(n)]

    # per-CLUSTER code (centroid direction). Optional CONSISTENCY GATE: keep the
    # code only if >= min_frac of members individually carry it (catches centroid-
    # only leans). Default floors are 0 — the decoy anchors do the heavy lifting;
    # raise per-scheme in entity_anchors.json if a centroid-only artefact appears.
    cluster_types = []
    for c in range(K):
        idx = np.where(cl == c)[0]
        cen = V[idx].mean(0); cen /= (np.linalg.norm(cen) + 1e-9)
        w = decide(cen @ A.T - off)
        code = None
        if w >= 0:
            rc = bool(rel_codes[w])
            if float(np.mean(entity_codes[idx] == w)) >= (minf['reliable'] if rc else minf['strict']):
                code = codes[w]
        cluster_types.append(code)

    names = keyword_names(labels, cl, K, cluster_types, cfg, V)
    return {'clusterTypes': cluster_types, 'entityTypes': entity_types, 'clusterNames': names}

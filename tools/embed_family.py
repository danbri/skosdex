#!/usr/bin/env python3
# Embed a whole FAMILY of sibling schemes into one combined galaxy in a single
# pass (model loaded once). IPTC NewsCodes is 218 tiny code-lists but ~7.6k
# concepts total — a per-scheme galaxy of 3 dots is useless; together they form
# one coherent, well-clustered space. Same model/normalisation/text as
# embed_scheme.py, so the family blob is comparable to every other vector.
#
# Members: dist/solr-cache/<family>.ndjson (if any) + every <family>-*.ndjson.
# Output : deploy/fly/www/embeddings/<family>.emb.{json,f16}  (membership preserved
#          in `scheme`/`schemes`, like _all), registered in index.json.
# Then run: python3 tools/layout_scheme.py <family>   -> <family>.layout.json
#
# Usage: embed_family.py <family> [<family2> ...]
import sys, os, json, glob, time, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import embed_model as em

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'dist', 'solr-cache')
OUT = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')


def members(fam):
    ms = sorted(os.path.basename(p)[:-7] for p in glob.glob(f'{CACHE}/{fam}-*.ndjson'))
    if os.path.exists(f'{CACHE}/{fam}.ndjson'):
        ms = [fam] + ms
    return ms


def embed_family(fam):
    ms = members(fam)
    if len(ms) < 2:
        print(f'{fam}: <2 members ({len(ms)}) — skipping'); return
    ids, labels, texts, scheme, schemes = [], [], [], [], {}
    for slug in ms:
        start = len(ids)
        for line in open(f'{CACHE}/{slug}.ndjson', encoding='utf-8'):
            line = line.strip()
            if not line:
                continue
            d = json.loads(line)
            lbl = d.get('exactLabel') or (d.get('prefLabel') or [None])[0]
            if not lbl:
                continue
            defi = (d.get('definition') or [''])[0]
            ids.append(d['id']); labels.append(lbl)
            texts.append(lbl + (' — ' + defi[:240] if defi else ''))
            scheme.append(slug)
        if len(ids) > start:
            schemes[slug] = {'start': start, 'count': len(ids) - start}
    if not ids:
        print(f'{fam}: no concepts found — skipping'); return

    t0 = time.time()
    B = int(os.environ.get('SKOSDEX_EMB_BATCH', '64'))
    vecs = np.vstack([em.embed(texts[i:i + B], is_query=False) for i in range(0, len(texts), B)])
    dim = vecs.shape[1]
    os.makedirs(OUT, exist_ok=True)
    vecs.astype('<f2').tofile(f'{OUT}/{fam}.emb.f16')
    json.dump({'model': em.MODEL, 'dim': int(dim), 'n': len(ids),
               'schemes': schemes, 'ids': ids, 'labels': labels, 'scheme': scheme},
              open(f'{OUT}/{fam}.emb.json', 'w'))
    reg = f'{OUT}/index.json'
    have = sorted(set((json.load(open(reg)) if os.path.exists(reg) else []) + [fam]))
    json.dump(have, open(reg, 'w'))
    print(f'{fam}: {len(schemes)} members, {len(ids)} concepts -> {fam}.emb.f16 '
          f'({os.path.getsize(f"{OUT}/{fam}.emb.f16")//1024} KB) in {time.time()-t0:.1f}s', flush=True)


if __name__ == '__main__':
    for fam in sys.argv[1:] or ['iptc']:
        embed_family(fam)

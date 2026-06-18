#!/usr/bin/env python3
# Embed one scheme's concepts (prefLabel [+ definition]) with the shared model
# (tools/embed_model.py — multilingual-e5-large-instruct) and write compact
# float16 vectors for cross-lingual semantic KNN ("similar concepts" / search /
# the viz). Concepts are embedded as DOCUMENTS (no query prefix).
#
# Input : dist/solr-cache/<slug>.ndjson  (already-parsed concept docs)
# Output: deploy/fly/www/embeddings/<slug>.emb.json  (metadata + id list)
#         deploy/fly/www/embeddings/<slug>.emb.f16   (n*dim float16, little-endian)
# Usage: embed_scheme.py <slug> [max]
import sys, os, json, time, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import embed_model as em

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    slug = sys.argv[1]
    # Range mode (`--range START END`) embeds only valid concepts [START,END) and
    # writes a PARTIAL `<slug>.part-<START>.emb.{f16,json}` (no index.json touch) —
    # lets the giants (lcsh/getty-ulan/gnd/rameau) be split across CI jobs under the
    # 6h limit, then stitched by tools/merge_parts.mjs. Otherwise: whole scheme.
    rng = None
    if '--range' in sys.argv:
        i = sys.argv.index('--range'); rng = (int(sys.argv[i + 1]), int(sys.argv[i + 2]))
    cap = int(sys.argv[2]) if len(sys.argv) > 2 and rng is None else 0
    nd = os.path.join(ROOT, 'dist', 'solr-cache', f'{slug}.ndjson')
    if not os.path.exists(nd):
        sys.exit(f'no {nd} — run `skosdex graphed && skosdex solr-docs` first')

    ids, labels, texts = [], [], []
    vi = 0                                  # index over VALID concepts (those with a label)
    for line in open(nd, encoding='utf-8'):
        line = line.strip()
        if not line:
            continue
        d = json.loads(line)
        lbl = d.get('exactLabel') or (d.get('prefLabel') or [None])[0]
        if not lbl:
            continue
        if rng is not None:
            if vi >= rng[1]:
                break
            if vi < rng[0]:
                vi += 1
                continue
        vi += 1
        defi = (d.get('definition') or [''])[0]
        ids.append(d['id'])
        labels.append(lbl)
        texts.append(lbl + (' — ' + defi[:240] if defi else ''))
        if cap and len(ids) >= cap:
            break

    t0 = time.time()
    B = int(os.environ.get('SKOSDEX_EMB_BATCH', '64'))
    vecs = (np.vstack([em.embed(texts[i:i + B], is_query=False) for i in range(0, len(texts), B)])
            if texts else np.zeros((0, em.dim()), np.float32))
    d = vecs.shape[1]
    print(f'  embed {slug}: {len(ids)} concepts -> {vecs.shape} in {time.time()-t0:.1f}s', flush=True)

    outdir = os.path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings')
    os.makedirs(outdir, exist_ok=True)
    if rng is not None:
        # partial: zero-padded start so merge_parts.mjs can sort lexically
        base = f'{slug}.part-{rng[0]:09d}'
        vecs.astype('<f2').tofile(os.path.join(outdir, f'{base}.emb.f16'))
        json.dump({'model': em.MODEL, 'dim': int(d), 'n': len(ids), 'start': rng[0], 'ids': ids, 'labels': labels},
                  open(os.path.join(outdir, f'{base}.emb.json'), 'w'))
        print(f'  embed {slug}: wrote PARTIAL {base}.emb.f16 ({len(ids)} concepts)', flush=True)
        return
    vecs.astype('<f2').tofile(os.path.join(outdir, f'{slug}.emb.f16'))     # float16 LE
    json.dump({'model': em.MODEL, 'dim': int(d), 'n': len(ids), 'ids': ids, 'labels': labels},
              open(os.path.join(outdir, f'{slug}.emb.json'), 'w'))
    # registry of embedded schemes, for the UI to discover which have vectors
    reg = os.path.join(outdir, 'index.json')
    have = sorted(set((json.load(open(reg)) if os.path.exists(reg) else []) + [slug]))
    json.dump(have, open(reg, 'w'))
    sz = os.path.getsize(os.path.join(outdir, f'{slug}.emb.f16'))
    print(f'  embed {slug}: wrote www/embeddings/{slug}.emb.f16 ({sz//1024} KB) + .emb.json', flush=True)


if __name__ == '__main__':
    main()

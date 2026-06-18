#!/usr/bin/env node
// Build the curated cross-scheme COMPARE blob (_all.emb.{json,f16}) for the
// viz.html overlay ("✦ compare"). Unlike combine_embeddings.mjs (which folds in
// EVERY embedded scheme), this takes the hand-picked, focus-complementary set in
// tools/compare_set.json and SAMPLES each scheme to at most `cap` concepts so one
// large scheme (UK Parliament ~145k) doesn't swamp the rest and the shared UMAP
// stays fast and balanced. All vectors share the e5 space, so the merge is just a
// (sampled) concatenation + a combined id/label/scheme index.
//
// Output: deploy/fly/www/embeddings/_all.emb.{json,f16}  (then run
//         tools/layout_combined.py -> _all.layout.json, and register _all).
//
// Usage: node tools/combine_curated.mjs   (reads tools/compare_set.json)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const DIR = path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'compare_set.json'), 'utf8'));
const cap = cfg.cap || 5000;

// evenly-spaced indices across [0,n) — deterministic, spreads the sample over the
// whole scheme rather than taking a contiguous (alphabetical) head.
const pick = (n, k) => k >= n ? [...Array(n).keys()]
  : Array.from({ length: k }, (_, i) => Math.floor((i * n) / k));

let dim = null, model = null, offset = 0;
const ids = [], labels = [], scheme = [], schemes = {}, blobs = [];
for (const slug of cfg.schemes) {
  const mp = path.join(DIR, `${slug}.emb.json`), bp = path.join(DIR, `${slug}.emb.f16`);
  if (!fs.existsSync(mp) || !fs.existsSync(bp)) { console.error(`SKIP ${slug}: no vectors`); continue; }
  const meta = JSON.parse(fs.readFileSync(mp, 'utf8'));
  if (dim === null) { dim = meta.dim; model = meta.model; }
  if (meta.dim !== dim || meta.model !== model) { console.error(`refusing ${slug}: model/dim mismatch`); process.exit(1); }
  const buf = fs.readFileSync(bp);
  if (buf.length !== meta.n * dim * 2) { console.error(`refusing ${slug}: f16 size ${buf.length} != ${meta.n * dim * 2}`); process.exit(1); }
  const rows = pick(meta.n, cap), rowBytes = dim * 2;
  const out = Buffer.allocUnsafe(rows.length * rowBytes);
  rows.forEach((r, i) => { buf.copy(out, i * rowBytes, r * rowBytes, r * rowBytes + rowBytes);
    ids.push(meta.ids[r]); labels.push((meta.labels || meta.ids)[r]); scheme.push(slug); });
  blobs.push(out);
  schemes[slug] = { start: offset, count: rows.length };
  offset += rows.length;
  console.log(`  + ${slug}: ${rows.length}${rows.length < meta.n ? `/${meta.n} (sampled)` : ''}`);
}
if (!offset) { console.error('no vectors collected'); process.exit(1); }

const f16 = Buffer.concat(blobs);
fs.writeFileSync(path.join(DIR, '_all.emb.f16'), f16);
fs.writeFileSync(path.join(DIR, '_all.emb.json'), JSON.stringify({ model, dim, n: offset, schemes, ids, labels, scheme }));
const idx = new Set(JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'))); idx.add('_all');
fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify([...idx].sort()));
console.log(`_all.emb.f16 (${(f16.length / 1048576).toFixed(1)} MB, ${offset} vectors across ${Object.keys(schemes).length} schemes, dim ${dim})`);

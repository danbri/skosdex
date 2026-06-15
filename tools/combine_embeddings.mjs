#!/usr/bin/env node
// Merge every per-scheme embedding into ONE shared vector space.
//
// This is sound because all schemes are embedded with the SAME model
// (all-MiniLM-L6-v2, 384-dim, L2-normalised by embed_scheme.py). Vectors from
// different schemes are therefore directly comparable: cosine similarity == dot
// product, and nearest-neighbour search works across scheme boundaries. So the
// merge is just a concatenation of the float16 blobs plus a combined id/label/
// scheme index — no re-embedding, no re-projection.
//
// Inputs : deploy/fly/www/embeddings/index.json (registry of embedded slugs)
//          deploy/fly/www/embeddings/<slug>.emb.{json,f16}
// Outputs: deploy/fly/www/embeddings/_all.emb.f16   (N*dim float16, LE)
//          deploy/fly/www/embeddings/_all.emb.json  (metadata + parallel arrays)
//
// Usage: node tools/combine_embeddings.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const DIR = path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings');
const reg = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'))
  .filter((s) => !s.startsWith('_')); // never fold a previous combined blob in

if (!reg.length) { console.error('no embedded schemes in index.json'); process.exit(1); }

let dim = null, model = null;
const ids = [], labels = [], scheme = [], schemes = {};
const blobs = [];
let offset = 0;

for (const slug of reg) {
  const meta = JSON.parse(fs.readFileSync(path.join(DIR, `${slug}.emb.json`), 'utf8'));
  if (dim === null) { dim = meta.dim; model = meta.model; }
  if (meta.dim !== dim || meta.model !== model) {
    console.error(`refusing to merge ${slug}: model/dim mismatch (${meta.model}/${meta.dim} != ${model}/${dim})`);
    process.exit(1);
  }
  const buf = fs.readFileSync(path.join(DIR, `${slug}.emb.f16`));
  if (buf.length !== meta.n * dim * 2) {
    console.error(`refusing to merge ${slug}: f16 size ${buf.length} != n*dim*2 ${meta.n * dim * 2}`);
    process.exit(1);
  }
  blobs.push(buf);
  for (let i = 0; i < meta.n; i++) { ids.push(meta.ids[i]); labels.push(meta.labels[i]); scheme.push(slug); }
  schemes[slug] = { start: offset, count: meta.n };
  offset += meta.n;
  console.log(`  + ${slug}: ${meta.n} vectors`);
}

const f16 = Buffer.concat(blobs);
fs.writeFileSync(path.join(DIR, '_all.emb.f16'), f16);
fs.writeFileSync(path.join(DIR, '_all.emb.json'), JSON.stringify({
  model, dim, n: offset, schemes, ids, labels, scheme,
}));
// register the combined blob so the UI/API can discover it
const idx = new Set(JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8')));
idx.add('_all');
fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify([...idx].sort()));
console.log(`  combined -> _all.emb.f16 (${(f16.length / 1048576).toFixed(1)} MB, ${offset} vectors, dim ${dim}) + _all.emb.json`);

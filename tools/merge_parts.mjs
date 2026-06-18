#!/usr/bin/env node
// Stitch the per-range PARTIAL embeddings written by `embed_scheme.py --range`
// (one per CI job for the giants) into a single <slug>.emb.{f16,json}, in order.
// Partials sit alongside as <slug>.part-<START>.emb.{f16,json}; we sort by START
// (zero-padded, so lexical = numeric), concatenate the float16 blobs, splice the
// id/label lists, register the slug in index.json, and delete the parts.
//
// Usage: node tools/merge_parts.mjs <slug> [<slug2> ...]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const DIR = path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings');

for (const slug of process.argv.slice(2)) {
  const parts = fs.readdirSync(DIR)
    .filter(f => f.startsWith(`${slug}.part-`) && f.endsWith('.emb.json'))
    .sort();
  if (!parts.length) { console.error(`${slug}: no parts found — skipping`); continue; }
  let model = null, dim = null;
  const ids = [], labels = [], blobs = [];
  for (const pj of parts) {
    const meta = JSON.parse(fs.readFileSync(path.join(DIR, pj), 'utf8'));
    const pf = pj.replace(/\.emb\.json$/, '.emb.f16');
    const buf = fs.readFileSync(path.join(DIR, pf));
    if (model === null) { model = meta.model; dim = meta.dim; }
    if (meta.model !== model || meta.dim !== dim) { console.error(`${slug}: model/dim mismatch in ${pj}`); process.exit(1); }
    if (buf.length !== meta.n * dim * 2) { console.error(`${slug}: ${pf} size ${buf.length} != ${meta.n * dim * 2}`); process.exit(1); }
    ids.push(...meta.ids); labels.push(...meta.labels); blobs.push(buf);
    console.log(`  + ${pj}: start=${meta.start} n=${meta.n}`);
  }
  const f16 = Buffer.concat(blobs);
  fs.writeFileSync(path.join(DIR, `${slug}.emb.f16`), f16);
  fs.writeFileSync(path.join(DIR, `${slug}.emb.json`), JSON.stringify({ model, dim, n: ids.length, ids, labels }));
  const idx = new Set(fs.existsSync(path.join(DIR, 'index.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8')) : []);
  idx.add(slug);
  fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify([...idx].sort()));
  for (const pj of parts) { fs.rmSync(path.join(DIR, pj)); fs.rmSync(path.join(DIR, pj.replace(/\.emb\.json$/, '.emb.f16'))); }
  console.log(`${slug}: merged ${parts.length} parts -> ${ids.length} vectors, ${(f16.length / 1048576).toFixed(0)} MB`);
}

#!/usr/bin/env node
// Merge one FAMILY of schemes into a single combined galaxy.
//
// Many vocabularies ship as a swarm of tiny sibling code-lists — IPTC NewsCodes
// is 218 schemes but only ~7.6k concepts, most with a handful of entries each. A
// per-scheme "galaxy" of 3 dots is useless; together they form one coherent,
// well-clustered space. Because every scheme is embedded with the SAME model
// (multilingual-e5-large-instruct, L2-normalised), the merge is just a
// concatenation of the float16 blobs + a combined id/label/scheme index — the
// same operation as combine_embeddings.mjs, scoped to a family.
//
// A family member is any embedded slug equal to <family> or starting "<family>-".
//
// Inputs : deploy/fly/www/embeddings/index.json + <member>.emb.{json,f16}
// Outputs: deploy/fly/www/embeddings/<family>.emb.{json,f16}   (+ registers <family>)
//          then run: python3 tools/layout_scheme.py <family>   -> <family>.layout.json
//
// Usage: node tools/combine_family.mjs <family> [<family2> ...]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const DIR = path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings');
const families = process.argv.slice(2);
if (!families.length) { console.error('usage: combine_family.mjs <family> [...]'); process.exit(1); }

const reg = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'));
const idx = new Set(reg);

for (const fam of families) {
  // members: the family's own scheme (if any) + every "<fam>-*" sibling, but
  // never a previously-built combined blob (_all or a family blob == fam itself
  // is fine to rebuild, but skip other families' aggregates).
  const members = reg.filter((s) => !s.startsWith('_') && s !== fam &&
    (s === fam || s.startsWith(`${fam}-`)));
  if (members.length < 2) { console.error(`${fam}: <2 members (${members.length}) — skipping`); continue; }

  let dim = null, model = null, offset = 0;
  const ids = [], labels = [], scheme = [], schemes = {}, blobs = [];
  let missing = 0;
  for (const slug of members) {
    const mp = path.join(DIR, `${slug}.emb.json`), bp = path.join(DIR, `${slug}.emb.f16`);
    if (!fs.existsSync(mp) || !fs.existsSync(bp)) { missing++; continue; }
    const meta = JSON.parse(fs.readFileSync(mp, 'utf8'));
    if (dim === null) { dim = meta.dim; model = meta.model; }
    if (meta.dim !== dim || meta.model !== model) {
      console.error(`refusing ${slug}: model/dim mismatch (${meta.model}/${meta.dim} != ${model}/${dim})`); process.exit(1);
    }
    const buf = fs.readFileSync(bp);
    if (buf.length !== meta.n * dim * 2) { console.error(`refusing ${slug}: f16 size ${buf.length} != ${meta.n * dim * 2}`); process.exit(1); }
    blobs.push(buf);
    for (let i = 0; i < meta.n; i++) { ids.push(meta.ids[i]); labels.push(meta.labels[i]); scheme.push(slug); }
    schemes[slug] = { start: offset, count: meta.n };
    offset += meta.n;
  }
  if (!offset) { console.error(`${fam}: no member vectors found (missing ${missing}) — skipping`); continue; }

  const f16 = Buffer.concat(blobs);
  fs.writeFileSync(path.join(DIR, `${fam}.emb.f16`), f16);
  fs.writeFileSync(path.join(DIR, `${fam}.emb.json`), JSON.stringify({ model, dim, n: offset, schemes, ids, labels, scheme }));
  idx.add(fam);
  console.log(`${fam}: ${Object.keys(schemes).length} members, ${offset} vectors -> ${fam}.emb.f16 (${(f16.length / 1048576).toFixed(1)} MB)${missing ? ` [${missing} members had no vectors]` : ''}`);
}

fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify([...idx].sort()));
console.log(`index.json: ${idx.size} entries`);

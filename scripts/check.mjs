#!/usr/bin/env node
// skosdex integrity checks — three sections, run independently or together:
//
//   node scripts/check.mjs                 # infra + cookbook + api + data, vs live
//   node scripts/check.mjs --cookbook      # just the SPARQL guide
//   node scripts/check.mjs --api           # just the embeddings similarity API
//   node scripts/check.mjs --infra --data
//   ENDPOINT=https://skosdex.fly.dev node scripts/check.mjs
//   node scripts/check.mjs --data          # data checks are mostly offline
//
// Why this exists: the cookbook once claimed "every one tested" while several
// queries had silently rotted (stale predicates, wrong language tags, a Wikidata
// URI that moved). These checks are the regression net:
//   infra     — the live box answers, with the expected corpus magnitude.
//   cookbook  — every published query in deploy/fly/www/queries.js actually runs,
//               returns valid JSON, and (for local queries) yields >=1 row.
//   data      — every committed canonical.nq.gz is real LFS content (not a
//               pointer), gunzips, parses, and its scheme URI is live as a graph.
//
// Exit code is non-zero if any hard check FAILs (WARNs don't fail the build).

import { readFileSync, readdirSync, existsSync, statSync, createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createInterface } from 'node:readline';
import N3 from 'n3';
import { QUERIES } from '../deploy/fly/www/queries.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = (process.env.ENDPOINT || 'https://skosdex.fly.dev').replace(/\/$/, '');

// thresholds — generous floors, not exact counts, so normal corpus growth
// doesn't trip them but a broken seed (empty store, half-loaded volume) does.
const MIN_GRAPHS = Number(process.env.MIN_GRAPHS || 240);
const MIN_QUADS  = Number(process.env.MIN_QUADS  || 95_000_000);
const MIN_SOLR   = Number(process.env.MIN_SOLR   || 1_000_000);

const flags = process.argv.slice(2).filter(a => a.startsWith('--')).map(a => a.slice(2));
const want = (name) => flags.length === 0 || flags.includes(name);

let pass = 0, fail = 0, warn = 0;
const ok   = (m) => { pass++; console.log(`  \x1b[32m✓\x1b[0m ${m}`); };
const bad  = (m) => { fail++; console.log(`  \x1b[31m✗ ${m}\x1b[0m`); };
const soft = (m) => { warn++; console.log(`  \x1b[33m! ${m}\x1b[0m`); };
const head = (m) => console.log(`\n\x1b[1m${m}\x1b[0m`);

// --- SPARQL helper. Throws on non-JSON bodies, which is itself a finding:
// e.g. Oxigraph 0.5.2 appends "Unexpected JSON after the end of the bindings
// array" to QLever SERVICE results, producing an invalid body. ----------------
async function sparql(query, { timeoutMs = 90_000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${ENDPOINT}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sparql-query', 'Accept': 'application/sparql-results+json' },
      body: query, signal: ctrl.signal,
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${text.slice(0, 120)}`);
    let json;
    try { json = JSON.parse(text); }
    catch { throw new Error(`non-JSON response (${text.length}B): …${text.slice(-80).replace(/\s+/g, ' ')}`); }
    return json;
  } finally { clearTimeout(t); }
}
const rowsOf = (j) => j?.results?.bindings ?? [];
const scalar = (j) => { const b = rowsOf(j)[0]; return b ? Number(b[Object.keys(b)[0]].value) : NaN; };

// --- Solr helper (POST form body to /solr/skos/select). Throws on non-200 or
// non-JSON, like the SPARQL helper. -----------------------------------------
async function solrSelect(params, { timeoutMs = 45_000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${ENDPOINT}/solr/skos/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `${params.replace(/ /g, '%20')}&wt=json`, signal: ctrl.signal,
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${text.slice(0, 120)}`);
    try { return JSON.parse(text); }
    catch { throw new Error(`non-JSON Solr response (${text.length}B)`); }
  } finally { clearTimeout(t); }
}

async function getText(path, { timeoutMs = 30_000, accept } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${ENDPOINT}${path}`, { headers: accept ? { Accept: accept } : {}, signal: ctrl.signal });
    return { status: r.status, text: await r.text() };
  } finally { clearTimeout(t); }
}

// =============================================================== INFRA ========
async function checkInfra() {
  head(`INFRA — ${ENDPOINT}`);
  try {
    const ask = await sparql('ASK {}', { timeoutMs: 20_000 });
    ask.boolean === true ? ok('SPARQL ASK {} → true') : bad(`ASK {} → ${JSON.stringify(ask)}`);
  } catch (e) { bad(`SPARQL ASK failed: ${e.message}`); }

  try {
    const g = scalar(await sparql('SELECT (COUNT(DISTINCT ?g) AS ?n) WHERE { GRAPH ?g { ?s ?p ?o } }'));
    g >= MIN_GRAPHS ? ok(`named graphs: ${g.toLocaleString()} (≥ ${MIN_GRAPHS})`) : bad(`named graphs: ${g} (< ${MIN_GRAPHS})`);
  } catch (e) { bad(`graph count failed: ${e.message}`); }

  try {
    const q = scalar(await sparql('SELECT (COUNT(*) AS ?n) WHERE { GRAPH ?g { ?s ?p ?o } }', { timeoutMs: 120_000 }));
    q >= MIN_QUADS ? ok(`total quads: ${q.toLocaleString()} (≥ ${MIN_QUADS.toLocaleString()})`) : bad(`total quads: ${q} (< ${MIN_QUADS.toLocaleString()})`);
  } catch (e) { bad(`quad count failed: ${e.message}`); }

  try {
    const { status, text } = await getText('/solr/skos/select?q=*:*&rows=0');
    const n = JSON.parse(text)?.response?.numFound ?? NaN;
    n >= MIN_SOLR ? ok(`Solr docs: ${n.toLocaleString()} (≥ ${MIN_SOLR.toLocaleString()})`) : bad(`Solr docs: ${n} (< ${MIN_SOLR.toLocaleString()})`);
  } catch (e) { bad(`Solr check failed: ${e.message}`); }

  for (const [path, label] of [['/', 'entrance page'], ['/queries.html', 'cookbook page'], ['/queries.js', 'cookbook module']]) {
    try { const { status } = await getText(path); status === 200 ? ok(`${label} (${path}) → 200`) : bad(`${label} (${path}) → ${status}`); }
    catch (e) { bad(`${label} (${path}) failed: ${e.message}`); }
  }
}

// ============================================================ COOKBOOK ========
async function checkCookbook() {
  head(`COOKBOOK — ${QUERIES.filter(e => e.q || e.solr).length} queries from deploy/fly/www/queries.js`);
  for (const e of QUERIES) {
    const label = e.title;
    if (e.solr) {
      // Solr: a clean run is HTTP 200 + valid JSON. 0 results soft-warn rather
      // than fail — Solr emptiness can be legitimate, and a newly added field
      // (e.g. prefLabel_en, lang) only exists once the index is redeployed.
      try {
        const j = await solrSelect(e.solr, { timeoutMs: e.slow ? 120_000 : 45_000 });
        const ff = j.facet_counts?.facet_fields;
        const n = ff ? Object.values(ff)[0].length / 2 : (j.response?.numFound ?? 0);
        n > 0 ? ok(`${label} — ${n} ${ff ? 'facet value(s)' : 'doc(s)'} [solr]`)
              : soft(`${label} — 0 results [solr] (field may need a redeploy/reindex)`);
      } catch (e2) { bad(`${label} — ${e2.message} [solr]`); }
      continue;
    }
    if (!e.q) continue;
    try {
      const j = await sparql(e.q, { timeoutMs: e.slow ? 120_000 : 45_000 });
      const n = rowsOf(j).length;
      if (e.federation) {
        n > 0 ? ok(`${label} — ${n} row(s) [federation]`) : soft(`${label} — 0 rows (external endpoint may be slow/down)`);
      } else if (n > 0) {
        ok(`${label} — ${n} row(s)`);
      } else {
        bad(`${label} — 0 rows (query returns nothing; likely rotted)`);
      }
    } catch (e2) {
      e.federation ? soft(`${label} — ${e2.message} [federation]`) : bad(`${label} — ${e2.message}`);
    }
  }
}

// ================================================================ API =========
// The embeddings similarity API (node KNN over the combined MiniLM space) +
// the static vector blobs. Soft on a missing sample id (the example concept may
// not be in a future corpus); hard on the service being down.
async function checkApi() {
  head(`EMBEDDINGS API — ${ENDPOINT}/api`);
  try {
    const { status, text } = await getText('/api/health');
    const j = JSON.parse(text);
    (status === 200 && j.ok && j.n > 0)
      ? ok(`/api/health → ok, ${j.n.toLocaleString()} vectors, ${j.schemes} scheme(s)`)
      : bad(`/api/health → ${status} ${text.slice(0, 80)}`);
  } catch (e) { bad(`/api/health failed: ${e.message}`); }

  try {
    // GEMET "climate change"; cross=1 → analogues in *other* schemes
    const id = 'http://www.eionet.europa.eu/gemet/concept/1471';
    const { status, text } = await getText(`/api/similar?id=${encodeURIComponent(id)}&k=5&cross=1`);
    if (status !== 200) soft(`/api/similar → ${status} (sample id may not be embedded)`);
    else {
      const r = JSON.parse(text).results ?? [];
      r.length ? ok(`/api/similar (cross-scheme) → ${r.length} hits; top: "${r[0].label}" [${r[0].scheme}] ${r[0].score}`)
               : soft('/api/similar → 0 results');
    }
  } catch (e) { soft(`/api/similar probe: ${e.message}`); }

  try {
    const { status } = await getText('/embeddings/index.json');
    status === 200 ? ok('/embeddings/index.json (static vectors) → 200') : bad(`/embeddings/index.json → ${status}`);
  } catch (e) { bad(`/embeddings/index.json failed: ${e.message}`); }
}

// ================================================================ DATA ========
const POINTER_MAGIC = 'version https://git-lfs';
const GZIP_MAGIC = Buffer.from([0x1f, 0x8b]);

function isLfsPointer(file) {
  const fd = readFileSync(file, { encoding: null }).subarray(0, 64);
  return fd.toString('utf8').startsWith(POINTER_MAGIC);
}
function isGzip(file) {
  const fd = readFileSync(file, { encoding: null }).subarray(0, 2);
  return fd.equals(GZIP_MAGIC);
}
// gunzip + parse first `sampleLines` quads with N3; stop early so we don't
// stream all of (e.g.) Getty's 26M lines just to validate the head. Returns
// {lines, sampled, err}; `lines` is exact only for files <= sampleLines.
function inspectNq(file, sampleLines = 2000) {
  return new Promise((resolve) => {
    let lines = 0, buf = '', finished = false;
    const input = createReadStream(file).pipe(createGunzip());
    const rl = createInterface({ input, crlfDelay: Infinity });
    const finish = () => {
      if (finished) return; finished = true;
      let err = null, sampled = 0;
      try { sampled = new N3.Parser({ format: 'N-Quads' }).parse(buf).length; }
      catch (e) { err = e.message; }
      resolve({ lines, sampled, err });
    };
    rl.on('line', (l) => { lines++; if (lines <= sampleLines) buf += l + '\n'; else { rl.close(); input.destroy(); finish(); } });
    rl.on('close', finish);
    rl.on('error', (e) => { if (!finished) { finished = true; resolve({ lines, sampled: 0, err: e.message }); } });
    input.on('error', () => {}); // swallow EPIPE from destroy()
  });
}
function conceptSchemeURI(metaFile) {
  const m = readFileSync(metaFile, 'utf8').match(/skosdex:conceptSchemeURI\s+<([^>]+)>/);
  return m ? m[1] : null;
}

async function checkData() {
  head('DATA — committed canonical.nq.gz integrity');
  const base = join(ROOT, 'third_party/skos');
  const slugs = readdirSync(base).filter((d) => {
    const p = join(base, d);
    return statSync(p).isDirectory() && existsSync(join(p, 'canonical.nq.gz'));
  });
  console.log(`  ${slugs.length} schemes with canonical.nq.gz`);

  let pointers = 0, badgz = 0, parseErrs = 0, empty = 0;
  const schemeURIs = new Map(); // conceptSchemeURI -> slug
  for (const slug of slugs) {
    const dir = join(base, slug);
    const nq = join(dir, 'canonical.nq.gz');
    if (isLfsPointer(nq)) { pointers++; bad(`${slug}: canonical.nq.gz is an LFS pointer (run \`git lfs pull\`)`); continue; }
    if (!isGzip(nq)) { badgz++; bad(`${slug}: canonical.nq.gz is not gzip`); continue; }
    const { lines, sampled, err } = await inspectNq(nq);
    if (err) { parseErrs++; bad(`${slug}: N-Quads parse error — ${err}`); continue; }
    if (lines === 0) { empty++; bad(`${slug}: canonical.nq.gz is empty`); continue; }
    const uri = existsSync(join(dir, 'meta.ttl')) ? conceptSchemeURI(join(dir, 'meta.ttl')) : null;
    if (uri) schemeURIs.set(uri, slug);
  }
  if (!pointers && !badgz && !parseErrs && !empty) ok(`all ${slugs.length} canonical.nq.gz: real content, gzip-valid, sample-parse clean, non-empty`);

  // live presence: one graph-list query, then set membership per scheme URI.
  if (want('infra') || ENDPOINT) {
    head('DATA — scheme graphs present live');
    try {
      const live = new Set(rowsOf(await sparql('SELECT DISTINCT ?g WHERE { GRAPH ?g { ?s ?p ?o } }', { timeoutMs: 120_000 })).map(b => b.g.value));
      let missing = 0;
      for (const [uri, slug] of schemeURIs) {
        if (!live.has(uri)) { missing++; soft(`${slug}: conceptSchemeURI not a live graph — ${uri}`); }
      }
      missing === 0
        ? ok(`all ${schemeURIs.size} scheme URIs present as live named graphs`)
        : soft(`${missing}/${schemeURIs.size} scheme URIs not found live (graphed/ may relabel some; investigate)`);
    } catch (e) { soft(`live graph presence skipped: ${e.message}`); }
  }
}

// ================================================================ MAIN ========
console.log(`skosdex integrity check — endpoint ${ENDPOINT}`);
if (want('infra'))    await checkInfra();
if (want('cookbook')) await checkCookbook();
if (want('api'))      await checkApi();
if (want('data'))     await checkData();

console.log(`\n\x1b[1mResult:\x1b[0m \x1b[32m${pass} passed\x1b[0m, ${warn ? `\x1b[33m${warn} warn\x1b[0m, ` : ''}${fail ? `\x1b[31m${fail} failed\x1b[0m` : '0 failed'}`);
process.exit(fail ? 1 : 0);

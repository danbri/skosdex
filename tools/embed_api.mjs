#!/usr/bin/env node
// Reference REST API over the COMBINED embedding space (_all.emb.*).
//
// This is the server-side counterpart to the in-browser KNN: it loads the merged
// float16 vectors once and answers nearest-neighbour queries across every scheme
// at once. Because all vectors share the MiniLM space and are L2-normalised,
// cosine similarity is a plain dot product.
//
// Endpoints (all JSON):
//   GET /api/health
//   GET /api/similar?id=<conceptIRI>&k=10[&scheme=<slug>][&cross=1]
//        nearest concepts to a given concept. `scheme` restricts results to one
//        scheme; `cross=1` excludes same-scheme hits (find analogues elsewhere).
//   GET /api/concept?id=<conceptIRI>     -> {id,label,scheme}
//   GET /api/schemes                      -> per-scheme vector counts
//
// Text search (GET /api/search?q=...) needs the query embedded with the same
// model — left as a TODO so this stub has no Python/ONNX runtime dependency; see
// EMBEDDINGS-API.md for how to wire it (call tools/embed_scheme.py's model, or
// onnxruntime-node). Usage: node tools/embed_api.mjs [port]   (default 8088)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
// EMB_DIR lets the container point at the baked-in embeddings (the image copies
// only this server + www/embeddings, not the repo tree); default is the repo path.
const DIR = process.env.EMB_DIR || path.join(ROOT, 'deploy', 'fly', 'www', 'embeddings');
const PORT = Number(process.argv[2]) || Number(process.env.EMB_PORT) || 8088;
const HOST = process.env.EMB_HOST || '127.0.0.1';   // behind nginx by default

const meta = JSON.parse(fs.readFileSync(path.join(DIR, '_all.emb.json'), 'utf8'));
const { dim, n, ids, labels, scheme, schemes } = meta;

// Decode the float16 blob into a Float32Array once (browsers get Float16Array;
// Node doesn't yet, so expand here for fast dot products).
const raw = fs.readFileSync(path.join(DIR, '_all.emb.f16'));
const u16 = new Uint16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2);
const V = new Float32Array(n * dim);
for (let i = 0; i < V.length; i++) V[i] = f16to32(u16[i]);
const index = new Map(ids.map((id, i) => [id, i]));
console.log(`embed-api: ${n} vectors (dim ${dim}) across ${Object.keys(schemes).length} schemes`);

function f16to32(h) {
  const s = (h & 0x8000) >> 15, e = (h & 0x7c00) >> 10, f = h & 0x03ff;
  if (e === 0) return (s ? -1 : 1) * Math.pow(2, -14) * (f / 1024);
  if (e === 0x1f) return f ? NaN : (s ? -Infinity : Infinity);
  return (s ? -1 : 1) * Math.pow(2, e - 15) * (1 + f / 1024);
}

function knn(row, k, schemeFilter, cross) {
  const base = row * dim, src = scheme[row];
  const heap = []; // small-k: simple insertion top-k
  for (let i = 0; i < n; i++) {
    if (i === row) continue;
    if (schemeFilter && scheme[i] !== schemeFilter) continue;
    if (cross && scheme[i] === src) continue;
    let dot = 0; const o = i * dim;
    for (let d = 0; d < dim; d++) dot += V[base + d] * V[o + d];
    if (heap.length < k) { heap.push([dot, i]); if (heap.length === k) heap.sort((a, b) => a[0] - b[0]); }
    else if (dot > heap[0][0]) { heap[0] = [dot, i]; heap.sort((a, b) => a[0] - b[0]); }
  }
  return heap.sort((a, b) => b[0] - a[0])
    .map(([s, i]) => ({ id: ids[i], label: labels[i], scheme: scheme[i], score: Math.round(s * 1e4) / 1e4 }));
}

// KNN from an arbitrary query vector (text search) — same dot-product ranking,
// no source-row to exclude. `q` is a Float32Array(dim).
function knnVec(q, k, schemeFilter) {
  const heap = [];
  for (let i = 0; i < n; i++) {
    if (schemeFilter && scheme[i] !== schemeFilter) continue;
    let dot = 0; const o = i * dim;
    for (let d = 0; d < dim; d++) dot += q[d] * V[o + d];
    if (heap.length < k) { heap.push([dot, i]); if (heap.length === k) heap.sort((a, b) => a[0] - b[0]); }
    else if (dot > heap[0][0]) { heap[0] = [dot, i]; heap.sort((a, b) => a[0] - b[0]); }
  }
  return heap.sort((a, b) => b[0] - a[0])
    .map(([s, i]) => ({ id: ids[i], label: labels[i], scheme: scheme[i], score: Math.round(s * 1e4) / 1e4 }));
}

// Embed a query string via the Python sidecar (tools/embed_query.py) — same
// model as the corpus, so the vector is comparable. Uses the stdlib http client
// (not global fetch) so it runs on the box's older Node too. Rejects if it's down.
const QUERY_URL = process.env.EMB_QUERY_URL || 'http://127.0.0.1:8089';
function embedQuery(text) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${QUERY_URL}/embed?q=${encodeURIComponent(text)}`, (r) => {
      if (r.statusCode !== 200) { r.resume(); return reject(new Error(`embed service HTTP ${r.statusCode}`)); }
      let body = ''; r.setEncoding('utf8');
      r.on('data', (c) => { body += c; });
      r.on('end', () => {
        try {
          const j = JSON.parse(body);
          if (!Array.isArray(j.vec) || j.vec.length !== dim) return reject(new Error('bad embed vector'));
          resolve(Float32Array.from(j.vec));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => req.destroy(new Error('embed service timeout')));
  });
}

const send = (res, code, obj) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(obj));
};

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  if (p === '/api' || p === '/api/') return send(res, 200, {
    service: 'skosdex embeddings', model: meta.model, dim, n,
    schemes: Object.keys(schemes).length,
    endpoints: ['/api/health', '/api/schemes', '/api/concept?id=<IRI>',
      '/api/similar?id=<IRI>&k=10[&scheme=<slug>][&cross=1]',
      '/api/search?q=text&k=10[&scheme=<slug>]'] });
  if (p === '/api/health') return send(res, 200, { ok: true, n, dim, schemes: Object.keys(schemes).length });
  if (p === '/api/schemes') return send(res, 200, schemes);
  if (p === '/api/concept') {
    const i = index.get(url.searchParams.get('id'));
    return i === undefined ? send(res, 404, { error: 'unknown id' })
      : send(res, 200, { id: ids[i], label: labels[i], scheme: scheme[i] });
  }
  if (p === '/api/similar') {
    const id = url.searchParams.get('id');
    const i = index.get(id);
    if (i === undefined) return send(res, 404, { error: 'unknown id', id });
    const k = Math.min(Math.max(Number(url.searchParams.get('k')) || 10, 1), 100);
    const sf = url.searchParams.get('scheme') || null;
    const cross = url.searchParams.get('cross') === '1';
    return send(res, 200, { id, label: labels[i], scheme: scheme[i], k, results: knn(i, k, sf, cross) });
  }
  if (p === '/api/search') {
    const q = url.searchParams.get('q');
    if (!q) return send(res, 400, { error: 'missing q' });
    const k = Math.min(Math.max(Number(url.searchParams.get('k')) || 10, 1), 100);
    const sf = url.searchParams.get('scheme') || null;
    try {
      const vec = await embedQuery(q);
      return send(res, 200, { q, k, results: knnVec(vec, k, sf) });
    } catch (e) {
      // the query-embed sidecar isn't running (e.g. local `node embed_api.mjs`
      // with no Python service) — degrade clearly rather than 500.
      return send(res, 501, { error: 'text search unavailable — query-embed service down', detail: String(e.message || e) });
    }
  }
  return send(res, 404, { error: 'not found' });
}).listen(PORT, HOST, () => console.log(`embed-api: http://${HOST}:${PORT}/api/health`));

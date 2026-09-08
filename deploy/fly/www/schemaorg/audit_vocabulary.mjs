#!/usr/bin/env node
/** Exhaustive source inventory, using @factoidal/core for RDF parsing/querying. */
import { parse, query, Dataset } from '@factoidal/core';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawn } from 'node:child_process';
import { createInterface } from 'node:readline';

const root = dirname(fileURLToPath(import.meta.url));
const repo = resolve(root, '..');
const out = resolve(root, 'data/audit');
const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const rdfs = 'http://www.w3.org/2000/01/rdf-schema#';
const sdo = 'https://schema.org/';
const canon = value => value.replace(/^http:\/\/schema\.org\//, sdo);
const local = value => canon(value).startsWith(sdo) ? canon(value).slice(sdo.length) : null;
const uniq = values => [...new Set(values)].sort();
const git = args => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
const revision = git(['rev-parse', 'HEAD']).trim();
const sourceURL = path => `https://github.com/schemaorg/schemaorg/blob/${revision}/${path}`;
const link = (name, url) => `[${String(name).replaceAll('|', '\\|').replaceAll(']', '\\]')}](${url})`;
const cell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

await mkdir(out, { recursive: true });
const sourceFiles = [];
for (const entry of await readdir(resolve(repo, 'data'), { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.ttl')) sourceFiles.push(`data/${entry.name}`);
}
for (const dir of await readdir(resolve(repo, 'data/ext'), { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const entry of await readdir(resolve(repo, 'data/ext', dir.name), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.ttl')) sourceFiles.push(`data/ext/${dir.name}/${entry.name}`);
  }
}
sourceFiles.sort();

const all = new Dataset();
const subjects = new Map();
const fileReport = [];
let lexicalDeclarations = new Set();
for (const [index, path] of sourceFiles.entries()) {
  const text = await readFile(resolve(repo, path), 'utf8');
  const dataset = await parse(text, { format: 'turtle', baseIRI: `https://schema.org/${path}` });
  if (text.trim() && dataset.size === 0) throw new Error(`Nonempty file produced no RDF: ${path}`);
  fileReport.push({ path, triples: dataset.size });
  for (const match of text.matchAll(/(?:^|\n)(?::|schema:|sdo:)([A-Za-z0-9_]+)\s+a\s+(?:rdfs:Class|rdf:Property)/g)) lexicalDeclarations.add(match[1]);
  for (const quad of dataset) {
    all.add(quad);
    if (quad.subject.termType !== 'NamedNode') continue;
    const name = local(quad.subject.value);
    if (!name || name.includes('/')) continue;
    if (!subjects.has(name)) subjects.set(name, { name, triples: [], files: new Set() });
    const item = subjects.get(name);
    item.files.add(path);
    item.triples.push({ predicate: canon(quad.predicate.value), object: canon(quad.object.value), kind: quad.object.termType, file: path });
  }
  if ((index + 1) % 20 === 0) console.log(`Current graph: ${index + 1}/${sourceFiles.length} files parsed`);
}

const values = (item, predicate) => uniq(item.triples.filter(t => t.predicate === predicate).map(t => t.object));
const terms = [...subjects.values()].filter(item => values(item, rdf + 'type').some(type => [rdfs + 'Class', rdf + 'Property'].includes(type)));
const typeNames = new Set(terms.filter(t => values(t, rdf + 'type').includes(rdfs + 'Class')).map(t => t.name));
// Enumeration values are supplemental, not silently counted as classes.
const extras = [...subjects.values()].filter(item => !terms.includes(item) && values(item, rdf + 'type').some(type => typeNames.has(local(type))));
const scopedNames = new Set([...terms, ...extras].map(t => t.name));
const missing = [...lexicalDeclarations].filter(name => !scopedNames.has(name));
if (missing.length) throw new Error(`Lexical declarations missing from parsed inventory: ${missing.join(', ')}`);
console.log(`Inventory: ${terms.length} types/properties; ${extras.length} additional typed values; ${all.size} triples`);
const queried = await query(all, `SELECT DISTINCT ?term WHERE { { ?term <${rdf}type> <${rdfs}Class> } UNION { ?term <${rdf}type> <${rdf}Property> } }`);
const queryNames = new Set(queried.map(row => local(row.get('term').value)).filter(name => name && !name.includes('/')));
if (queryNames.size !== terms.length || terms.some(t => !queryNames.has(t.name))) throw new Error('SPARQL inventory mismatch');

// Earliest available release snapshot containing each term. This is an upper
// bound on introduction when earlier snapshots do not exist, not a birth date.
const releaseText = (await readFile(resolve(repo, 'docs/releases.html'), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
const releases = [];
for (const first of releaseText.matchAll(/<td\s+class="release">([\s\S]*?)<\/td>/g)) {
  const plain = first[1].replace(/<[^>]*>/g, ' ').trim();
  const version = plain.match(/^([\d.]+[a-z]?)/)?.[1];
  const day = plain.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (version && day) releases.push({ version, date: day });
}
releases.sort((a, b) => a.date.localeCompare(b.date));
const firstRelease = new Map();
const historicalSources = new Map();
const snapshotReport = [];
for (const release of releases) {
  const candidates = ['schemaorg-all-https.nt', 'all-layers.nt', 'all-layers.nq', 'schema.nt'];
  const filename = candidates.find(name => existsSync(resolve(repo, 'data/releases', release.version, name)));
  if (!filename) continue;
  const path = `data/releases/${release.version}/${filename}`;
  const text = await readFile(resolve(repo, path), 'utf8');
  const dataset = await parse(text, { format: filename.endsWith('.nq') ? 'nquads' : 'ntriples', baseIRI: sdo });
  let observed = 0;
  for (const q of dataset) {
    const name = local(q.subject.value);
    if (!scopedNames.has(name)) continue;
    if (q.predicate.value === rdf + 'type') {
      observed++;
      if (!firstRelease.has(name)) firstRelease.set(name, { ...release, file: path, source: sourceURL(path) });
    }
    if (/(?:#|\/)(source|contributor)$/.test(q.predicate.value) && q.object.termType === 'NamedNode') {
      if (!historicalSources.has(name)) historicalSources.set(name, new Map());
      const key = q.object.value;
      if (!historicalSources.get(name).has(key)) historicalSources.get(name).set(key, { uri: key, version: release.version, date: release.date, predicate: q.predicate.value });
    }
  }
  snapshotReport.push({ ...release, path, triples: dataset.size, observed });
  console.log(`Release snapshot ${release.version}: ${dataset.size} triples`);
}

// Scan authored vocabulary diffs across all ancestors of the inspected HEAD.
// Exclude generated releases and translations: imported copies are not original
// introductions. Git starts in 2014, so the baseline is explicitly an import.
const firstDeclaration = new Map();
const historyPath = resolve(out, 'git-introductions.json');
let historyCommits = 0;
if (existsSync(historyPath) && !process.argv.includes('--refresh-history')) {
  const cached = JSON.parse(await readFile(historyPath, 'utf8'));
  if (cached.revision === revision) {
    for (const [name, record] of Object.entries(cached.terms)) firstDeclaration.set(name, record);
    historyCommits = cached.commits;
  }
}
if (!firstDeclaration.size) {
  const proc = spawn('git', ['-C', repo, 'log', revision, '--reverse', '--date-order', '--no-renames', '--format=@@COMMIT@@%H|%aI|%cI|%an%n%B%n@@ENDMSG@@', '--unified=2', '-p', '--', 'schema.rdfa', 'data', ':(exclude)data/releases', ':(exclude)data/l10n', ':(exclude)data/20140818', ':(exclude)data/20140912', ':(exclude)data/examples'], { stdio: ['ignore', 'pipe', 'pipe'] });
  let current, path = '', message = [], inMessage = false, added = [];
  let err = '';
  proc.stderr.on('data', chunk => { err += chunk; });
  const completion = new Promise((accept, reject) => proc.on('close', code => code ? reject(new Error(err)) : accept()));
  const flush = () => {
    if (!current || !/\.(ttl|rdfa|rdfa\.html)$/.test(path)) { added = []; return; }
    const text = added.join('\n');
    const names = [];
    for (const m of text.matchAll(/<div\b[^>]*\bresource=["']https?:\/\/schema\.org\/([A-Za-z0-9_]+)["'][^>]*>/g)) names.push(m[1]);
    for (const m of text.matchAll(/(?:^|\n)\s*(?::|schema:|sdo:|<https?:\/\/schema\.org\/)([A-Za-z0-9_]+)>?\s+a\s+/g)) names.push(m[1]);
    for (const name of names) {
      if (!scopedNames.has(name) || firstDeclaration.has(name)) continue;
      firstDeclaration.set(name, { ...current, path, baseline_import: current.author_date.startsWith('2014-01-31') || current.hash.startsWith('002d61b9'), source: `https://github.com/schemaorg/schemaorg/commit/${current.hash}` });
    }
    added = [];
  };
  for await (const line of createInterface({ input: proc.stdout, crlfDelay: Infinity })) {
    if (line.startsWith('@@COMMIT@@')) {
      flush();
      const [hash, author_date, commit_date, author] = line.slice(10).split('|');
      current = { hash, author_date, commit_date, author, message: '' };
      historyCommits++; inMessage = true; message = []; path = '';
    } else if (line === '@@ENDMSG@@') {
      current.message = message.join('\n').trim(); inMessage = false;
    } else if (inMessage) message.push(line);
    else if (line.startsWith('diff --git ')) { flush(); path = ''; }
    else if (line.startsWith('+++ b/')) path = line.slice(6);
    else if (line.startsWith('@@ ')) flush();
    else if (line.startsWith('+') && !line.startsWith('+++')) added.push(line.slice(1));
  }
  flush(); await completion;
  await writeFile(historyPath, JSON.stringify({ revision, commits: historyCommits, terms: Object.fromEntries(firstDeclaration) }, null, 2));
}

const mappingPredicates = new Set(['http://www.w3.org/2002/07/owl#equivalentClass', 'http://www.w3.org/2002/07/owl#equivalentProperty', 'http://www.w3.org/2004/02/skos/core#closeMatch', 'http://www.w3.org/2004/02/skos/core#exactMatch']);
const records = [...terms, ...extras].map(item => {
  const types = values(item, rdf + 'type');
  const acknowledgements = values(item, sdo + 'contributor');
  const sources = uniq([...values(item, sdo + 'source'), ...values(item, 'http://purl.org/dc/terms/source'), ...values(item, 'http://purl.org/dc/elements/1.1/source')]);
  const historical = [...(historicalSources.get(item.name)?.values() ?? [])];
  const github = uniq([...sources, ...historical.map(x => x.uri)].flatMap(uri => [...uri.matchAll(/github\.com\/(?:schemaorg|danbri)\/schemaorg\/(?:issues|pull)\/(\d+)/g)].map(m => Number(m[1]))));
  const mappings = item.triples.filter(t => mappingPredicates.has(t.predicate) || ([rdfs + 'subClassOf', rdfs + 'subPropertyOf'].includes(t.predicate) && t.kind === 'NamedNode' && !t.object.startsWith(sdo))).map(t => ({ predicate: t.predicate, object: t.object, file: t.file }));
  const first = firstDeclaration.get(item.name);
  const gitIssues = first ? [...first.message.matchAll(/(?:#|issues\/|pull\/)(\d+)/g)].map(m => Number(m[1])).filter(n => n > 0 && n < 10000) : [];
  return {
    name: item.name, uri: sdo + item.name,
    kind: types.includes(rdf + 'Property') ? 'Property' : types.includes(rdfs + 'Class') ? 'Type' : 'Typed value',
    types, labels: values(item, rdfs + 'label'), definitions: values(item, rdfs + 'comment'),
    parents: values(item, rdfs + 'subClassOf'), domains: values(item, sdo + 'domainIncludes'), ranges: values(item, sdo + 'rangeIncludes'),
    source_files: [...item.files].sort(), sections: values(item, sdo + 'isPartOf'),
    superseded_by: values(item, sdo + 'supersededBy'), acknowledgements, source_links: sources,
    historical_source_links: historical, mappings,
    first_observed_release_snapshot: firstRelease.get(item.name) ?? null,
    first_observed_git_declaration: first ?? null,
    github_issue_numbers: uniq([...github, ...gitIssues]).map(Number).sort((a,b) => a-b),
    attribution_status: acknowledgements.length ? 'Explicit acknowledgement; role described by linked credit' : sources.length || historical.length ? 'Source trail found; individual originator needs interpretation' : first?.baseline_import ? 'Predates available git history; original author unresolved' : 'Git declaration found; original designer not established',
  };
}).sort((a,b) => a.name.localeCompare(b.name));
const typeProperties = records.filter(r => r.kind !== 'Typed value');
const report = {
  generated_at: new Date().toISOString(), cutoff: '2026-09-08', repository_revision: revision,
  engine: '@factoidal/core@0.7.1', source_globs: ['data/*.ttl', 'data/ext/*/*.ttl'],
  counts: { files: sourceFiles.length, triples: all.size, types: records.filter(r=>r.kind === 'Type').length, properties: records.filter(r=>r.kind === 'Property').length, additional_typed_values: extras.length, explicit_acknowledgements: typeProperties.filter(r=>r.acknowledgements.length).length, with_source_trail: typeProperties.filter(r=>r.source_links.length || r.historical_source_links.length).length, with_git_declaration: typeProperties.filter(r=>r.first_observed_git_declaration).length, with_release_snapshot: typeProperties.filter(r=>r.first_observed_release_snapshot).length, linked_github_issues: uniq(records.flatMap(r=>r.github_issue_numbers)).length, history_commits: historyCommits },
  validation: { lexical_declarations: lexicalDeclarations.size, missing_lexical_declarations: missing, sparql_inventory_count: queryNames.size, sparql_set_matches: true, lexical_check_scope: 'One-way subset check; lexical regex is not an independent RDF parser.', sparql_check_scope: 'Factoidal query result compared with iteration over the same Factoidal-parsed dataset.' },
  source_files: fileReport, release_snapshots: snapshotReport,
  caveats: ['Enumeration values are included separately from types and properties.', 'All current source sections, including Pending, meta and attic, are inspected.', 'Earliest available release snapshot is an upper bound, not necessarily first release.', 'Git history starts in January 2014; imported baseline authors are not original vocabulary authors.', 'Acknowledgement of reuse or collaboration does not imply sole authorship.', 'Automatic source examination is not a claim that every historical discussion has been fully interpreted.'],
  terms: records,
};
await writeFile(resolve(out, 'vocabulary-provenance.json'), JSON.stringify(report, null, 2) + '\n');
await writeFile(resolve(out, 'source-files.md'), '# Source files inspected\n\n' + fileReport.map(f => `- ${link(f.path, sourceURL(f.path))} — ${f.triples} triples`).join('\n') + '\n');
console.log(JSON.stringify(report.counts, null, 2));
console.log('Saved data/audit/vocabulary-provenance.json');

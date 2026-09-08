#!/usr/bin/env node
import { parse, query } from '@factoidal/core';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = p => readFile(resolve(root, p), 'utf8');
const json = async p => JSON.parse(await read(p));
const save = (p, s) => writeFile(resolve(root, p), s);
const report = await json('data/audit/vocabulary-provenance.json');
const tree = await json('data/audit/tree.jsonld');
const issues = new Map((await json('data/audit/github-issues.json')).issues.map(i => [i.number, i]));
const events = await json('data/audit/milestones.json');
const sha = s => createHash('sha256').update(s).digest('hex');
const ns = 'https://schema.org/';
const local = s => s?.replace(/^https?:\/\/schema.org\//, '');
const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const rdfs = 'http://www.w3.org/2000/01/rdf-schema#';
const quarter = s => s ? (Number(s.slice(0, 4)) - 2011) * 4 + Math.floor((Number(s.slice(5, 7)) - 1) / 3) : null;
const labelQuarter = q => q === null ? 'Undated early foundation' : `${2011 + Math.floor(q / 4)} Q${q % 4 + 1}`;
const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cell = s => String(s ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

// Validate against the two downloads linked by the developers page. Both RDF
// parsing and the UNION inventory query use Factoidal; string matching below
// is only a cross-check of explicit declarations in these N-Triples files.
const published = {};
for (const scope of ['all', 'current']) {
  const file = `data/audit/published-${scope}-https.nt`;
  const text = await read(file);
  const graph = await parse(text, {format:'ntriples'});
  const rows = await query(graph, `SELECT DISTINCT ?term WHERE { { ?term <${rdf}type> <${rdfs}Class> } UNION { ?term <${rdf}type> <${rdf}Property> } }`);
  const names = new Set(rows.map(r => r.get('term').value).filter(s => /^https?:\/\/schema.org\/[^/]+$/.test(s)).map(local));
  const lexical = new Set([...text.matchAll(/^<https?:\/\/schema.org\/([^>]+)> <http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#type> <http:\/\/www.w3.org\/(?:1999\/02\/22-rdf-syntax-ns#Property|2000\/01\/rdf-schema#Class)>/gm)].map(m=>m[1]));
  if (names.size !== lexical.size || [...names].some(n => !lexical.has(n))) throw new Error(`Factoidal/lexical mismatch: ${scope}`);
  const allNames = new Set([...graph].filter(q => q.predicate.value === rdf+'type' && /^https?:\/\/schema.org\/[^/]+$/.test(q.subject.value)).map(q=>local(q.subject.value)));
  const pinned = await read(`../data/releases/30.0/schemaorg-${scope}-https.nt`);
  published[scope] = { names, allNames, url:`https://schema.org/version/latest/schemaorg-${scope}-https.nt`, triples:graph.size, sha256:sha(text), matches_local_v30_bytes:sha(text)===sha(pinned) };
  console.log(`Published ${scope}: ${names.size} types/properties; Factoidal + declaration cross-check passed`);
}
const auditNames = new Set(report.terms.filter(t=>t.kind!=='Typed value').map(t=>t.name));
const missing = [...published.all.names].filter(n=>!auditNames.has(n));
if (missing.length) throw new Error(`Published vocabulary terms missing from audit: ${missing.join(', ')}`);

const credits = new Map();
for (const file of await readdir(resolve(root, '../data/collab'))) {
  if (!file.endsWith('.md')) continue;
  const text = await read(`../data/collab/${file}`);
  credits.set(file.slice(0,-3), {title:text.match(/^title:\s*(.+)$/m)?.[1] || file.slice(0,-3),
    text:text.split('--- AcknowledgementText.md')[1]?.trim() || '',
    url:`https://github.com/schemaorg/schemaorg/blob/${report.repository_revision}/data/collab/${file}`});
}
const treeParents = new Map(), duplicates = [];
function walk(n, parent=null) {
  if (treeParents.has(n.name)) duplicates.push(n.name);
  else treeParents.set(n.name, parent);
  for (const c of n.children || []) walk(c, n.name);
}
walk(tree);
const allTerms = new Map(report.terms.map(t=>[t.name,t]));
const typeNames = new Set(report.terms.filter(t=>t.kind==='Type').map(t=>t.name));
const missingIssues = new Set();
const terms = report.terms.map(t => {
  const commit=t.first_observed_git_declaration, release=t.first_observed_release_snapshot;
  const creditURIs=[...new Set([...t.acknowledgements,...t.historical_source_links.filter(s=>s.predicate===ns+'contributor').map(s=>s.uri)])];
  const creditRecords=creditURIs.map(uri=>({uri,...credits.get(uri.split('/').at(-1))}));
  const issueRecords=t.github_issue_numbers.flatMap(number=>{
    const i=issues.get(number); if(!i){missingIssues.add(number);return [];}
    return [{number,title:i.title,author:i.author,date:i.created_at.slice(0,10),url:i.url,role:i.pull_request?'Pull request author':'Issue opener',comments_count:i.comments_count}];
  });
  // A cached issue body supplies proposal context, not a claim of invention.
  const context=t.github_issue_numbers.map(n=>issues.get(n)?.body||'').join(' ');
  const category=creditRecords.length?'external':t.mappings.length?'alignment':issueRecords.length?'named':'project';
  const parentCandidates=(t.parents||[]).map(local).filter(n=>typeNames.has(n)&&n!==t.name);
  let parent=t.kind==='Type' ? treeParents.get(t.name) : null;
  if (!typeNames.has(parent)) parent=parentCandidates[0]||null;
  const sourceDate=commit&&!commit.baseline_import?commit.author_date.slice(0,10):null;
  // The first archived release is left-censored: preexisting vocabulary must
  // not be presented as invented in v2.0. Source observation remains separate.
  const releaseDate=release&&release.version!=='2.0'?release.date:null;
  const status=published.current.allNames.has(t.name)?'current':published.all.allNames.has(t.name)?'retired':'checkout';
  const group=commit?.baseline_import?'early-foundation':commit?.hash||'unresolved';
  return {...t,credit_records:creditRecords,issue_records:issueRecords,category,status,parent,
    source_date:sourceDate,source_quarter:quarter(sourceDate),release_date:releaseDate,release_quarter:quarter(releaseDate),
    evidence_group:group,record_path:`data/additions/${group}.md#term-${t.name}`,
    search_context:context.slice(0,12000),
    date_note:commit?.baseline_import?'Present in the January 2014 imported baseline; original introduction quarter is unresolved.':sourceDate?'First observed source declaration; it may precede release and does not establish invention.':'No dated source declaration established.',
  };
});
// A display hierarchy is not the historical multiple-inheritance graph.
for(const t of terms.filter(t=>t.kind==='Type')){
  const seen=new Set([t.name]); let p=t.parent;
  while(p){if(seen.has(p))throw new Error(`Cycle in display hierarchy: ${t.name}`);seen.add(p);p=terms.find(x=>x.name===p)?.parent;}
}
const verification={checked_at:new Date().toISOString(),developers_page:'https://schema.org/docs/developers.html',
  engine:report.engine,published_current_types_properties:published.current.names.size,published_all_types_properties:published.all.names.size,
  published_retired_types_properties:[...published.all.names].filter(n=>!published.current.names.has(n)),
  checkout_only_types_properties:[...auditNames].filter(n=>!published.all.names.has(n)),missing_published_types_properties:missing,
  sources:Object.fromEntries(Object.entries(published).map(([k,{names,allNames,...rest}])=>[k,rest])),
  tree_unique_names:treeParents.size,tree_duplicate_occurrences:duplicates.length,
  tree_supplemented_types:[...typeNames].filter(n=>!treeParents.has(n)),missing_issue_cache_numbers:[...missingIssues],
  attribution_complete:false,attribution_note:'All terms have evidence records. Issue openers and commit authors are not automatically originators; issue comments and unresolved early origins still need interpretation.'};
await save('data/audit/qa-review.json',JSON.stringify(verification,null,2)+'\n');
await save('data/audit/vocabulary-reviewed.json',JSON.stringify({...report,qa:verification,terms},null,2)+'\n');

await mkdir(resolve(root,'data/additions'),{recursive:true});
const groups=Map.groupBy(terms,t=>t.evidence_group);
const index=['# Every vocabulary term: source additions','', '[Growth explorer](../../schemaorg-growth.html) · [Curated projects](../README.md) · [QA report](../audit/qa-review.md)','',
  `${auditNames.size} types/properties and ${terms.length-auditNames.size} typed values. Each term appears once in these records. Grouping follows the first observed source commit, not a claim that one commit is one project or one inventor. The early imported foundation is grouped separately.`, '',
  '| First source observation | Addition / source commit | Types & properties | Other typed values |','|---|---|---:|---:|'];
for(const [group,members] of [...groups].sort((a,b)=>(a[1][0].source_date||'0000').localeCompare(b[1][0].source_date||'0000'))){
  const c=members[0].first_observed_git_declaration;
  const title=group==='early-foundation'?'Early vocabulary foundation':c?.message.split('\n')[0]||'Unresolved source';
  const parts=[`# ${title}`,'','[All additions](README.md) · [Growth explorer](../../schemaorg-growth.html)','',
    group==='early-foundation'?'These terms were imported into the available git history in January 2014. That import date and its author do not establish when or by whom the terms were originally designed.':`First observed source declaration: ${members[0].source_date || 'unresolved'}. ${c?`Recorded commit author: **${c.author}**. [Commit](${c.source}).`:''}`,''];
  for(const t of members){
    parts.push(`<a id="term-${t.name}"></a>`,`## ${t.name}`,'',`${t.kind} · ${t.status} · [Schema.org](${t.uri})`,'',t.definitions.join('\n\n'),'',`Date evidence: ${t.date_note}`,'');
    if(t.first_observed_release_snapshot)parts.push(`Earliest available release snapshot: [${t.first_observed_release_snapshot.version}, ${t.first_observed_release_snapshot.date}](${t.first_observed_release_snapshot.source}). This is an upper bound on introduction.`,'');
    if(t.credit_records.length){parts.push('### Recorded acknowledgements','');for(const cr of t.credit_records)parts.push(`- [${cr.title||cr.uri}](${cr.url||cr.uri}): ${cr.text||'See linked credit.'}`);parts.push('');}
    if(t.issue_records.length){parts.push('### Proposal and implementation trail','');for(const i of t.issue_records)parts.push(`- [#${i.number}: ${i.title}](${i.url}) — ${i.role}: **${i.author}**, opened ${i.date}. The recorded role does not establish original authorship.`);parts.push('');}
    parts.push(`Attribution assessment: ${t.attribution_status}.`,'','Source definitions:', ...t.source_files.map(f=>`- [${f}](https://github.com/schemaorg/schemaorg/blob/${report.repository_revision}/${f})`),'');
    const sources=[...new Set([...t.source_links,...t.historical_source_links.map(s=>s.uri)])];
    if(sources.length)parts.push('Additional source trails:',...sources.map(s=>`- [${s}](${s})`),'');
    if(t.mappings.length)parts.push('External vocabulary mappings:',...t.mappings.map(m=>`- ${m.predicate}: [${m.object}](${m.object})`),'');
  }
  await save(`data/additions/${group}.md`,parts.join('\n')+'\n');
  index.push(`| ${members[0].source_date||'Undated early foundation'} | [${cell(title)}](${group}.md) | ${members.filter(t=>t.kind!=='Typed value').length} | ${members.filter(t=>t.kind==='Typed value').length} |`);
}
await save('data/additions/README.md',index.join('\n')+'\n');
const qaMarkdown=`# QA and completion review\n\nChecked ${verification.checked_at.slice(0,10)}. [Developers page](https://schema.org/docs/developers.html).\n\n| Scope | Types and properties |\n|---|---:|\n| Published current | ${published.current.names.size} |\n| Published all, including retired | ${published.all.names.size} |\n| Checkout, including newer declarations | ${auditNames.size} |\n| Published terms missing from audit | ${missing.length} |\n\nFactoidal ${report.engine} parsed and queried both downloaded N-Triples graphs; explicit N-Triples declaration sets agree. The original SPARQL check compared Factoidal query results with iteration over the same Factoidal-parsed dataset. It was not independent parser verification.\n\nThe downloaded tree contains ${duplicates.length} repeated occurrences. In the optional source and release audit modes, the explorer chooses the first display occurrence per type and supplements ${verification.tree_supplemented_types.length} missing types from RDF parent declarations. All declared parents remain in Term details. Those audit modes project today’s hierarchy through dated evidence. The default Evolution view instead uses the reconstructed historical snapshots, starting with the June 2011 community scrape and preserving archived parent relationships. See the [historical reconstruction notes](../history/README.md).\n\nSource mode animates first observed git declarations. Imported baseline terms remain an undated foundation, and are not counted as newly invented in 2014. Release mode uses earliest available snapshots, leaving v2.0's preexisting vocabulary undated. Neither view establishes precise invention dates.\n\nEvery ${auditNames.size} type/property and ${terms.length-auditNames.size} typed value has a readable record in [additions](../additions/README.md). Recorded acknowledgements and issue/PR authors are connected to terms. Attribution research remains incomplete: issue comments, relayed proposals and pre-git origins require interpretation. The timeline remains a curated selection of 116 milestones rather than an exhaustive history of all contributions.\n\nRetired published terms: ${verification.published_retired_types_properties.join(', ')}.\n\nCheckout additions absent from the published all download: ${verification.checkout_only_types_properties.join(', ')}.\n\nMissing linked issues in the cached issue-body collection: ${[...missingIssues].join(', ')||'none'}.\n`;
await save('data/audit/qa-review.md',qaMarkdown);

const {renderGrowth}=await import('./render_growth.mjs');
await renderGrowth();
console.log(`Built growth explorer and ${groups.size} addition records for ${terms.length} terms.`);

import {parse} from '@factoidal/core';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const root=dirname(fileURLToPath(import.meta.url));
const read=p=>readFile(resolve(root,p),'utf8');
const json=async p=>JSON.parse(await read(p));
const save=(p,data)=>writeFile(resolve(root,p),typeof data==='string'?data:JSON.stringify(data));
const dir='data/history';
await mkdir(dir,{recursive:true});
const report=await json('data/audit/vocabulary-provenance.json');
const current=new Map(report.terms.map(t=>[t.name,t]));
const ns='https://schema.org/';
const local=s=>s?.replace(/^https?:\/\/schema.org\//,'');
const canon=s=>s.replace(/^http:\/\/schema.org\//,ns);
const rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#',rdfs='http://www.w3.org/2000/01/rdf-schema#';
const qOf=date=>(Number(date.slice(0,4))-2011)*4+Math.floor((Number(date.slice(5,7))-1)/3);
const clean=t=>({...t,parents:[...new Set(t.parents)].sort(),domains:[...new Set(t.domains)].sort(),ranges:[...new Set(t.ranges)].sort(),types:[...new Set(t.types||[])].map(local).sort()});
const launchSource='https://github.com/mhausenblas/schema-org-rdf/blob/78fd5887d10c5e1323bd2852af03d41b89840842/all.json';
const launch=await json(`${dir}/sources/2011-06-03.json`);
const initial=Object.entries(launch).flatMap(([section,items])=>Object.values(items).map(t=>clean({name:t.id,kind:section==='properties'?'Property':'Type',parents:t.supertypes||[],domains:t.domains||[],ranges:t.ranges||[],types:[],definition:t.comment_plain||t.comment||''})));
const initialNames=new Set(initial.map(t=>t.name));
const baseline=(await json(`${dir}/sources/2014-baseline.json`)).map(clean);
const baselineMap=new Map(baseline.map(t=>[t.name,t]));
const descendant=(name,ancestor,seen=new Set())=>name===ancestor||(!seen.has(name)&&Boolean(seen.add(name))&&(baselineMap.get(name)?.parents||[]).some(p=>descendant(p,ancestor,seen)));
const releaseURL=v=>`https://schema.org/docs/releases.html#v${v}`;
const overrides=new Map();
function assign(names,date,why,source){for(const name of names)if(!initialNames.has(name))overrides.set(name,{date,why,source});}
function group(roots,date,why,source) {
  const members=new Set(baseline.filter(t=>roots.some(r=>descendant(t.name,r))).map(t=>t.name));
  assign(baseline.filter(t=>members.has(t.name)||t.domains.some(d=>members.has(d))||t.types.some(d=>members.has(local(d)))).map(t=>t.name),date,why,source);
}
// Work backwards from the 2014 file, separating the documented early waves.
// Membership within a wave is inferred from the historical branches/domains.
group(['MedicalEntity','MedicalEnumeration','MedicalSpecialty','MedicalScholarlyArticle'],'2012-06-26','Approximate medical expansion; historical branch and property domains',releaseURL('0.95'));
assign(baseline.filter(t=>(current.get(t.name)?.acknowledgements||[]).some(s=>/GoodRelations/.test(s))).map(t=>t.name),'2012-11-08','Approximate GoodRelations integration; acknowledgement plus baseline membership',releaseURL('0.99'));
group(['SoftwareApplication','Comment'],'2012-04-21','Software and comment additions; historical branch and domains',releaseURL('0.91'));
group(['Dataset','DataCatalog','DataDownload','AlignmentObject','Audience','TechArticle','Code'],'2013-04-05','Approximate datasets, LRMI, audience and technical publishing expansion',releaseURL('1.0a'));
assign(baseline.filter(t=>(current.get(t.name)?.acknowledgements||[]).some(s=>/LRMI/.test(s))).map(t=>t.name),'2013-04-05','LRMI integration; acknowledgement plus baseline membership',releaseURL('1.0a'));
group(['Action'],'2013-08-07','Approximate past-action vocabulary; historical branch and domains',releaseURL('1.0c'));
group(['GovernmentService','ServiceChannel','RadioSeries','RadioEpisode','BroadcastService'],'2013-11-21','Approximate civic-service and broadcasting expansion',releaseURL('1.0d'));
group(['Order','OrderStatus','ParcelDelivery'],'2013-12-04','Approximate order vocabulary expansion',releaseURL('1.0e'));
assign(baseline.filter(t=>/^accessibility/.test(t.name)).map(t=>t.name),'2013-12-04','Accessibility metadata expansion',releaseURL('1.0e'));
assign(['sameAs'],'2013-07-24','Explicit release entry',releaseURL('1.b'));
assign(['additionalType'],'2012-07-18','Explicit release entry',releaseURL('0.96'));
assign(['DateTime','Time'],'2012-07-26','Explicit release entry',releaseURL('0.97'));
assign(['JobPosting','baseSalary','benefits','educationRequirements','employmentType','experienceRequirements','hiringOrganization','incentives','industry','jobLocation','occupationalCategory','qualifications','responsibilities','salaryCurrency','skills','specialCommitments','workHours'],'2011-11-07','Approximate job-posting vocabulary from contemporary announcement','https://blog.schema.org/2011/11/07/schema-org-support-for-job-postings/');
assign('actor album attendee award blogPost colleague contactPoint employee encoding episode event founder map member parent performer photo review season sibling significantLink subEvent track embedUrl contentUrl downloadUrl'.split(' '),'2012-04-21','Singularity / URL spelling release; earlier plural names retained in historical snapshots',releaseURL('0.91'));
const assignments=baseline.filter(t=>!initialNames.has(t.name)).map(t=>({name:t.name,...(overrides.get(t.name)||{date:'2013-12-31',why:'Unresolved within 2011–2013; conservatively placed at end of the pre-git interval',source:'https://github.com/schemaorg/schemaorg/blob/4bf8dda0a6802850ef6e5ff34061fe0ee4584317/schema.rdfa'})}));
const assignmentMap=new Map(assignments.map(t=>[t.name,t]));
await save(`${dir}/early-date-estimates.json`,{launch:{date:'2011-06-03',source:launchSource,sha256:createHash('sha256').update(await read(`${dir}/sources/2011-06-03.json`)).digest('hex')},assignments});

async function readRDF(path) {
  const graph=await parse(await read(path),{format:path.endsWith('.nq')?'nquads':'ntriples'});
  const subjects=new Map();
  for(const quad of graph) {
    if(!/^https?:\/\/schema.org\/[^/]+$/.test(quad.subject.value))continue;
    const name=local(quad.subject.value);
    if(!subjects.has(name))subjects.set(name,[]);
    subjects.get(name).push([canon(quad.predicate.value),quad.object.termType==='NamedNode'?canon(quad.object.value):quad.object.value]);
  }
  const out=[];
  for(const [name,values] of subjects) {
    const get=p=>values.filter(([predicate])=>predicate===p).map(([,v])=>v);
    const types=get(rdf+'type');
    if(!types.length||get(ns+'isPartOf').some(s=>s.includes('attic.schema.org')))continue;
    const kind=types.includes(rdf+'Property')?'Property':types.includes(rdfs+'Class')?'Type':types.some(s=>s.startsWith(ns))?'Typed value':null;
    if(!kind)continue;
    out.push(clean({name,kind,parents:get(rdfs+'subClassOf').map(local).filter(s=>!s.includes('://')),domains:get(ns+'domainIncludes').map(local),ranges:get(ns+'rangeIncludes').map(local),types:types.map(local),definition:get(rdfs+'comment').join('\n\n')}));
  }
  return out;
}
const checkpoints=[];
for(const s of await json(`${dir}/sources/git-snapshots.json`))checkpoints.push({quarter:s.quarter,date:s.date,label:`${s.date} source reconstruction`,confidence:'Approximate release state from archived source',source:`https://github.com/schemaorg/schemaorg/tree/${s.revision}`,records:(await json(`${dir}/sources/${s.file}`)).map(clean)});
for(const s of report.release_snapshots) {
  const records=await readRDF('../'+s.path);
  checkpoints.push({quarter:qOf(s.date),date:s.date,label:`Schema.org ${s.version}`,confidence:'Archived release; carried forward between releases',source:`https://github.com/schemaorg/schemaorg/blob/${report.repository_revision}/${s.path}`,records});
}
checkpoints.sort((a,b)=>a.date.localeCompare(b.date));
const nowRecords=await readRDF('data/audit/published-current-https.nt');
const variants=[],interned=new Map(),snapshots=[],firstSeen={},firstSeenSources={};
function intern(record){const key=JSON.stringify(record);if(!interned.has(key)){interned.set(key,variants.length);variants.push(record);}return interned.get(key);}
for(let quarter=0;quarter<=62;quarter++) {
  const id=`${2011+Math.floor(quarter/4)}-Q${quarter%4+1}`;
  let records,source,label,confidence;
  if(quarter===0){records=[];source=launchSource;label='Before the June 2011 launch';confidence='Schema.org had not launched';}
  else if(quarter<12) {
    const early=new Map(initial.map(t=>[t.name,t]));
    for(const t of baseline) {
      if(initialNames.has(t.name))continue;
      if(qOf(assignmentMap.get(t.name).date)<=quarter)early.set(t.name,t);
    }
    records=[...early.values()];source=quarter===1?launchSource:'data/history/early-date-estimates.json';
    label=quarter===1?'June 2011 community snapshot':`${id} reconstructed vocabulary`;
    confidence=quarter===1?'Contemporary scrape, 3 June 2011; approximate launch snapshot':'Approximate: early additions inferred from release notes and the 2014 baseline';
  } else {
    const checkpoint=checkpoints.filter(s=>s.quarter<=quarter).at(-1);
    ({records,source,label,confidence}=checkpoint);
  }
  if(quarter===62){records=nowRecords;source='https://schema.org/version/latest/schemaorg-current-https.nt';label='Now · published Schema.org 30.0';confidence='Published vocabulary cached 8 September 2026; newer checkout drafts excluded';}
  records=records.map(clean).sort((a,b)=>a.name.localeCompare(b.name));
  const map=new Map(records.map(t=>[t.name,t]));
  // Project the snapshot's own parents, never today's parents. Remove cycles
  // defensively in the display projection and keep all source parents in data.
  const parents=new Map();
  for(const t of records.filter(t=>t.kind==='Type'))parents.set(t.name,t.parents.find(p=>p!==t.name&&map.get(p)?.kind==='Type')||null);
  for(const [name] of parents){const seen=new Set([name]);let p=parents.get(name);while(p){if(seen.has(p)){parents.set(name,null);break;}seen.add(p);p=parents.get(p);}}
  const nodes=new Map([...parents].map(([name,parent])=>[name,{name,'@id':ns+name,parent,children:[]} ]));
  const tree={name:'Vocabulary','@context':{'@vocab':ns},quarter:id,approximation:confidence,source,children:[]};
  for(const [name,node] of nodes){const parent=nodes.get(node.parent);(parent?parent.children:tree.children).push(node);delete node.parent;}
  const prune=n=>{if(!n.children.length)delete n.children;else n.children.forEach(prune);};tree.children.forEach(prune);
  const treePath=`${dir}/${id}.tree.jsonld`;
  await save(treePath,tree);
  for(const t of records)if(firstSeen[t.name]==null){firstSeen[t.name]=quarter;firstSeenSources[t.name]=quarter<12&&assignmentMap.has(t.name)?assignmentMap.get(t.name):{date:quarter===1?'2011-06-03':id,why:confidence,source};}
  snapshots.push({quarter,id,label,confidence,source,treePath,parents:Object.fromEntries(parents),records:records.map(intern),types:records.filter(t=>t.kind==='Type').length,properties:records.filter(t=>t.kind==='Property').length});
}
const history={variants,snapshots,firstSeen,firstSeenSources,launchSource,method:'data/history/README.md'};
await save(`${dir}/history.json`,history);
await save(`${dir}/index.json`,snapshots.map(({records,parents,...s})=>s));
await save(`${dir}/README.md`,`# Reconstructing a shared descriptive language, 2011–2026

The explorer uses a separate D3-compatible tree for every quarter. [Snapshot index](index.json) · [Full vocabulary histories](history.json) · [Early estimates](early-date-estimates.json).

The June 2011 starting point is a [contemporary community scrape](${launchSource}) committed on 3 June, the day after launch. It contains ${initial.filter(t=>t.kind==='Type').length} types and ${initial.filter(t=>t.kind==='Property').length} properties, including historical spellings. These include 287 class nodes and eight datatype nodes. The corresponding RDF is cached in sources/2011-06-03.nt: Factoidal finds 287 rdfs:Class declarations and the same 180 properties; the eight datatype entries are represented separately in that RDF. It is evidence of the early vocabulary, not a guarantee that the scraper captured everything. Credit: the Schema.RDFS.org project of Michael Hausenblas, Richard Cyganiak and collaborators. The archived JSON is cached in sources/2011-06-03.json with its hash recorded in early-date-estimates.json.

For 2012–2013, we work backwards from the January 2014 RDFa source: medical, GoodRelations, LRMI, datasets, actions, software, civic and accessibility terms are placed at documented expansion dates. Individual membership in an expansion is inferred from the baseline hierarchy, property domains and acknowledgements. ${assignments.filter(t=>t.why.startsWith('Unresolved')).length} terms without a specific early assignment are conservatively placed at the end of 2013. These quarters are approximations, not recovered official releases. Earlier definitions and relations are retained for launch terms until the next recovered source snapshot; not every intervening wording change is reconstructed.

For 2014–early 2015, quarter-end source files are structurally extracted from pinned git revisions (see sources/git-snapshots.json). Source code may contain proposals before release, so these are approximate published states. The extractor targets explicit term blocks in these files; it is not a general RDFa parser.

From version 2.0 in 2015 onward, Factoidal parses the archived release RDF. The last release in a quarter supplies its vocabulary, parent relationships, property domains, ranges and definitions. Quarters without a release carry the previous release forward. Attic terms are omitted where marked in the archive; a term can disappear or change parent. Hosted Pending vocabulary is included as part of the published vocabulary and should not be taken as a guarantee of consumer support.

NOW uses the cached published current vocabulary, version 30.0, checked 8 September 2026. Newer unreleased checkout drafts are excluded from this historical comparison. Source-observation and earliest-release audit modes remain available separately.

The phrasebook compares dedicated vocabulary patterns, not what humans could say in prose. A generic description could always carry free text. Example descriptions are invented illustrations; they are not claims about real people, products or events. Plain-language triples are used throughout so a 2011 vocabulary example does not imply that JSON-LD was supported then.

Rebuild: python3 prepare_history.py (uses the local git history and cached 2011 scrape), then node build_history.mjs, then npm run growth. Each tree carries its evidence source and approximation note. Today’s hierarchy is never silently substituted for an archived hierarchy in reconstructed-history mode.
`);
console.log(`Built ${snapshots.length} historical trees; launch ${snapshots[1].types} types/${snapshots[1].properties} properties; now ${snapshots[62].types}/${snapshots[62].properties}; ${variants.length} distinct term versions.`);

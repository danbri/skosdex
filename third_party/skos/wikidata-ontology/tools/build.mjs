// Build the Wikidata ontology-layer named graph as FAITHFUL RDFS/OWL — NOT SKOS.
// Wikidata's ontology vocabulary has genuine structural predicates (P31 instance
// of ~ rdf:type, P279 subclass of ~ rdfs:subClassOf, P1647 subproperty of ~
// rdfs:subPropertyOf) plus equivalence links (P1628 equivalent property, P1709
// equivalent class, P2235/P2236 external super/subproperty). We translate each
// to its standard W3C/OWL predicate so the graph reads as real ontology data,
// and add rdfs:label + rdf:type (owl:ObjectProperty / owl:Class) so the items
// are still indexable. One-time federated extract via QLever (qlever.dev).
import fs from 'node:fs';
const dir = new URL('../cache/', import.meta.url).pathname;
const RDF='http://www.w3.org/1999/02/22-rdf-syntax-ns#', RDFS='http://www.w3.org/2000/01/rdf-schema#',
      OWL='http://www.w3.org/2002/07/owl#';
const clean=t=>t.replace(/^<|>$/g,'');
const labels=new Map();
for(const f of ['plabels.tsv','clabels.tsv']) for(const ln of fs.readFileSync(dir+f,'utf8').split('\n').slice(1)){
  const i=ln.indexOf('\t'); if(i<0)continue; const m=ln.slice(i+1).match(/^"(.*)"(@\w+)?$/);
  labels.set(clean(ln.slice(0,i)), m?m[1]:ln.slice(i+1));
}
const out=fs.createWriteStream(new URL('../source.nt', import.meta.url).pathname);
const esc=s=>s.replace(/[\\"]/g,c=>'\\'+c).replace(/\n/g,'\\n');
const T=(s,p,o)=>out.write(`<${s}> <${p}> ${o.startsWith('"')?o:'<'+o+'>'} .\n`);
const seen=new Set(), props=new Set(), classes=new Set();
// edges: file -> predicate, and which side is prop vs class
const edges=[
  ['p1628.tsv', OWL+'equivalentProperty', 'prop'],
  ['p1709.tsv', OWL+'equivalentClass',    'class'],
  ['p1647.tsv', RDFS+'subPropertyOf',     'prop'],
  ['p279.tsv',  RDFS+'subClassOf',        'class'],
  ['p2235.tsv', RDFS+'subPropertyOf',     'prop'],  // external superproperties (this prop subPropertyOf external)
  ['p2236.tsv', RDFS+'subPropertyOf',     'prop'],  // external subproperties (inverse dir kept simple)
];
for(const [f,pred,kind] of edges){
  for(const ln of fs.readFileSync(dir+f,'utf8').split('\n').slice(1)){
    const i=ln.indexOf('\t'); if(i<0)continue;
    const s=clean(ln.slice(0,i)), o=clean(ln.slice(i+1));
    if(!s.startsWith('http://www.wikidata.org/entity/'))continue;
    T(s,pred,o);
    (kind==='prop'?props:classes).add(s);
  }
}
// typing + labels for every Wikidata subject we touched
for(const s of props){ T(s,RDF+'type',OWL+'ObjectProperty'); if(labels.has(s))T(s,RDFS+'label',`"${esc(labels.get(s))}"@en`); }
for(const s of classes){ T(s,RDF+'type',OWL+'Class'); if(labels.has(s))T(s,RDFS+'label',`"${esc(labels.get(s))}"@en`); }
out.end(()=>console.log(`ontology graph: ${props.size} properties, ${classes.size} classes`));

import fs from 'node:fs';
const dir='third_party/skos/wikidata-ontology/cache';
const SKOS='http://www.w3.org/2004/02/skos/core#';
const SCHEME='https://danbri.org/skosdex/wikidata-ontology';
const clean=t=>t.replace(/^<|>$/g,'');
const labels=new Map();
for(const f of ['plabels.tsv','clabels.tsv']){
  for(const line of fs.readFileSync(`${dir}/${f}`,'utf8').split('\n').slice(1)){
    const i=line.indexOf('\t'); if(i<0)continue;
    const p=line.slice(0,i), l=line.slice(i+1);
    const lit=l.match(/^"(.*)"(@\w+)?$/); labels.set(clean(p), lit?lit[1]:l);
  }
}
const subj=new Map();
for(const f of ['p1628.tsv','p1709.tsv']){
  for(const line of fs.readFileSync(`${dir}/${f}`,'utf8').split('\n').slice(1)){
    const i=line.indexOf('\t'); if(i<0)continue;
    const su=clean(line.slice(0,i)), ou=clean(line.slice(i+1));
    if(!su.startsWith('http://www.wikidata.org/entity/'))continue;
    (subj.get(su)||subj.set(su,new Set()).get(su)).add(ou);
  }
}
const out=fs.createWriteStream(`${dir}/source.nt`);
let concepts=0,matches=0;
const esc=s=>s.replace(/[\\"]/g,c=>'\\'+c).replace(/\n/g,'\\n');
for(const [uri,equivs] of subj){
  out.write(`<${uri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <${SKOS}Concept> .\n`);
  out.write(`<${uri}> <${SKOS}inScheme> <${SCHEME}> .\n`);
  out.write(`<${uri}> <${SKOS}prefLabel> "${esc(labels.get(uri)||uri.split('/').pop())}"@en .\n`);
  out.write(`<${uri}> <${SKOS}notation> "${uri.split('/').pop()}" .\n`);
  for(const e of equivs){ out.write(`<${uri}> <${SKOS}exactMatch> <${e}> .\n`); matches++; }
  concepts++;
}
out.end(()=>console.log(`${concepts} concepts, ${matches} exactMatch links`));

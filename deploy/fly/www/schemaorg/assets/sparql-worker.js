import {query} from './vendor/factoidal-0.7.1/browser.js';

const schema='https://schema.org/';
const rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const rdfs='http://www.w3.org/2000/01/rdf-schema#';
const uri=value=>value.startsWith('http:')||value.startsWith('https:')?value:value.startsWith('rdf:')?rdf+value.slice(4):value.startsWith('rdfs:')?rdfs+value.slice(5):schema+value.replace(/^schema:/,'');
function nquads(records,graph){
  const lines=[];
  const byName=new Map(records.map(t=>[t.name,t]));
  const add=(name,p,o,literal=false)=>lines.push(`<${schema+name}> <${p}> ${literal?JSON.stringify(o):'<'+uri(o)+'>'} <urn:timeline:${graph}> .`);
  for(const t of records){
    add(t.name,rdf+'type',t.kind==='Type'?rdfs+'Class':t.kind==='Property'?rdf+'Property':t.types[0]||schema+'Enumeration');
    add(t.name,rdfs+'label',t.name,true);
    if(t.definition)add(t.name,rdfs+'comment',t.definition,true);
    for(const parent of t.parents)add(t.name,rdfs+'subClassOf',parent);
    // Explicit reflexive ancestry avoids recursive property-path evaluation in the engine.
    if(t.kind==='Type'){
      const seen=new Set(),pending=[t.name];
      while(pending.length){const name=pending.pop();if(seen.has(name))continue;seen.add(name);add(t.name,'urn:timeline:ancestor',schema+name);pending.push(...(byName.get(name)?.parents||[]));}
    }
    for(const domain of t.domains)add(t.name,schema+'domainIncludes',domain);
    for(const range of t.ranges)add(t.name,schema+'rangeIncludes',range);
  }
  return lines.join('\n');
}
self.onmessage=async ({data})=>{
  try{
    const started=performance.now();
    const dataset=nquads(data.then,'then')+'\n'+nquads(data.now,'now');
    self.postMessage({type:'progress',text:'Running @factoidal/core locally…'});
    const result=await query(dataset,data.query,{dataFormat:'nquads',output:'json'});
    self.postMessage({type:'result',result,ms:Math.round(performance.now()-started),quarter:data.quarter});
  }catch(error){self.postMessage({type:'error',message:error.message});}
};

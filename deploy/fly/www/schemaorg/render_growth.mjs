import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const root=dirname(fileURLToPath(import.meta.url));
const read=p=>readFile(resolve(root,p),'utf8');
export async function renderGrowth(){
  const report=JSON.parse(await read('data/audit/vocabulary-reviewed.json'));
  const payload={meta:report.qa,history:JSON.parse(await read('data/history/history.json')),terms:report.terms.map(t=>({...t,search_context:t.search_context.slice(0,1500)})),events:JSON.parse(await read('data/audit/milestones.json')),tree_source:'https://schema.org/docs/tree.jsonld',cutoff:report.cutoff};
  const embeds={DATA:JSON.stringify(payload).replaceAll('<','\\u003c'),D3:await read('assets/vendor/d3.v7.9.0.min.js'),APP:await read('assets/growth.js'),CSS:await read('assets/growth.css')};
  const output=(await read('assets/growth-shell.html')).replace(/\/\* EMBED_(DATA|D3|APP|CSS) \*\//g,(_,key)=>embeds[key]);
  await writeFile(resolve(root,'schemaorg-growth.html'),output);
  console.log('Rendered explorer from cached audited data and historical snapshots.');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await renderGrowth();

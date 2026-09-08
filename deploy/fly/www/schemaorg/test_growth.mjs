import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {chromium} from 'playwright';
const html=await readFile(new URL('./schemaorg-growth.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,2);
for(const s of scripts)new vm.Script(s[1]);
const data=JSON.parse(html.match(/<script id="growth-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const history=data.history;
const records=q=>history.snapshots[q].records.map(id=>history.variants[id]);
assert.equal(history.snapshots.length,63);
assert.equal(history.snapshots[1].types,295);
assert.equal(history.snapshots[1].properties,180);
const launch=new Map(records(1).map(t=>[t.name,t]));
assert.ok(launch.has('actors')&&!launch.has('actor'),'Historical plural spellings are preserved');
assert.ok(!launch.has('MedicalEntity')&&!launch.has('Action')&&!launch.has('Dataset'));
assert.equal(history.firstSeen.MedicalEntity,5);
assert.equal(history.firstSeen.Dataset,9);
assert.equal(history.firstSeen.Action,10);
assert.ok(history.firstSeen.VirtualLocation>=36);
assert.ok(records(1).find(t=>t.name==='Thing').definition.includes('generic'));
for(const snapshot of history.snapshots){
 const names=new Set(records(snapshot.quarter).filter(t=>t.kind==='Type').map(t=>t.name));
 const tree=JSON.parse(await readFile(new URL('./'+snapshot.treePath,import.meta.url),'utf8'));
 const found=[]; const walk=n=>{if(n.name!=='Vocabulary')found.push(n.name);for(const c of n.children||[])walk(c);};walk(tree);
 assert.deepEqual(found.sort(),[...names].sort(),snapshot.id+' exports every type exactly once');
 for(const name of names){const seen=new Set([name]);let parent=snapshot.parents[name];while(parent){assert.ok(names.has(parent));assert.ok(!seen.has(parent),'Acyclic historical tree');seen.add(parent);parent=snapshot.parents[parent];}}
}
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[],externalRequests=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8000/'))externalRequests.push(r.url());});
 await page.goto('http://127.0.0.1:8000/schemaorg-growth.html');
 const count=async id=>Number((await page.locator('#'+id).textContent()).replaceAll(',',''));
 const seek=async q=>{await page.locator('#quarter').fill(String(q));await page.locator('#quarter').dispatchEvent('input');await page.waitForTimeout(750);};
 const names=()=>page.locator('.tree-node').evaluateAll(ns=>ns.map(n=>n.dataset.name).sort());
 assert.equal(await page.locator('#quarter-label').textContent(),'2011 Q2');assert.equal(await count('type-count'),295);assert.equal(await count('property-count'),180);
 assert.equal(await page.locator('h1').innerText(),'schema.org timeline');assert.ok(await page.locator('#tree').isVisible());
 assert.equal(await page.getByText('Read the words',{exact:true}).count(),0);
 await page.waitForTimeout(500);
 const visual=await page.locator('#visual').boundingBox(),ticker=await page.locator('#history-ticker').boundingBox();
 assert.ok(ticker.y>=visual.y+visual.height,'Ticker never covers the visual');
 assert.ok(ticker.y+ticker.height<=768,'Visual and ticker fit on the laptop');
 assert.ok(await page.locator('.ticker-words').evaluateAll(ns=>ns.every(n=>parseFloat(getComputedStyle(n).fontSize)>=21)));
 const oldTransform=await page.locator('#tree>g').getAttribute('transform');
 const bounds=await page.locator('#tree').boundingBox();
 // Add space by opening Sources and returning to the graph after a wheel test.
 await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.wheel(0,180);await page.waitForTimeout(150);
 assert.equal(await page.locator('#tree>g').getAttribute('transform'),oldTransform,'Wheel does not zoom the graph');
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.locator('#zoom-in').click();await page.waitForTimeout(400);assert.notEqual(await page.locator('#tree>g').getAttribute('transform'),oldTransform);
 await page.locator('#fit-view').click();await page.waitForTimeout(400);
 let geometry;
 for(const layout of ['tree','cluster','treemap']){
  await page.locator('#graph-view').selectOption(layout);await page.waitForTimeout(500);
  const next=await page.locator('.tree-node[data-name="Person"]').getAttribute('transform');
  if(geometry)assert.notEqual(next,geometry,'Layout changes actual geometry');geometry=next;
  assert.deepEqual(await names(),records(1).filter(t=>t.kind==='Type').map(t=>t.name).sort());
  await page.screenshot({path:'/tmp/schemaorg-'+layout+'-2011.png',fullPage:true});
 }
 await page.locator('#graph-view').selectOption('tree');
 for(const q of [3,5,7,9,10,11,12,17,36,62,1]){await seek(q);assert.deepEqual(await names(),records(q).filter(t=>t.kind==='Type').map(t=>t.name).sort(),'Historical membership '+q);}
 await seek(2);await page.locator('#play').click();
 await page.waitForSelector('.tree-node[data-name="JobPosting"].arriving',{state:'attached'});
 const job=page.locator('.tree-node[data-name="JobPosting"]');
 assert.ok(['left','right','top','bottom'].includes(await job.getAttribute('data-entry-edge')));
 const moving=await job.getAttribute('transform');await page.waitForTimeout(100);assert.notEqual(await job.getAttribute('transform'),moving,'New blob actually flies inward');
 await page.waitForFunction(()=>[...document.querySelectorAll('.ticker-words')].some(n=>n.textContent==='JobPosting'));
 await page.locator('#play').click();await page.waitForTimeout(500);const paused=await page.locator('#quarter-label').innerText();await page.waitForTimeout(800);assert.equal(await page.locator('#quarter-label').innerText(),paused);
 await seek(1);await page.locator('#tab-quarter').click();assert.ok(await page.locator('#panel-quarter').isVisible());assert.ok(!(await page.locator('#tree').isVisible()));
 for(const id of ['events','shopping','learning','science','health','claims']){await page.locator('#scenario').selectOption(id);assert.ok(await page.locator('#phrasebook .now code').count());}
 await page.locator('#scenario').selectOption('health');assert.match(await page.locator('#phrasebook .then').innerText(),/generic thing/);await seek(5);assert.match(await page.locator('#phrasebook .then').innerText(),/dedicated medical/);
 await page.locator('#tab-results').click();await page.getByRole('searchbox').fill('MedicalEntity');await page.locator('#results-list [data-term="MedicalEntity"]').click();assert.equal(await page.locator('#panel-selection h2').innerText(),'MedicalEntity');
 await page.locator('#tab-results').click();await page.locator('#clear-filters').click();assert.equal(await page.locator('#results-list .term-button').count(),9);const first=await page.locator('#results-list').innerText();await page.locator('#more-results').click();assert.notEqual(await page.locator('#results-list').innerText(),first);
 await seek(1);await page.locator('#tab-sparql').click();
 for(const id of ['counts','new-words','event-properties','new-medical','parents','old-words']){
  await page.locator('#query-example').selectOption(id);await page.locator('#run-query').click();await page.waitForFunction(()=>!document.getElementById('run-query').disabled,null,{timeout:30000});
  const status=await page.locator('#query-status').innerText(),results=await page.locator('#query-results').innerText();
  assert.ok(!status.startsWith('Query error'),id+': '+status);assert.match(status,/@factoidal\/core 0.7.1/);
  if(id==='counts'){assert.equal(await page.locator('#query-results tbody tr').count(),4);for(const n of ['295','180','933','1521'])assert.ok(results.includes(n));}
  if(id==='event-properties')assert.ok(results.includes('eventAttendanceMode'));
  if(id==='new-medical')assert.ok(results.includes('MedicalEntity'));
 }
 await page.locator('#query-editor').fill('this is not SPARQL');await page.locator('#run-query').click();await page.waitForFunction(()=>!document.getElementById('run-query').disabled);assert.match(await page.locator('#query-status').innerText(),/Query error/);
 await page.locator('#query-example').selectOption('counts');await page.locator('#run-query').click();await page.locator('#cancel-query').click();assert.equal(await page.locator('#query-status').innerText(),'Cancelled.');
 await page.locator('#tab-settings').click();await page.locator('#date-mode').selectOption('source');await seek(62);assert.equal(await count('type-count'),data.terms.filter(t=>t.kind==='Type'&&t.status!=='retired'&&(t.source_quarter==null||t.source_quarter<=62)).length);
 await page.locator('#date-mode').selectOption('release');await page.locator('#date-mode').selectOption('history');await seek(1);
 await page.locator('#tab-graph').click();await page.screenshot({path:'/tmp/schemaorg-final-laptop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(400);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/tmp/schemaorg-final-mobile.png',fullPage:true});
 await page.setViewportSize({width:683,height:384});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% reflow');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.locator('#go-now').click();assert.equal(await count('type-count'),history.snapshots[62].types);
 assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[],'SPARQL and page assets use only the local server');
 console.log('PASS: 63 historical trees, 2011 start, all D3 layouts, flying nodes + synchronized names, no ticker overlap, laptop fit, scroll behavior, then/now, vocabulary pagination, six real Factoidal queries, query error/cancel, audit modes, mobile, 200% reflow, reduced motion, no external requests.');
}finally{await browser.close();}

(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('growth-data').textContent);
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const local = s => s.replace(/^https?:\/\/schema.org\//, '');
  const link = (url, title) => /^(https?:\/\/|data\/)/.test(url || '') ? `<a href="${esc(url)}">${esc(title)}</a>` : esc(title);
  const fmt = n => n.toLocaleString();
  const quarterOf = date => (Number(date.slice(0,4))-2011)*4 + Math.floor((Number(date.slice(5,7))-1)/3);
  const maxQuarter = quarterOf(data.cutoff);
  const quarterLabel = q => `${2011+Math.floor(q/4)} Q${q%4+1}`;
  const tabNames=['graph','quarter','results','sparql','settings','about','selection'];
  let quarter = 1, selected = null, timer = null, resultOffset = 0, mapOffset = 0;
  const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 360;
  const auditTerms=data.terms, auditMap=new Map(auditTerms.map(t=>[t.name,t]));
  const historyCache=new Map();
  const isHistory=()=>$('date-mode').value==='history';
  function historyTerms(q) {
    if(historyCache.has(q))return historyCache.get(q);
    const snapshot=data.history.snapshots[q];
    const result=snapshot.records.map(id=>{
      const v=data.history.variants[id], original=auditMap.get(v.name);
      return {...original,name:v.name,uri:'https://schema.org/'+v.name,kind:v.kind,definitions:[v.definition],parents:v.parents.map(n=>'https://schema.org/'+n),parent:snapshot.parents[v.name]||null,domains:v.domains.map(n=>'https://schema.org/'+n),ranges:v.ranges.map(n=>'https://schema.org/'+n),types:v.types.map(n=>n.includes(':')?n:'https://schema.org/'+n),
        category:original?.category||'project',status:'Historical snapshot',credit_records:original?.credit_records||[],issue_records:original?.issue_records||[],mappings:original?.mappings||[],record_path:original?.record_path||snapshot.treePath,
        snapshot_source:snapshot.source,snapshot_note:snapshot.confidence,date_note:data.history.firstSeenSources[v.name]?.why||snapshot.confidence,historical_quarter:data.history.firstSeen[v.name],
        attribution_status:original?.attribution_status||'Historical vocabulary record; no present-day attribution record.'};
    });
    historyCache.set(q,result);return result;
  }
  let terms=historyTerms(quarter),byName=new Map(terms.map(t=>[t.name,t]));
  const historicalKinds=new Map(data.history.variants.map(t=>[t.name,t.kind]));
  const historicalBirths=Object.entries(data.history.firstSeen).map(([name,q])=>({name,q,kind:historicalKinds.get(name)}));
  const colors = {external:['#d7eddf','#77a48a'], alignment:['#ffedc9','#c2a469'], named:['#e2e7fb','#939ec4'], project:['#e7edeb','#9daea4']};
  const labels = {external:'Acknowledged collaboration',alignment:'Vocabulary alignment',named:'Named issue / PR author',project:'Other / unresolved'};
  const searchText = new Map(auditTerms.map(t => [t.name, [t.name,...t.credit_records.map(c=>`${c.title} ${c.text}`),...t.issue_records.map(i=>`${i.author} ${i.title}`), t.search_context, t.first_observed_git_declaration?.author].join(' ').toLowerCase()]));
  function topBranch(name) {
    let t = byName.get(name), seen = new Set();
    while(t?.parent && t.parent !== 'Thing' && !seen.has(t.name)) { seen.add(t.name); t = byName.get(t.parent); }
    return t?.types?.some(n=>local(n)==='DataType')?'DataType':t?.name;
  }
  const branches = [...new Set([...auditTerms.filter(t=>t.parent==='Thing').map(t=>t.name),...terms.filter(t=>t.parent==='Thing').map(t=>t.name)])].sort();
  branches.forEach(name => $('branch').add(new Option(name,name)));
  $('branch').add(new Option('Data types','DataType'));
  function inBranch(t, branch) {
    if(branch==='all') return true;
    const names = t.kind==='Type' ? [t.name] : t.kind==='Property' ? t.domains.map(local) : t.types.map(local);
    return names.some(n=>topBranch(n)===branch);
  }
  const dateQuarter = t => isHistory()?data.history.firstSeen[t.name]:t[$('date-mode').value+'_quarter'];
  function matches(t) {
    return (isHistory() || $('show-retired').checked || t.status!=='retired') &&
      ($('show-checkout').checked || t.status!=='checkout') &&
      ($('category').value==='all' || t.category===$('category').value) &&
      inBranch(t,$('branch').value) &&
      (!$('term-search').value.trim() || ((searchText.get(t.name)||t.name.toLowerCase())+' '+t.definitions.join(' ').toLowerCase()).includes($('term-search').value.trim().toLowerCase()));
  }
  function observed(t) {
    if(isHistory())return !$('only-new').checked||dateQuarter(t)===quarter;
    const q = dateQuarter(t);
    return q==null ? $('show-foundation').checked && !$('only-new').checked : $('only-new').checked ? q===quarter : q<=quarter;
  }
  function tab(name) {
    for(const id of tabNames) {
      $('tab-'+id).setAttribute('aria-selected', String(id===name));
      $('tab-'+id).tabIndex = id===name ? 0 : -1;
      $('panel-'+id).hidden = id!==name;
    }
  }
  function termButton(t) {
    return `<button class="term-button" data-term="${esc(t.name)}"><span class="term-title"><i class="dot ${t.category}"></i>${esc(t.name)}</span><span class="term-meta">${esc(t.kind)}</span></button>`;
  }
  function tags(names) {
    return `<div class="tags">${names.map(local).map(n => byName.has(n) ? `<button data-term="${esc(n)}">${esc(n)}</button>` : esc(n)).join(' ')}</div>`;
  }
  function selectTerm(name) {
    const t=byName.get(name)||historyTerms(maxQuarter).find(t=>t.name===name)||auditMap.get(name); if(!t) return;
    selected=name;
    const c=t.first_observed_git_declaration, r=t.first_observed_release_snapshot;
    $('selection-dot').textContent='●';
    $('panel-selection').innerHTML=`<p class="eyebrow">${esc(labels[t.category])}</p><h2>${esc(t.name)}</h2><span class="type-badge">${esc(t.kind)}</span><span class="type-badge">${esc(t.status)}</span><p class="detail-definition">${esc(t.definitions.join('\n\n'))}</p>
      <div class="detail-actions">${link(t.uri,'Schema.org ↗')} ${link(t.record_path,'Full evidence record ↗')}${dateQuarter(t)!=null && dateQuarter(t)>=0 && dateQuarter(t)<=maxQuarter ? '<button id="jump-date">Go to observed quarter</button>':''}</div>
      <h3>${isHistory()?'HISTORICAL WORDING AND RELATIONSHIPS':'DATE EVIDENCE'}</h3>${isHistory()?`<p>${esc(t.snapshot_note||'Present-day term record')}. ${link(t.snapshot_source,'Snapshot source')}</p><p>First reconstructed appearance: ${dateQuarter(t)!=null?quarterLabel(dateQuarter(t)):'Unresolved'}. ${esc(t.date_note)}</p>`:`<p>${esc(t.date_note)}</p><dl class="detail-dates"><dt>Source</dt><dd>${esc(t.source_date||'Undated foundation')}</dd><dt>First snapshot</dt><dd>${r?link(r.source,`${r.version} · ${r.date}`):'Unresolved'}</dd></dl>`}
      ${t.parents.length?'<h3>DECLARED PARENTS</h3>'+tags(t.parents):''}${t.domains.length?'<h3>USED ON</h3>'+tags(t.domains):''}${t.ranges.length?'<h3>EXPECTED VALUES</h3>'+tags(t.ranges):''}
      <h3>ACKNOWLEDGEMENTS</h3>${t.credit_records.length?t.credit_records.map(cr=>`<div class="credit">${link(cr.url||cr.uri,cr.title||cr.uri)}<p>${esc(cr.text)}</p></div>`).join(''):'<p>No explicit acknowledgement recorded for this term.</p>'}
      <h3>PROPOSAL AND IMPLEMENTATION</h3>${t.issue_records.map(i=>`<div class="source-item">${link(i.url,`#${i.number}: ${i.title}`)}<p>${esc(i.role)}: ${esc(i.author)} · ${esc(i.date)}</p></div>`).join('')}
      ${c?`<div class="source-item">${link(c.source,c.message.split('\n')[0])}<p>Recorded commit author: ${esc(c.author)}. This does not establish original authorship.</p></div>`:''}<p>${esc(t.attribution_status)}</p>
      ${t.mappings.length?'<h3>VOCABULARY MAPPINGS</h3>'+t.mappings.map(m=>`<p>${link(m.object,m.object)}</p>`).join(''):''}`;
    if($('jump-date')) $('jump-date').onclick=()=>{pause();setQuarter(dateQuarter(t));};
    nodes.classed('selected',d=>d.data.name===selected);
    tab('selection');
  }
  document.querySelector('.explorer').addEventListener('click', e=>{
    const button=e.target.closest('[data-term]'); if(button) selectTerm(button.dataset.term);
  });
  for(const name of tabNames) $('tab-'+name).onclick=()=>tab(name);
  document.querySelector('.sidebar-tabs').addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault(); const ids=tabNames;
    const index=ids.indexOf(e.target.id.replace('tab-',''));
    const next=e.key==='Home'?0:e.key==='End'?ids.length-1:(index+(e.key==='ArrowRight'?1:ids.length-1))%ids.length;
    tab(ids[next]); $('tab-'+ids[next]).focus();
  });
  const svg=d3.select('#tree'), scene=svg.append('g');
  let zoomScale=1;
  const zoom=d3.zoom().scaleExtent([0.6,12]).filter(e=>e.type==='wheel'?(e.ctrlKey||e.metaKey):!e.button&&e.type!=='dblclick'&&!e.type.startsWith('touch'))
    .on('zoom',e=>{zoomScale=e.transform.k;scene.attr('transform',e.transform);updateLabels();});
  svg.call(zoom);
  const linkLayer=scene.append('g'), nodeLayer=scene.append('g');
  let nodes=nodeLayer.selectAll('g.tree-node');
  let graphQuarter=null,graphMode=null,storyDuration=0,flightTimers=[];
  const clearFlights=()=>{flightTimers.forEach(clearTimeout);flightTimers=[];};
  const radialLink=d3.linkRadial().angle(d=>d.x).radius(d=>d.y);
  const transform=p=>`translate(${Math.sin(p.x)*p.y},${-Math.cos(p.x)*p.y})`;
  function drawBranchMap(visible) {
    const types=visible.filter(t=>t.kind==='Type');
    const groups=d3.group(types,t=>topBranch(t.name)||'Other types');
    const focused=$('branch').value!=='all'||$('term-search').value.trim()||$('category').value!=='all';
    const entries=focused?types.map(t=>({name:t.name,members:[t],kind:'term'})):[...groups].filter(([name])=>name!=='Thing').map(([name,members])=>({name,members,kind:'branch'}));
    entries.sort((a,b)=>a.name.localeCompare(b.name));
    mapOffset=Math.min(mapOffset,Math.max(0,Math.floor((entries.length-1)/9)*9));
    const visibleEntries=entries.slice(mapOffset,mapOffset+9);
    const list=d3.select('#branch-map');
    list.selectAll('.map-heading').data(focused?[null]:[]).join('div').attr('class','map-heading').html(`<button id="map-all">← All branches</button><span>${fmt(types.length)} types</span>`);
    if($('map-all'))$('map-all').onclick=()=>{$('clear-filters').click();};
    const grid=list.selectAll('.branch-grid').data([null]).join('div').attr('class','branch-grid');
    const cards=grid.selectAll('.branch-card').data(visibleEntries,d=>d.name);
    cards.exit().remove();
    const enter=cards.enter().append('button').attr('class','branch-card').style('opacity',0);
    enter.append('strong').attr('class','branch-name');enter.append('span').attr('class','branch-count');enter.append('span').attr('class','branch-additions');
    const merged=enter.merge(cards).attr('data-branch',d=>d.name).attr('aria-label',d=>d.kind==='branch'?`Explore ${d.name}: ${d.members.length} types`:`Inspect ${d.name}`)
      .classed('branch-added',d=>quarter>1&&d.members.some(t=>dateQuarter(t)===quarter)).on('click',(e,d)=>{
        if(d.kind==='term'){selectTerm(d.name);return;}
        if(![...$('branch').options].some(o=>o.value===d.name))$('branch').add(new Option(d.name,d.name));
        $('branch').value=d.name;mapOffset=0;resultOffset=0;render();
      });
    merged.select('.branch-name').text(d=>d.name==='DataType'?'Data types':d.name);
    merged.select('.branch-count').text(d=>d.kind==='branch'?`${fmt(d.members.length)} ${d.members.length===1?'type':'types'}`:labels[d.members[0].category]);
    merged.select('.branch-additions').text(d=>{
      const n=d.members.filter(t=>dateQuarter(t)===quarter).length;
      return quarter>1&&n?`+${n} this quarter`:'';
    });
    merged.interrupt().transition().duration(duration).style('opacity',1);
    list.selectAll('.map-pages').data(entries.length>9?[null]:[]).join('div').attr('class','map-pages').html(`<button id="map-previous" ${mapOffset===0?'disabled':''}>Previous branches / words</button><span>${mapOffset+1}–${Math.min(mapOffset+9,entries.length)} of ${entries.length}</span><button id="map-next" ${mapOffset+9>=entries.length?'disabled':''}>Next</button>`);
    if($('map-next'))$('map-next').onclick=()=>{mapOffset+=9;drawBranchMap(visible);};
    if($('map-previous'))$('map-previous').onclick=()=>{mapOffset=Math.max(0,mapOffset-9);drawBranchMap(visible);};
  }
  function drawTree(visible) {
    const typeRows=terms.filter(t=>t.kind==='Type').map(t=>({name:t.name,parent:t.parent||'__root__',term:t}));
    const shown=new Set(visible.filter(t=>t.kind==='Type').map(t=>t.name));
    // Build each quarter from observed types only. Missing/future parents do
    // not become premature nodes; connect to the closest observed ancestor.
    const rows=typeRows.filter(t=>shown.has(t.name)).map(t=>{
      let parent=t.parent;
      while(parent!=='__root__'&&!shown.has(parent)) parent=byName.get(parent)?.parent||'__root__';
      return {...t,parent};
    });
    const root=d3.stratify().id(d=>d.name).parentId(d=>d.parent)([{name:'__root__',parent:null},...rows]);
    root.sort((a,b)=>a.data.name.localeCompare(b.data.name));
    // The same absolute scale makes the expanding vocabulary visibly larger.
    const focused=$('branch').value!=='all'||$('term-search').value.trim()||$('category').value!=='all';
    const radius=focused?225:190+35*Math.sqrt(rows.length/Math.max(1,historyTerms(maxQuarter).filter(t=>t.kind==='Type').length));
    const layout=$('graph-view').value;
    if(layout==='treemap') {
      root.sum(d=>d.term?1:0);
      const box=$('tree').getBoundingClientRect(),screenScale=Math.min(box.width/860,box.height/490)||1;
      d3.treemap().tile(d3.treemapResquarify).size([780,420]).paddingOuter(2).paddingInner(2).paddingTop(22/screenScale)(root);
      for(const d of root.descendants()) {
        const x=(d.x0+d.x1)/2-390,y=(d.y0+d.y1)/2-210;
        d.x=(Math.atan2(x,-y)+2*Math.PI)%(2*Math.PI);d.y=Math.hypot(x,y);
        d.boxWidth=Math.max(1,d.x1-d.x0);d.boxHeight=Math.max(1,d.y1-d.y0);
      }
    } else (layout==='cluster'?d3.cluster():d3.tree()).size([2*Math.PI,radius])(root);
    const points=new Map(root.descendants().map(d=>[d.data.name,d]));
    const previous=new Map();
    nodeLayer.selectAll('.tree-node').each(function(d){previous.set(d.data.name,this._point||{x:d.x,y:d.y});});
    const forward=graphQuarter!=null&&graphMode===$('date-mode').value&&quarter>graphQuarter;
    const changedQuarter=graphQuarter!==quarter||graphMode!==$('date-mode').value;
    if(changedQuarter){clearFlights();storyDuration=0;}
    graphQuarter=quarter;graphMode=$('date-mode').value;
    const incoming=root.descendants().filter(d=>d!==root&&!previous.has(d.data.name));
    const incomingNames=new Set(incoming.map(d=>d.data.name));
    const flightDelay=new Map(),batches=[];
    if(forward&&changedQuarter) {
      for(const d of incoming) {
        let batch=batches.at(-1);
        const limit=innerWidth<520?25:65;
        if(!batch||batch.length>=3||[...batch,d.data.name].join(' · ').length>limit){batch=[];batches.push(batch);}
        batch.push(d.data.name);
      }
      const gap=Math.max(300,Number($('speed').value)*.35);
      batches.forEach((names,i)=>{
        const delay=timer?i*gap:0;
        names.forEach(name=>flightDelay.set(name,delay));
        if(timer)flightTimers.push(setTimeout(()=>pushTicker(names.join(' · ')),delay));
      });
      storyDuration=timer&&batches.length?(batches.length-1)*gap+(duration?600:0):0;
      if(!timer&&incoming.length>0&&incoming.length<=3)pushTicker(incoming.map(d=>d.data.name).join(' · '));
    }
    const flightOrigin=d=>{
      let hash=0;for(const c of d.data.name)hash=(Math.imul(hash,31)+c.charCodeAt(0))>>>0;
      const edge=hash%4,along=((hash>>>2)%1000)/1000*2-1;
      const x=edge===0?-460:edge===1?460:along*380;
      const y=edge===2?-280:edge===3?280:along*220;
      d.flightEdge=['left','right','top','bottom'][edge];
      return {x:(Math.atan2(x,-y)+2*Math.PI)%(2*Math.PI),y:Math.hypot(x,y)};
    };
    const origin=d=>previous.get(d.data.name)||(forward?flightOrigin(d):previous.get(d.parent?.data.name)||{x:d.x,y:0});
    const propertyCounts=new Map(), newProperties=new Map();
    for(const t of visible.filter(t=>t.kind==='Property')) for(const domain of t.domains.map(local)) {
      propertyCounts.set(domain,(propertyCounts.get(domain)||0)+1);
      if(dateQuarter(t)===quarter)newProperties.set(domain,(newProperties.get(domain)||0)+1);
    }
    const isNew=d=>dateQuarter(d.data.term)===quarter&&(!isHistory()||quarter>1);
    const changed=d=>isNew(d)||(newProperties.has(d.data.name)&&(!isHistory()||quarter>1));
    const join=nodeLayer.selectAll('.tree-node').data(root.descendants().filter(d=>d!==root),d=>d.data.name);
    join.exit().interrupt().attr('tabindex',-1).style('pointer-events','none').transition().duration(duration).style('opacity',0)
      .attr('transform',d=>transform(points.get(d.parent?.data.name)||{x:d.x,y:0})).remove();
    const entering=join.enter().append('g').attr('class','tree-node').attr('data-name',d=>d.data.name).style('opacity',0)
      .each(function(d){this._point=origin(d);}).attr('transform',d=>transform(origin(d))).attr('data-entry-edge',d=>d.flightEdge||null)
    .attr('role','button').attr('aria-label',d=>`Inspect ${d.data.name}`).on('click',(e,d)=>selectTerm(d.data.name)).on('keydown',(e,d)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectTerm(d.data.name);}})
    .on('pointerenter',(e,d)=>{const tip=$('hover-tip');tip.innerHTML=`${esc(d.data.name)}<small>${esc(labels[d.data.term.category])}</small>`;tip.hidden=false;const rect=$('visual').getBoundingClientRect();tip.style.left=Math.max(0,Math.min(e.clientX-rect.left+12,rect.width-250))+'px';tip.style.top=Math.max(0,e.clientY-rect.top-45)+'px';})
    .on('pointerleave',()=>{$('hover-tip').hidden=true;});
    entering.append('circle').attr('class','node-hit').attr('fill','transparent').attr('r',12);
    entering.append('rect').attr('class','node-rect').attr('rx',2).attr('width',5).attr('height',5);
    entering.append('circle').attr('class','growth-halo').attr('r',0);
    entering.append('circle').attr('class','node-disc').attr('r',forward?7:0).attr('fill',d=>colors[d.data.term.category][0]).attr('stroke',d=>colors[d.data.term.category][1]);
    entering.append('text').attr('class','node-label').attr('dy','.32em');
    entering.append('title');
    nodes=entering.merge(join).classed('selected',d=>d.data.name===selected).classed('new-term',isNew).classed('new-properties',d=>newProperties.has(d.data.name))
      .attr('tabindex',0).style('pointer-events',null);
    nodes.classed('arriving',d=>forward&&incomingNames.has(d.data.name));
    nodes.interrupt().transition().delay(d=>flightDelay.get(d.data.name)||0).duration(d=>duration?(forward&&incomingNames.has(d.data.name)?600:duration):0).ease(d3.easeCubicOut).style('opacity',1).attrTween('transform',function(d){
      // Interpolate in screen coordinates so arrivals travel straight inward.
      const start=this._point||origin(d),a={x:Math.sin(start.x)*start.y,y:-Math.cos(start.x)*start.y},b={x:Math.sin(d.x)*d.y,y:-Math.cos(d.x)*d.y};
      const interpolate=d3.interpolateObject(a,b);
      return t=>{const p=interpolate(t);this._point={x:Math.atan2(p.x,-p.y),y:Math.hypot(p.x,p.y)};return `translate(${p.x},${p.y})`;};
    }).on('end',function(){d3.select(this).classed('arriving',false);});
    nodes.selectAll('circle').style('display',layout==='treemap'?'none':null);
    nodes.select('.node-rect').style('display',layout==='treemap'?null:'none').attr('fill',d=>d.children?'#f7faf4':colors[d.data.term.category][0]).attr('stroke',d=>isNew(d)?'#12674e':'#91aa99')
      .interrupt().transition().duration(duration).attr('x',d=>-d.boxWidth/2||0).attr('y',d=>-d.boxHeight/2||0).attr('width',d=>d.boxWidth||5).attr('height',d=>d.boxHeight||5);
    nodes.select('.node-disc').interrupt().transition().delay(d=>duration&&forward&&incomingNames.has(d.data.name)?(flightDelay.get(d.data.name)||0)+450:0).duration(duration?150:0).attr('r',d=>2+Math.min(3,Math.sqrt(propertyCounts.get(d.data.name)||0)/3)+(isNew(d)?2:0));
    nodes.select('.growth-halo').interrupt().transition().duration(duration).attr('r',d=>changed(d)?9:0).style('opacity',d=>changed(d)?.45:0);
    nodes.select('text').text(d=>d.data.name);
    nodes.each(d=>{d.labelRadius=radius+20;});
    updateLabels();
    if(layout==='treemap')nodes.sort((a,b)=>a.depth-b.depth);
    nodes.select('title').text(d=>`${d.data.name}: ${propertyCounts.get(d.data.name)||0} observed properties declared on this type${isNew(d)?'; type added this quarter':''}`);
    const links=linkLayer.selectAll('path').data(layout==='treemap'?[]:root.links().filter(d=>d.source!==root),d=>d.target.data.name);
    links.exit().interrupt().transition().duration(duration).style('opacity',0).remove();
    links.enter().append('path').attr('class','tree-link').style('opacity',0)
      .each(function(d){const p=origin(d.target);this._points={source:p,target:p};})
      .merge(links).classed('new-link',d=>isNew(d.target)).interrupt().transition().delay(d=>duration&&forward&&incomingNames.has(d.target.data.name)?(flightDelay.get(d.target.data.name)||0)+450:0).duration(duration).style('opacity',.8)
      .attrTween('d',function(d){
        const interpolate=d3.interpolateObject(this._points||{source:origin(d.source),target:origin(d.target)}, {source:{x:d.source.x,y:d.source.y},target:{x:d.target.x,y:d.target.y}});
        return t=>{this._points=interpolate(t);return radialLink(this._points);};
      });
  }
  function updateLabels() {
    if(!nodes)return;
    const box=$('tree').getBoundingClientRect();
    const screenScale=Math.min(box.width/860,box.height/490)||1;
    const size=15/(screenScale*zoomScale),gap=6/(screenScale*zoomScale),occupied=[];
    if($('graph-view').value==='treemap') {
      nodes.select('text').attr('font-size',size).attr('text-anchor','start').attr('x',d=>-d.boxWidth/2+4).attr('y',d=>-d.boxHeight/2+size*.7)
        .style('display',d=>d.boxWidth>d.data.name.length*size*.58+8&&d.boxHeight>size+5?null:'none');
      nodes.attr('tabindex',function(){return this.querySelector('text').style.display==='none'?-1:0;});
      return;
    }
    const offset=d=>d.data.term.parent==='Thing'&&zoomScale<=2?d.labelRadius-d.y:0;
    nodes.select('text').attr('font-size',size).attr('x',d=>Math.sin(d.x)*offset(d)+(d.x<Math.PI?gap+5:-gap-5)).attr('y',d=>-Math.cos(d.x)*offset(d)).attr('text-anchor',d=>d.x<Math.PI?'start':'end')
      .style('display',d=>nodes.size()<65||zoomScale>2||d.data.name==='Thing'||d.data.term.parent==='Thing'||d.data.name===selected?null:'none');
    const priority=d=>d.data.name===selected?0:d.data.name==='Thing'?1:d.data.term.parent==='Thing'?2:3;
    [...nodes.select('text').nodes()].sort((a,b)=>priority(a.__data__)-priority(b.__data__)).forEach(label=>{
      if(label.style.display==='none')return;
      const d=label.__data__,b=label.getBBox(),bounds={x:Math.sin(d.x)*d.y+b.x,y:-Math.cos(d.x)*d.y+b.y,width:b.width,height:b.height};
      if(occupied.some(b=>bounds.x<b.x+b.width+gap&&bounds.x+bounds.width+gap>b.x&&bounds.y<b.y+b.height+gap&&bounds.y+bounds.height+gap>b.y))label.style.display='none';else occupied.push(bounds);
    });
    // The paginated vocabulary provides every term without hundreds of tab stops.
    nodes.attr('tabindex',function(){return this.querySelector('text').style.display==='none'?-1:0;});
    nodes.filter(function(){return this.querySelector('text').style.display!=='none';}).raise();
  }
  new ResizeObserver(updateLabels).observe($('tree'));
  $('graph-view').onchange=()=>{
    const full=$('graph-view').value!=='branches';$('tree').toggleAttribute('hidden',!full);$('branch-map').hidden=full;
    for(const id of ['zoom-in','zoom-out','fit-view'])$(id).hidden=!full;
    render();
  };
  $('zoom-in').onclick=()=>svg.transition().duration(duration).call(zoom.scaleBy,1.5);
  $('zoom-out').onclick=()=>svg.transition().duration(duration).call(zoom.scaleBy,1/1.5);
  $('fit-view').onclick=()=>svg.transition().duration(duration).call(zoom.transform,d3.zoomIdentity);
  const scenarios=[
    {id:'events',title:'An event: from a venue to an online gathering',stages:[
      {words:['Event','location','Place','name'],say:'A concert happens at a named place.',pattern:'Event → location → Place\nPlace → name → “Town Hall”'},
      {words:['Event','eventAttendanceMode','OnlineEventAttendanceMode','VirtualLocation','location','url'],say:'The event is online, with a virtual location and a joining link.',pattern:'Event → eventAttendanceMode → OnlineEventAttendanceMode\nEvent → location → VirtualLocation\nVirtualLocation → url → joining link'}]},
    {id:'shopping',title:'An offer: from a price to a return policy',stages:[
      {words:['Offer','price','priceCurrency'],say:'This offer has a price and a currency.',pattern:'Offer → price → 25\nOffer → priceCurrency → “CHF”'},
      {words:['Offer','hasMerchantReturnPolicy','MerchantReturnPolicy','merchantReturnDays'],say:'The offer includes a structured return policy with a return window.',pattern:'Offer → hasMerchantReturnPolicy → MerchantReturnPolicy\nMerchantReturnPolicy → merchantReturnDays → 30'}]},
    {id:'learning',title:'Learning: from content to a course instance',stages:[
      {words:['CreativeWork','name','description'],say:'This is a named piece of content; its educational purpose can be explained in prose.',pattern:'CreativeWork → name → “Learning about birds”\nCreativeWork → description → prose'},
      {words:['CreativeWork','educationalAlignment','AlignmentObject','targetName'],say:'Learning material can be aligned with a named educational target.',pattern:'CreativeWork → educationalAlignment → AlignmentObject\nAlignmentObject → targetName → “Identify local birds”'},
      {words:['Course','hasCourseInstance','CourseInstance','courseMode'],say:'A course has a particular offering, with a mode of delivery.',pattern:'Course → hasCourseInstance → CourseInstance\nCourseInstance → courseMode → “online”'}]},
    {id:'science',title:'Research: from a document to measured variables',stages:[
      {words:['CreativeWork','name','description'],say:'A research resource can be named and described in prose.',pattern:'CreativeWork → name → “Lake measurements”\nCreativeWork → description → prose'},
      {words:['Dataset','distribution','DataDownload'],say:'The resource can be identified as a dataset with a downloadable distribution.',pattern:'Dataset → distribution → DataDownload'},
      {words:['Dataset','variableMeasured','PropertyValue','name'],say:'The dataset can explicitly identify what was measured.',pattern:'Dataset → variableMeasured → PropertyValue\nPropertyValue → name → “Water temperature”'}]},
    {id:'health',title:'Health: from prose to a condition and treatment',stages:[
      {words:['Thing','name','description'],say:'A health topic can be named and explained as a generic thing.',pattern:'Thing → name → “A health topic”\nThing → description → prose'},
      {words:['MedicalCondition','possibleTreatment','MedicalTherapy'],say:'A condition can be linked to a possible therapy using dedicated medical vocabulary.',pattern:'MedicalCondition → possibleTreatment → MedicalTherapy'}]},
    {id:'claims',title:'News: from an article to a fact-check',stages:[
      {words:['NewsArticle','headline'],say:'A news article can be identified and given a headline.',pattern:'NewsArticle → headline → “An example report”'},
      {words:['ClaimReview','claimReviewed','reviewRating','Rating','ratingValue'],say:'A fact-check can identify the claim it reviewed and give a structured rating.',pattern:'ClaimReview → claimReviewed → “An example claim”\nClaimReview → reviewRating → Rating\nRating → ratingValue → 2'}]}
  ];
  scenarios.forEach(s=>$('scenario').add(new Option(s.title,s.id)));
  function renderPhrasebook() {
    const scenario=scenarios.find(s=>s.id===$('scenario').value)||scenarios[0];
    const thenNames=new Set(terms.map(t=>t.name)),nowNames=new Set(historyTerms(maxQuarter).map(t=>t.name));
    const then=scenario.stages.filter(s=>s.words.every(w=>thenNames.has(w))).at(-1);
    const now=scenario.stages.filter(s=>s.words.every(w=>nowNames.has(w))).at(-1);
    const gained=now?.words.filter(w=>!thenNames.has(w))||[];
    const card=(title,stage,cls)=>`<section class="phrase-card ${cls}"><h3>${esc(title)}</h3>${stage?`<p>${esc(stage.say)}</p><code>${esc(stage.pattern)}</code>`:'<p>This vocabulary was not yet available.</p>'}</section>`;
    $('phrasebook').innerHTML=card(quarterLabel(quarter),then,'then')+card('Now · published vocabulary',now,'now')+
      (gained.length?`<details class="newer-words"><summary>${gained.length} newer words make this more precise</summary><div class="tags">${gained.map(w=>`<button data-term="${esc(w)}">${esc(w)}</button>`).join('')}</div></details>`:'<p class="phrase-note phrase-status">The current pattern is already expressible at this date.</p>')+
      '<p class="phrase-note">Prose was always possible; these are dedicated vocabulary patterns.</p>';
  }
  $('scenario').onchange=renderPhrasebook;
  const prefixes=`PREFIX s: <https://schema.org/>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX t: <urn:timeline:>\n\n`;
  const queryExamples=[
    {id:'new-words',title:'Words added since then',query:`SELECT ?term ?kind WHERE {\n  GRAPH t:now { ?term a ?kind }\n  FILTER (?kind IN (rdfs:Class, rdf:Property))\n  MINUS { GRAPH t:then { ?term a ?kind } }\n}\nORDER BY ?kind ?term\nLIMIT 100`},
    {id:'counts',title:'Compare vocabulary sizes',query:`SELECT ?snapshot ?kind (COUNT(DISTINCT ?term) AS ?words) WHERE {\n  GRAPH ?snapshot { ?term a ?kind }\n  FILTER (?kind IN (rdfs:Class, rdf:Property))\n}\nGROUP BY ?snapshot ?kind\nORDER BY ?snapshot ?kind`},
    {id:'event-properties',title:'What more can we say about an Event?',query:`SELECT DISTINCT ?property WHERE {\n  GRAPH t:now {\n    s:Event t:ancestor ?scope .\n    ?property s:domainIncludes ?scope .\n  }\n  MINUS { GRAPH t:then {\n    s:Event t:ancestor ?oldScope .\n    ?property s:domainIncludes ?oldScope .\n  } }\n}\nORDER BY ?property\nLIMIT 100`},
    {id:'new-medical',title:'New medical types',query:`SELECT DISTINCT ?type WHERE {\n  GRAPH t:now { ?type t:ancestor s:MedicalEntity }\n  MINUS { GRAPH t:then { ?type a rdfs:Class } }\n}\nORDER BY ?type\nLIMIT 100`},
    {id:'parents',title:'Types whose parent relationships changed',query:`SELECT DISTINCT ?type ?oldParent ?newParent WHERE {\n  GRAPH t:then { ?type rdfs:subClassOf ?oldParent }\n  GRAPH t:now { ?type rdfs:subClassOf ?newParent }\n  FILTER (?oldParent != ?newParent)\n  MINUS { GRAPH t:now { ?type rdfs:subClassOf ?oldParent } }\n}\nORDER BY ?type\nLIMIT 100`},
    {id:'old-words',title:'Old names no longer in the published vocabulary',query:`SELECT ?term ?kind WHERE {\n  GRAPH t:then { ?term a ?kind }\n  FILTER (?kind IN (rdfs:Class, rdf:Property))\n  MINUS { GRAPH t:now { ?term a ?kind } }\n}\nORDER BY ?term\nLIMIT 100`}
  ];
  queryExamples.forEach(q=>$('query-example').add(new Option(q.title,q.id)));
  const loadQuery=()=>{$('query-editor').value=prefixes+queryExamples.find(q=>q.id===$('query-example').value).query;};
  $('query-example').onchange=loadQuery;loadQuery();
  let queryWorker=null,queriedQuarter=null;
  function queryIdle(){queryWorker?.terminate();queryWorker=null;$('run-query').disabled=false;$('cancel-query').disabled=true;$('query-results').setAttribute('aria-busy','false');}
  $('cancel-query').onclick=()=>{queryIdle();$('query-status').textContent='Cancelled.';};
  $('run-query').onclick=()=>{
    queryIdle();queriedQuarter=quarter;
    $('run-query').disabled=true;$('cancel-query').disabled=false;$('query-status').textContent='Loading local Factoidal engine…';$('query-results').innerHTML='';$('query-results').setAttribute('aria-busy','true');
    queryWorker=new Worker('assets/sparql-worker.js',{type:'module'});
    queryWorker.onerror=e=>{queryIdle();$('query-status').textContent='Query error: '+e.message;};
    queryWorker.onmessage=({data:message})=>{
      if(message.type==='progress'){$('query-status').textContent=message.text;return;}
      queryIdle();
      if(message.type==='error'){$('query-status').textContent='Query error: '+message.message;return;}
      const result=message.result,rows=result.results?.bindings||[],columns=result.head?.vars||[];
      const value=term=>!term?'':term.type==='uri'?link(term.value,term.value.replace('https://schema.org/','s:').replace('http://www.w3.org/2000/01/rdf-schema#','rdfs:').replace('http://www.w3.org/1999/02/22-rdf-syntax-ns#','rdf:').replace('urn:timeline:','t:')):esc(term.value);
      $('query-results').innerHTML=typeof result.boolean==='boolean'?`<p>${result.boolean}</p>`:`<table><thead><tr>${columns.map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(0,500).map(row=>`<tr>${columns.map(c=>`<td>${value(row[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      $('query-status').textContent=`${rows.length} results · ${quarterLabel(message.quarter)} versus now · @factoidal/core 0.7.1 · ${message.ms} ms${rows.length>500?' · showing the first 500':''}`;
    };
    const snapshot=q=>data.history.snapshots[q].records.map(id=>data.history.variants[id]);
    queryWorker.postMessage({then:snapshot(quarter),now:snapshot(maxQuarter),query:$('query-editor').value,quarter});
  };
  $('go-launch').onclick=()=>{pause();setQuarter(1);};
  $('go-now').onclick=()=>{pause();setQuarter(maxQuarter);};
  let lastTickerQuarter=null,tickerSerial=0,tickerEntries=[];
  const headlines={
    0:'Before launch',1:'People, places, products, creative works',3:'Job postings',
    5:'Health and medical terms',7:'GoodRelations commerce terms',
    9:'Datasets and learning resources',10:'Actions',11:'Orders, broadcasts, accessibility',
    12:'Questions, answers, reservations',13:'Potential actions',
    17:'Vehicles and product characteristics',21:'Courses and fact-checks',
    24:'Course details and menus',33:'Educational credentials',
    36:'Online events and emergency announcements',38:'Learning resources',
    42:'Genes, proteins, biochemical entities'
  };
  function updateTicker(newTerms) {
    const key=$('date-mode').value+':'+quarter;
    if(lastTickerQuarter===key)return;
    lastTickerQuarter=key;
    const types=newTerms.filter(t=>t.kind==='Type');
    let text=isHistory()?headlines[quarter]:null;
    if(!text) {
      const words=(types.length?types:newTerms).slice(0,3).map(t=>t.name);
      text=words.length?words.join(' · '):'Vocabulary carried forward.';
      if(text.length>78)text=words[0]+` and ${Math.max(0,newTerms.length-1)} more words.`;
    }
    pushTicker(text);
  }
  function pushTicker(text) {
    tickerEntries.push({id:++tickerSerial,quarter:quarterLabel(quarter),text});
    tickerEntries=tickerEntries.slice(-2);
    const rows=d3.select('#history-ticker').selectAll('.ticker-line').data(tickerEntries,d=>d.id);
    const lineHeight=innerWidth<=520?76:56;
    rows.exit().interrupt().transition().duration(duration).style('transform',`translateY(-${lineHeight}px)`).style('opacity',0).remove();
    rows.enter().append('div').attr('class','ticker-line').style('transform','translateY(112px)').style('opacity',0)
      .html(d=>`<span class="ticker-date">${esc(d.quarter)}</span><span class="ticker-words">${esc(d.text)}</span>`)
      .merge(rows).interrupt().transition().duration(duration).style('opacity',1).style('transform',(d,i)=>`translateY(${i*lineHeight}px)`);
  }
  function renderResults(visible) {
    const found=visible.filter(t=>$('result-kind').value==='all'||t.kind===$('result-kind').value);
    resultOffset=Math.min(resultOffset,Math.max(0,Math.floor((found.length-1)/9)*9));
    $('results-list').innerHTML=`<p class="result-note">${fmt(found.length)} matching words at ${quarterLabel(quarter)}. Select a word for its definition.</p>`+found.slice(resultOffset,resultOffset+9).map(termButton).join('');
    $('previous-results').disabled=resultOffset===0;$('more-results').disabled=found.length<=resultOffset+9;
    $('result-page').textContent=found.length?`${resultOffset+1}–${Math.min(resultOffset+9,found.length)} of ${fmt(found.length)}`:'No matches';
  }
  function render() {
    terms=isHistory()?historyTerms(quarter):auditTerms;byName=new Map(terms.map(t=>[t.name,t]));
    for(const id of ['show-foundation','show-retired','show-checkout'])$(id).disabled=isHistory();
    const snapshot=data.history.snapshots[quarter];
    $('query-scope').textContent=`Two local named graphs: t:then = ${quarterLabel(quarter)}; t:now = published Schema.org 30.0. Includes types, properties, parents, domains, ranges and definitions from the reconstructed snapshots. t:ancestor includes each type and its ancestors; explorer datatype nodes are represented as rdfs:Class.`;
    if(queriedQuarter!=null&&queriedQuarter!==quarter){queryIdle();queriedQuarter=null;$('query-results').innerHTML='';$('query-status').textContent='Date changed. Run the query for this date.';}
    const filtered=terms.filter(matches), visible=filtered.filter(observed);
    const typeSet=new Set(visible.filter(t=>t.kind==='Type').map(t=>t.name));
    const newTerms=filtered.filter(t=>t.kind!=='Typed value'&&dateQuarter(t)===quarter);
    updateTicker(newTerms);
    $('type-count').textContent=fmt(visible.filter(t=>t.kind==='Type').length);
    $('property-count').textContent=fmt(visible.filter(t=>t.kind==='Property').length);
    $('new-count').textContent=fmt(newTerms.length);
    $('foundation-count').textContent=isHistory()?snapshot.confidence:`${fmt(filtered.filter(t=>t.kind!=='Typed value'&&dateQuarter(t)==null).length)} types / properties have unresolved dates in this audit view.`;
    $('match-count').textContent=fmt(visible.length)+' matching terms';
    $('chart-message').hidden=typeSet.size>0;
    drawTree(visible);
    drawBranchMap(visible);
    $('quarter').value=quarter;
    $('quarter-label').textContent=quarterLabel(quarter);
    $('quarter-heading').innerHTML=`${2011+Math.floor(quarter/4)} <span>Q${quarter%4+1}</span>`;
    $('quarter-note').textContent=isHistory()?snapshot.label:['January — March','April — June','July — September','October — December'][quarter%4];
    $('previous').disabled=quarter===0; $('next').disabled=quarter===maxQuarter;
    $('date-caveat').textContent=isHistory()?'2011 community snapshot → approximate early expansions → archived releases. Play or use the slider’s arrow keys to move through time.':$('date-mode').value==='source'?'Audit: first observed source declarations; imported early terms have unresolved dates.':'Audit: earliest available release snapshots; terms predating v2.0 have unresolved dates.';
    $('quarter').setAttribute('aria-valuetext',quarterLabel(quarter));
    $('snapshot-download').href=snapshot.treePath;
    if(!timer)$('graph-status').textContent=`${quarterLabel(quarter)}: ${$('type-count').textContent} types and ${$('property-count').textContent} properties. Use the Vocabulary tab for all names.`;
    const counts=Array.from({length:maxQuarter+1},()=>0);
    (isHistory()?historicalBirths:filtered.map(t=>({...t,q:dateQuarter(t)}))).filter(t=>t.kind!=='Typed value').forEach(t=>{if(t.q!=null&&t.q>=0&&t.q<=maxQuarter)counts[t.q]++;});
    const y=d3.scaleSqrt().domain([0,d3.max(counts)||1]).range([0,40]), width=1000/counts.length;
    const bars=d3.select('#sparkline').selectAll('rect').data(counts).join('rect').attr('class','quarter-bar').attr('x',(d,i)=>i*width+1).attr('width',width-3).attr('y',d=>44-Math.max(3,y(d))).attr('height',d=>Math.max(3,y(d))).attr('fill',(d,i)=>i===quarter?'#12674e':i<quarter?'#97b8a1':'#d0decf').attr('tabindex',-1).attr('role','button').attr('aria-label',(d,i)=>`${quarterLabel(i)}: ${d} dated additions`)
      .on('click',(e,d)=>{pause();setQuarter(bars.nodes().indexOf(e.currentTarget));}).on('keydown',(e,d)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pause();setQuarter(bars.nodes().indexOf(e.currentTarget));}});
    bars.selectAll('title').data((d,i)=>[`${quarterLabel(i)}: ${d} dated additions`]).join('title').text(d=>d);
    const milestones=data.events.filter(e=>quarterOf(e.date)===quarter);
    $('quarter-events').innerHTML=`<p>${fmt(newTerms.length)} type / property additions under your filters.</p><p>Curated milestones provide context independently of those filters.</p>`+
      milestones.map(e=>`<article class="event-card"><small>${esc(e.date)} · ${esc(e.status)}</small><h3>${esc(e.title)}</h3><p>${esc(e.summary.replace(/\*\*/g,''))}</p>${link(e.path,'Project record ↗')} ${e.links.map(([title,url])=>link(url,title)).join(' · ')}</article>`).join('')+
      `<h3>New words</h3>`+newTerms.slice(0,9).map(termButton).join('')+(newTerms.length>9?'<p>Use Vocabulary with “This quarter only” to explore all additions.</p>':'');
    renderPhrasebook();
    if(selected&&$('tab-selection').getAttribute('aria-selected')==='true')selectTerm(selected);
    renderResults(visible);
  }
  function setQuarter(q) {quarter=Math.max(0,Math.min(maxQuarter,Number(q)));render();}
  function pause() {clearTimeout(timer);timer=null;clearFlights();$('play').innerHTML='▶ <span>Play history</span>';$('play').setAttribute('aria-label','Play timeline');}
  function play() {
    if(quarter===maxQuarter)setQuarter(0);
    $('play').innerHTML='Ⅱ <span>Pause history</span>';$('play').setAttribute('aria-label','Pause timeline');
    const tick=()=>{
      if(quarter===maxQuarter){pause();return;}
      let next=quarter+1;
      if($('skip-empty').checked) {
        const dates=(isHistory()?Object.values(data.history.firstSeen):terms.filter(t=>t.kind!=='Typed value'&&matches(t)).map(dateQuarter)).filter(q=>q!=null&&q>quarter&&q<=maxQuarter);
        next=dates.length?Math.min(...dates):maxQuarter;
      }
      setQuarter(next);
      timer=setTimeout(tick,Math.max(Number($('speed').value),storyDuration+350));
    };
    timer=setTimeout(tick,Number($('speed').value));
  }
  $('play').onclick=()=>{if(timer){pause();render();}else play();};
  $('speed').onchange=()=>{if(timer){pause();play();}};
  $('quarter').max=maxQuarter;
  $('quarter').oninput=()=>{pause();setQuarter($('quarter').value);};
  $('previous').onclick=()=>{pause();setQuarter(quarter-1);};
  $('next').onclick=()=>{pause();setQuarter(quarter+1);};
  for(const id of ['branch','category','show-foundation','show-retired','show-checkout','only-new','date-mode','result-kind']) $(id).onchange=()=>{resultOffset=0;mapOffset=0;render();};
  $('term-search').oninput=()=>{resultOffset=0;mapOffset=0;render();tab('results');};
  $('more-results').onclick=()=>{resultOffset+=9;renderResults(terms.filter(t=>matches(t)&&observed(t)));};
  $('previous-results').onclick=()=>{resultOffset=Math.max(0,resultOffset-9);renderResults(terms.filter(t=>matches(t)&&observed(t)));};
  $('clear-filters').onclick=()=>{
    $('term-search').value='';$('branch').value='all';$('category').value='all';$('result-kind').value='all';
    $('show-foundation').checked=true;$('show-checkout').checked=true;$('show-retired').checked=false;$('only-new').checked=false;resultOffset=0;mapOffset=0;render();
  };
  for(const id of ['zoom-in','zoom-out','fit-view'])$(id).hidden=false;
  let resizeFrame;
  window.addEventListener('resize',()=>{
    cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{
      updateLabels();
      d3.select('#history-ticker').selectAll('.ticker-line').interrupt().style('transform',(d,i)=>`translateY(${i*(innerWidth<=520?76:56)}px)`);
      if(!timer&&$('graph-view').value==='treemap')drawTree(terms.filter(t=>matches(t)&&observed(t)));
    });
  });
  tab('graph');render();
})();

// SPARQL cookbook — single source of truth.
//
// Both the cookbook page (queries.html, as an ES module) and the integrity
// harness (scripts/check.mjs) import this array, so a query that rots is caught
// by `node scripts/check.mjs` instead of silently shipping a broken example.
//
// Entry shapes:
//   { sec: '...' }                         section heading
//   { title, why, q, slow?, federation? }  a runnable query
// `federation:true` marks a query that calls a remote SERVICE endpoint; the
// harness treats those as best-effort (external endpoint may be slow/down) and
// does not hard-fail the build on them.
export const QUERIES = [
{sec:'The shape they (mostly) share'},
{title:'Concept census — skos:Concept per scheme',
 why:'The core SKOS conformance check: who actually types their entries skos:Concept, and how many. (LCSH: 513k; WordNet: zero — see oddities.)',
 slow:true,
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?g (COUNT(?c) AS ?concepts) WHERE {
  GRAPH ?g { ?c a skos:Concept }
} GROUP BY ?g ORDER BY DESC(?concepts)`},
{title:'The Solr shape — what populates search',
 why:'This is the exact pattern the indexer flattens into Solr docs: concept + prefLabel, optional altLabel/definition/broader/narrower/exactMatch/notation. Swap the graph URI to inspect any scheme.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?c ?pref ?alt ?def ?broader WHERE {
  GRAPH <http://vocabularies.unesco.org/thesaurus> {
    ?c a skos:Concept ; skos:prefLabel ?pref .
    OPTIONAL { ?c skos:altLabel ?alt }
    OPTIONAL { ?c skos:definition ?def }
    OPTIONAL { ?c skos:broader ?broader }
    FILTER(LANG(?pref)='en')
  }
} LIMIT 20`},
{title:'Scheme inventory — triples per named graph',
 why:'One graph per scheme; graph URI = the skos:ConceptScheme URI from each meta.ttl. Heavy (scans everything) — expect ~30s.',
 slow:true,
 q:`SELECT ?g (COUNT(*) AS ?triples) WHERE {
  GRAPH ?g { ?s ?p ?o }
} GROUP BY ?g ORDER BY DESC(?triples)`},
{sec:'Multilinguality'},
{title:'One concept, every language — AGROVOC "rice"',
 why:'AGROVOC carries ~40 translations per concept. This is why search ranking needed an exact-label field: all of these live in one prefLabel bag.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?lang ?label WHERE {
  GRAPH <http://aims.fao.org/aos/agrovoc> {
    <http://aims.fao.org/aos/agrovoc/c_6599> skos:prefLabel ?label
  }
  BIND(LANG(?label) AS ?lang)
} ORDER BY ?lang`},
{title:'Same label, different vocabularies',
 why:'A label-level crosswalk: which schemes each have a concept prefLabelled "rice"@en? (GEMET, EuroVoc, NALT, AGROVOC.) Change the literal to explore.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?g ?c WHERE {
  GRAPH ?g { ?c skos:prefLabel "rice"@en }
}`},
{title:'Language coverage of a scheme — EuroVoc',
 why:'Labels per language tag. EuroVoc is the EU’s 24-language flagship; try the UDC graph for 48 languages.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?lang (COUNT(?l) AS ?labels) WHERE {
  GRAPH <http://eurovoc.europa.eu/100141> { ?s skos:prefLabel ?l }
  BIND(LANG(?l) AS ?lang)
} GROUP BY ?lang ORDER BY DESC(?labels)`},
{sec:'Cross-scheme mappings'},
{title:'skos:exactMatch links out of GEMET',
 why:'The corpus contains real inter-vocabulary mappings: GEMET ships exactMatch links into EuroVoc (and AGROVOC). These also surface in the /autocomplete API as the exactMatch field.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?c ?target WHERE {
  GRAPH <http://www.eionet.europa.eu/gemet/gemetThesaurus> {
    ?c skos:exactMatch ?target
  }
} LIMIT 25`},
{sec:'Oddities, documented'},
{title:'WordNet is not SKOS — it is OntoLex',
 why:'Open English WordNet types entries as ontolex:LexicalConcept / LexicalEntry / LexicalSense — zero skos:Concept. Queryable here, but invisible to the skos-shaped Solr index (a mapping is on the roadmap, like the one applied to GND).',
 q:`SELECT ?type (COUNT(*) AS ?n) WHERE {
  GRAPH <https://en-word.net/> { ?s a ?type }
} GROUP BY ?type ORDER BY DESC(?n) LIMIT 10`},
{title:'AGROVOC speaks SKOS-XL too',
 why:'Beyond plain prefLabel, AGROVOC reifies labels as skosxl:Label resources — 1.25M literalForms. RAMEAU, despite its size, ships plain SKOS only.',
 q:`PREFIX skosxl: <http://www.w3.org/2008/05/skos-xl#>
SELECT (COUNT(*) AS ?xlLabels) WHERE {
  GRAPH <http://aims.fao.org/aos/agrovoc> { ?l skosxl:literalForm ?f }
}`},
{title:'MeSH has its own vocabulary',
 why:'NLM models MeSH with meshv: classes (Descriptors, Qualifiers, Concepts-with-a-capital-C that are not skos:Concept). Another scheme that needs mapping to join the search index.',
 q:`SELECT ?type (COUNT(*) AS ?n) WHERE {
  GRAPH <http://id.nlm.nih.gov/mesh> { ?s a ?type }
} GROUP BY ?type ORDER BY DESC(?n) LIMIT 8`},
{sec:'Mappings, sameAs & focus'},
{title:'Mapping-predicate census',
 why:'How the corpus links concepts: ~696k closeMatch, ~584k exactMatch, ~207k owl:sameAs, plus broad/narrow/relatedMatch and 4,578 foaf:focus. Every one is now folded into the Solr "mapping" field. (Wikidata/DBpedia mappings ride skos:exactMatch; owl:sameAs mostly targets other authority hubs.)',
 slow:true,
 q:`SELECT ?p (COUNT(*) AS ?n) WHERE {
  GRAPH ?g { ?s ?p ?o }
  VALUES ?p {
    <http://www.w3.org/2004/02/skos/core#exactMatch>
    <http://www.w3.org/2004/02/skos/core#closeMatch>
    <http://www.w3.org/2004/02/skos/core#broadMatch>
    <http://www.w3.org/2004/02/skos/core#narrowMatch>
    <http://www.w3.org/2004/02/skos/core#relatedMatch>
    <http://www.w3.org/2002/07/owl#sameAs>
    <http://xmlns.com/foaf/0.1/focus>
  }
} GROUP BY ?p ORDER BY DESC(?n)`},
{title:'Where do the links point? — target namespaces',
 why:'The linked-data neighbourhood our concepts reach into: Wikidata, VIAF, DBpedia, BnF/idref, GACS, CABI, Dewey, BNCF, datos.bne.es… Also a discovery tool for vocabularies worth ingesting next.',
 slow:true,
 q:`SELECT ?ns (COUNT(*) AS ?n) WHERE {
  GRAPH ?g { ?s ?p ?o }
  VALUES ?p {
    <http://www.w3.org/2004/02/skos/core#exactMatch>
    <http://www.w3.org/2004/02/skos/core#closeMatch>
    <http://www.w3.org/2002/07/owl#sameAs> }
  BIND( REPLACE(STR(?o), "(#|/)[^#/]*$", "$1") AS ?ns )
} GROUP BY ?ns ORDER BY DESC(?n) LIMIT 25`},
{title:'foaf:focus — the authority idiom',
 why:'RAMEAU (BnF) uses foaf:focus to point a subject concept at the real-world entity it is about (person, place, event) — how authority files bridge "the heading" and "the thing".',
 q:`PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?concept ?entity WHERE {
  GRAPH <https://data.bnf.fr/vocabulary/rameau> {
    ?concept foaf:focus ?entity
  }
} LIMIT 20`},
{title:'Resolve a concept across vocabularies via Wikidata',
 why:'Wikidata is the hub: concepts carry skos:exactMatch to a Q-id (Getty AAT, nomenclature.info and IPTC use the canonical http://www.wikidata.org/entity/ form; RAMEAU ships a no-www variant). Two schemes pointing at the same Q-id are de-facto mapped even without a direct cross-scheme link.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?g ?concept ?wd WHERE {
  GRAPH ?g { ?concept skos:exactMatch ?wd .
    FILTER(STRSTARTS(STR(?wd),"http://www.wikidata.org/entity/")) }
} LIMIT 20`},
{sec:'Hierarchy'},
{title:'Walk down from a top concept — IPTC',
 why:'Two levels of skos:narrower from the "economy, business and finance" media topic. The concept browser on the main page does this interactively. NB: IPTC tags labels en-gb / en-us (never plain en), so LANGMATCHES(...,"en") is required — FILTER(LANG=...,"en") returns nothing.',
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?child ?label (COUNT(?grandchild) AS ?grandchildren) WHERE {
  GRAPH <http://cv.iptc.org/newscodes/mediatopic/> {
    <http://cv.iptc.org/newscodes/mediatopic/04000000> skos:narrower ?child .
    ?child skos:prefLabel ?label .
    OPTIONAL { ?child skos:narrower ?grandchild }
    FILTER(LANGMATCHES(LANG(?label),"en"))
  }
} GROUP BY ?child ?label ORDER BY DESC(?grandchildren) LIMIT 40`},
{title:'Wikidata property/class -> schema.org & friends',
 why:'The ingested "Wikidata ontology layer" is faithful RDFS/OWL (not SKOS): each Wikidata property/class that declares an equivalent term does so with owl:equivalentClass / owl:equivalentProperty, labelled with rdfs:label. Filter to https://schema.org/ for the schema.org crosswalk; drop the filter for RDFS/OWL/DC/foaf/DBpedia/OBO too.',
 q:`PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?wdTerm ?label ?schemaOrg WHERE {
  GRAPH <https://danbri.org/skosdex/wikidata-ontology> {
    ?wdTerm owl:equivalentClass|owl:equivalentProperty ?schemaOrg ;
            rdfs:label ?label .
    FILTER(STRSTARTS(STR(?schemaOrg),"https://schema.org/"))
  }
} LIMIT 25`},
{sec:'Federation (SERVICE) — no local clone of the hubs'},
{title:'Enrich Wikidata ids with live labels (WDQS)',
 federation:true,
 why:'Oxigraph runs federated SERVICE queries, so we do not mirror Wikidata — we resolve ids live. Two Oxigraph 0.5.2 quirks shape these queries (tracked in the issue tracker): (1) it does NOT push local bindings into SERVICE, so a plain "GRAPH{…?wd…} SERVICE{?wd …}" fetches ALL of Wikidata and times out — bind the ids with VALUES *inside* the SERVICE block instead; (2) it rejects QLever\'s extra "meta" JSON key, so use query.wikidata.org. The Q-ids below come straight from the "resolve via Wikidata" query above — swap in your own.',
 slow:true,
 q:`PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?wd ?wdLabel WHERE {
  SERVICE <https://query.wikidata.org/sparql> {
    VALUES ?wd {
      <http://www.wikidata.org/entity/Q5090>
      <http://www.wikidata.org/entity/Q20459>
      <http://www.wikidata.org/entity/Q205615>
    }
    ?wd rdfs:label ?wdLabel . FILTER(LANG(?wdLabel)="en")
  }
} LIMIT 25`},
{title:'Bridge to DBpedia via Wikidata',
 federation:true,
 why:'Answers "can the Wikidata links reach DBpedia?" — yes. We hold skos:exactMatch to a Wikidata Q-id; DBpedia holds owl:sameAs back to the same Q-id; federating to dbpedia.org resolves the DBpedia resource. Q5090 (rice) → dbpedia.org/resource/Rice. Same VALUES-inside-SERVICE idiom (see note above).',
 slow:true,
 q:`PREFIX owl: <http://www.w3.org/2002/07/owl#>
SELECT ?wd ?dbpedia WHERE {
  SERVICE <https://dbpedia.org/sparql> {
    VALUES ?wd {
      <http://www.wikidata.org/entity/Q5090>
      <http://www.wikidata.org/entity/Q20459>
    }
    ?dbpedia owl:sameAs ?wd .
    FILTER(STRSTARTS(STR(?dbpedia),"http://dbpedia.org/resource/"))
  }
} LIMIT 10`},
{title:'De-facto crosswalk: two of OUR schemes meeting at one Wikidata id',
 why:'Where two vocabularies both skos:exactMatch the same Q-id, they are mapped through Wikidata even without a direct cross-scheme link — a crosswalk we get for free. This is a local join on the shared ?wd (no federation): Getty AAT ↔ nomenclature.info ↔ IPTC, all on the canonical www form. (RAMEAU uses a no-www variant, so it only joins after normalisation.)',
 slow:true,
 q:`PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT ?wd ?ga ?a ?gb ?b WHERE {
  GRAPH ?ga { ?a skos:exactMatch ?wd }
  GRAPH ?gb { ?b skos:exactMatch ?wd }
  FILTER(STRSTARTS(STR(?wd),"http://www.wikidata.org/entity/") && STR(?ga) < STR(?gb))
} LIMIT 10`},
];

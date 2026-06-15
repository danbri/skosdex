#!/usr/bin/env node
// Per-scheme preparer for the UK Parliament (LDA) Thesaurus dump.
//
// The upstream Turtle (https://fpkg.fly.dev/kgx/parliament-lda-terms.ttl, itself
// dumped from the legacy lda.data.parliament.uk/terms API) carries SKOS
// PROPERTIES — skos:prefLabel/broader/narrower/related/exactMatch/notation — but
// declares NO rdf:type and NO skos:ConceptScheme. skosdex's Solr/embedding
// pipeline only emits docs for subjects typed `a skos:Concept`, so without this
// the scheme would index zero concepts.
//
// We make the typing EXPLICIT, which is an RDFS entailment, not a semantic
// change: SKOS gives skos:prefLabel the domain skos:Concept, so every subject
// bearing a prefLabel already *is* a skos:Concept. We add that triple plus a
// skos:ConceptScheme node and skos:inScheme links so the scheme is well-formed.
//
// Usage: node tools/parliament-lda-type.mjs <in.ttl> <out.ttl> [schemeIRI]
import fs from 'node:fs';
import N3 from 'n3';

const { Parser, Writer, DataFactory } = N3;
const { namedNode, literal, quad } = DataFactory;

const inPath = process.argv[2];
const outPath = process.argv[3];
const schemeIRI = process.argv[4] || 'http://data.parliament.uk/terms/';
if (!inPath || !outPath) {
  console.error('usage: parliament-lda-type.mjs <in.ttl> <out.ttl> [schemeIRI]');
  process.exit(2);
}

const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
const SKOS = 'http://www.w3.org/2004/02/skos/core#';
const RDFS_LABEL = 'http://www.w3.org/2000/01/rdf-schema#label';
const XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';

// Curatorial language tagging (owner-authorised, 2026-06-15). The upstream
// labels are plain literals with no @lang, which would bucket as 'und' in Solr.
// A subagent scan of all 1724 labels found them 99.94% English; we therefore tag
// every label @en EXCEPT the single confirmed non-English one. This is a
// deliberate per-scheme enrichment recorded here (not a silent pipeline change).
const DEFAULT_LANG = 'en';
const LANG_OVERRIDE = {
  // "Aciéries réunies de Burbach-Eich-Dudelange" — French (Luxembourg steelmaker)
  'http://data.parliament.uk/terms/436521': 'fr',
};

const text = fs.readFileSync(inPath, 'utf8');
const quads = new Parser().parse(text);

// Subjects that carry a SKOS label (pref/alt/hidden) or rdfs:label are concepts.
const LABEL_PREDS = new Set([
  SKOS + 'prefLabel', SKOS + 'altLabel', SKOS + 'hiddenLabel', RDFS_LABEL,
]);
const concepts = new Set();
for (const q of quads) {
  if (q.subject.termType === 'NamedNode' && LABEL_PREDS.has(q.predicate.value)) {
    concepts.add(q.subject.value);
  }
}

const writer = new Writer({
  prefixes: {
    skos: SKOS,
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    parl: 'http://data.parliament.uk/schema/parl#',
    term: 'http://data.parliament.uk/terms/',
  },
});

// Concept scheme node.
writer.addQuad(quad(namedNode(schemeIRI), namedNode(RDF_TYPE), namedNode(SKOS + 'ConceptScheme')));

// Original triples — with plain-literal labels language-tagged (see above).
let tagged = 0;
for (const q of quads) {
  if (q.object.termType === 'Literal' && LABEL_PREDS.has(q.predicate.value)
      && q.object.language === '' && q.object.datatype.value === XSD_STRING) {
    const lang = LANG_OVERRIDE[q.subject.value] || DEFAULT_LANG;
    writer.addQuad(quad(q.subject, q.predicate, literal(q.object.value, lang)));
    tagged++;
  } else {
    writer.addQuad(q);
  }
}

// Explicit typing + scheme membership for every concept.
for (const c of [...concepts].sort()) {
  writer.addQuad(quad(namedNode(c), namedNode(RDF_TYPE), namedNode(SKOS + 'Concept')));
  writer.addQuad(quad(namedNode(c), namedNode(SKOS + 'inScheme'), namedNode(schemeIRI)));
}

writer.end((err, result) => {
  if (err) { console.error(err); process.exit(1); }
  fs.writeFileSync(outPath, result);
  console.log(`  typed ${concepts.size} concepts, language-tagged ${tagged} labels (default @${DEFAULT_LANG}, ${Object.keys(LANG_OVERRIDE).length} override) -> ${outPath} (scheme <${schemeIRI}>)`);
});

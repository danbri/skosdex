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
const { namedNode, quad } = DataFactory;

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

// Original triples, untouched.
for (const q of quads) writer.addQuad(q);

// Explicit typing + scheme membership for every concept.
for (const c of [...concepts].sort()) {
  writer.addQuad(quad(namedNode(c), namedNode(RDF_TYPE), namedNode(SKOS + 'Concept')));
  writer.addQuad(quad(namedNode(c), namedNode(SKOS + 'inScheme'), namedNode(schemeIRI)));
}

writer.end((err, result) => {
  if (err) { console.error(err); process.exit(1); }
  fs.writeFileSync(outPath, result);
  console.log(`  typed ${concepts.size} concepts -> ${outPath} (scheme <${schemeIRI}>)`);
});

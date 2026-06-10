#!/usr/bin/env node
// Transform the DNB GND Sachbegriff (subject-term) authority dump into SKOS.
//
// Why: the GND opendata dumps are typed with the GND ontology
// (gndo:SubjectHeadingSensoStricto, gndo:preferredNameForTheSubjectHeading,
// gndo:broaderTermGeneral, ...), NOT skos:Concept / skos:prefLabel. The skosdex
// Solr/demo layer keys off skos:Concept + skos:prefLabel, so the raw dump would
// bundle but surface zero searchable concepts. This script maps the GND subject
// vocabulary onto SKOS (a thin, semantics-preserving relabelling: gndo subject
// terms ARE a concept scheme), so gnd-subjects is a first-class searchable
// scheme like every other.
//
// Input:  cache/sachbegriff.ttl.gz  (DNB authorities-gnd-sachbegriff_lds.ttl.gz)
// Output: cache/source.nt           (SKOS N-Triples for `skosdex normalize`)
//
// Mapping (GND ontology -> SKOS), German labels are tagged @de:
//   <entity> a gndo:<any subject type>            -> a skos:Concept ; skos:inScheme <scheme>
//   gndo:preferredNameForTheSubjectHeading        -> skos:prefLabel       (@de)
//   gndo:variantNameForTheSubjectHeading          -> skos:altLabel        (@de)
//   gndo:definition                               -> skos:definition      (@de)
//   gndo:broaderTermGeneral|Generic|Instantial|Partitive -> skos:broader
//   gndo:relatedTerm|relatedSubjectHeading        -> skos:related
//   gndo:gndIdentifier                            -> skos:notation
//   skos:exactMatch|closeMatch|broadMatch|narrowMatch|related (mappings) -> kept as-is
// Everything else (gndSubjectCategory, DDC, dates, /about provenance, ...) is
// dropped from the SKOS view — it is not part of the concept-scheme semantics.

import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import N3 from 'n3';

const { namedNode, literal } = N3.DataFactory;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(DIR, 'cache', 'sachbegriff.ttl.gz');
const OUT = path.join(DIR, 'cache', 'source.nt');
const SCHEME = 'https://d-nb.info/standards/elementset/gnd#subjects';

const GNDO = 'https://d-nb.info/standards/elementset/gnd#';
const SKOS = 'http://www.w3.org/2004/02/skos/core#';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';

// GND ontology classes that denote a subject-heading concept in this dump.
// (The Sachbegriff file only contains subject entities; we treat every typed
// entity as a concept, so the exact class list need not be exhaustive — any
// gndo:* type marks the subject as a Concept.)
const isGndoType = (o) => o.startsWith(GNDO);

// Predicate map: gndo/skos predicate IRI -> { p: skos predicate, lang?: force @de on plain literals }
const PRED = {
  [GNDO + 'preferredNameForTheSubjectHeading']: { p: SKOS + 'prefLabel', lang: 'de' },
  [GNDO + 'variantNameForTheSubjectHeading']:   { p: SKOS + 'altLabel',  lang: 'de' },
  [GNDO + 'definition']:                        { p: SKOS + 'definition', lang: 'de' },
  [GNDO + 'broaderTermGeneral']:    { p: SKOS + 'broader' },
  [GNDO + 'broaderTermGeneric']:    { p: SKOS + 'broader' },
  [GNDO + 'broaderTermInstantial']: { p: SKOS + 'broader' },
  [GNDO + 'broaderTermPartitive']:  { p: SKOS + 'broader' },
  [GNDO + 'relatedTerm']:           { p: SKOS + 'related' },
  [GNDO + 'relatedSubjectHeading']: { p: SKOS + 'related' },
  [GNDO + 'gndIdentifier']:         { p: SKOS + 'notation' },
  // Cross-vocabulary SKOS mappings already present in the dump — keep verbatim.
  [SKOS + 'exactMatch']:  { p: SKOS + 'exactMatch' },
  [SKOS + 'closeMatch']:  { p: SKOS + 'closeMatch' },
  [SKOS + 'broadMatch']:  { p: SKOS + 'broadMatch' },
  [SKOS + 'narrowMatch']: { p: SKOS + 'narrowMatch' },
  [SKOS + 'relatedMatch']:{ p: SKOS + 'relatedMatch' },
  [SKOS + 'related']:     { p: SKOS + 'related' },
};

const writer = new N3.Writer(fs.createWriteStream(OUT), { format: 'N-Triples' });
const concepts = new Set();   // subjects we have typed as skos:Concept
let inTriples = 0, outTriples = 0;

const parser = new N3.StreamParser({ format: 'text/turtle' });
const input = fs.createReadStream(SRC).pipe(zlib.createGunzip()).pipe(parser);

// A real GND subject concept is identified by a d-nb.info/gnd/ IRI. The dump
// also contains RDF blank nodes (relation-reification aux nodes) that carry a
// mapped predicate but have no gndo type — those are NOT concepts and are
// dropped (a concept's own triples are emitted directly off the named subject).
const isConceptIri = (s) => s.startsWith('https://d-nb.info/gnd/') && !s.endsWith('/about');

function emitConcept(s) {
  if (concepts.has(s)) return;
  concepts.add(s);
  writer.addQuad(namedNode(s), namedNode(RDF + 'type'), namedNode(SKOS + 'Concept'));
  writer.addQuad(namedNode(s), namedNode(SKOS + 'inScheme'), namedNode(SCHEME));
  outTriples += 2;
}

parser.on('data', (q) => {
  inTriples++;
  const s = q.subject.value, p = q.predicate.value, o = q.object;
  // Only act on real subject-concept IRIs; skip /about provenance + blank-node
  // aux resources (their non-concept triples carry no SKOS semantics here).
  if (!isConceptIri(s)) return;

  if (p === RDF + 'type' && o.termType === 'NamedNode' && isGndoType(o.value)) {
    emitConcept(s);
    return;
  }
  const map = PRED[p];
  if (!map) return;
  // Object must be a usable SKOS object: a literal, or a concept/named IRI.
  // Drop relations that point at blank nodes (broken aux references).
  if (o.termType === 'BlankNode') return;
  emitConcept(s); // ensure subject is typed even if its rdf:type line comes later/never
  let obj = o;
  if (map.lang && o.termType === 'Literal' && !o.language && !o.datatype?.value?.endsWith('#langString')) {
    // Plain string label -> tag as German (GND subject labels are German).
    obj = literal(o.value, map.lang);
  }
  writer.addQuad(namedNode(s), namedNode(map.p), obj);
  outTriples++;
});

parser.on('error', (e) => { console.error('parse error:', e.message); process.exit(1); });
parser.on('end', () => {
  // Declare the concept scheme itself.
  writer.addQuad(namedNode(SCHEME), namedNode(RDF + 'type'), namedNode(SKOS + 'ConceptScheme'));
  writer.addQuad(namedNode(SCHEME), namedNode(SKOS + 'prefLabel'),
    literal('GND-Sachbegriffe (GND subject headings)', 'de'));
  writer.end(() => {
    console.error(`gnd-subjects to-skos: ${inTriples} in -> ${outTriples} SKOS triples, ${concepts.size} concepts`);
  });
});

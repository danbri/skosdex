#!/usr/bin/env node
// Per-scheme syntax sanitiser for the Nomisma.org Turtle dump.
//
// The upstream dump (https://nomisma.org/nomisma.org.ttl) is INVALID Turtle:
// ~60 subjects/objects use the prefixed-name form `nm:foo_(bar)` whose
// unescaped parentheses are illegal in a Turtle PrefixedName local part, so
// both n3 and rapper reject the whole file ("Expected entity but got (").
//
// The parentheses ARE legal inside a full IRIREF (`<...>`), and `nm:` expands
// to <http://nomisma.org/id/>. So we rewrite only the offending prefixed names
// to their equivalent full IRIs — same entities, valid syntax. This is a
// formatting fix (no semantic change), consistent with the pipeline's
// "N-Quads syntax normalization only" policy.
//
// Usage:  node tools/nomisma-sanitise.mjs <in.ttl> [out.ttl]   (in place if no out)
import fs from 'node:fs';

const NM_BASE = 'http://nomisma.org/id/';
const inPath = process.argv[2];
const outPath = process.argv[3] || inPath;
if (!inPath) { console.error('usage: nomisma-sanitise.mjs <in.ttl> [out.ttl]'); process.exit(2); }

let text = fs.readFileSync(inPath, 'utf8');

// Match `nm:` + a local-name run that may include parens; rewrite ONLY the ones
// that actually contain a paren (the malformed ones) to a full IRIREF. Local
// names in this dump use [A-Za-z0-9_()-] (no dots), so we don't risk eating a
// statement-terminating '.'.
let rewrites = 0;
text = text.replace(/\bnm:([A-Za-z0-9_()\-]+)/g, (m, local) => {
  if (!local.includes('(') && !local.includes(')')) return m; // well-formed, leave as nm:
  rewrites++;
  return `<${NM_BASE}${local}>`;
});

fs.writeFileSync(outPath, text);
console.error(`nomisma-sanitise: rewrote ${rewrites} paren-bearing prefixed names -> full IRIs`);

"""Extract the explicit term blocks in archived Schema.org RDFa source files.

This is a structural extractor for these historical files, not an RDFa parser.
Modern RDF snapshots are parsed separately with Factoidal in build_history.mjs.
"""
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'data/history/sources'

def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT.parent), *args], text=True)

class Terms(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.records = {}
        self.current = None
        self.comment_depth = 0
        self.comment = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        resource = a.get('resource', '')
        if tag == 'div' and resource.startswith(('http://schema.org/', 'https://schema.org/')) and 'typeof' in a:
            name = resource.rsplit('/', 1)[-1]
            types = a['typeof'].split()
            self.current = self.records.setdefault(name, dict(name=name, kind='Property' if 'rdf:Property' in types else 'Type' if 'rdfs:Class' in types else 'Typed value', parents=[], domains=[], ranges=[], types=types, definition=''))
        if not self.current:
            return
        if self.comment_depth:
            self.comment_depth += 1
        elif a.get('property') == 'rdfs:comment':
            self.comment_depth = 1
            self.comment = []
        for prop, field in [('rdfs:subClassOf','parents'), ('http://schema.org/domainIncludes','domains'), ('http://schema.org/rangeIncludes','ranges'), ('schema:domainIncludes','domains'), ('schema:rangeIncludes','ranges')]:
            if prop in a.get('property','').split() and a.get('href'):
                self.current[field].append(a['href'].rsplit('/',1)[-1])

    def handle_endtag(self, tag):
        if self.comment_depth:
            self.comment_depth -= 1
            if not self.comment_depth and self.current:
                self.current['definition'] = ''.join(self.comment).strip()
        if tag == 'div':
            self.current = None

    def handle_data(self, text):
        if self.comment_depth:
            self.comment.append(text)

def extract(text):
    parser = Terms()
    parser.feed(text)
    return parser.records

baseline = extract((OUT / '2014-01-31.rdfa').read_text())
(OUT / '2014-baseline.json').write_text(json.dumps(list(baseline.values()), ensure_ascii=False))
manifest=[]
for q, end in [(12,'2014-03-31'),(13,'2014-06-30'),(14,'2014-09-30'),(15,'2014-12-31'),(16,'2015-03-31')]:
    revision=git('log','--first-parent','-1',f'--before={end}T23:59:59Z','--format=%H','HEAD').strip()
    paths=[p for p in git('ls-tree','-r','--name-only',revision).splitlines() if p.endswith('.rdfa') and (p=='schema.rdfa' or p.startswith('data/')) and '/releases/' not in p and '/examples/' not in p and '/l10n/' not in p and not any(x in p for x in ['20140818','20140912'])]
    records={}
    for path in paths:
        records.update(extract(git('show',f'{revision}:{path}')))
    assert len(records)>1000,(end,paths,len(records))
    filename=f'{end}.json'
    (OUT / filename).write_text(json.dumps(list(records.values()),ensure_ascii=False))
    manifest.append(dict(quarter=q,date=end,revision=revision,paths=paths,file=filename,terms=len(records)))
(OUT / 'git-snapshots.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Extracted {len(baseline)} baseline terms and {len(manifest)} quarterly source snapshots.')

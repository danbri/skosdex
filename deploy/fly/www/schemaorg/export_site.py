"""Package the timeline and its linked records for a static host."""
from pathlib import Path
import json
import shutil
import sys

source = Path(__file__).resolve().parent
target = Path(sys.argv[1]).resolve()
if target.exists():
    raise SystemExit(f'Refusing to overwrite existing directory: {target}')
target.mkdir(parents=True)
for name in ['schemaorg-growth.html', 'schemaorg-timeline.html', 'schemaorg-timeline.md', 'README.md', 'render_growth.mjs', 'build_growth.mjs', 'build_history.mjs', 'prepare_history.py', 'build_timeline.py', 'audit_vocabulary.mjs', 'package.json', 'package-lock.json', 'test_growth.mjs', 'export_site.py']:
    shutil.copy2(source / name, target / name)
for name in ['data', 'assets']:
    shutil.copytree(source / name, target / name)
core = source / 'node_modules/@factoidal/core'
assert json.loads((core / 'package.json').read_text())['version'] == '0.7.1'
vendor = target / 'assets/vendor/factoidal-0.7.1'
vendor.mkdir()
for name in ['browser.js', 'factoidal.js', 'LICENSE', 'NOTICE', 'package.json']:
    shutil.copy2(core / name, vendor / name)
worker = target / 'assets/sparql-worker.js'
worker.write_text(worker.read_text().replace('../node_modules/@factoidal/core/browser.js', './vendor/factoidal-0.7.1/browser.js'))
(target / 'index.html').write_text('<!doctype html>\n<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=schemaorg-growth.html"><title>schema.org timeline</title><a href="schemaorg-growth.html">schema.org timeline</a></html>\n')
(target / 'DEPLOYMENT.md').write_text('''# Static timeline deployment

Published at https://skosdex.fly.dev/schemaorg/schemaorg-growth.html.

The HTML, source assets, historical snapshots, audit records and build scripts
are copied from the timeline workspace. The only runtime packaging change is
that the SPARQL worker imports the vendored browser files from the installed
@factoidal/core 0.7.1 package. Query execution remains in the visitor’s browser.
The package license and notices are included beside those files.

For UI edits, run `node render_growth.mjs` in this directory. This uses the
included cached data. Reconstructing source history requires the original
Schema.org repository checkout; see README.md and data/history/README.md.

Changes under deploy/fly/www/ use the skosdex CI deployment from claude/main.
''')
files = [p for p in target.rglob('*') if p.is_file()]
print(f'Packaged {len(files)} files, {sum(p.stat().st_size for p in files):,} bytes: {target}')

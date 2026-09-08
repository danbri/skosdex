# Static timeline deployment

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

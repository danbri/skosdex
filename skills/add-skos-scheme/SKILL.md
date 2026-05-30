---
name: add-skos-scheme
description: Use when adding a new SKOS concept scheme / vocabulary / thesaurus to the skosdex repository (creating its third_party/skos/<slug>/ folder and meta.ttl), or when deciding whether a scheme's data may be committed and bundled given its license.
license: Apache-2.0
---

# Add a SKOS scheme

Each scheme lives in `third_party/skos/<slug>/` and is described by a single
`meta.ttl`. The common tooling (`scripts/skosdex`) reads `meta.ttl` and needs no
per-scheme code for the normal case.

## Steps

1. Pick a short kebab-case `<slug>` and create `third_party/skos/<slug>/`.
2. Copy `templates/meta.ttl` (next to this skill) into that folder and fill it
   in. See the `skosdex:` vocabulary in `ns/skosdex.ttl` for term definitions.
3. Determine the **license class** — this gates whether data may be bundled:
   - `public-domain` — CC0 / public domain → bundle OK.
   - `open` — permissive, commercial use allowed, no share-alike (e.g. CC BY,
     Apache, MIT, OGL) → bundle OK.
   - `copyleft` — viral / share-alike (e.g. CC BY-SA, ODbL, GPL) → **data is
     never committed or bundled**; keep metadata only.
   - `noncommercial` — any NC term → **metadata only**.
   - `proprietary` / `unknown` → **metadata only**.
4. If the source is small and `public-domain`/`open`, you may set
   `skosdex:sourceFile` to a committed copy under the scheme folder. Otherwise
   set `skosdex:sourceURL` (the tooling fetches into the gitignored `cache/`).
5. Verify: `node scripts/skosdex list` should show the scheme with the expected
   license class and inclusion status.
6. Build it: `node scripts/skosdex build` (see the `normalize-skos` skill).

## License policy (important)

The repository only carries openly-licensed data. Anything with a viral
(copyleft / share-alike) or anti-commercial (NC) license must stay
**metadata-only**: a `meta.ttl` record that lets others fetch it themselves
under its own terms. The bundler enforces this regardless of the `bundle` flag —
non-open data never reaches `dist/`. See `third_party/skos/README.md`.

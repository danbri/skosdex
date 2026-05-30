# skosdex

A toolkit and index for **SKOS** ([Simple Knowledge Organization System](https://www.w3.org/TR/skos-reference/)) concept schemes — a place to collect, normalize, query, and browse the many SKOS vocabularies published around the web.

The goal is to make it easy to:

- track an arbitrary number of third-party SKOS schemes,
- fetch and cache each scheme from its canonical source,
- normalize every scheme into a consistent, comparable form (N-Quads, with canonicalized blank nodes),
- load one or more schemes into a SPARQL endpoint and a Solr index, and
- browse and search them through a simple web frontend.

## Repository layout

```
third_party/
  skos/
    <scheme-name>/
      meta.ttl          # describes the scheme: source URL, format, license, etc.
      tools/            # optional per-scheme helpers (py or js) if a scheme
                        # needs custom fetching/cleanup beyond the defaults
      cache/            # cached copy of the upstream scheme (gitignored or
                        # tracked, depending on size/license)
      normalized/
        scheme.nq       # parsed & normalized N-Quads
        scheme.canon.nq # N-Quads with blank nodes canonicalized (RDFC-1.0)

scripts/
  skosdex             # main JS utility: reads meta.ttl, fetches, caches,
                      # normalizes, and prepares datasets for loading

# (planned) service layer
sparql/               # config to spin up a SPARQL endpoint over the datasets
solr/                 # Solr core config + indexing
web/                  # simple web frontend
```

## How it works

### 1. Describe each scheme — `meta.ttl`

Every SKOS scheme lives in its own folder under `third_party/skos/`. A
`meta.ttl` file describes the scheme in enough detail that the common tooling
can act on it without any per-scheme code: where to fetch it, what format it's
in, its license, homepage, expected concept scheme URI, and so on.

The intent is that `meta.ttl` is the single source of truth for a scheme, so
that adding a new vocabulary is usually just a matter of dropping in a new
folder with a `meta.ttl`.

### 2. Fetch & cache — `scripts/skosdex`

`scripts/skosdex` (written in JS) reads each `meta.ttl`, parses the metadata,
and caches a local copy of the upstream scheme under
`third_party/skos/<scheme>/cache/`. Schemes that need special handling can ship
their own helpers in `tools/` (Python or JS), but the common path requires
none.

### 3. Normalize to N-Quads

Each cached scheme is parsed and serialized to **normalized N-Quads**
(`scheme.nq`) — a flat, line-oriented, comparable representation of the graph.

### 4. Canonicalize blank nodes

A second N-Quads file (`scheme.canon.nq`) is produced with blank nodes
normalized using [W3C RDF Dataset Canonicalization (RDFC-1.0)](https://www.w3.org/TR/rdf-canon/).
This gives a stable, deterministic form that can be diffed and hashed across
runs and across schemes.

### 5. Serve

- **SPARQL** — spin up an RDF SPARQL endpoint populated with one or more of the
  normalized datasets, for ad-hoc querying across vocabularies.
- **Solr** — index the schemes in Solr for fast full-text and faceted search
  over labels, notes, and other literal properties.
- **Web frontend** — a simple UI on top of the SPARQL endpoint and Solr for
  browsing and searching the collected schemes.

## Status

Early scaffolding. The architecture above is the target shape; components are
being built out incrementally.

## Adding a new SKOS scheme

1. Create `third_party/skos/<scheme-name>/`.
2. Add a `meta.ttl` describing the scheme (source URL, format, license, …).
3. (Optional) Add `tools/` helpers if the scheme needs custom fetching or
   cleanup.
4. Run `scripts/skosdex` to fetch, cache, and normalize it.

# Fable notes — skosdex handoff — 2026-07-06

*Written by Claude Fable 5 at the end of a long collaboration with danbri, ahead of a
period where Fable won't be available. Audience: whichever Claude (or other model)
picks this up next. This is the document I wish I'd had on day one — state, strategy,
scars, and how to work well with the human. Read `CLAUDE.md` and the `skills/`
directory alongside this; they are the operational truth, this is the judgment layer.*

---

## 1. What this project is

**Mission (the standing goal, set by danbri): "ingest all the SKOS in the world."**
It is deliberately asymptotic — there is always one more vocabulary. Treat it as a
direction, not a checkbox. The concrete shape: fetch every openly-licensed SKOS
concept scheme on Earth, normalize to gzipped canonical N-Quads (Git LFS), and serve
the whole corpus live — SPARQL (Oxigraph) + full-text (Solr) + a web UI + semantic
embeddings — at **https://skosdex.fly.dev/**, deployed exclusively via CI from branch
**`claude/main`**.

A second, later goal refined the emphasis: *"stabilise data, site, workflows and
developer experience so UI improvements ship instantly and Solr/RDF/data work is as
rapid, cached, modular, predictable and incremental as possible."* Both goals are in
force. Speed and stability of iteration matter as much as corpus growth now.

## 2. State of the world (verified live, 2026-07-06)

- **~656 scheme directories**, ~650 with built `canonical.nq.gz` (LFS). Corpus spans
  Getty AAT/ULAN, LCSH + 17 LC vocabularies, MeSH, AGROVOC, GACS, ESCO, EuroVoc,
  GND subjects, RAMEAU, BNCF, WordNet, 141 Finto, 144 EU authority tables, 218 IPTC
  CVs, 128 RVA, 58 Loterre, UK Parliament thesaurus (141,822 concepts), NDLSH,
  NCL-CLC, nomisma, PeriodO, and many more. **Solr: ~2.69M concept docs.** SPARQL
  answers in <1s.
- **Embeddings: 313 schemes embedded** (`deploy/fly/www/embeddings/`, ~637 MB,
  LFS-tracked), model **multilingual-e5-large-instruct** (1024-dim, MIT, ONNX) —
  migrated from MiniLM on 06-17; `tools/embed_model.py` is the single source of truth
  for model parity between corpus and queries. The 4 giants (lcsh, getty-ulan,
  gnd-subjects, rameau) were range-chunk embedded in CI (`embed-giants.yml`).
- **Viz**: `viz.html` (formerly galaxy.html, which now redirects) — Three.js
  point-cloud galaxies per scheme, family galaxies (IPTC 7.6k, RVA 22.7k, EU 38.8k),
  a combined-space compare/overlay mode, touch-first interaction, scheme switcher.
- **API**: `/api/similar` + `/api/search` (`tools/embed_api.mjs` + a Python
  query-embed sidecar with LRU cache) over the curated 14-scheme `_all` blob
  (233k concepts). **⚠ currently broken — see §3.**
- **UI**: search (POST to Solr — never GET, see §5), language preference, collapsible
  scheme groups w/ animated SVG triangles, cluster-by-source results, breadcrumb +
  siblings navigation, "similar by meaning" with an all|also toggle (also = hide
  concepts already linked on the card), settings Reset/Save, `#c=<uri>` deep links,
  mobile layout fixes.
- **Fly.io**: single app `skosdex` (org `contextris`, region iad), one
  performance-4x/16GB machine + one 80GB volume `skosdex_data`. Deploys are CI-only
  (`FLY_API_TOKEN` secret). Serve-first boot: nginx comes up in seconds; Solr
  reseeds in background; oxigraph optimize is gated to large deltas.

## 3. ⚠ START HERE — known-broken right now

**The similarity API is returning garbage.** Verified today:
`/api/similar?id=<gemet climate change>` → uk-parliament rows with `score: 0`;
`/api/search?q=climate change` → Parliament people's names at ~0.88.

**Diagnosed cause (verified by byte math):** the live `_all.emb.json` index says
`n=233,539` (14 schemes, expects a 478,287,872-byte f16 blob) but the served
`_all.emb.f16` is **340,905,984 bytes = 166,458 rows** — a stale, smaller vectors
blob paired with a newer index. Rows are misaligned; anything past row 166k reads
as zeros (hence score 0). The boot-time "force-refresh `_all.emb.f16` on the
volume" sync (commit `8bd0863`) evidently didn't replace the blob, or an
LFS/copy step shipped the old file. **Fix:** regenerate `_all.emb.{json,f16}`
together (`tools/combine_curated.mjs` from `tools/compare_set.json`), verify
`size == n*dim*2`, and make `start.sh`'s sync *verify byte-length against the JSON*
before accepting the volume copy (self-healing beats hoping). Then re-test the two
API calls above and the concept-card "similar across vocabularies" panel.

Also partial: `embeddings/similar/` (precomputed static top-K) exists for only
3 of 313 schemes (esco, gemet, uk-parliament-thesaurus) — a rollout that stalled.

## 4. Architecture in one screen

```
meta.ttl (per scheme: sourceURL, format, license, conceptSchemeURI, bundle flag)
  └─ scripts/skosdex fetch → normalize (N-Quads, sorted) → canonicalize (RDFC-1.0)
       └─ canonical.nq.gz  [Git LFS; the repo IS the corpus]
            └─ skosdex graphed [slug…]   (per-scheme named-graph files; CACHED per scheme)
            └─ skosdex solr-docs         (per-scheme ndjson cache → parts of ≤50k docs)
                 └─ CI build-image → GHCR → flyctl deploy
                      └─ start.sh: serve-first boot; markers on the volume make
                         re-seeds incremental; optimize gated; Solr reseed backgrounded
embeddings: embed_scheme.py (--range for giants) → <slug>.emb.{json,f16}
            layout_scheme.py (UMAP 2D+3D + spatial k-means themes) → <slug>.layout.json
            combine_*(family/curated/all) → _all.* → embed_api.mjs (/api) + viz.html
```

**Deploy paths, in order of preference:**
1. **UI fast path** — a push touching *only* `deploy/fly/www/**` skips LFS +
   graphed + solr-docs and layers www onto `:latest` (`Dockerfile.ui`). ~1–2 min.
   To use it when you also have non-www commits: **push the non-www commit first**
   (tools/, docs/ don't trigger deploy), *then* the www-only commit.
2. **Direct deploy** — small data deltas; the size-of-delta auto-chooser
   (reads LFS pointers for changed canonicals; ≥50MB → cutover) picks this
   automatically; optimize-gate means no blackout.
3. **Cutover** — big data (was built for TGN-scale). Forks the prod volume, seeds
   on a temp indexer machine, swaps. **Hardened after a real outage**: waits for
   fork *hydration* (a fork's source volume stays locked until the copy finishes —
   this once stranded prod with no machine), and always deploys even if the
   old-volume destroy fails. `recover-fly.yml` and `cleanup-fly-volume.yml` are the
   push-to-self-triggered safety nets (MCP tokens **cannot** `workflow_dispatch` —
   403 — so these workflows trigger on pushes to their own file, with baked defaults).
4. **`[skip ci]`** in the commit subject suppresses deploy entirely — used to land
   data/vectors without touching prod, then deploy deliberately later.

## 5. Hard-won lessons (each cost real hours — do not relearn)

**Sandbox environment**
- Egress goes through a TLS-intercepting proxy. Headless-browser fetches need
  `ignoreHTTPSErrors: true` / `--ignore-certificate-errors`; sites behind
  Cloudflare *challenges* (OCLC FAST) are **unreachable** — the browser↔CF handshake
  itself breaks (CF error 525) so no cookie trick works. Don't burn time; ask danbri
  to fetch the file from a normal network.
- Containers are ephemeral. Anything worth keeping: commit + push same session.
  On resume, `GIT_LFS_SKIP_SMUDGE=1 git fetch/checkout` to avoid pulling ~4GB of LFS.
- No local `flyctl`, no `gh`; GitHub via MCP tools only (which can't dispatch
  workflows — see push-to-self pattern above). GitHub API unauth'd is rate-limited;
  use WebFetch or MCP.
- Playwright + Chromium/WebKit live in `/tmp/browser` (reinstall is quick;
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` has chromium+webkit). WebGL works
  with `--use-angle=swiftshader`.

**Fly.io**
- A forked volume locks its **source** until hydration completes (minutes–tens of
  minutes for 80GB). Never destroy-then-deploy; always deploy-then-cleanup.
- Orphaned volumes bill (~$12/mo per 80GB). After any cutover/incident,
  `flyctl volumes list` should show exactly one `skosdex_data`.
- `flyctl machine run/status` lack `--json` on the CI version — parse
  `machines list --json` by `--name` instead.
- Billing intuitions that proved true: temp indexer machines cost tens of cents;
  the baseline is the single always-on machine + volume.

**Solr**
- iOS/WebKit rejects very long URLs → **always POST** to `/solr/skos/select`
  (nginx `limit_except GET POST`). This was the "string did not match the expected
  pattern" bug.
- Big posts kill the default heap: parts are byte-capped, `SOLR_HEAP` raised,
  open-file limit raised. Typed schema must be **verified applied before seeding**
  (a NumberFormatException plague came from racing it).
- Reseeds run in the **background** (core persists on the volume and stays
  queryable). First-ever seed and cutover staging still block, by design.

**RDF wrangling**
- `rapper` is pathologically slow on huge RDF/XML (ESCO: ~12MB/min). Use Apache
  Jena `riot` for big RDF/XML / JSON-LD → N-Triples.
- Real-world dumps are dirty: nomisma had 60 paren-bearing prefixed names (invalid
  Turtle — fixed by rewriting to full IRIs, a pure syntax transform:
  `tools/nomisma-sanitise.mjs`); INRAE CropUsage uses dates-as-IRIs; the IPTC
  `?format=turtle` URL serves HTML (use Accept-header content negotiation, or take
  the RDF/XML). Upstream bugs live in repo issues #3 (Oxigraph SERVICE federation)
  and #4 (source syntax errors) — file, don't silently patch semantics.
- Getty-scale files: stream everything (`unzip -p | gzip`, sort with
  `--compress-program=gzip -T /tmp`); a 38.8GB uncompressed sort will NOT fit on
  the 20GB sandbox disk.

**Corpus / licensing discipline (non-negotiable, danbri enforced it explicitly)**
- **Never guess a license.** Explicit license in `meta.ttl` (verified at source,
  with the verification date+URL in a comment) gates bundling. open/public-domain →
  bundle everywhere; copyleft/noncommercial → container-only; unstated → excluded.
  The AgroPortal batch was *built and then deleted* because licenses couldn't be
  verified without an API key. That precedent stands.
- Modifications are **N-Quads syntax normalization only; no semantic changes** —
  this phrase is in every manifest entry and it is a promise.

**Process**
- `npm run check` (`scripts/check.mjs`) is the integrity harness (infra + SPARQL
  cookbook + api + data). Run it after anything structural; extend it when a new
  class of breakage appears (it exists because the cookbook rotted silently once).
- Verify UI work in **WebKit** (danbri is on iOS Safari) — several bugs only
  reproduced there. Playwright webkit engine, `domcontentloaded` (not networkidle).
- CI caches make builds incremental: warm graphed+solr-docs ≈ 40s vs ~25min cold.
  Don't break the sidecar cache-key scheme (`GRAPHED_CACHE_VER`/`SOLR_CACHE_VER` —
  bump them when the transform changes).

## 6. Working with danbri

- **Honesty is the currency.** He asks for "genuinely honest" comparisons and
  self-critique, and once caught a re-introduced error with *"did you lose yesterday
  evening's context already?"*. When something is worse than claimed, say so first.
  When you're unsure whose screenshots you're looking at — check before claiming
  credit or accepting blame (subagent image-verification worked well for this).
- **Cost transparency before spend.** He set a $15 LFS budget, asked for Fly billing
  implications *before* approving the cutover, chose to destroy an idle $12/mo
  volume. State the cost implications of a plan up front, then let him choose.
- **Ask before prod-touching deploys; act freely below that line.** After the
  outage, the pattern that worked: land data/features with `[skip ci]`, present the
  deploy decision with costs, execute on his word. Small UI ships on the fast path
  were fine to just do.
- **He thinks in product terms and gives terse, high-signal feedback** ("use
  italics and gentle colour bg", "have an all|also so we don't waste time repeating
  links", "we are in BST"). Implement precisely what's asked, verify it live, show
  evidence (screenshots), and offer the next refinement — he often takes it.
- **He enjoys ambition** — "install headless chrome and remote control it", the
  galaxy, embeddings — but wants experiments scoped cheaply first (his words:
  *"we'll do it opensource, try a small vocab initially"*).
- Report times in **BST (UTC+1)**. He's often on a phone: keep answers skimmable,
  send images/files when visual.
- Stop-hook goals fire repeatedly and can push toward busywork. His actual intent
  outranks hook literalism: when the goal is asymptotic, make real zero-risk
  progress or state plainly why stopping is correct — don't manufacture activity.

## 7. Strategy & open threads (ranked)

1. **Fix `/api` `_all` desync** (§3). Highest value-to-effort; the cross-vocabulary
   see-also is one of the project's most distinctive features.
2. **Finish the precomputed-similar rollout** (3/313 schemes done). Static top-K
   files free the server from holding all vectors and make the concept card fast
   everywhere. `tools/precompute_similar.py` exists; it's a batch + ship problem.
3. **Getty TGN** (291M quads, ~2GB LFS) — built once, deliberately deferred and the
   seeded volume destroyed (danbri's call, cost). To land it: rebuild canonical
   (streaming, no sort needed — Getty exports are pre-unique), push, let the
   auto-chooser take the hardened cutover. Doubles the triplestore; flag LFS
   bandwidth math first (every full CI build pulls the whole corpus).
4. **OCLC FAST** — open (ODC-By), wanted, but its host is CF-challenge-walled and
   this sandbox cannot clear it (§5). Unblock = danbri downloads `FASTAll.nt.zip`
   (~266MB) anywhere and drops it in; `fast/meta.ttl` is already fully configured.
5. **AgroPortal re-onboarding** — ~20 SKOS ontologies removed for unverifiable
   licenses. A free API key (`agroportal.eu/accounts/new`) exposes `omv:hasLicense`
   cleanly; keep CC-BY/CC0, drop "No license". Extend to EcoPortal.
6. **Embeddings economics** — 313 schemes are embedded; the remainder is mostly the
   long tail plus policy questions (container-only schemes: embed or not?). The
   giants pipeline (`embed-giants.yml`, range-chunked, HF-429 retry) is the template
   for anything big. GPU batch box exists as a skill (`embed-at-scale`) — **always
   tear the GPU box down**; it's the one thing that can silently bill.
7. **Entity typing** (`entity_types.py`, anchors + margins) — Person/Org vs topic
   labeling for cluster legends; was mid-tuning (chemistry→Person misfires fixed
   with decoy anchors). Worth a quality pass over more schemes.
8. **Registries that aren't sources**: BARTOC/Loterre-Skosmos/RVA `/data` endpoints
   are disabled or metadata-only — the RDF lives at original publishers. "Scrape a
   Skosmos" is not a general strategy; Finto is the exception that truly hosts.
9. **Big fish, needs scoping**: GND full (CC0), Wikidata-as-SKOS (CC0, needs a
   scoping strategy — don't attempt wholesale).
10. **Site polish backlog**: viz de-bleach is tuned but dense clouds remain hard on
    phones; the "hard to use mode" title is danbri's wry honesty — an approachable
    guided view might be the next UI experiment.

## 8. Where knowledge lives

| Place | What |
|---|---|
| `CLAUDE.md` | Hard rules: LFS practice, license policy v2, claude/main, deploy guidance |
| `skills/` (8 skills) | **The runbooks.** add-skos-scheme, normalize-skos, build-data-bundle, curate-vocabularies, deploy-fly, embed-at-scale, embeddings-api, run-endpoints |
| `third_party/skos/CANDIDATES.md` | The living backlog + triage of every vocabulary considered, with license verdicts and onboarding notes |
| `third_party/skos/README.md`, `AUDIT.md` | License policy detail; corpus audit snapshot |
| `deploy/fly/EMBEDDINGS-API.md` | The embeddings/one-space/API contract |
| `scripts/check.mjs` (`npm run check`) | Integrity harness — run it, extend it |
| GitHub issues #3, #4 | Upstream bug reports (Oxigraph federation; source syntax errors) |
| Workflow files | Each is heavily commented; `recover-fly.yml`/`cleanup-fly-volume.yml` are incident runbooks in executable form |

## 9. Parting principles

1. **The repo is the corpus.** Losing a container costs nothing; losing an
   unpushed canonical costs a rebuild. Commit early, `[skip ci]` liberally.
2. **Serve-first, always.** Every boot-path change should answer: "does nginx come
   up before the slow thing?" The outage happened because the answer was once no.
3. **Licenses are facts, not vibes.** Verify at source, date the verification,
   or don't bundle.
4. **Prefer boring, incremental, cached.** The 40-second warm build is the
   project's biggest DX win; protect it.
5. **Show, don't claim.** Verify in WebKit, screenshot the *deployed* thing,
   present evidence. danbri checks.
6. **When something breaks in prod, diagnose from logs before acting** — the
   fork-hydration outage was extended by a recovery that guessed. The volume/byte
   arithmetic in §3 is the model: numbers first, then the fix.

Good luck. It's a genuinely lovely project — a serious data-engineering discipline
wrapped around a simple joyful idea: all the world's vocabularies, in one place,
searchable by meaning. Keep it honest and keep it fast.

— Fable, 2026-07-06

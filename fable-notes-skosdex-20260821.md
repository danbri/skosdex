# Fable notes — skosdex handoff — 2026-08-21

Successor to [fable-notes-skosdex-20260706.md](fable-notes-skosdex-20260706.md)
(read that first for architecture, deploy paths, and the hard-won lessons — all
still accurate). This is the delta from one very long session (danbri's laptop,
first local checkout; previously the project ran mostly from a phone). The repo
sat idle 2026-07-06 → 2026-08-21 — danbri says model availability was disrupted
in that window, so treat the gap as an external hiatus, not lost interest.
Standing goal set via /goal: **"All The (Openly Licensed) SKOS In The World"**.

## 1. Headline: the STW lesson (read this even if you skip the rest)

STW Thesaurus for Economics sat wrongly excluded for months as "ODbL (not
granted)" — but ZBW relicensed it **CC BY 4.0 back in 2021** (v9.12). Root
cause, verified in page source: the download page still carries the old ODbL
`rel="license"` anchor + BY-NC-SA badge **inside an HTML comment**, ten lines
above the real "licensed under CC BY 4.0" sentence; a raw-HTML reader keyed on
the machine-readable annotation gets the 2015 answer. And exclusion is
self-sealing: excluded schemes never enter the onboarding flow whose verify
step would catch the error. Both lessons are now written into the
`curate-vocabularies` skill ("licenses rot", "rel=license trap", periodic
re-sweep of blocked lists). STW + its 8 mappings (5 CC0!) are onboarded
(`stw/`, `stw-mapping-*`), verified live on SPARQL and Solr.

## 2. What landed today (all on claude/main, all deployed or deploying)

- **Schemes**: stw + 8 stw-mapping-* (~505k quads); hasset (final 2021 release,
  CC BY-SA, rescued from its SOLE Wayback capture — the live host now just
  redirects to CESSDA/ELSST); nasa-thesaurus (1.14M quads; needed new
  `skosdex:baseURI` for relative rdf:about — CLI + ns/skosdex.ttl extended);
  uat (CC BY-SA 3.0, container-only); basisklassifikation; humord (+
  humord-mapping-realfagstermer); realfagstermer; physh.
- **In-flight 53-scheme wave** (built locally, NOT yet committed at writing):
  ilo-thesaurus, coar-*(3), cessda-topics, kb-brinkman, kb-gtt, rce-*(4),
  un-sdg, usgs-thesaurus, norway-los, acdh-{dyas,oefos}, idai-thesaurus,
  ekt-*(3), heritagedata-monument-types, gcmd-sciencekeywords,
  culture-fr-*(2), anzsrc-2020-for, koop-owms, es-cultura-*(9), ivoa-*(16).
  TWO FAILURES to triage: glottolog (cdstar n3.gz — check whether the
  double-slash in the original URL mattered), canada-cst (multites GUID URL —
  may want browser headers). Log: scratchpad wave-build.log.
- **/api outage class fixed** (commit 2e740f3) — the July notes' #1 thread.
  start.sh no longer unconditionally deletes the volume `_all.emb.f16`; it
  byte-verifies against `_all.emb.json` (n*dim*2), retries the fetch until it
  lands, and embed_api.mjs waits for a size-matching blob instead of
  crash-looping (and will never load a mismatched one). VERIFY after the
  current reseed: `/api/similar?id=<gemet uri>` and the concept-card
  cross-vocabulary block (`loadCrossSimilar`, index.html:516 — note it hides
  silently on any non-OK; adding a visible "unavailable" state is a TODO).
- **Pages fixed** — it had NEVER successfully deployed via workflow: the
  github-pages environment protection only allowed the old branch
  `claude/skos-main`. Added claude/main to allowed branches; pages.yml now
  just publishes committed docs/ (no npm, no LFS); docs/index.html is an
  authored landing page (un-gitignored); buildSite refreshes manifest only.
  Live again at danbri.github.io/skosdex.
- **Embed run in flight** (embed.yml run 32522405037, dispatch slugs: stw
  hasset nasa-thesaurus uat basisklassifikation humord realfagstermer physh).
  When vectors commit, viz.html's dropdown picks STW up automatically from
  embeddings/index.json. Cross-vocab `_all` is separate: manually curated
  tools/compare_set.json (14 schemes) → combine_curated.mjs → _all.* — adding
  STW there is a pending curation step.
- **Skills**: new `harvest-skos-registries` (verified recipes: Loterre via
  ORTOLANG, RVA access-points API, AgroPortal key + license API, ESCO direct
  URL, TriplyDB _api dumps for KB/RCE, IVOA conneg, PoolParty CONSTRUCT for
  ILO, GCMD KMS, opentheso, semantics.gr, NVS; anti-recipes: skosmos.bartoc
  and DANTE realities). curate-vocabularies + add-skos-scheme extended.
- **Policy**: ODbL stays excluded — danbri's explicit rationale: he does not
  want debates about whether named-graph separation is sufficient isolation
  under ODbL §4.5 collective-database terms. Recorded in memory + CANDIDATES.
  Do NOT re-litigate. (Iconclass wrinkle: its GitHub data repo is CC0 now with
  a make_skos.py build step — a possible route that avoids the ODbL question
  entirely; verify before acting.)

## 3. Current state of the moving parts (as of ~21:45 UTC+1 2026-08-21)

- Deploy 32521511105 (batch + /api fix) SUCCEEDED 20:28 UTC; box was mid
  boot-reseed at writing. Deploy pattern reminder: SPARQL updates atomically
  behind a short blackout; Solr trails, committing part-by-part (new schemes
  appear in search minutes after their graphs answer SPARQL).
- Wave build: ~27/53 canonicalized, churning through es-cultura-geografico
  (433k quads); IVOA tail is quick. After it: commit, push (= next deploy),
  update CANDIDATES rows.
- Research agents: "stats & geo SKOS hunt" still out (UNSD/SDMX/INSEE/
  ShowVoc-NACE/ONS/i14y/INSPIRE/marine-regions/OS/Pleiades); "GitHub/wiki/
  tagging hunt" REPORTED — top finds: NERC NVS (~350 collections, CC BY,
  per-collection conneg), W3C DPV 2.3, BGS + Geological Survey QLD + GA
  vocab repos, OpenActive, Oak curriculum, dini-ag-kim CC0 cluster, voc4cat,
  DBpedia skos_categories (CC BY-SA → container-only), GeoSphere AT; policy
  question for danbri: SAGE thesaurus (~60k) is CC BY-NC-SA — class not
  granted. Conversion candidates: GitHub Topics (CC BY), StackExchange tags
  (historical archive.org dump only; post-2024 dumps carry non-CC terms).
  Full report in the session transcript; CANDIDATES.md update pending.
- Federation (SERVICE) is UNHEALTHY from the box: qlever → nginx 504,
  dbpedia SERVICE returns empty though dbpedia answers directly. Undiagnosed
  (Fly egress throttling? nginx timeout?). The cookbook's federation demos
  depend on it. Open thread.
- Live corpus after wave lands: ~770+ schemes. dist/manifest.json is the
  authoritative list; the CANDIDATES "corpus built" table is a 2026-06 relic.

## 4. Environment notes (laptop)

git-lfs was missing (brew-installed today); the LFS corpus is ~10.8 GB — pull
selectively (`git lfs pull --include=third_party/skos/<slug>/canonical.nq.gz`),
never blind. `skosdex build <slug>` ends with a full-corpus bundleAll that
FAILS on unmaterialized LFS — use fetch/normalize/canonicalize per scheme
instead. The interactive shell is zsh: `for s in $VAR` does NOT word-split
(run loops via `bash script.sh`), and `echo ====` breaks on `=`-expansion.
Persistent memory also exists at ~/.claude/projects/-Users-danbri-working-skosdex/memory/.

## 5. Open threads (ranked)

1. Verify /api recovery end-to-end after reseed; add visible unavailable
   state to loadCrossSimilar.
2. Land the 53-wave (commit/push/deploy/verify; triage glottolog + canada-cst).
3. Fold BOTH research-agent reports into CANDIDATES.md; onboard next wave
   (NVS, DPV, geoscience trio, dini-ag-kim, OpenActive, Oak, voc4cat,
   DBpedia categories container-only…).
4. Re-curate compare_set.json (+stw at minimum) and regenerate _all after the
   embed run; then embed the 53-wave schemes.
5. Ask danbri: SAGE (BY-NC-SA) policy class; monthly refresh routine (he
   half-remembers one — none exists anywhere: no CI cron, no crontab, no
   cloud routine; offered to create a monthly re-fetch + license-resweep
   agent).
6. Federation outage; embeddings/similar static rollout still 3/313.
7. Blocked-but-reachable: TheSoz dump (license fine, no public bulk), ESCO
   (URL cracked, 173MB — onboard), Getty TGN/ULAN/FAST rebuild story, SAO
   (CC0 but KBV-not-SKOS), EMBNE (bot-blocked), Bibbi (email for dump).

## 6. Naming notes for the UI (danbri asked)

Scheme display names come from meta.ttl dcterms:title via manifest.json
(search UI) and embeddings/index.json (viz dropdown) — both data-driven, no
manual list to update. STW shows as "STW Thesaurus for Economics".
viz.html was born galaxy.html; renamed 2026-06-17 (dec9722) with a
redirect stub kept for old links; title is deliberately self-deprecating
("hard to use mode", 388edb8).

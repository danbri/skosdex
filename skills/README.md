# skosdex skills

skosdex is **skills-first**: the repeatable workflows live here as
[Agent Skills](https://agentskills.io) — one folder per skill, each with a
`SKILL.md` (YAML frontmatter + instructions) and any nearby supporting files
(templates, scripts, references).

A skill is loaded when its `description` matches what you're doing, so the
instructions stay out of the way until they're relevant.

| Skill | Use it when |
|-------|-------------|
| [`curate-vocabularies`](curate-vocabularies/SKILL.md) | Discovering, license-checking, and triaging candidate vocabularies. |
| [`add-skos-scheme`](add-skos-scheme/SKILL.md) | Adding a new SKOS vocabulary to `third_party/skos/`. |
| [`normalize-skos`](normalize-skos/SKILL.md) | Fetching, normalizing, or canonicalizing a scheme to N-Quads. |
| [`build-data-bundle`](build-data-bundle/SKILL.md) | Producing the shippable `dist/` dataset and Solr docs. |
| [`run-endpoints`](run-endpoints/SKILL.md) | Bringing up the SPARQL + Solr + web containers. |
| [`deploy-fly`](deploy-fly/SKILL.md) | Redeploying the live stack on Fly.io (direct vs cutover); debugging the box + Solr/seed gotchas. |
| [`embeddings-api`](embeddings-api/SKILL.md) | Concept embeddings: vectors, JSON formats, in-browser KNN/viz, and the similarity REST API. |

These skills are usable both by humans reading them and by agents (drop the
`skills/` folder where your agent tooling looks for skills, or point it here).

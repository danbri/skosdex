# DPP — Digital Product Passport vocabularies

SKOS vocabularies used by Digital Product Passport (DPP) schemes. There is one
subfolder per publisher or programme, so that others can add their own next to
it (for example CIRPASS-2, UNTP, GS1, Catena-X, national schemes, or community
crosswalks).

| folder | publisher | what |
|---|---|---|
| `ec/` | European Commission, DG GROW | EU DPP Registry semantic data artifacts (core + batteries), release 1.0.0 |

Each scheme folder works like any other skosdex scheme: a `meta.ttl` plus the
built `canonical.nq.gz`. The CLI finds schemes inside group folders and gives
each one a flat slug made of its path (`dpp/ec/battery-category` ->
`dpp-ec-battery-category`). `skosdex build dpp` or `skosdex build dpp/ec`
builds a whole group.

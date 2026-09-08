#!/usr/bin/env python3
"""Build the two timeline views from the per-project Markdown records."""

from datetime import date
from html import escape
from pathlib import Path
import re
import json

ROOT = Path(__file__).resolve().parent
CUTOFF = date(2026, 9, 8)
CATEGORIES = {
    "Non-Google": "external",
    "Alignment": "alignment",
    "Named contributor": "named",
    "Project": "project",
}
LINK = re.compile(r"\[([^\]]+)\]\(([^\s)]+)\)")
TOKEN = re.compile(r"(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`)")


def inline(text):
    """Render the small, explicit Markdown subset used by these records."""
    parts = []
    for token in TOKEN.split(text):
        link = LINK.fullmatch(token)
        if link:
            label, href = link.groups()
            if not (href.startswith(("https://", "http://", "#")) or ":" not in href):
                raise ValueError(f"Unsupported link: {href}")
            parts.append(f'<a href="{escape(href, quote=True)}">{escape(label)}</a>')
        elif token.startswith("**") and token.endswith("**"):
            parts.append(f"<strong>{escape(token[2:-2])}</strong>")
        elif token.startswith("`") and token.endswith("`"):
            parts.append(f"<code>{escape(token[1:-1])}</code>")
        else:
            parts.append(escape(token))
    return "".join(parts)


def blocks(text):
    output = []
    for block in re.split(r"\n\s*\n", text.strip()):
        if not block:
            continue
        if all(line.startswith("- ") for line in block.splitlines()):
            output.append("<ul>" + "".join(f"<li>{inline(line[2:])}</li>" for line in block.splitlines()) + "</ul>")
        else:
            output.append(f"<p>{inline(block)}</p>")
    return "\n".join(output)


def read_records():
    projects, events = [], []
    for path in sorted((ROOT / "data").glob("*.md")):
        if path.name == "README.md":
            continue
        source = path.read_text(encoding="utf-8")
        title = source.splitlines()[0].removeprefix("# ")
        sections = re.split(r"^## (\d{4}-\d{2}-\d{2}) — (.+)$", source, flags=re.M)
        if len(sections) == 1:
            raise ValueError(f"No dated entries in {path.name}")
        project = {"title": title, "path": f"data/{path.name}", "events": []}
        for i in range(1, len(sections), 3):
            when, event_title, body = sections[i:i + 3]
            day = date.fromisoformat(when)
            if not date(2011, 1, 1) <= day <= CUTOFF:
                raise ValueError(f"Out-of-scope event date: {path.name}: {when}")
            fields = {}
            for field in ("Category", "Status", "Summary"):
                match = re.search(rf"^{field}: (.+)$", body, re.M)
                if not match:
                    raise ValueError(f"Missing {field}: {path.name}: {when}")
                fields[field.lower()] = match.group(1)
            if fields["category"] not in CATEGORIES:
                raise ValueError(f"Unknown category: {fields['category']}")
            evidence = re.sub(r"^(?:Category|Status|Summary): .+\n?", "", body, flags=re.M).strip()
            links = LINK.findall(evidence)
            if not links:
                raise ValueError(f"Missing sources: {path.name}: {when}")
            event = dict(fields, date=day, title=event_title, evidence=evidence,
                         links=links, path=project["path"], project=title)
            project["events"].append(event)
            events.append(event)
        projects.append(project)
    events.sort(key=lambda event: (event["date"], event["title"]))
    return projects, events


def empty_message(year, quarter):
    if (year, quarter) == (2011, 1):
        return "Before the public launch."
    if (year, quarter) == (2026, 4):
        return "Future quarter at the 8 September cutoff."
    return "No milestone selected; not evidence of inactivity."


CSS = """
:root { color-scheme: light; --ink:#20313b; --muted:#53636a; --line:#d7dfde; --green:#12674e; }
* { box-sizing:border-box; }
html { scroll-behavior:smooth; scroll-padding-top:1rem; }
body { margin:0; background:#f6f7f3; color:var(--ink); font:15px/1.55 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
a { color:#155e77; text-underline-offset:.18em; }
a:hover { color:#073f50; }
a,code { overflow-wrap:anywhere; }
code { font-size:.88em; }
header,main,footer,.tools,.years { max-width:1560px; margin:auto; padding-left:clamp(18px,3.5vw,56px); padding-right:clamp(18px,3.5vw,56px); }
header { padding-top:44px; padding-bottom:22px; }
.eyebrow { margin:0 0 8px; text-transform:uppercase; letter-spacing:.12em; font-size:12px; font-weight:700; color:var(--green); }
h1 { font-size:clamp(30px,4vw,52px); letter-spacing:-.045em; line-height:1.12; margin:0 0 15px; font-weight:720; }
.intro { max-width:940px; margin:0 0 12px; font-size:17px; }
.scope { max-width:1100px; color:var(--muted); font-size:13px; margin:8px 0; }
.legend { display:flex; flex-wrap:wrap; gap:10px 20px; margin-top:18px; font-size:12px; }
.badge { display:inline-block; font-size:10px; letter-spacing:.035em; font-weight:750; text-transform:uppercase; border:1px solid #d4dddf; padding:2px 6px; border-radius:4px; background:#eff3f4; color:#435861; }
.badge.external { background:#e4f2e9; color:#115c43; border-color:#bad6c5; }
.badge.alignment { background:#fff1d9; color:#795408; border-color:#e7d3a9; }
.badge.named { background:#edf0fb; color:#465988; border-color:#ccd3e9; }
.tools { padding-top:14px; padding-bottom:10px; display:flex; flex-wrap:wrap; gap:12px; align-items:end; border-top:1px solid var(--line); }
.tools label { display:grid; gap:3px; font-size:12px; font-weight:650; }
input,select,button { font:inherit; padding:9px 11px; border:1px solid #a9b9bc; border-radius:6px; color:var(--ink); background:white; }
input { width:min(390px,80vw); }
button { cursor:pointer; }
button:hover { background:#edf3ee; }
:focus-visible { outline:3px solid #ad6621; outline-offset:3px; }
.result { color:var(--muted); font-size:12px; margin:0 0 10px; }
.years { display:flex; flex-wrap:wrap; gap:6px; padding-top:10px; padding-bottom:16px; }
.years a { padding:3px 8px; font-size:13px; background:white; border:1px solid var(--line); border-radius:4px; text-decoration:none; }
.year { margin:12px 0 30px; }
.year-heading { display:flex; align-items:baseline; gap:15px; margin-bottom:9px; }
h2 { font-size:28px; letter-spacing:-.03em; margin:0; }
.year-heading span { font-size:12px; color:var(--muted); }
.quarters { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:13px; align-items:start; }
.quarter { background:white; border:1px solid var(--line); border-radius:8px; overflow:hidden; min-width:0; }
.quarter h3 { margin:0; padding:9px 13px; background:#eef1ec; font-size:13px; border-bottom:1px solid var(--line); display:flex; justify-content:space-between; }
.quarter h3 span { color:var(--muted); font-size:11px; font-weight:400; }
.events { margin:0; padding:0; list-style:none; }
.event { padding:13px; border-bottom:1px solid #e8ece9; font-size:13px; }
.event:last-child { border-bottom:0; }
.event.external { border-left:3px solid #7dac95; padding-left:10px; }
.event-meta { display:flex; gap:7px; align-items:center; flex-wrap:wrap; margin-bottom:7px; }
time { color:var(--muted); font-size:11px; font-variant-numeric:tabular-nums; }
h4 { margin:0 0 5px; font-size:14px; line-height:1.4; }
.event p { margin:0 0 8px; }
.status { display:block; font-size:11px; color:var(--muted); margin:8px 0; }
details { font-size:12px; }
summary { cursor:pointer; color:#155e77; }
details .evidence { margin-top:10px; border-top:1px dashed var(--line); padding-top:10px; }
.evidence ul { padding-left:17px; }
.empty { color:var(--muted); margin:13px; font-size:12px; }
[hidden] { display:none !important; }
footer { padding-top:12px; padding-bottom:40px; border-top:1px solid var(--line); font-size:12px; color:var(--muted); }
.skip { position:absolute; left:18px; top:-100px; background:white; padding:8px; }
.skip:focus { top:8px; }
@media(max-width:1100px) { .quarters { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media(max-width:620px) { .quarters { grid-template-columns:1fr; } header { padding-top:30px; } .intro { font-size:15px; } }
@media(prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } }
@media print { body { background:white; font-size:10px; } .tools,.years,.skip { display:none !important; } header,main,footer { padding:12px; } h1 { font-size:30px; } .quarters { grid-template-columns:repeat(2,minmax(0,1fr)); } .quarter { break-inside:avoid; } .year { margin-bottom:15px; } .event { font-size:10px; } h4 { font-size:11px; } .badge,.status,time { font-size:9px; } details { display:none; } }
"""

JS = """
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const events = [...document.querySelectorAll('.event')];
function filter() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const event of events) {
    event.hidden = !(event.textContent.toLocaleLowerCase().includes(query) &&
      (category.value === 'all' || event.dataset.category === category.value));
    if (!event.hidden) count++;
  }
  const active = Boolean(query || category.value !== 'all');
  for (const quarter of document.querySelectorAll('.quarter')) {
    quarter.hidden = active && !quarter.querySelector('.event:not([hidden])');
  }
  for (const year of document.querySelectorAll('.year')) {
    year.hidden = active && !year.querySelector('.event:not([hidden])');
    const jump = document.querySelector(`.years a[href="#${year.id}"]`);
    jump.hidden = year.hidden;
  }
  document.querySelector('#result').textContent = `${count} of ${events.length} milestones shown`;
}
search.addEventListener('input', filter);
category.addEventListener('change', filter);
document.querySelector('#reset').addEventListener('click', () => {
  search.value = ''; category.value = 'all'; filter();
});
document.querySelector('#print').addEventListener('click', () => window.print());
document.querySelector('.tools').hidden = false;
filter();
"""


def build():
    projects, events = read_records()
    (ROOT / 'data' / 'audit').mkdir(parents=True, exist_ok=True)
    (ROOT / 'data' / 'audit' / 'milestones.json').write_text(json.dumps(events, default=str, indent=2) + '\n', encoding='utf-8')
    summary = ("A sourced selection of significant contributions, organized by year and quarter. "
               "Outside contributions include mixed collaborations and work incorporated by maintainers on others' behalf.")
    scope = ("Coverage: 2011–8 September 2026. Not an exhaustive contributor inventory. "
             "Empty quarters indicate gaps in this selection. Draft, release and external-publication dates are distinguished.")
    markdown = ["# Schema.org contributions · 2011–2026", "", summary, "", scope, "",
                f"{len(events)} milestones · {len(projects)} project records · [Animated growth](schemaorg-growth.html) · [HTML view](schemaorg-timeline.html) · [Project index](data/README.md) · [Method and caveats](README.md)", "",
                "**Key:** Non-Google = documented outside contribution; Alignment = external vocabulary reuse; Named contributor = affiliation unverified; Project = other significant context. Unclassified does not mean Google-only.", "",
                "**Statuses are historical:** a released Pending term is not a core promotion; a merged draft is not necessarily a published release. Repeated stages can refer to the same contribution.", ""]
    nav = " ".join(f'<a href="#year-{year}">{year}</a>' for year in range(2011, 2027))
    output = [f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Schema.org contributions · 2011–2026</title><meta name="description" content="A quarterly timeline of Schema.org contributions, with project records and source evidence.">
<style>{CSS}</style></head><body>
<a class="skip" href="#timeline">Skip to timeline</a>
<header><p class="eyebrow">A shared vocabulary, a shared history</p><h1>Schema.org contributions</h1>
<p class="intro">2011–2026 · {escape(summary)}</p>
<p class="scope">{escape(scope)}</p>
<p class="scope">{len(events)} milestones · {len(projects)} project records · <a href="schemaorg-growth.html">Animated growth</a> · <a href="schemaorg-timeline.md">Markdown timeline</a> · <a href="data/README.md">Project files</a> · <a href="README.md">Method &amp; caveats</a></p>
<div class="legend"><span><span class="badge external">Non-Google</span> Documented outside contribution</span><span><span class="badge alignment">Alignment</span> External vocabulary reuse</span><span><span class="badge named">Named contributor</span> Affiliation unverified</span><span><span class="badge">Project</span> Other significant context</span></div>
<p class="scope">Unclassified does not mean Google-only. Statuses describe the milestone at the time; successive stages may concern the same contribution.</p></header>
<div class="tools" hidden><label>Find a project, person or term<input id="search" type="search" placeholder="e.g. MusicBrainz, BBC, danbri"></label>
<label>Show<select id="category"><option value="all">All milestones</option>{''.join(f'<option value="{value}">{escape(key)}</option>' for key, value in CATEGORIES.items())}</select></label>
<button id="reset" type="button">Reset</button><button id="print" type="button">Print</button><p id="result" class="result" aria-live="polite"></p></div>
<nav class="years" aria-label="Jump to year">{nav}</nav><main id="timeline">''']
    months = ["Jan–Mar", "Apr–Jun", "Jul–Sep", "Oct–Dec"]
    for year in range(2011, 2027):
        year_events = [e for e in events if e["date"].year == year]
        markdown.extend([f"## {year}", ""])
        partial = " · through 8 September" if year == 2026 else ""
        output.append(f'<section class="year" id="year-{year}" aria-labelledby="heading-{year}"><div class="year-heading"><h2 id="heading-{year}">{year}</h2><span>{len(year_events)} milestones{partial}</span></div><div class="quarters">')
        for quarter in range(1, 5):
            selected = [e for e in year_events if (e["date"].month - 1) // 3 + 1 == quarter]
            markdown.extend([f"### Q{quarter} · {months[quarter - 1]}", ""])
            output.append(f'<section class="quarter" aria-labelledby="q-{year}-{quarter}"><h3 id="q-{year}-{quarter}">Q{quarter}<span>{months[quarter - 1]}</span></h3>')
            if not selected:
                message = empty_message(year, quarter)
                markdown.extend([message, ""])
                output.append(f'<p class="empty">{message}</p>')
            else:
                output.append('<ul class="events">')
                for event in selected:
                    category = event["category"]
                    cls = CATEGORIES[category]
                    when = event["date"].isoformat()
                    label, url = event["links"][0]
                    markdown.append(f'- **{when} · {event["title"]}** [{category}; {event["status"]}] — {event["summary"]} [Project record]({event["path"]}) · [{label}]({url})')
                    output.append(f'''<li class="event {cls}" data-category="{cls}"><div class="event-meta"><time datetime="{when}">{when}</time><span class="badge {cls}">{escape(category)}</span></div>
<h4>{escape(event["title"])}</h4><p>{inline(event["summary"])}</p><span class="status">{escape(event["status"])}</span>
<details><summary>Sources &amp; project notes</summary><div class="evidence"><p><strong>{escape(event["project"])}</strong> · <a href="{escape(event["path"])}">Markdown record</a></p>{blocks(event["evidence"])}</div></details></li>''')
                markdown.append("")
                output.append("</ul>")
            output.append("</section>")
        output.append("</div></section>")
    markdown.extend(["## Evidence and coverage", "", "See the [project records](data/README.md) for contributor credits, public sources, date caveats and draft/release distinctions. The [method note](README.md) describes the evidence reviewed and remaining gaps. Routine bug fixes are excluded. Undocumented verbal agreements are not inferred.", ""])
    output.append(f'''</main><footer><p>Compiled 8 September 2026 from release records, contemporary announcements, project sources, W3C records and repository history. Every milestone has expandable evidence and a project Markdown record. Routine bug fixes are excluded. Undocumented verbal agreements are not inferred.</p><p>Latest numbered release found: 30.0 (19 March 2026). Later repository changes are labelled separately. <a href="README.md">Read the method and remaining gaps</a>.</p></footer><script>{JS}</script></body></html>''')
    (ROOT / "schemaorg-timeline.md").write_text("\n".join(markdown), encoding="utf-8")
    (ROOT / "schemaorg-timeline.html").write_text("\n".join(output), encoding="utf-8")
    index = ["# Project records", "", "[HTML timeline](../schemaorg-timeline.html) · [Markdown timeline](../schemaorg-timeline.md) · [Method and caveats](../README.md)", "", "Each file groups a project or collaboration's dated additions, credits and sources. Categories and statuses apply per event, not automatically to the whole file. These are editable source records; both timelines are generated from them.", ""]
    for project in sorted(projects, key=lambda p: p["title"].casefold()):
        index.append(f'- [{project["title"]}]({Path(project["path"]).name}) — {len(project["events"])} dated entries')
    index.extend(["", f"{len(projects)} records; {len(events)} dated milestones. Selection through 2026-09-08, not a complete attribution audit.", ""])
    index.extend(["[Every term, grouped by first source addition](additions/README.md) · [Animated vocabulary explorer](../schemaorg-growth.html)", ""])
    (ROOT / "data" / "README.md").write_text("\n".join(index), encoding="utf-8")
    print(f"Built {len(events)} milestones in 64 quarters from {len(projects)} project records.")


if __name__ == "__main__":
    build()

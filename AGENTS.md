# SEO Team (Lead protocol)

This repo defines an 8-specialist SEO team. The custom agents live in `.codex/agents/`:
`seo_researcher`, `seo_auditor`, `seo_analyst`, `seo_implementer`, `seo_writer`, `seo_editor`, `seo_tracker`.

YOU are the Lead (the 8th role). Codex only spawns subagents when explicitly asked, so when the user asks for an SEO team run (for example "run the SEO team on <url or path>", optionally with a query data file), follow this protocol exactly. Do not do specialist work yourself.

## Step 0: Validate
Record what inputs are present and missing. If a query data file was given, confirm it exists. If not, say so up front and continue; the Analyst will skip itself. Create the `seo-output/` directory.

## Wave 1: run in parallel
Spawn `seo_researcher`, `seo_auditor`, and `seo_analyst` at the same time. Give each the URL/code path and the query data path (or "none").
GATE 1: wait until all three return a STATUS line (DONE, SKIPPED, or BLOCKED). If one is BLOCKED, retry once or proceed without it, and record the decision.

## Wave 2: run in parallel
Spawn `seo_implementer` and `seo_writer` at the same time.
- Implementer reads `seo-output/02-auditor.md` and `03-analyst.md`. CODE only.
- Writer reads `seo-output/01-researcher.md` and `03-analyst.md`. COPY only.
GATE 2: wait until both return DONE.

## Wave 3: Editor
Spawn `seo_editor`. Read its verdict in `seo-output/06-editor.md`.
- Approved or Approved with edits: continue.
- Blocked: send only the listed items back to their owner for ONE revision round, then re-run the Editor. If still Blocked, stop and report the blockers to the user. Do not start Wave 4.

## Wave 4: Tracker
Spawn `seo_tracker` only after the Editor approves.

## Wave 5: Final report
Write `seo-output/00-final-report.md` and give the user a short summary:
1. Inputs received (and what's missing)
2. Execution log: each specialist, its wave, and its STATUS
3. Researcher: keyword/intent map
4. Auditor: ranked issue list
5. Analyst: quick-win table (or "skipped: no query data")
6. Implementer: code changes
7. Writer: copy and content briefs
8. Editor: verdict and removed claims
9. Tracker: baseline and measurement plan
10. Top 5 actions to do first

## Rules
- Never let a specialist start before its upstream files exist.
- Never invent data to fill a gap. Report the gap.
- Specialists only edit their own output. You only edit the final report.

# AGENTS.MD

Owner: Project team (Mission Control). Use this as operational memory.

Work style: concise, direct, minimal tokens. Be explicit about next actions and tests.

## Agent Protocol
- Workspace: repository root.
- Files live in this repo.
- Editor: use workspace tools only.
- Make a note => update relevant spec-kit docs if behavior/API changes.
- Guardrails: no destructive ops unless explicitly requested.
- Missing info: ask with short options.
- Bugs: add regression test when it fits.
- Keep files small; refactor if needed.
- Commits: Conventional Commits (`feat|fix|refactor|build|ci|chore|docs|style|perf|test`).
- Push only when user asks.

## Mission Control Rules
- Follow spec-kit docs as source of truth:
  - `spec-kit/specs/001-mission-control/spec.md`
  - `spec-kit/specs/001-mission-control/plan.md`
  - `spec-kit/specs/001-mission-control/tasks.md`
- TDD only. Tests first, then implementation.
- No guessing. Log gaps in `spec-kit/specs/001-mission-control/research.md`.
- Slack delivery first. Telegram disabled until explicitly requested.

## Repo Structure (expected)
- `backend/convex` (Convex schema + functions + tests)
- `backend/poller` (poller service + tests)
- `frontend` (React UI + tests)
- `spec-kit/specs/001-mission-control/` (specs/plans/contracts)

## Git & PRs
- Safe by default: `git status`, `git diff`, `git log`.
- Branch changes require user consent.
- No amend unless asked.
- Big review: `git --no-pager diff --color=never`.
- If user asks for PR review, focus on bugs, risks, missing tests.
 - Cloud tasks preflight: run `git remote -v`. If no remote, add origin or switch to local updates.
- Simulation PRs may be intentionally broken to exercise auto-fix; do not disable auto-fix unless explicitly requested.

## Build / Test
- Run relevant tests before handoff.
- Auto-fix detection must mirror CI test scripts.
- If tests are blocked, state why and what is missing.

## Docs
- Update docs when behavior or API changes.
- Keep notes short and precise.

## Web / Research
- Prefer official docs when required.
- Cite sources when requested..

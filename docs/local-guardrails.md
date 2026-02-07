# Local Guardrails (Hooks + Codex Automations)

This doc covers **local** safeguards that run before code ever hits the remote CI/CD pipeline. They complement (but don’t replace) the CI/CD workflows in `.github/workflows/`.

## What’s here
- Git hooks (pre-commit, pre-push)
- Codex CLI usage in hooks
- Codex Mac app automations (read-only / fix)
- Bypass and cleanup tips

## Git Hooks in this repo

### Pre-commit (non-blocking, review only)
- File: `.git/hooks/pre-commit`
- Runs: `codex exec "/review staged" --sandbox read-only`
- If nothing is staged, it skips.
- It **does not block** the commit; it just reports.
- Bypass: `git commit --no-verify`

### Pre-push (blocking, tests + auto-fix)
- File: `.git/hooks/pre-push`
- Runs CI-equivalent tests:
  - `./spec-kit/scripts/test.sh`
  - `./scripts/test.sh`
- If tests fail:
  - Invokes Codex: `codex exec "Tests failed..." --sandbox workspace-write`
  - Re-runs tests; if still failing, the push is blocked.
- Bypass: `git push --no-verify`

## Codex Mac App automations (optional, scheduled)
- Read-only review: “Review uncommitted changes for bugs/security; report to Triage.”
- Workspace-write auto-fix: “If tests fail, create branch codex-auto-fix-{timestamp}, fix, rerun tests, report to Triage.”
- Runs in isolated worktrees (`.codex/worktrees/...`); doesn’t touch your main checkout.

## Every Code (`.code` CLI) auto-review
- Separate from Codex Mac app; runs in `.code/working/.../auto-review*` worktrees.
- Shows in the `.code` Agents panel (Ctrl+A), not in Codex Triage.
- Independent of the git hooks and Codex automations.

## Worktrees & cleanup
- Hooks run in your main worktree.
- Codex Mac app and `.code` auto-review create their own worktrees (detached HEAD) by design.
- Cleanup:
  - Archive runs in Codex Triage to remove its worktrees.
  - Manual: `git worktree prune` (removes stale entries), or `git worktree remove <path>` for live extra worktrees.

## Recommended daily flow
1) Work on a branch (not `main`).
2) Commit: pre-commit hook gives a quick Codex review (non-blocking).
3) Push: pre-push hook runs tests; if needed, Codex auto-fixes; blocks on failure.
4) Cloud CI/CD runs as the final gate.

## Quick references
- Bypass hooks: `git commit --no-verify`, `git push --no-verify`
- Inspect hooks: `.git/hooks/pre-commit`, `.git/hooks/pre-push`
- Codex CLI (non-interactive): `codex exec "<prompt>" --sandbox <mode>`
- Sandbox modes: read-only, workspace-write, full access (prefer read-only/workspace-write in hooks)


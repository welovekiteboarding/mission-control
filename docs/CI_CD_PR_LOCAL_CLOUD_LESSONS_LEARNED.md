# CI/CD, PR, Local vs Cloud, and Git Workflow Lessons Learned

## Purpose
This report captures what we learned while stabilizing the Mission Control workflow in GitHub and Codex.

## Executive Summary
1. CI jobs can run and pass, but merge can still be blocked if branch protection requires the wrong check names.
2. "Require status checks to pass before merging" is a merge gate, not a test runner.
3. Cloud and local execution are different operational environments; local is the reliable path for direct push/debug loops.
4. The fastest stable workflow is: local branch -> PR -> required checks pass -> merge.
5. Git lock errors (`.git/index.lock`) are concurrency/interruption artifacts, not repo corruption.

## What Actually Broke
1. PR checks appeared green, but merges were blocked.
2. Cause: required status checks in branch protection did not match current emitted check names.
3. We also had historical confusion caused by skipped Python/spec-kit checks.
4. Result: GitHub treated requirements as unmet even when CI looked healthy.

## Root Cause Details
1. Branch protection required check contexts were stale/outdated.
2. CI workflow changed over time, but protection rule entries were not updated to match.
3. A skipped check can still influence confidence and operator decisions, even if not technically required.

## What Fixed It
1. Removed Python/spec-kit CI job from `.github/workflows/ci.yml`.
2. Updated branch protection required checks to exact current check names.
3. Verified with smoke PRs that merge became clean without bypass.

## Current Required Checks (Working Set)
1. `Test Backend (convex)`
2. `Test Backend (poller)`
3. `Test Frontend`
4. `Test TypeScript (root)`

## Branch Protection Behavior (Important)
1. `Require status checks to pass before merging`
What it does: blocks merge until required checks are green.
What it does not do: start tests by itself.
2. `Require branches to be up to date before merging`
What it does: forces PR branch to include latest base branch before merge.
Tradeoff: safer integration, more friction.
3. `Require pull request before merging`
What it does: enforces PR-based flow (no direct merge-to-main path through UI without PR).

## Local vs Cloud: Practical Differences
1. Local thread/worktree is best for deterministic Git control and fast iteration.
2. Cloud tasks are useful for parallel execution and generation, but operational Git details can differ from local assumptions.
3. For production merges, local PR workflow is the stable control plane.

## Recommended Day-to-Day Workflow
1. Pull latest `main`.
2. Create feature branch from `main`.
3. Make change.
4. Run local checks relevant to the change.
5. Push branch.
6. Open PR.
7. Wait for required checks.
8. Merge when green.
9. Delete branch.

## Smoke Test Procedure (When Unsure)
1. Create tiny docs-only change on a fresh branch.
2. Open PR.
3. Confirm exact required checks appear and pass.
4. Confirm PR is mergeable without bypass.
5. Close PR if it was only a test.

## Bypass Rules: When to Use
1. Use only for emergency unblocking of CI plumbing itself.
2. Do not use for normal feature PRs.
3. If used, immediately restore strict settings and validate with a smoke PR.

## `.git/index.lock` Issue Explained
1. Git creates `.git/index.lock` while writing index state.
2. If a prior Git operation crashes/interrupts, lock may remain or writes may fail.
3. Symptom: "Unable to create ... .git/index.lock".
4. Safe response:
Check no active git writer process.
Remove stale lock.
Retry command.

## Why This Was Hard
1. Multiple moving parts changed at once: CI workflow, branch protection settings, PR state.
2. UI can show passing checks while protection still blocks on different required contexts.
3. Historical check names and current check names can silently diverge.

## Governance Recommendations
1. Treat branch protection and CI workflow as coupled configuration.
2. After any CI workflow rename/removal, immediately re-check required check contexts.
3. Keep one short smoke-test runbook and run it after CI policy changes.
4. Avoid introducing non-essential checks unless they are actively maintained.

## Current Status (At Time of Report)
1. Required checks are aligned and passing.
2. Merge gating works without bypass for normal PRs.
3. Python/spec-kit check is not part of required merge gate.

## One-Page Checklist
1. Are required check names exactly the same as PR check names?
2. Are all required checks green?
3. Is `main` protection still enforcing PR + required checks?
4. Did we avoid bypass for non-emergency merges?
5. Did we validate with at least one smoke PR after any policy change?

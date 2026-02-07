# Local Code Review & Auto-Fix with Codex Mac App

## Current State vs Local Alternative

| Aspect | Current (Cloud/PR) | Local (Mac App) |
|--------|-------------------|-----------------|
| **Where it runs** | GitHub Actions cloud runner | Your Mac (Codex app running) |
| **When it triggers** | On PR review/comment events | On schedule or manual trigger |
| **Git isolation** | Separate CI runner | Git worktree (isolated branch) |
| **Visibility** | PR comments in GitHub | Codex app Triage section |
| **Latency** | Minutes (cloud queue) | Seconds (local) |
| **Cost** | Uses Codex API quota | Uses Codex subscription |

---

## Current Repo CI/Hook Behavior (Mission Control)

These are the current, live rules in this repository:

1. **Local pre-push hook**: `/scripts/pre-push-codex.sh`
2. **Always runs**: `./scripts/test.sh`
3. **Conditionally runs**: `./spec-kit/scripts/test.sh` only when pushed commit range includes `spec-kit/**`
4. **CI workflow**: `/.github/workflows/ci.yml`
5. **CI gate for Python job**: `Test Python (spec-kit)` runs only when changed paths include `spec-kit/**` (via `dorny/paths-filter`)
6. **No root aggregate script**: there is no `npm test` or `npm run ci:all` at repo root

---

## What Codex Mac App Provides (Facts from Official Docs)

### 1. Built-in Automations
- **Location**: Codex Mac app → Automations tab
- **How it works**: Schedule prompts that run automatically on cadence
- **Git integration**: Uses background worktrees (doesn't touch your main checkout)
- **Sandbox modes**: Read-only, workspace-write, or full access
- **Triage inbox**: Review all automation runs in one place

### 2. Skills System
- **Built-in skills**: `$skill-creator`, `$plan`, `$skill-installer`
- **Community skills**: Available from `openai/skills` GitHub repo
- **Installation**: Use `$skill-installer` to add from GitHub
- **Scope**: Repo-level or user-level (`~/.codex/skills`)

### 3. CLI Commands
- **`codex`**: Interactive mode with full UI
- **`codex exec "prompt"`**: Headless execution for scripts
- **`/review`**: Four presets (base branch, uncommitted, commit, custom)
- **`codex resume --last`**: Continue previous session

---

## Recommended Local Workflow

### Option A: Pre-Push Review (Recommended)

**When**: Before pushing to remote
**What**: Catch issues locally before they reach PR

```bash
# Review uncommitted changes
codex exec "Review my staged changes for bugs, security issues, and best practice violations"
```

**Automation Setup**:
1. Open Codex Mac app → Automations
2. Create new automation:
   - **Prompt**: `Review uncommitted changes in this repo. Check for bugs, security issues, and violations of AGENTS.md guidelines. Report findings in Triage.`
   - **Schedule**: Every 30 minutes while app is running
   - **Sandbox**: Workspace-write (safe default)
3. Check Triage section periodically for review results

**Benefit**: Fix issues before they ever become PR comments

---

### Option B: Post-Push Local Review

**When**: After pushing, while waiting for PR review
**What**: Get faster feedback than cloud-based review

```bash
# Review latest commits vs origin/main
codex exec "Compare HEAD to origin/main. List any issues that should be fixed."
```

**Automation Setup**:
1. Create automation:
   - **Prompt**: `Fetch latest origin/main, compare to current HEAD, identify issues Codex would flag in PR review`
   - **Schedule**: Every hour
   - **Sandbox**: Workspace-write
2. Review findings in Triage before cloud review completes

**Benefit**: Faster iteration without waiting for cloud queue

---

### Option C: Companion to Cloud Review

**When**: Running alongside existing GitHub Actions workflow
**What**: Local triage + cloud validation

**Setup**:
1. Keep existing `codex-autofix.yml` workflow (PR-based)
2. Add local automation for continuous monitoring:
   - **Prompt**: `Monitor this branch for issues. When found, create a fix branch and apply fixes.`
   - **Schedule**: Every 2 hours
   - **Sandbox**: Full access (needs to create branches)

**Benefit**: Best of both - local speed + cloud PR integration

---

## Skills to Install

From `openai/skills` GitHub repo:

```bash
# Use skill-installer in Codex
$skill-installer gh-address-comments
$skill-installer gh-fix-ci
```

From ComposioHQ curated list:
- `gh-address-comments/` - Address review comments
- `gh-fix-ci/` - Fix failing CI checks
- `create-plan/` - Plan complex fixes

---

## Automation Prompt Examples

### Daily Code Health Check
```
Review the last 24 hours of commits to this repo. Check for:
1. Security vulnerabilities
2. Breaking changes
3. AGENTS.md guideline violations
4. Test coverage gaps

Create a report in Triage with findings.
```

### Pre-Commit Style Check
```
Check uncommitted changes for:
1. Conventional commit format
2. AGENTS.md style violations
3. Obvious bugs

Don't fix, just report to Triage.
```

### Auto-Fix Local Issues
```
Review uncommitted changes. If you find issues:
1. Create a branch named codex-auto-fix-{timestamp}
2. Apply the fixes
3. Report the branch name to Triage

If no issues, report "No issues found" to Triage.
```

---

## Git Worktree Behavior

**Important**: Automations in git repos create worktrees automatically.

```bash
# Your main checkout
~/dev/openclaw/  # You work here

# Automation worktrees (auto-created, isolated)
~/dev/openclaw/.git/worktrees/codex-automation-*/
```

**Cleanup**:
```bash
# List worktrees
git worktree list

# Remove old automation worktrees
git worktree prune
```

---

## Comparison: When to Use What

| Scenario | Use This |
|----------|----------|
| Pre-push sanity check | Local automation `/review` |
| Collaborative PR review | Cloud GitHub integration |
| CI failure fixing | Local `codex exec` or automation |
| Continuous monitoring | Local automation (hourly) |
| Team review workflow | Cloud PR + local companion |
| Quick local iteration | Local `codex exec` |

---

## Best Practices (from Official Docs)

1. **Test prompts manually** before scheduling as automation
2. **Review first few outputs** closely to adjust prompt/cadence
3. **Use workspace-write sandbox** for most automations (safer than full access)
4. **Archive old runs** to avoid worktree accumulation
5. **Combine with skills** using `$skill-name` in automation prompt
6. **Check Triage regularly** - findings accumulate there
7. **Skill locations (per docs):**
   - Repo: `$REPO/.codex/skills`
   - User: `$CODEX_HOME/skills` (default `~/.codex/skills`)
   - System: `/etc/codex/skills`

8. **Guardrail for empty trees:** In prompts, add a first line like
   `If there are no tracked changes (git status --short clean), exit and report "No tracked changes".`

---

## Preferred Local Workflow (with Git/PRs)

1) **Work on a branch**, not `main`, even when solo.
2) **Run local automations** (review/fix) before push.
3) **Push and open a PR**; let cloud CI/auto-fix run as a safety net.
4) **Merge PR** when green; delete branch.

Why: keeps history clean, preserves CI parity, and lets auto-fix create its own PRs cleanly.

---

## Local CI/CD Recipe (commit-time loop)

Add a pre-push script (or manual alias) that:

```
#!/bin/bash
set -e

# 1) always run root TypeScript tests
./scripts/test.sh

# 2) run spec-kit tests only when pushed changes touch spec-kit/
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  if git diff --name-only @{u}...HEAD | grep -q '^spec-kit/'; then
    ./spec-kit/scripts/test.sh
  fi
fi

# 3) if tests fail, run Codex fix locally
if [ $? -ne 0 ]; then
  codex exec "Tests failed. Fix issues, rerun ./scripts/test.sh, and if spec-kit changed rerun ./spec-kit/scripts/test.sh. Create branch codex-auto-fix-{timestamp}." --sandbox workspace-write
fi

# 4) optional: run a quick review
codex exec "Review staged changes for bugs/security; report succinctly." --sandbox read-only
```

Keep this local; the cloud workflow remains the PR gate.

---

## Quick Start Checklist

- [ ] Codex Mac app installed and running
- [ ] Repo opened in Codex (Project → Open Repository)
- [ ] Create first automation (start with read-only mode)
- [ ] Test prompt manually first
- [ ] Schedule automation (start with 1-hour cadence)
- [ ] Check Triage section for results
- [ ] Adjust prompt/cadence based on results
- [ ] Install useful skills (`gh-fix-ci`, `gh-address-comments`)
- [ ] Set up sandbox mode appropriately
- [ ] Configure git worktree cleanup if needed

---

## Sources (Official Documentation)

- [OpenAI Codex App - Automations](https://developers.openai.com/codex/app/automations/)
- [OpenAI Codex - Agent Skills](https://developers.openai.com/codex/skills/)
- [OpenAI Codex - CLI Features](https://developers.openai.com/codex/cli/features/)
- [GitHub - openai/skills](https://github.com/openai/skills)
- [GitHub - ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills)

---

## Notes

- All automations run **locally** on your Mac
- App must be running for automations to execute
- Worktrees prevent interference with your main checkout
- Triage section is your inbox for automation results
- Infinite loop protection is built-in (worktree isolation)

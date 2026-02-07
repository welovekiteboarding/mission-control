# Setup Checklist: Local Code Review Automation

## Phase 1: Initial Setup

### 1.1 Verify Codex Mac App
- [ ] Codex Mac app is installed
- [ ] You are signed in
- [ ] App is running (menu bar icon visible)

### 1.2 Open Repository in Codex
- [ ] In Codex app: File → Open Repository
- [ ] Navigate to `/Users/welovekiteboarding/Documents/Development/openclaw`
- [ ] Repository appears in Codex sidebar

### 1.3 Verify CLI Access
```bash
# Test in terminal
codex --version
```
- [ ] Command works
- [ ] Version displayed

---

## Phase 2: Create First Automation

### 2.1 Test Prompt Manually First
```bash
# In Codex app, start new thread and type:
Review my uncommitted changes for bugs and security issues. Report findings only, don't fix.
```
- [ ] Prompt works as expected
- [ ] Results are useful

### 2.2 Create Automation in Codex App

1. In Codex app, click **Automations** in sidebar
2. Click **+ New Automation**
3. Configure:

| Field | Value |
|-------|-------|
| Name | Pre-Push Review |
| Prompt | `Review uncommitted changes for bugs, security issues, and AGENTS.md violations. Report to Triage.` |
| Schedule | Every 30 minutes |
| Sandbox | Workspace-write |
| Project | openclaw |

- [ ] Automation created
- [ ] Toggle is ON (green)

### 2.3 Monitor First Run
- [ ] Wait for schedule (or trigger manually if available)
- [ ] Check **Triage** section in Codex sidebar
- [ ] Review the results

---

## Phase 3: Install Useful Skills

### 3.1 Install from GitHub
In Codex app, start a thread and type:

```
$skill-installer install gh-fix-ci from ComposioHQ/awesome-codex-skills
```

Repeat for:
- [ ] `gh-fix-ci` (Fix CI failures)
- [ ] `gh-address-comments` (Address PR comments)

### 3.2 Verify Installation
```bash
# List installed skills
ls ~/.codex/skills/
```
- [ ] Skills appear in list

---

## Phase 4: Configure AGENTS.md Integration

### 4.1 Create Repo-Level Skill
```bash
# In your repo
mkdir -p .codex/skills
```

Create `.codex/skills/SKILL.md`:
```markdown
---
name: repo-guidelines
description: Enforce openclaw repository coding standards from AGENTS.md
---

When reviewing code for this repository:
- Follow TDD (test-driven development)
- Use conventional commit format
- Keep responses concise and direct
- Minimize token usage
- Follow spec-kit docs as source of truth
- Check for security vulnerabilities
```

- [ ] Skill file created
- [ ] Appears in Codex skills list

### 4.2 Test Repo Skill
In Codex thread:
```
$repo-guidelines Review this file for compliance with repository standards.
```
- [ ] Skill invokes correctly
- [ ] References AGENTS.md guidelines

---

## Phase 5: Git Worktree Setup

### 5.1 Verify Worktree Support
```bash
git worktree list
```
- [ ] Shows main checkout
- [ ] No errors

### 5.2 Create Cleanup Script
Create `scripts/codex-worktree-cleanup.sh`:
```bash
#!/bin/bash
# Cleanup old Codex automation worktrees
git worktree prune
echo "Worktrees pruned: $(date)" >> ~/codex-worktree-cleanup.log
```

```bash
chmod +x scripts/codex-worktree-cleanup.sh
```
- [ ] Script created
- [ ] Executable permission set

### 5.3 Optional: Schedule Cleanup
Add to crontab (`crontab -e`):
```
# Run worktree cleanup weekly
0 0 * * 0 /Users/welovekiteboarding/Documents/Development/openclaw/scripts/codex-worktree-cleanup.sh
```
- [ ] Cron job configured (optional)

---

## Phase 6: Integration with Existing Workflow

### 6.1 Keep Cloud Workflow
Your existing `.github/workflows/codex-autofix.yml` continues to work for PR-based automation.

### 6.2 Define Local vs Cloud Roles

| Scenario | Tool |
|----------|------|
| Pre-push local review | Codex Mac app automation |
| PR review comments | Cloud Codex GitHub Actions |
| CI failure fixing | Either (local for speed, cloud for team) |
| Continuous monitoring | Local automation |
| Team collaboration | Cloud workflow |

---

## Phase 7: Advanced Configuration (Optional)

### 7.1 Create Custom Review Skill
Create `.codex/skills/code-review/SKILL.md`:
```markdown
---
name: security-review
description: Security-focused code review for this repository
---

Review code for:
- SQL injection vectors
- XSS vulnerabilities
- Auth/authorization issues
- Secret/credential exposure
- Input validation gaps
- Dependency vulnerabilities

Provide specific file:line references for issues found.
```

### 7.2 Create Multi-Step Automation
**Prompt for automation**:
```
Run $security-review on uncommitted changes. If issues found, create branch codex-security-fix-{timestamp} and apply fixes. Report branch to Triage.
```

### 7.3 Set Up Notifications (if needed)
Codex can integrate with:
- Slack (via skills)
- GitHub issues (via skills)
- Email (via system notifications)

---

## Verification

### Test Complete Workflow
1. Make a small change to a file (don't commit)
2. Wait for automation to run (or trigger manually)
3. Check Triage section
4. Review findings
5. If issues found, review the suggested fixes

- [ ] Full workflow tested
- [ ] Results are actionable
- [ ] Integration with existing process works

---

## Ongoing Maintenance

### Weekly
- [ ] Review Triage section for archived runs
- [ ] Archive old runs you don't need
- [ ] Run worktree cleanup if needed

### Monthly
- [ ] Review automation prompts for effectiveness
- [ ] Adjust cadence based on findings
- [ ] Update skills as needed

### As Needed
- [ ] Install new skills from community
- [ ] Create custom skills for repo-specific needs
- [ ] Adjust sandbox mode if automations need more access

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Automation not running | Ensure Codex app is open |
| No Triage results | Check "All" filter, not just "Unread" |
| Too many worktrees | Archive runs in Triage, run `git worktree prune` |
| Skill not found | Verify skill installation path |
| Prompt doesn't work | Test manually first, adjust scope |

---

## Documentation Links

- [Codex Automations](https://developers.openai.com/codex/app/automations/)
- [Codex Skills](https://developers.openai.com/codex/skills/)
- [Codex CLI](https://developers.openai.com/codex/cli/features/)
- [openai/skills GitHub](https://github.com/openai/skills)

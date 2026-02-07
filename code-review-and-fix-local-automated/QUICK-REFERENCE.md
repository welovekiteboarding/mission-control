# Quick Reference: Codex Mac App Local Automation

## Essential Commands

```bash
# Interactive mode
codex

# Review uncommitted changes
codex exec "Review staged changes for bugs and security issues"

# Review vs base branch
codex exec "Compare HEAD to origin/main and list issues"

# Resume previous session
codex resume --last

# Install a skill
$skill-installer gh-fix-ci
```

---

## Automation Templates

### 1. Daily Health Check
**Schedule**: Every 24 hours
**Sandbox**: Read-only
**Prompt**:
```
Review the last 24 hours of commits. Check for security issues, breaking changes, and AGENTS.md violations. Report to Triage.
```

### 2. Pre-Push Review
**Schedule**: Every 30 minutes (while working)
**Sandbox**: Workspace-write
**Prompt**:
```
Review uncommitted changes. Report bugs, security issues, and style violations to Triage. Do not fix.
```

### 3. Auto-Fix Issues
**Schedule**: Every 2 hours
**Sandbox**: Full access
**Prompt**:
```
Review uncommitted changes. If issues found:
1. Create branch codex-auto-fix-{timestamp}
2. Apply fixes
3. Report branch name to Triage
```

---

## Sandbox Modes

| Mode | Can Read | Can Write Files | Can Run Commands | Network |
|------|----------|-----------------|------------------|----------|
| Read-only | Workspace only | No | No | No |
| Workspace-write | Workspace only | Workspace only | No | No |
| Full access | Anywhere | Anywhere | Yes | Yes |

**Recommendation**: Start with workspace-write, upgrade to full access only if needed.

---

## Skill Locations (per Codex docs)

```
$REPO/.codex/skills/      # Repo-specific
$CODEX_HOME/skills/       # User (~/.codex/skills by default)
/etc/codex/skills/        # System-wide
```

---

## Triage Workflow

1. **Open Codex app**
2. **Click "Triage"** in sidebar
3. **Review automation runs** (newest first)
4. **Filter by**: All / Unread
5. **Click into run** to see full details
6. **Archive runs** you don't need (removes worktree)

---

## Worktree Management

```bash
# List worktrees
git worktree list

# Prune deleted worktrees
git worktree prune

# Remove specific worktree
git worktree remove <path>
```

---

## Key Differences: Local vs Cloud

| Feature | Local (Mac App) | Cloud (GitHub Actions) |
|---------|-----------------|------------------------|
| Speed | Seconds | Minutes |
| Cost | Subscription quota | API quota |
| Visibility | Triage section | PR comments |
| Trigger | Schedule/Manual | PR events |
| Git Isolation | Worktree | Separate runner |

**Note:** Worktree paths are managed by Codex; treat them as ephemeral. Use `git worktree prune` to clean stale ones.

---

## Troubleshooting

**Automation not running?**
- Codex app must be open
- Check automation is enabled (toggle switch)
- Verify schedule cadence

**No results in Triage?**
- Automation may have run but found nothing
- Check "All" filter (not just "Unread")

**Too many worktrees?**
- Archive old automation runs in Triage
- Run `git worktree prune` manually

**Prompt not working as expected?**
- Test manually in regular thread first
- Adjust prompt based on manual results
- Start with narrower scope

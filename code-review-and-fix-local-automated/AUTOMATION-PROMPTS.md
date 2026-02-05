# Automation Prompt Templates

Copy these prompts directly into Codex Mac app automations.

---

## Level 1: Read-Only Automations (Safe Starting Point)

### Daily Commit Summary
**Schedule**: Every 24 hours
**Sandbox**: Read-only
**Prompt**:
```
Review the last 24 hours of commits to this repository. Provide:
1. Number of commits
2. Files changed (count)
3. Any security concerns
4. Any breaking changes
5. Compliance with AGENTS.md guidelines

Report findings to Triage.
```

### Pre-Push Issue Detection
**Schedule**: Every 30 minutes
**Sandbox**: Read-only
**Prompt**:
```
If there are no tracked changes (git status --short clean), exit and report "No tracked changes".
Review all uncommitted changes in this repository. Check for:
1. Obvious bugs
2. Security vulnerabilities
3. Breaking changes
4. AGENTS.md style violations

For each issue found, provide:
- File path and line number
- Issue description
- Severity (low/medium/high)

Report to Triage. Do not make any changes.
```

### Dependency Check
**Schedule**: Daily at 9 AM
**Sandbox**: Read-only
**Prompt**:
```
Check package.json, requirements.txt, go.mod, and similar dependency files for:
1. Outdated dependencies with security updates
2. Known vulnerable versions
3. Deprecated packages

Report findings to Triage with package names and recommended versions.
```

---

## Level 2: Workspace-Write Automations (Can Edit Files)

### Auto-Fix Simple Issues
**Schedule**: Every 2 hours
**Sandbox**: Workspace-write
**Prompt**:
```
If there are no tracked changes (git status --short clean), exit and report "No tracked changes".
Review uncommitted changes. If you find issues that can be automatically fixed:
1. Create a branch named codex-auto-fix-{timestamp}
2. Apply the fixes
3. Commit with conventional commit format
4. Report the branch name to Triage

Only fix: typos, simple bugs, formatting, AGENTS.md style violations.
Do not fix: logic errors, refactoring, feature changes.

If no issues found, report "No issues found" to Triage.
```

Add tests to the prompt when appropriate:
```
After fixes, run: ./spec-kit/scripts/test.sh && ./scripts/test.sh
If tests fail, include the failure summary in Triage.
```

### Test Coverage Check
**Schedule**: Every 4 hours
**Sandbox**: Workspace-write
**Prompt**:
```
Review uncommitted changes. Check for missing test coverage:
1. New functions without tests
2. Modified functions with failing tests
3. Edge cases not covered

For each missing test, create a test file following this repo's testing patterns.
Commit to branch named codex-add-tests-{timestamp}.

Report to Triage with count of tests added.
```

### Documentation Update
**Schedule**: Daily
**Sandbox**: Workspace-write
**Prompt**:
```
Review recent commits (last 24 hours). For any API changes, new functions, or modified interfaces:
1. Update relevant documentation files
2. Add examples if needed
3. Update CHANGELOG if appropriate

Commit to branch named codex-docs-update-{timestamp}.
Report to Triage with summary of documentation updates.
```

---

## Level 3: Full Access Automations (Advanced)

### CI Failure Fix
**Schedule**: Manual trigger only
**Sandbox**: Full access
**Prompt**:
```
Check the latest CI run results. For any failing tests:
1. Identify the failure cause
2. Fix the issue (code change or test update)
3. Create branch codex-fix-ci-{timestamp}
4. Run tests locally to verify
5. Commit with conventional commit format
6. Report branch name and fix summary to Triage

If tests are failing due to external issues, report to Triage with explanation.
```

### Security Audit
**Schedule**: Weekly
**Sandbox**: Full access
**Prompt**:
```
Perform a security audit of this repository:
1. Check for exposed secrets or credentials
2. Look for SQL injection vectors
3. Check XSS vulnerabilities
4. Verify auth/authorization patterns
5. Review dependency vulnerabilities

For each issue found:
1. Create branch codex-security-{issue}-{timestamp}
2. Implement fix
3. Add test if applicable
4. Commit with conventional commit format

Report all findings and fixes to Triage with severity ratings.
```

### Refactoring Opportunity
**Schedule**: Weekly
**Sandbox**: Full access
**Prompt**:
```
Review the codebase for refactoring opportunities:
1. Duplicate code that could be extracted
2. Complex functions that could be simplified
3. Missing abstractions
4. Performance improvements

For each opportunity with clear benefit:
1. Create branch codex-refactor-{description}-{timestamp}
2. Implement the refactor
3. Ensure tests pass
4. Commit with conventional commit format

Report to Triage with summary of refactors and their benefits.
```

---

## Skill-Enhanced Automations

### Using $skill-installer
**Schedule**: Manual
**Sandbox**: Full access
**Prompt**:
```
$skill-installer install gh-fix-ci from ComposioHQ/awesome-codex-skills
```

### Using Community Skills
**Prerequisite**: Install skill first via `$skill-installer`

#### Fix CI with Skill
**Schedule**: Manual
**Sandbox**: Full access
**Prompt**:
```
$gh-fix-ci
```

#### Address PR Comments
**Schedule**: Manual
**Sandbox**: Full access
**Prompt**:
```
$gh-address-comments
```

---

## Custom Automation Combinations

### Multi-Step Review
**Schedule**: Every hour
**Sandbox**: Workspace-write
**Prompt**:
```
Run this workflow on uncommitted changes:

Step 1: Check for bugs and security issues
Step 2: Check AGENTS.md compliance
Step 3: Check test coverage
Step 4: Generate report

If issues found:
  Create branch codex-review-fix-{timestamp}
  Apply fixes
  Commit with conventional commit format
  Report branch to Triage

If no issues:
  Report "No issues found - ready to push" to Triage
```

### Pre-Commit Gate
**Schedule**: Every 15 minutes
**Sandbox**: Read-only
**Prompt**:
```
Perform pre-commit checks on uncommitted changes:

1. Conventional commit format for commit messages
2. No console.log or debug statements
3. No commented-out code
4. No TODO or FIXME in production code
5. All files have appropriate license headers

Report any violations to Triage with file:line references.
```

### Feature Branch Review
**Schedule**: Every 2 hours
**Sandbox**: Read-only
**Prompt**:
```
Compare the current branch to origin/main. Report:

1. Commits ahead of main
2. Files changed
3. Potential merge conflicts
4. Breaking changes compared to main
5. Missing tests for new features

Provide actionable report in Triage.
```

---

## Repo-Specific Templates (openclaw)

### Backend API Review
**Schedule**: Every 2 hours
**Sandbox**: Read-only
**Prompt**:
```
Review backend/ directory changes for:
1. API breaking changes
2. Missing error handling
3. Authentication/authorization issues
4. Database query optimization opportunities
5. Convex function best practices

Report findings to Triage with file:line references.
```

### Frontend Review
**Schedule**: Every 2 hours
**Sandbox**: Read-only
**Prompt**:
```
Review frontend/ directory changes for:
1. Accessibility issues
2. Performance optimizations
3. Responsive design considerations
4. State management best practices
5. Component reusability

Report findings to Triage with file:line references.
```

### Poller Service Review
**Schedule**: Every 2 hours
**Sandbox**: Read-only
**Prompt**:
```
Review backend/poller/ directory changes for:
1. Polling interval appropriateness
2. Error handling and retry logic
3. Resource cleanup
4. Race conditions
5. Idempotency

Report findings to Triage with file:line references.
```

---

## Prompt Best Practices

### DO:
- ✅ Start with "Review" or "Check" for read-only operations
- ✅ Specify what to report and where (Triage)
- ✅ Include file patterns when relevant
- ✅ Test manually before scheduling
- ✅ Start narrow, expand based on results

### DON'T:
- ❌ Use vague prompts like "fix everything"
- ❌ Start with full-access automations
- ❌ Schedule frequent automations without testing
- ❌ Forget to specify output destination

---

## Scheduling Guidelines

| Automation Type | Recommended Cadence |
|-----------------|---------------------|
| Read-only review | Every 30 minutes |
| Auto-fix simple issues | Every 2 hours |
| Documentation updates | Daily |
| Dependency checks | Daily |
| Security audit | Weekly |
| Refactoring | Weekly |
| CI failure fix | Manual only |

---

## Troubleshooting Prompts

### Too Many False Positives?
Narrow the scope:
```
Review uncommitted changes in backend/ directory only.
Report only HIGH severity issues to Triage.
```

### Not Finding Issues?
Expand the scope:
```
Review all changes (staged and unstaged).
Check for: bugs, security, style, performance, and documentation issues.
```

### Automation Takes Too Long?
Reduce the scope:
```
Review only staged changes (not unstaged).
Focus on bugs and security issues only.
```

---

## Customization Notes

1. **Replace repo-specific references**: Change "backend/" to your actual directories
2. **Adjust severity thresholds**: Add/remove severity levels as needed
3. **Modify cadence**: Change schedule based on your workflow
4. **Add repo-specific rules**: Reference your own guidelines files

---

## Testing Your Prompt

Before scheduling, test manually:

1. Open Codex app
2. Start new thread
3. Paste your prompt
4. Review the results
5. Adjust prompt if needed
6. Only then schedule as automation

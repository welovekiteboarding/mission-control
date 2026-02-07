# Cloud Agent Push Workflow

## Context

OpenAI Codex Cloud agents can create pull requests successfully, but updating those PRs from within the cloud environment is unreliable or impossible due to missing git remotes in the cloud sandbox. This document outlines practical workflows and workarounds for iterating on cloud-generated PRs.

**Note:** As of this writing, there is no official OpenAI documentation explaining why cloud agents lack git remotes. This could be intentional security design, a bug, or an undocumented limitation. Regardless of cause, the workflows below are what actually work in practice.

---

## The Problem

```
Cloud Agent Creates PR
    ↓
PR Has Issues (typical AI output)
    ↓
Cloud Agent Cannot Update PR
    ↓
git remote -v  →  (no output)
git push       →  "No configured push destination"
```

**What's happening:** Cloud agents run in isolated containers without origin remotes, preventing git push operations.

---

## Apply vs Create PR (Important)

- **Apply**: brings the cloud task’s diff into your **local working tree**. It does **not** create or update a PR.
- **Create PR**: leaves changes in the cloud task and opens a PR on GitHub.

**Apply “clean” standard:** Apply fails if the patch can’t be applied cleanly by `git apply` (i.e., any conflict or context mismatch causes a failure).

---

## ✅ Workflow 1: Cloud Drafts, You Iterate Locally (Recommended)

**Best for:** Most use cases where iteration is expected

### Step-by-Step

1. **Cloud agent creates draft PR**
   ```
   Task: Create feature X
   ↓
   Cloud creates PR #123 on branch: codex/abc123
   ```

2. **Fetch the cloud branch locally**
   ```bash
   git fetch origin
   git checkout codex/abc123
   ```

3. **Review the changes locally**
   ```bash
   # See what changed
   git log main..HEAD
   git diff main

   # Run the app
   npm run dev
   ```

4. **Make fixes/iterations**
   ```bash
   # Edit files as needed
   vim src/components/FeatureX.tsx

   # Test your changes
   npm run test
   ```

5. **Push to update THE SAME PR**
   ```bash
   git add -A
   git commit -m "fix: address review feedback"
   git push origin codex/abc123
   ```

6. **PR #123 is now updated** with your fixes

7. **Repeat** steps 3-5 as needed until satisfied

8. **Merge when ready**

### Why This Works

- The branch `codex/abc123` exists on your origin
- You have full git access locally
- You control the iteration
- No fighting cloud agent limitations
- Clean git history

---

## 🔄 Workflow 2: Cloud Fix Then Iterate

**Best for:** When you want to give the cloud agent another attempt before iterating locally

### Step-by-Step

1. **Cloud agent creates PR #1** (branch: codex/abc123) - has issues

2. **Review and document issues**
   ```
   Add PR comments like:
   - "Missing error handling on line 45"
   - "Should use TypeScript proper types here"
   - "Not responsive on mobile"
   ```

3. **Create NEW cloud task** with feedback:
   ```
   Task: Fix issues documented in PR #1:
   - Add error handling on line 45
   - Use proper TypeScript types
   - Make mobile responsive
   ```

4. **Cloud agent creates PR #2** (branch: codex/def456) - hopefully better

5. **YOU decide:**
   - If PR #2 is better → Close PR #1, merge PR #2
   - If PR #2 is also bad → Use Workflow 1 on PR #1

### Trade-offs

| Pro | Con |
|-----|-----|
| Cloud gets another shot | Multiple PRs to manage |
| Possibly better prompt → better output | PR #2 doesn't include PR #1 code unless merged |
| Can compare approaches | Confusing if both PRs are bad |

### When PR #2 Doesn't Include PR #1

**Important:** PR #2 starts from the current base branch, NOT from PR #1. So if you want PR #2 to include PR #1's work:

1. Merge PR #1 to a staging branch first:
   ```bash
   git checkout -b staging
   git merge codex/abc123
   git push origin staging
   ```

2. Tell cloud agent to work from staging branch in environment settings

3. PR #2 will now include PR #1's changes

---

## 🎯 Workflow 3: Hybrid Approach

**Best for:** Maximizing cloud agent value while maintaining control

### Decision Tree

```
Cloud agent creates PR
    ↓
Review PR
    ↓
┌─────────────────────────────┐
│ Is it close to what you want? │
└─────────────────────────────┘
    ↓                    ↓
  YES                  NO
    ↓                    ↓
Use Workflow 1    Close draft PR
(iterate locally)  Create new cloud task
                    with better prompt
                    OR just implement locally
```

### Process

1. **Start cloud task with "Draft" PR option**
   - Reduces merge pressure
   - Signals "work in progress"

2. **Quick review of draft PR:**
   - If 80%+ there → Use Workflow 1 (iterate locally)
   - If way off → Close and retry with better prompt OR implement locally
   - If multiple issues → Document and create new cloud task (Workflow 2)

3. **Iterate locally until ready**

4. **Mark PR as "Ready for review" when satisfied**

---

## 📋 Quick Reference Commands

### Fetch cloud PR locally
```bash
# Method 1: Direct checkout
git fetch origin
git checkout codex/abc123

# Method 2: Fetch by PR number
git fetch origin pull/123/head:pr-123
git checkout pr-123
```

### Update PR from local
```bash
# After making changes
git add -A
git commit -m "fix: description of changes"
git push origin HEAD  # Updates the existing PR
```

### See what PR this branch tracks
```bash
git branch -vv
# Output: codex/abc123 -> origin/codex/abc123 [PR #123]
```

### Create draft PR (if cloud didn't)
```bash
# When pushing first time
git push origin codex/abc123
# Then create draft PR in GitHub UI
```

### Compare PR to base branch
```bash
git diff main...HEAD  # Three-dot diff for PR comparison
```

### View PR changes before merging
```bash
# Fetch and checkout PR branch
git fetch origin
git checkout codex/abc123

# View changes
git log main..HEAD
git diff main

# Run tests
npm run test
npm run build
```

---

## ⚠️ What to Avoid

| Approach | Why to Avoid |
|----------|--------------|
| **Adding origin in cloud task** | Unreliable, may fail authentication, fights tool design |
| **Expecting cloud to update its own PR** | Not supported, will fail, wastes time |
| **Creating multiple PRs for same feature** | Confusing, hard to track, merge conflicts |
| **Merging bad PRs to "fix later"** | Pollutes main branch, breaks history |
| **Force pushing from cloud** | Dangerous, overwrites work, no safety net |

---

## 🔧 Environment Setup Tips

### Before Creating Cloud Tasks

1. **Ensure your environment is selected**
   - Check Codex Cloud settings
   - Verify correct repository is selected

2. **Consider using draft PRs**
   - Reduces merge pressure
   - Clear signal for "work in progress"

3. **Be specific in prompts**
   - More detail upfront = better first draft
   - Include edge cases you care about

### For Teams

1. **Branch naming convention**
   - Cloud uses: `codex/[task-id]`
   - You can rename: `git checkout codex/abc123` → work normally

2. **PR communication**
   - Use PR comments to document issues
   - Reference in follow-up cloud tasks

3. **Code review process**
   - Treat cloud PRs like junior dev PRs
   - Review thoroughly before merging
   - Expect to iterate

---

## 📊 Workflow Comparison

| Workflow | When to Use | Pros | Cons |
|----------|------------|------|------|
| **Cloud Drafts, You Iterate** | Most cases | Full control, reliable, clean history | Manual iteration required |
| **Cloud Fix Then Iterate** | Want cloud to retry | Cloud gets another shot | Multiple PRs, no code inheritance |
| **Hybrid** | Maximizing value | Flexible, adaptive | More complex decision tree |

---

## 🎓 Best Practices

### Do ✅

- Treat cloud PRs as drafts, not final code
- Review cloud PRs locally before merging
- Iterate locally to polish cloud output
- Use draft PRs to signal work-in-progress
- Be specific in prompts to reduce iterations
- Close bad PRs rather than merging them
- Test cloud changes thoroughly locally

### Don't ❌

- Expect cloud agents to ship production code directly
- Merge cloud PRs without review
- Create multiple cloud PRs for same feature unless comparing approaches
- Try to add origin remotes in cloud tasks
- Assume cloud agent "fixed" a previous PR
- Merge a cloud PR just to "unblock" the next one

---

## 🐛 Troubleshooting

### Issue: "Cannot find cloud branch locally"

**Solution:**
```bash
git fetch origin
git branch -a | grep codex  # List all cloud branches
git checkout codex/abc123
```

### Issue: "Push says branch doesn't exist"

**Solution:**
```bash
# Set upstream explicitly
git push -u origin codex/abc123
```

### Issue: "PR says it's from a deleted branch"

**Solution:**
```bash
# Cloud branches are usually preserved
# Check remote branches
git fetch origin
git branch -r | grep codex

# If gone, recreate from PR
git fetch origin pull/123/head:codex/abc123
```

### Issue: "Cloud created wrong branch/naming"

**Solution:**
```bash
# Rename locally to something meaningful
git branch -m codex/abc123 feature/my-feature-name
git push origin -u feature/my-feature-name

# PR will update to new branch
```

---

## 📚 Related Documentation

- [Codex Cloud Documentation](https://platform.openai.com/docs/codex)
- [Git Branching Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [GitHub Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests)

---

## Summary

**The reality:** Cloud agents cannot reliably update their own PRs due to missing git remotes in the cloud environment.

**The solution:** Iterate on cloud PRs locally using standard git workflow. The cloud agent's branch exists on your origin - fetch it, make changes, push to update the PR.

**The pattern:** Cloud creates draft → You iterate locally → You merge when ready.

This workflow is reliable, documented, and works with the tool as it exists today rather than fighting against its limitations.

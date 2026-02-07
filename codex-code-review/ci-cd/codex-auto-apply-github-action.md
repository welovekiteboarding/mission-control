# Codex Auto-Apply GitHub Action Setup

**Purpose:** Automatically apply Codex review fixes when `@codex fix comments` is used on a PR

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CODEX AUTO-APPLY WORKFLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. Codex reviews PR (automatic or manual @codex review)
   ↓
2. Codex posts review comments
   ↓
3. Someone comments: @codex fix comments
   ↓
4. GitHub Action triggers on issue_comment
   ↓
5. Action calls OpenAI API to generate fixes
   ↓
6. Action commits fixes to PR branch
   ↓
7. PR updated automatically
```

---

## Option 1: Using openai/codex-action (Official)

**Best for:** Simple PR review feedback application

### Setup Steps

#### 1. Create GitHub Action Workflow

Create `.github/workflows/codex-auto-apply.yml`:

```yaml
name: Codex Auto-Apply Fixes

on:
  # Trigger when someone comments @codex fix comments
  issue_comment:
    types: [created]
  # Also trigger on PR sync for auto-review
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: write
  pull-requests: write

jobs:
  codex-auto-apply:
    # Only run on PR comments, not issue comments
    if: github.event_name == 'issue_comment' && github.event.issue.pull_request != null
    runs-on: ubuntu-latest

    steps:
      - name: Checkout PR branch
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.issue.pull_request.head.ref }}
          fetch-depth: 0

      - name: Extract Codex review comments
        id: extract-comments
        run: |
          # Get PR comments that contain review feedback
          COMMENTS=$(gh api \
            repos/${{ github.repository }}/issues/${{ github.event.issue.number }}/comments \
            --jq '.[].body' | grep -i "codex\|suggestion\|fix" || echo "")

          echo "comments<<EOF" >> $GITHUB_OUTPUT
          echo "$COMMENTS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Run Codex to apply fixes
        if: steps.extract-comments.outputs.comments != ''
        uses: openai/codex-action@v1
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          task: |
            Apply the following code review fixes to this PR:

            ${{ steps.extract-comments.outputs.comments }}

            Please:
            1. Read the review comments
            2. Fix each issue in the appropriate file
            3. Test your changes
            4. Commit the fixes with message "codex: apply review feedback"

      - name: Push fixes
        if: success()
        run: |
          git config --local user.email "codex-bot@example.com"
          git config --local user.name "Codex Bot"
          git push origin ${{ github.event.issue.pull_request.head.ref }}
```

#### 2. Add OpenAI API Secret

```bash
# In your GitHub repo settings:
# Settings → Secrets and variables → Actions → New repository secret
# Name: OPENAI_API_KEY
# Value: your-actual-api-key
```

---

## Option 2: Custom Script with gh CLI

**Best for:** More control over when fixes are applied

### Setup Steps

#### 1. Create GitHub Action Workflow

Create `.github/workflows/codex-auto-apply-custom.yml`:

```yaml
name: Codex Auto-Apply (Custom)

on:
  issue_comment:
    types: [created]

permissions:
  contents: write
  pull-requests: write
  issues: read

jobs:
  auto-apply-fixes:
    # Only run on PRs with specific trigger phrase
    if: |
      github.event_name == 'issue_comment' &&
      github.event.issue.pull_request != null &&
      contains(github.event.comment.body, '@codex fix comments')

    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.issue.pull_request.head.ref }}
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Get PR details
        id: pr-details
        run: |
          PR_NUMBER=${{ github.event.issue.number }}
          PR_JSON=$(gh pr view $PR_NUMBER --json headRefName,baseRefName,body,title)

          echo "number=$PR_NUMBER" >> $GITHUB_OUTPUT
          echo "branch=$(echo "$PR_JSON" | jq -r '.headRefName')" >> $GITHUB_OUTPUT
          echo "title=$(echo "$PR_JSON" | jq -r '.title')" >> $GITHUB_OUTPUT
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Get Codex review comments
        id: review-comments
        run: |
          # Get all review comments from Codex
          COMMENTS=$(gh api \
            repos/${{ github.repository }}/pulls/${{ steps.pr-details.outputs.number }}/comments \
            --jq '.[] | select(.user.type == "Bot") | "\(.path):\(.line): \(.body)"' || echo "")

          # Also get PR review comments
          REVIEW_COMMENTS=$(gh pr view ${{ steps.pr-details.outputs.number }} \
            --json reviews -q '.[] | select(.author.type == "Bot") | .body' || echo "")

          echo "review_comments<<EOF" >> $GITHUB_OUTPUT
          echo "$REVIEW_COMMENTS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

          echo "file_comments<<EOF" >> $GITHUB_OUTPUT
          echo "$COMMENTS" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Codex CLI
        run: npm install -g @openai/codex

      - name: Apply Codex fixes
        id: apply-fixes
        run: |
          # Create a task file for Codex
          cat > /tmp/codex-task.md << 'EOTASK'
          # Code Review Feedback

          Please fix the following issues identified in code review:

          ${{ steps.review-comments.outputs.review_comments }}

          ${{ steps.review-comments.outputs.file_comments }}

          ## Instructions
          1. Fix each issue in the appropriate file
          2. Ensure all tests pass
          3. Follow the project's code style
          4. Commit changes with descriptive messages
          EOTASK

          # Run Codex with auto-approval
          codex exec --ask-for-approval never /tmp/codex-task.md || true
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

      - name: Commit and push fixes
        run: |
          git config --local user.email "codex-auto-apply[bot]@users.noreply.github.com"
          git config --local user.name "codex-auto-apply[bot]"

          # Check if there are changes
          if git diff --quiet; then
            echo "No changes to commit"
            exit 0
          fi

          # Add all changes
          git add -A

          # Commit with message
          git commit -m "codex: auto-apply review feedback"

          # Push to PR branch
          git push origin ${{ steps.pr-details.outputs.branch }}

      - name: Comment on PR
        if: success()
        run: |
          gh pr comment ${{ steps.pr-details.outputs.number }} \
            --body "✅ Automatically applied Codex review fixes."
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Option 3: CI-Failure Auto-Fix

**Best for:** Automatically fixing failing tests

Create `.github/workflows/codex-autofix-ci.yml`:

```yaml
name: Codex Auto-Fix CI Failures

on:
  # Trigger when main workflow fails
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main, dev]

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-fix-ci:
    # Only run if the workflow failed
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest

    steps:
      - name: Download CI logs
        uses: actions/github-script@v7
        id: download-logs
        with:
          script: |
            const runId = context.payload.workflow_run.id;
            const logs = await github.rest.actions.downloadWorkflowRunLogs({
              owner: context.repo.owner,
              repo: context.repo.repo,
              run_id: runId
            });
            return logs;

      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Codex to fix CI
        uses: openai/codex-action@v1
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          task: |
            The CI tests failed. Please:
            1. Review the failure logs
            2. Identify the root cause
            3. Fix the failing tests or code
            4. Ensure tests pass locally
            5. Commit the fixes

      - name: Create PR with fixes
        uses: peter-evans/create-pull-request@v6
        with:
          title: "codex: auto-fix CI failures"
          body: "Automated fix for failing CI tests"
          branch: codex/auto-fix-ci
          commit-message: "codex: fix CI failures"
```

---

## Safety Configuration

### Add Approval Gates

```yaml
# Add these steps before pushing changes

      - name: Safety check - verify changes
        run: |
          # Count number of files changed
          CHANGED_FILES=$(git diff --name-only | wc -l)

          # Reject if too many files changed
          if [ $CHANGED_FILES -gt 10 ]; then
            echo "❌ Too many files changed ($CHANGED_FILES)"
            echo "This may indicate unsafe changes."
            exit 1
          fi

          echo "✅ Safety check passed: $CHANGED_FILES files changed"

      - name: Verify no sensitive files changed
        run: |
          SENSITIVE_PATTERNS=(
            "*.key"
            "*.pem"
            ".env"
            "secrets/"
          )

          for pattern in "${SENSITIVE_PATTERNS[@]}"; do
            if git diff --name-only | grep -E "$pattern"; then
              echo "❌ Sensitive file pattern matched: $pattern"
              exit 1
            fi
          done

          echo "✅ No sensitive files changed"
```

---

## Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `OPENAI_API_KEY` | Your OpenAI API key | https://platform.openai.com/api-keys |
| `GITHUB_TOKEN` | GitHub token (auto-provided) | Automatically available |

---

## Testing Your Workflow

### 1. Test with a dummy PR

```bash
# Create a test branch
git checkout -b test/codex-auto-fix

# Make a simple change
echo "console.log('test');" >> test.js

# Commit and push
git add test.js
git commit -m "test: add codex auto-fix test"
git push origin test/codex-auto-fix

# Create PR
gh pr create --title "Test Codex Auto-Fix" --body "Testing auto-fix workflow"
```

### 2. Trigger the workflow

```bash
# Comment on the PR
gh pr comment 1 --body "@codex fix comments"
```

### 3. Monitor the workflow

```bash
# Watch the workflow run
gh run list --workflow=codex-auto-apply.yml
gh run watch
```

---

## Troubleshooting

### Issue: Workflow doesn't trigger

**Solution:** Check the `if` condition
```yaml
# Make sure this condition matches your comment
if: contains(github.event.comment.body, '@codex fix comments')
```

### Issue: Permission denied

**Solution:** Add required permissions
```yaml
permissions:
  contents: write      # Required for committing
  pull-requests: write # Required for PR comments
  issues: read         # Required for reading comments
```

### Issue: Codex makes unsafe changes

**Solution:** Add safety checks before pushing
```yaml
- name: Review changes before applying
  run: |
    # Show the diff
    git diff

    # Require human approval for large changes
    CHANGED_LINES=$(git diff | wc -l)
    if [ $CHANGED_LINES -gt 100 ]; then
      echo "❌ Too many lines changed, requiring manual review"
      exit 1
    fi
```

---

## Advanced: Conditional Auto-Apply

Only auto-apply "safe" fixes:

```yaml
      - name: Classify fix safety
        id: classify
        run: |
          # Analyze what type of fixes were suggested
          COMMENTS="${{ steps.review-comments.outputs.review_comments }}"

          # Safe fixes: typos, formatting, simple imports
          if echo "$COMMENTS" | grep -E "(typo|import|format|style)"; then
            echo "level=safe" >> $GITHUB_OUTPUT
          else
            echo "level=manual" >> $GITHUB_OUTPUT
          fi

      - name: Apply safe fixes only
        if: steps.classify.outputs.level == 'safe'
        run: |
          # Proceed with auto-apply
          echo "Applying safe fixes..."

      - name: Request manual review
        if: steps.classify.outputs.level == 'manual'
        run: |
          gh pr comment ${{ steps.pr-details.outputs.number }} \
            --body "⚠️ This fix requires manual review before applying."
```

---

## Sources

- [Official Codex GitHub Action](https://developers.openai.com/codex/github-action/)
- [openai/codex-action Repository](https://github.com/openai/codex-action)
- [Autofix GitHub Actions Cookbook](https://developers.openai.com/cookbook/examples/codex/autofix-github-actions/)
- [Codex Workflows Documentation](https://developers.openai.com/codex/workflows/)
- [GitHub Events that Trigger Workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows)

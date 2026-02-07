# Codex Automated Code Review - Best Practices

**Based on official OpenAI documentation and community sources.**

---

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Two Main Approaches](#two-main-approaches)
4. [Configuration Best Practices](#configuration-best-practices)
5. [Security & Safety](#security--safety)
6. [The Official Review Prompt](#the-official-review-prompt)
7. [Structured Outputs](#structured-outputs)
8. [AGENTS.md Guidelines](#agentsmd-guidelines)
9. [Infinite Loop Prevention](#infinite-loop-prevention)
10. [Platform-Specific Implementations](#platform-specific-implementations)

---

## Overview

OpenAI Codex provides two primary ways to conduct automated code reviews:

1. **Native GitHub Integration** - Cloud-hosted, triggered via `@codex review` comments
2. **Self-Hosted CI/CD Integration** - Using Codex CLI in GitHub Actions, GitLab CI, or Jenkins

Both methods use the same underlying model and capabilities, but differ in deployment model and customization options.

**Recommended Model:** `gpt-5.2-codex` (specified in official cookbook)

---

## Installation & Setup

### For Native GitHub Integration (Cloud)

1. Enable Codex Cloud in your organization
2. Navigate to Codex settings
3. Enable "Code review" on your repository
4. Use `@codex review` in PR comments

**Source:** https://developers.openai.com/codex/integrations/github/

### For Self-Hosted CI/CD

#### Install Codex CLI

```bash
npm install -g @openai/codex
```

#### Or download directly (for CI/CD runners):

```bash
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64) CODEX_PLATFORM="x86_64-unknown-linux-musl" ;;
  aarch64|arm64) CODEX_PLATFORM="aarch64-unknown-linux-musl" ;;
esac

curl -fsSL "https://github.com/openai/codex/releases/latest/download/codex-${CODEX_PLATFORM}.tar.gz" | tar -xz
install -m 0755 codex-* /usr/local/bin/codex
```

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## Two Main Approaches

### Approach 1: Native GitHub Integration (Cloud)

**Use when:**
- You want zero setup
- Your code is on GitHub.com
- You're okay with cloud-hosted reviews
- You want simple `@codex review` triggers

**How it works:**
1. Enable Code Review in Codex settings for your repository
2. Comment `@codex review` on any PR
3. Codex reacts with 👀 and processes the review
4. Codex leaves a regular code review with inline comments

**Customization:**
```markdown
# AGENTS.md (root level or directory-specific)
## Review guidelines

- Don't log PII
- Verify that authentication middleware wraps every route
- Treat typos as P1 issues
```

Codex applies the closest `AGENTS.md` file to each changed file.

**Focus-specific reviews:**
- `@codex review for security regressions`
- `@codex review for performance issues`
- `@codex review for accessibility`

**Priority levels on GitHub:**
- Only **P0** and **P1** issues are flagged by default
- Customize this in `AGENTS.md` to elevate other issue types

**Source:** https://developers.openai.com/codex/integrations/github/

---

### Approach 2: Self-Hosted CI/CD Integration

**Use when:**
- Code is on-premises or self-hosted GitHub
- Using GitLab, Jenkins, or other CI/CD
- Need full control over review process
- Want structured output for custom processing
- Need to integrate with internal tools

**Core workflow:**
1. Install Codex CLI in CI/CD runner
2. Prompt Codex in headless (exec) mode with code review prompt
3. Specify structured output JSON schema
4. Parse JSON result and make API calls to SCM for review comments

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## Configuration Best Practices

### GitHub Actions Configuration

**Official best practices from the cookbook:**

```yaml
name: Codex Code Review

on:
  pull_request:
    types:
      - opened
      - reopened
      - synchronize
      - ready_for_review

concurrency:
  group: codex-structured-review-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  codex-structured-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    env:
      CODEX_MODEL: ${{ vars.CODEX_MODEL || 'o4-mini' }}
```

**Key best practices:**
- Use `concurrency` with `cancel-in-progress: true` to avoid wasting resources
- Set minimal permissions (`contents: read`, `pull-requests: write`)
- Use environment variables for model selection to allow overrides
- Checkout the merge commit: `ref: refs/pull/${{ github.event.pull_request.number }}/merge`

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

### GitLab CI/CD Configuration

```yaml
codex-structured-review:
  stage: review
  image: ubuntu:22.04
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  variables:
    PR_NUMBER: $CI_MERGE_REQUEST_IID
    REPOSITORY: "$CI_PROJECT_PATH"
    BASE_SHA: "$CI_MERGE_REQUEST_DIFF_BASE_SHA"
    HEAD_SHA: "$CI_COMMIT_SHA"
```

**Key differences from GitHub:**
- Uses GitLab API for posting comments
- Different environment variables for PR context
- Requires manual CLI installation

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## Security & Safety

### Safety Strategy (Official)

The official GitHub Action uses `safety-strategy: drop-sudo` by default.

**Available safety strategies:**
- `drop-sudo` (default, recommended) - Removes sudo before running Codex
- `unprivileged-user` - Runs Codex as a specific account
- `unsafe` - Required on Windows, not recommended

**Critical security points:**
1. **Never use `unsafe` mode** on multi-tenant runners
2. **Protect your `OPENAI_API_KEY`** - Use `drop-sudo` or unprivileged users
3. **Sanitize prompt inputs** from PRs, commit messages, issue bodies
4. **Limit who can trigger** - Use trusted events or explicit approvals
5. **Run Codex as the last step** in a job
6. **Rotate keys immediately** if suspected exposure

**Source:** https://developers.openai.com/codex/github-action/#security-checklist

### Sandbox Modes

Match sandbox mode to minimum required permissions:

| Mode | File Access | Network | Use Case |
|------|-------------|---------|----------|
| `read-only` | Read only | Blocked | Code review (recommended) |
| `workspace-write` | Read/write workspace | Blocked | Applying fixes |
| `danger-full-access` | Full access | Full access | Not recommended |

**Source:** https://developers.openai.com/codex/github-action/

### GitLab Security Note

The official cookbook warns:

> "The GitHub Action includes an important safety strategy: it drops sudo permissions so Codex cannot access its own OpenAI API key. This isolation is critical—especially for public repositories where sensitive secrets (like your OpenAI API key) may be present."

For GitLab implementations, manually implement this protection or use restricted containers.

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## The Official Review Prompt

OpenAI provides an official prompt for code review, optimized for `gpt-5.2-codex`:

```
You are acting as a reviewer for a proposed code change made by another engineer.
Focus on issues that impact correctness, performance, security, maintainability, or developer experience.
Flag only actionable issues introduced by the pull request.
When you flag an issue, provide a short, direct explanation and cite the affected file and line range.
Prioritize severe issues and avoid nit-level comments unless they block understanding of the diff.
After listing findings, produce an overall correctness verdict ("patch is correct" or "patch is incorrect") with a concise justification and a confidence score between 0 and 1.
Ensure that file citations and line numbers are exactly correct using the tools available; if they are incorrect your comments will be rejected.
```

**Key characteristics:**
- Focuses on **actionable issues** introduced by the PR
- Covers: correctness, performance, security, maintainability, DX
- Avoids nit-level comments unless blocking
- Requires exact file citations and line numbers
- Produces structured verdict with confidence score

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## Structured Outputs

Structured outputs ensure Codex produces comments with exact filepaths, line numbers, title, body, etc.

### Example Schema (Official)

```json
{
  "type": "object",
  "properties": {
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "maxLength": 80 },
          "body": { "type": "string", "minLength": 1 },
          "confidence_score": { "type": "number", "minimum": 0, "maximum": 1 },
          "priority": { "type": "integer", "minimum": 0, "maximum": 3 },
          "code_location": {
            "type": "object",
            "properties": {
              "absolute_file_path": { "type": "string", "minLength": 1 },
              "line_range": {
                "type": "object",
                "properties": {
                  "start": { "type": "integer", "minimum": 1 },
                  "end": { "type": "integer", "minimum": 1 }
                },
                "required": ["start", "end"]
              }
            },
            "required": ["absolute_file_path", "line_range"]
          }
        },
        "required": ["title", "body", "confidence_score", "priority", "code_location"]
      }
    },
    "overall_correctness": {
      "type": "string",
      "enum": ["patch is correct", "patch is incorrect"]
    },
    "overall_explanation": { "type": "string", "minLength": 1 },
    "overall_confidence_score": { "type": "number", "minimum": 0, "maximum": 1 }
  },
  "required": ["findings", "overall_correctness", "overall_explanation", "overall_confidence_score"]
}
```

### Using with Codex CLI

```bash
codex exec "Review my pull request!" \
  --output-schema codex-output-schema.json \
  --output-last-message codex-output.json
```

### Using with GitHub Action

```yaml
- name: Run Codex structured review
  uses: openai/codex-action@main
  with:
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
    prompt-file: codex-prompt.md
    output-schema-file: codex-output-schema.json
    output-file: codex-output.json
    sandbox: read-only
```

**Source:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk

---

## AGENTS.md Guidelines

Codex automatically searches your repository for `AGENTS.md` files and follows **Review guidelines**.

### Root-Level AGENTS.md

```markdown
# Repository Guidelines

## Review guidelines

- Don't log PII
- Verify that authentication middleware wraps every route
- Ensure all user inputs are validated
- Check for SQL injection vulnerabilities
```

### Directory-Specific AGENTS.md

Codex applies the closest `AGENTS.md` file to each changed file. This allows package-specific rules:

```
/AGENTS.md                    # General rules
/backend/AGENTS.md            # Backend-specific
/backend/auth/AGENTS.md       # Auth-specific (closest to auth/ files)
/frontend/AGENTS.md           # Frontend-specific
```

### Elevating Issue Priorities

By default on GitHub, Codex only flags **P0** and **P1** issues. To flag other issues:

```markdown
## Review guidelines

- Treat typos in documentation as P1 issues
- Flag missing error handling as P1
```

**Source:** https://developers.openai.com/codex/integrations/github/

---

## Infinite Loop Prevention

When implementing auto-fix workflows, prevent infinite loops of:
> review → auto-fix → review → auto-fix → ...

### Official Pattern

```yaml
- name: Check for infinite loop
  id: loop-check
  run: |
    LAST_COMMIT=$(git log -1 --pretty=format:"%s")

    if echo "$LAST_COMMIT" | grep -q "codex: auto-apply review feedback"; then
      echo "should_run=false" >> $GITHUB_OUTPUT
    else
      echo "should_run=true" >> $GITHUB_OUTPUT
    fi
```

### Commit Message Convention

Auto-fix commits should include a marker:

```
codex: auto-apply review feedback

- Applied fixes from code review
- This is an auto-fix commit (will not trigger another auto-fix)
```

**Trigger conditions should check:**
1. Review is from a bot
2. Review state is not APPROVED
3. Last commit was NOT an auto-fix

**Source:** Community implementation pattern observed in working workflows

---

## Platform-Specific Implementations

### GitHub Actions (Complete Example)

See `GITHUB_ACTIONS_EXAMPLE.md` for a complete, production-ready GitHub Actions workflow.

### GitLab CI/CD (Complete Example)

See `GITLAB_EXAMPLE.md` for a complete, production-ready GitLab CI workflow.

### Jenkins (Complete Example)

See `JENKINS_EXAMPLE.md` for a complete, production-ready Jenkins pipeline.

---

## Summary Checklist

### Before Implementing

- [ ] Decide: Native GitHub (cloud) vs Self-Hosted CI/CD
- [ ] Store `OPENAI_API_KEY` as secret
- [ ] Create `AGENTS.md` with review guidelines
- [ ] Choose appropriate model (`gpt-5.2-codex` recommended)

### For GitHub Actions

- [ ] Use `openai/codex-action@v1` or `@main`
- [ ] Set `sandbox: read-only` for reviews
- [ ] Use `safety-strategy: drop-sudo`
- [ ] Configure minimal permissions
- [ ] Add concurrency control
- [ ] Checkout merge commit

### For All Platforms

- [ ] Use official review prompt
- [ ] Implement structured output schema
- [ ] Add infinite loop prevention
- [ ] Post both inline comments and summary
- [ ] Include confidence scores
- [ ] Handle empty findings gracefully

---

## References

All best practices in this document are sourced from:

1. [OpenAI Codex GitHub Integration](https://developers.openai.com/codex/integrations/github/)
2. [Codex GitHub Action Documentation](https://developers.openai.com/codex/github-action/)
3. [Build Code Review with Codex SDK Cookbook](https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk)
4. [Automatic Code Reviews Video](https://www.youtube.com/watch?v=HwbSWVg5Ln4)
5. [OpenAI Codex Code Review (Medium)](https://dibishks.medium.com/openai-codex-code-review-how-to-use-it-to-supercharge-your-code-quality-afbcd0a8336b)
6. [OpenAI Codex Guide 2025](https://moiid.com/en/openai-codex-chatgpt-guide-2025-ultimate-ai-coding-assistant-for-developers-and-teams/)
7. Reddit community discussions

*Last updated: February 2026*

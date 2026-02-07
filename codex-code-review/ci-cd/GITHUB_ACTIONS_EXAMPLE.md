# GitHub Actions - Complete Production Example

**Based on the official OpenAI Cookbook example, enhanced with production best practices.**

---

## Complete Workflow File

Save as `.github/workflows/codex-code-review.yml`:

```yaml
name: Codex Code Review

# Trigger on PR events that indicate new changes to review
on:
  pull_request:
    types:
      - opened      # New PR
      - reopened    # Reopened PR
      - synchronize # New commits pushed
      - ready_for_review # Draft PR marked ready

# Concurrency: Cancel older runs for the same PR
concurrency:
  group: codex-structured-review-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  codex-structured-review:
    name: Run Codex structured review
    runs-on: ubuntu-latest

    # Minimal required permissions
    permissions:
      contents: read
      pull-requests: write

    env:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      GITHUB_TOKEN: ${{ github.token }}
      CODEX_MODEL: ${{ vars.CODEX_MODEL || 'o4-mini' }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
      HEAD_SHA: ${{ github.event.pull_request.head.sha }}
      BASE_SHA: ${{ github.event.pull_request.base.sha }}
      REPOSITORY: ${{ github.repository }}

    # Output for debugging
    outputs:
      codex-output: ${{ steps.run-codex.outputs.final-message }}

    steps:
      # ============================================================================
      # STEP 1: Checkout the PR merge commit
      # ============================================================================
      - name: Checkout pull request merge commit
        uses: actions/checkout@v5
        with:
          # Use the merge commit to see both base and head
          ref: refs/pull/${{ github.event.pull_request.number }}/merge

      # ============================================================================
      # STEP 2: Fetch base and head refs
      # ============================================================================
      - name: Fetch base and head refs
        run: |
          set -euxo pipefail
          git fetch --no-tags origin \
            "${{ github.event.pull_request.base.ref }}" \
            +refs/pull/${{ github.event.pull_request.number }}/head
        shell: bash

      # ============================================================================
      # STEP 3: Generate structured output schema
      # ============================================================================
      - name: Generate structured output schema
        run: |
          set -euo pipefail
          cat <<'JSON' > codex-output-schema.json
          {
              "type": "object",
              "properties": {
                "findings": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string",
                        "maxLength": 80
                      },
                      "body": {
                        "type": "string",
                        "minLength": 1
                      },
                      "confidence_score": {
                        "type": "number",
                        "minimum": 0,
                        "maximum": 1
                      },
                      "priority": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 3
                      },
                      "code_location": {
                        "type": "object",
                        "properties": {
                          "absolute_file_path": {
                            "type": "string",
                            "minLength": 1
                          },
                          "line_range": {
                            "type": "object",
                            "properties": {
                              "start": {
                                "type": "integer",
                                "minimum": 1
                              },
                              "end": {
                                "type": "integer",
                                "minimum": 1
                              }
                            },
                            "required": ["start", "end"],
                            "additionalProperties": false
                          }
                        },
                        "required": ["absolute_file_path", "line_range"],
                        "additionalProperties": false
                      }
                    },
                    "required": ["title", "body", "confidence_score", "priority", "code_location"],
                    "additionalProperties": false
                  }
                },
                "overall_correctness": {
                  "type": "string",
                  "enum": ["patch is correct", "patch is incorrect"]
                },
                "overall_explanation": {
                  "type": "string",
                  "minLength": 1
                },
                "overall_confidence_score": {
                  "type": "number",
                  "minimum": 0,
                  "maximum": 1
                }
              },
              "required": ["findings", "overall_correctness", "overall_explanation", "overall_confidence_score"],
              "additionalProperties": false
            }
          JSON
        shell: bash

      # ============================================================================
      # STEP 4: Build Codex review prompt
      # ============================================================================
      - name: Build Codex review prompt
        env:
          REVIEW_PROMPT_PATH: ${{ vars.CODEX_PROMPT_PATH || 'review_prompt.md' }}
        run: |
          set -euo pipefail
          PROMPT_PATH="codex-prompt.md"
          TEMPLATE_PATH="${REVIEW_PROMPT_PATH}"

          # Use custom prompt if provided, otherwise use default
          if [ -n "$TEMPLATE_PATH" ] && [ -f "$TEMPLATE_PATH" ]; then
            cat "$TEMPLATE_PATH" > "$PROMPT_PATH"
          else
            {
              printf '%s\n' "You are acting as a reviewer for a proposed code change made by another engineer."
              printf '%s\n' "Focus on issues that impact correctness, performance, security, maintainability, or developer experience."
              printf '%s\n' "Flag only actionable issues introduced by the pull request."
              printf '%s\n' "When you flag an issue, provide a short, direct explanation and cite the affected file and line range."
              printf '%s\n' "Prioritize severe issues and avoid nit-level comments unless they block understanding of the diff."
              printf '%s\n' "After listing findings, produce an overall correctness verdict (\"patch is correct\" or \"patch is incorrect\") with a concise justification and a confidence score between 0 and 1."
              printf '%s\n' "Ensure that file citations and line numbers are exactly correct using the tools available; if they are incorrect your comments will be rejected."
            } > "$PROMPT_PATH"
          fi

          # Append diff context
          {
            echo ""
            echo "Repository: ${REPOSITORY}"
            echo "Pull Request #: ${PR_NUMBER}"
            echo "Base ref: ${{ github.event.pull_request.base.ref }}"
            echo "Head ref: ${{ github.event.pull_request.head.ref }}"
            echo "Base SHA: ${BASE_SHA}"
            echo "Head SHA: ${HEAD_SHA}"
            echo ""
            echo "Changed files:"
            git --no-pager diff --name-status "${BASE_SHA}" "${HEAD_SHA}"
            echo ""
            echo "Unified diff (context=5):"
            git --no-pager diff --unified=5 --stat=200 "${BASE_SHA}" "${HEAD_SHA}" > /tmp/diffstat.txt
            git --no-pager diff --unified=5 "${BASE_SHA}" "${HEAD_SHA}" > /tmp/full.diff
            cat /tmp/diffstat.txt
            echo ""
            cat /tmp/full.diff
          } >> "$PROMPT_PATH"
        shell: bash

      # ============================================================================
      # STEP 5: Run Codex structured review
      # ============================================================================
      - name: Run Codex structured review
        id: run-codex
        uses: openai/codex-action@main
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          prompt-file: codex-prompt.md
          output-schema-file: codex-output-schema.json
          output-file: codex-output.json
          sandbox: read-only
          model: ${{ env.CODEX_MODEL }}
          safety-strategy: drop-sudo

      # ============================================================================
      # STEP 6: Inspect structured Codex output
      # ============================================================================
      - name: Inspect structured Codex output
        if: ${{ always() }}
        run: |
          if [ -s codex-output.json ]; then
            echo "=== Codex Output ==="
            jq '.' codex-output.json || true
          else
            echo "Codex output file missing"
          fi
        shell: bash

      # ============================================================================
      # STEP 7: Publish inline review comments
      # ============================================================================
      - name: Publish inline review comments
        if: ${{ always() }}
        env:
          REVIEW_JSON: codex-output.json
        run: |
          set -euo pipefail
          if [ ! -s "$REVIEW_JSON" ]; then
            echo "No Codex output file present; skipping comment publishing."
            exit 0
          fi

          findings_count=$(jq '.findings | length' "$REVIEW_JSON")
          if [ "$findings_count" -eq 0 ]; then
            echo "Codex returned no findings; skipping inline comments."
            exit 0
          fi

          echo "Publishing $findings_count findings..."

          jq -c --arg commit "$HEAD_SHA" '.findings[] | {
              body: (.title + "\n\n" + .body + "\n\nConfidence: " + (.confidence_score | tostring) + (if has("priority") then "\nPriority: P" + (.priority | tostring) else "" end)),
              commit_id: $commit,
              path: .code_location.absolute_file_path,
              line: .code_location.line_range.end,
              side: "RIGHT",
              start_line: (if .code_location.line_range.start != .code_location.line_range.end then .code_location.line_range.start else null end),
              start_side: (if .code_location.line_range.start != .code_location.line_range.end then "RIGHT" else null end)
            } | with_entries(select(.value != null))' "$REVIEW_JSON" > findings.jsonl

          while IFS= read -r payload; do
            echo "Posting review comment:"
            echo "$payload" | jq '.'
            curl -sS \
              -X POST \
              -H "Accept: application/vnd.github+json" \
              -H "Authorization: Bearer ${GITHUB_TOKEN}" \
              -H "X-GitHub-Api-Version: 2022-11-28" \
              "https://api.github.com/repos/${REPOSITORY}/pulls/${PR_NUMBER}/comments" \
              -d "$payload"
          done < findings.jsonl
        shell: bash

      # ============================================================================
      # STEP 8: Publish overall summary comment
      # ============================================================================
      - name: Publish overall summary comment
        if: ${{ always() }}
        env:
          REVIEW_JSON: codex-output.json
        run: |
          set -euo pipefail
          if [ ! -s "$REVIEW_JSON" ]; then
            echo "Codex output missing; skipping summary."
            exit 0
          fi

          overall_state=$(jq -r '.overall_correctness' "$REVIEW_JSON")
          overall_body=$(jq -r '.overall_explanation' "$REVIEW_JSON")
          confidence=$(jq -r '.overall_confidence_score' "$REVIEW_JSON")

          msg="**Codex automated review**

          Verdict: ${overall_state}
          Confidence: ${confidence}

          ${overall_body}"

          curl -sS \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${GITHUB_TOKEN}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            "https://api.github.com/repos/${REPOSITORY}/issues/${PR_NUMBER}/comments" \
            -d "$(jq -n --arg body "$msg" '{body: $body}')"
        shell: bash
```

---

## Required Setup

### 1. Repository Secrets

Add `OPENAI_API_KEY` in:
- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 2. Repository Variables (Optional)

Add in:
- **Settings** → **Secrets and variables** → **Actions** → **Variables**

| Variable | Default | Purpose |
|----------|---------|---------|
| `CODEX_MODEL` | `o4-mini` | Model to use for review |
| `CODEX_PROMPT_PATH` | `review_prompt.md` | Custom prompt file path |

### 3. Optional: Custom Review Prompt

Create `review_prompt.md` at repository root:

```markdown
You are acting as a reviewer for a proposed code change made by another engineer.
Focus on issues that impact correctness, performance, security, maintainability, or developer experience.
Flag only actionable issues introduced by the pull request.
When you flag an issue, provide a short, direct explanation and cite the affected file and line range.
Prioritize severe issues and avoid nit-level comments unless they block understanding of the diff.
After listing findings, produce an overall correctness verdict ("patch is correct" or "patch is incorrect") with a concise justification and a confidence score between 0 and 1.
Ensure that file citations and line numbers are exactly correct using the tools available; if they are incorrect your comments will be rejected.
```

---

## AGENTS.md Guidelines (Optional)

For project-specific review rules, create `AGENTS.md`:

```markdown
# Repository Guidelines

## Review guidelines

- Don't log PII
- Verify that authentication middleware wraps every route
- Treat typos in documentation as P1 issues
```

Codex will automatically use these guidelines during review.

---

## Testing the Workflow

### 1. Create a Test PR

```bash
git checkout -b test/codex-review
echo "test" > test.txt
git add test.txt
git commit -m "test: add file for Codex review"
git push origin test/codex-review
gh pr create --title "Test Codex Review" --body "Testing automated code review"
```

### 2. Monitor the Workflow

```bash
gh run list --workflow=codex-code-review.yml
gh run watch
```

---

## Troubleshooting

### Issue: Only one of prompt or prompt-file may be specified

**Solution:** Remove the duplicate input. Use either `prompt` or `prompt-file`, not both.

### Issue: responses-api-proxy did not write server info

**Solution:** Confirm `OPENAI_API_KEY` is present and valid.

### Issue: Expected sudo to be disabled, but sudo succeeded

**Solution:** Ensure no earlier step re-enabled `sudo`. Re-run with a fresh job.

### Issue: Permission errors after `drop-sudo`

**Solution:** Grant write access before the action:
```bash
chmod -R g+rwX "$GITHUB_WORKSPACE"
```

### Issue: Unauthorized trigger blocked

**Solution:** Adjust `allow-users` or `allow-bots` inputs if needed.

---

## Differences from Native GitHub Integration

| Feature | Native (@codex review) | GitHub Action |
|---------|------------------------|---------------|
| Setup | Zero config | Requires workflow file |
| Trigger | Manual comment | Automatic on PR events |
| Customization | Via AGENTS.md | Full control via prompt |
| Output | Review comments | Structured JSON + comments |
| Platform | GitHub.com only | GitHub, self-hosted, on-prem |

---

## References

- [Official Cookbook Example](https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk)
- [Codex GitHub Action](https://developers.openai.com/codex/github-action/)
- [GitHub Integration Docs](https://developers.openai.com/codex/integrations/github/)

*Last updated: February 2026*

# Production GitHub Actions - End-to-End Pipeline

**Purpose:** Complete CI/CD pipeline for production deployments with Codex integration

---

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        PRODUCTION PIPELINE FLOW                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   PUSH/PR    │───▶│      CI      │───▶│    QUALITY   │───▶│  DEPLOY STG  │
│  Trigger     │    │   (Tests)    │    │  (Lint/Snyk) │    │   (Preview)  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                           │                  │                   │
                           ▼                  ▼                   ▼
                    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
                    │   CODE REVIEW │   │  SECURITY    │   │  E2E TESTS   │
                    │   (Codex)     │   │   SCAN       │   │   (Playwright)│
                    └──────────────┘   └──────────────┘   └──────────────┘
                           │                  │                   │
                           ▼                  ▼                   ▼
                    ┌─────────────────────────────────────────────────────┐
                    │                    APPROVAL GATE                    │
                    │              (Manual or Auto-Codex)                 │
                    └─────────────────────────────────────────────────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │ DEPLOY PROD  │
                                    │  (Release)   │
                                    └──────────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │   MONITOR    │
                                    │  (Alerts)    │
                                    └──────────────┘
```

---

## Required Workflows

### 1. Continuous Integration (CI)
**File:** `.github/workflows/ci.yml`
**Triggers:** Push, Pull Request
**Purpose:** Run tests on every change

### 2. Code Quality
**File:** `.github/workflows/quality.yml`
**Triggers:** Pull Request
**Purpose:** Linting, formatting, type checking

### 3. Security Scanning
**File:** `.github/workflows/security.yml`
**Triggers:** Pull Request, Nightly
**Purpose:** Dependency vulnerabilities, secrets detection

### 4. Code Review (Codex)
**File:** `.github/workflows/codex-review.yml`
**Triggers:** Pull Request, Manual
**Purpose:** AI-powered code review

### 5. Auto-Fix (Codex)
**File:** `.github/workflows/codex-autofix.yml`
**Triggers:** Comment `@codex fix`
**Purpose:** Automatically apply review fixes

### 6. Deploy Staging
**File:** `.github/workflows/deploy-staging.yml`
**Triggers:** Merge to `main`, Manual
**Purpose:** Deploy to staging environment

### 7. End-to-End Tests
**File:** `.github/workflows/e2e.yml`
**Triggers:** After staging deploy
**Purpose:** Full application testing

### 8. Deploy Production
**File:** `.github/workflows/deploy-production.yml`
**Triggers:** Manual approval, Tag
**Purpose:** Deploy to production

### 9. Rollback
**File:** `.github/workflows/rollback.yml`
**Triggers:** Manual
**Purpose:** Emergency rollback

### 10. Monitoring
**File:** `.github/workflows/monitor.yml`
**Triggers:** Schedule, Deploy
**Purpose:** Health checks, uptime monitoring

---

## Complete Workflow Files

### 1. CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, dev, 'feature/**']
  pull_request:
    branches: [main, dev]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-${{ matrix.node-version }}
          path: dist/
```

---

### 2. Code Quality

```yaml
# .github/workflows/quality.yml
name: Code Quality

on:
  pull_request:
    branches: [main, dev]

permissions:
  contents: read
  pull-requests: write

jobs:
  quality:
    name: Quality Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Install dependencies
        run: npm ci

      - name: ESLint
        run: |
          npm run lint > eslint-report.json || true
          npm run lint

      - name: Prettier check
        run: npm run format:check

      - name: Complex code analysis
        run: |
          # Find files with high complexity
          npx complexity-report -f json src/ > complexity.json || true

      - name: Large file detection
        run: |
          # Find files > 500 lines
          find src/ -name '*.ts' -o -name '*.tsx' | while read file; do
            lines=$(wc -l < "$file")
            if [ $lines -gt 500 ]; then
              echo "⚠️ Large file: $file ($lines lines)"
            fi
          done

      - name: Comment PR with results
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            let comment = '## 📊 Code Quality Report\n\n';

            // Add ESLint results if available
            if (fs.existsSync('eslint-report.json')) {
              const eslint = JSON.parse(fs.readFileSync('eslint-report.json'));
              const errorCount = eslint.reduce((sum, r) => sum + r.errorCount, 0);
              const warningCount = eslint.reduce((sum, r) => sum + r.warningCount, 0);
              comment += `**ESLint:** ${errorCount} errors, ${warningCount} warnings\n`;
            }

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

---

### 3. Security Scanning

```yaml
# .github/workflows/security.yml
name: Security

on:
  pull_request:
    branches: [main, dev]
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:

permissions:
  contents: read
  security-events: write

jobs:
  dependency-check:
    name: Dependency Audit
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Run npm audit
        run: npm audit --json > audit-report.json || true
        continue-on-error: true

      - name: Check for vulnerabilities
        run: |
          if [ -s audit-report.json ]; then
            HIGH=$(cat audit-report.json | jq '.metadata.vulnerabilities.high')
            CRITICAL=$(cat audit-report.json | jq '.metadata.vulnerabilities.critical')

            if [ "$HIGH" -gt 0 ] || [ "$CRITICAL" -gt 0 ]; then
              echo "❌ Found $HIGH high and $CRITICAL critical vulnerabilities"
              exit 1
            fi
          fi

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: snyk.sarif

  secrets-scan:
    name: Secrets Detection
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: TruffleHog Secret Scanning
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

  codeql:
    name: CodeQL Analysis
    runs-on: ubuntu-latest
    timeout-minutes: 360

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:javascript-typescript"
```

---

### 4. Codex Code Review

```yaml
# .github/workflows/codex-review.yml
name: Codex Review

on:
  pull_request:
    branches: [main, dev]
  workflow_dispatch:
    inputs:
      pr_number:
        description: 'PR number to review'
        required: true

permissions:
  contents: read
  pull-requests: write

jobs:
  codex-review:
    name: AI Code Review
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get PR diff
        id: diff
        run: |
          PR_NUMBER="${{ github.event.pull_request.number || inputs.pr_number }}"

          # Get the diff
          git fetch origin main
          DIFF=$(git diff origin/main...HEAD --diff-filter=M -- '*.ts' '*.tsx' '*.js' '*.jsx')

          # Save to file
          echo "$DIFF" > /tmp/pr.diff

          # Count lines changed
          LINES_ADDED=$(echo "$DIFF" | grep -c "^+" || echo 0)
          LINES_REMOVED=$(echo "$DIFF" | grep -c "^-" || echo 0)

          echo "pr_number=$PR_NUMBER" >> $GITHUB_OUTPUT
          echo "lines_added=$LINES_ADDED" >> $GITHUB_OUTPUT
          echo "lines_removed=$LINES_REMOVED" >> $GITHUB_OUTPUT

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install OpenAI Python SDK
        run: pip install openai

      - name: Run Codex Review
        id: review
        run: |
          export OPENAI_API_KEY="${{ secrets.OPENAI_API_KEY }}"

          python3 << 'EOF'
          import os
          import openai

          # Read the diff
          with open('/tmp/pr.diff', 'r') as f:
              diff_content = f.read()

          # Create review prompt
          prompt = f"""
          Review this code diff for:
          1. Security vulnerabilities
          2. Performance issues
          3. Code smells
          4. TypeScript best practices
          5. Potential bugs

          Diff:
          {diff_content}

          Provide feedback in this format:
          - [Severity] Issue: Description
          - [Severity] Issue: Description

          Severities: 🔴 Critical, 🟡 Warning, 🔵 Info
          """

          # Call OpenAI API
          client = openai.OpenAI()
          response = client.chat.completions.create(
              model="gpt-4-codex",
              messages=[
                  {"role": "system", "content": "You are a senior code reviewer."},
                  {"role": "user", "content": prompt}
              ],
              max_tokens=2000
          )

          review = response.choices[0].message.content

          # Save review
          with open('/tmp/review.md', 'w') as f:
              f.write(review)

          print(review)
          EOF

      - name: Post review as PR comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');

            const review = fs.readFileSync('/tmp/review.md', 'utf8');
            const prNumber = '${{ steps.diff.outputs.pr_number }}';

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              body: `## 🤖 Codex Review\n\n${review}`
            });

      - name: Block merge if critical issues found
        if: steps.review.outputs.status == 'failure'
        run: |
          echo "❌ Critical issues found - please review before merging"
          exit 1
```

---

### 5. Deploy Staging

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  deployments: write

jobs:
  deploy-staging:
    name: Deploy Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.yourapp.com

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          NODE_ENV: staging

      - name: Deploy to Vercel
        id: vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--env=staging'
          working-directory: ./

      - name: Create deployment comment
        uses: actions/github-script@v7
        with:
          script: |
            const url = '${{ steps.vercel.outputs.preview-url }}';
            await github.rest.repos.createCommitComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              commit_sha: context.sha,
              body: `🚀 Deployed to staging: ${url}`
            });

      - name: Smoke test
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://staging.yourapp.com)
          if [ $response -ne 200 ]; then
            echo "❌ Smoke test failed with status $response"
            exit 1
          fi
          echo "✅ Smoke test passed"

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Staging deployment complete'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

---

### 6. E2E Tests

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  workflow_run:
    workflows: [Deploy Staging]
    types: [completed]
    branches: [main]

jobs:
  e2e:
    name: End-to-End Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          BASE_URL: https://staging.yourapp.com

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

      - name: Upload test videos
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-videos
          path: test-results/videos/
```

---

### 7. Deploy Production

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to deploy (e.g., v1.0.0)'
        required: true
  release:
    types: [created]

permissions:
  contents: write
  deployments: write

jobs:
  approve-production:
    name: Approval Gate
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Wait for approval
        run: echo "Awaiting production approval..."

  deploy-production:
    name: Deploy Production
    runs-on: ubuntu-latest
    needs: approve-production
    environment:
      name: production
      url: https://yourapp.com

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: refs/tags/${{ github.event.inputs.version || 'v*' }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - name: Install dependencies
        run: npm ci

      - name: Run production tests
        run: npm run test:prod

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        if: startsWith(github.ref, 'refs/tags/')
        with:
          generate_release_notes: true
          files: |
            dist/*.zip
            CHANGELOG.md

      - name: Run smoke tests
        run: |
          # Test critical endpoints
          curl -f https://yourapp.com/health || exit 1
          curl -f https://yourapp.com/api/status || exit 1
          echo "✅ Production smoke tests passed"

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '🚀 Production deployment completed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()

      - name: Monitor deployment
        run: |
          # Wait for CDN propagation
          sleep 60

          # Run health checks
          for i in {1..10}; do
            if curl -f https://yourapp.com/health; then
              echo "✅ Health check passed"
              exit 0
            fi
            echo "Waiting for service... ($i/10)"
            sleep 30
          done

          echo "❌ Health check failed after 5 minutes"
          exit 1
```

---

### 8. Rollback

```yaml
# .github/workflows/rollback.yml
name: Emergency Rollback

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        type: choice
        options:
          - staging
          - production
      reason:
        description: 'Reason for rollback'

permissions:
  contents: write
  deployments: write

jobs:
  rollback:
    name: Rollback Deployment
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Get previous deployment
        id: previous
        run: |
          # Get the last successful deployment
          PREVIOUS_SHA=$(git log --pretty=format:'%H' --skip=1 -1)

          echo "sha=$PREVIOUS_SHA" >> $GITHUB_OUTPUT
          echo "Rolling back to: $PREVIOUS_SHA"

      - name: Deploy previous version
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--deploy ${{ steps.previous.outputs.sha }}'

      - name: Create rollback issue
        uses: actions/github-script@v7
        with:
          script: |
            const reason = '${{ github.event.inputs.reason || 'Manual rollback' }}';
            const env = '${{ github.event.inputs.environment }}';

            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `🔄 Rollback incident on ${env}`,
              body: `Environment: ${env}\nReason: ${reason}\nRolled back to: ${{ steps.previous.outputs.sha }}`,
              labels: ['incident', 'rollback']
            });

      - name: Page on-call
        uses: 8398a7/action-slack@v3
        with:
          status: 'failure'
          text: '🚨 Rollback executed - immediate attention required'
          webhook_url: ${{ secrets.SLACK_WEBHOOK_ONCALL }}
```

---

### 9. Monitoring & Health Checks

```yaml
# .github/workflows/monitor.yml
name: Monitor Production

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

permissions:
  contents: read
  issues: write

jobs:
  health-check:
    name: Health Check
    runs-on: ubuntu-latest

    steps:
      - name: Check production health
        id: health
        run: |
          STATUS=$(curl -s https://yourapp.com/health | jq -r '.status')

          if [ "$STATUS" != "ok" ]; then
            echo "❌ Health check failed"
            echo "status=unhealthy" >> $GITHUB_OUTPUT
            exit 1
          fi

          echo "✅ Service healthy"
          echo "status=healthy" >> $GITHUB_OUTPUT

      - name: Check response times
        run: |
          TIME=$(curl -s -o /dev/null -w "%{time_total}" https://yourapp.com)

          # Convert to milliseconds
          MS=$(echo "$TIME * 1000" | bc)

          if (( $(echo "$MS > 1000" | bc -l) )); then
            echo "⚠️ Slow response time: ${MS}ms"
          else
            echo "✅ Response time: ${MS}ms"
          fi

      - name: Check error rates
        run: |
          # Query your error monitoring service
          ERROR_RATE=$(curl -s "https://your-monitoring.com/api/error-rate?minutes=5")

          if (( $(echo "$ERROR_RATE > 1" | bc -l) )); then
            echo "❌ High error rate: ${ERROR_RATE}%"

            # Create incident
            gh issue create \
              --title "🚨 High error rate detected" \
              --body "Error rate: ${ERROR_RATE}%\nThreshold: 1%" \
              --label "incident"
          fi

      - name: Run uptime tests
        run: |
          # Test critical endpoints
          ENDPOINTS=(
            "https://yourapp.com"
            "https://yourapp.com/api/health"
            "https://yourapp.com/auth/login"
          )

          for endpoint in "${ENDPOINTS[@]}"; do
            if ! curl -f -s "$endpoint" > /dev/null; then
              echo "❌ Endpoint down: $endpoint"

              # Page on-call
              curl -X POST "${{ secrets.PAGERDUTY_WEBHOOK }}" \
                -d "{\"routing_key\":\"${{ secrets.PAGERDUTY_KEY }}\", \"event_action\":\"trigger\", \"payload\":{\"summary\":\"Endpoint down: $endpoint\", \"severity\":\"critical\", \"source\":\"github-actions\"}}"
            fi
          done

      - name: Create incident on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🚨 Production health check failed',
              body: 'Automated health check detected a failure. See workflow run for details.',
              labels: ['incident', 'automated'],
              assignees: ['on-call-user']
            });
```

---

### 10. Release Notes Generation

```yaml
# .github/workflows/release-notes.yml
name: Generate Release Notes

on:
  pull_request:
    types: [closed]
    branches: [main]

jobs:
  release-notes:
    name: Update Release Notes
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate notes
        id: notes
        run: |
          PR_TITLE="${{ github.event.pull_request.title }}"
          PR_NUMBER="${{ github.event.pull_request.number }}"
          PR_BODY="${{ github.event.pull_request.body }}"

          # Categorize by labels
          LABELS="${{ join(github.event.pull_request.labels.*.name, ',') }}"

          if echo "$LABELS" | grep -q "feature"; then
            CATEGORY="✨ Features"
          elif echo "$LABELS" | grep -q "bug"; then
            CATEGORY="🐛 Bug Fixes"
          elif echo "$LABELS" | grep -q "breaking"; then
            CATEGORY="💥 Breaking Changes"
          else
            CATEGORY="🔧 Other"
          fi

          ENTRY="- $CATEGORY: $PR_TITLE (#$PR_NUMBER)"

          echo "entry=$ENTRY" >> $GITHUB_OUTPUT
          echo "category=$CATEGORY" >> $GITHUB_OUTPUT

      - name: Update CHANGELOG
        run: |
          ENTRY="${{ steps.notes.outputs.entry }}"

          # Add to unreleased section
          awk -v entry="$ENTRY" '/## Unreleased/ {print; print entry; next} 1' CHANGELOG.md > CHANGELOG.tmp
          mv CHANGELOG.tmp CHANGELOG.md

      - name: Commit CHANGELOG
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

          git add CHANGELOG.md
          git commit -m "docs: update release notes"
          git push
```

---

## Complete Workflow Dependencies

```
                        ┌─────────────────────────────────────┐
                        │         TRIGGER: PUSH/PR            │
                        └──────────────────┬──────────────────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                     │
                        ▼                                     ▼
                ┌──────────────┐                   ┌──────────────┐
                │   CI Tests   │                   │  Code Review │
                │  (ci.yml)    │                   │ (codex.yml)  │
                └──────┬───────┘                   └──────┬───────┘
                       │                                   │
                       ▼                                   │
                ┌──────────────┐                            │
                │   Quality    │                            │
                │(quality.yml) │                            │
                └──────┬───────┘                            │
                       │                                   │
                       ▼                                   ▼
                ┌─────────────────────────────────────────────┐
                │            Security Scan                    │
                │           (security.yml)                    │
                └──────────────────┬──────────────────────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │  DEPLOY STAGING     │
                        │ (deploy-stg.yml)    │
                        └─────────┬───────────┘
                                  │
                                  ▼
                        ┌─────────────────────┐
                        │   E2E Tests         │
                        │   (e2e.yml)         │
                        └─────────┬───────────┘
                                  │
                        ┌─────────┴─────────┐
                        │                   │
                        ▼                   ▼
                ┌──────────────┐   ┌──────────────┐
                │   MANUAL     │   │   AUTO-FIX   │
                │  APPROVAL    │   │ (autofix.yml)│
                └──────┬───────┘   └──────────────┘
                       │
                       ▼
                ┌──────────────┐
                │ DEPLOY PROD  │
                │(deploy.yml)  │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   MONITOR    │
                │ (monitor.yml)│
                └──────────────┘
```

---

## Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Description |
|--------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for Codex |
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `CODECOV_TOKEN` | Code coverage reporting |
| `SNYK_TOKEN` | Security scanning |
| `SLACK_WEBHOOK` | Team notifications |
| `SLACK_WEBHOOK_ONCALL` | Emergency alerts |
| `PAGERDUTY_KEY` | PagerDuty integration |

---

## Environment Configuration

### Create environments in GitHub

**Settings → Environments → New environment**

| Environment | Protection Rules | Secrets |
|-------------|------------------|---------|
| `staging` | - | `VERCEL_TOKEN`, `API_URL_STAGING` |
| `production` | Required reviewers, Wait timer | `VERCEL_TOKEN`, `API_URL_PROD`, `DATABASE_URL` |

---

## Branch Strategy

```
main (protected)
├── Require PR reviews
├── Require status checks
└── Require Codex review pass

dev
├── For feature development
└── Auto-deploy to staging

feature/* (branches)
├── Require PR to merge to dev
└── Delete after merge
```

---

## Testing Your Pipeline

### 1. Test locally with Act

```bash
# Install act (run GitHub Actions locally)
brew install act

# Test CI workflow
act -j test

# Test with secrets
act -j test --secret OPENAI_API_KEY=sk-...
```

### 2. Validate workflows

```bash
# Install actionlint
brew install actionlint

# Validate all workflows
actionlint .github/workflows/*.yml
```

### 3. Test with dry-run

```yaml
# Add this to any workflow for testing
on:
  workflow_dispatch:
    inputs:
      dry_run:
        description: 'Dry run (no actual deploy)'
        type: boolean
        default: false

jobs:
  deploy:
    if: ${{ !inputs.dry_run }}
    # ... deployment steps
```

---

## Best Practices

### 1. Workflow Reusability

Create composite actions for common tasks:

```yaml
# .github/actions/setup-node/action.yml
name: 'Setup Node.js'
description: 'Setup Node.js with caching'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '20.x'

runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'
    - shell: bash
      run: npm ci
```

### 2. Matrix Builds

Test across multiple configurations:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest, windows-latest]
    node: [18.x, 20.x]
    # Total: 3 × 2 = 6 jobs
```

### 3. Caching

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
      .next/cache
    key: ${{ runner.os }}-${{ hashFiles('**/lockfiles') }}
```

### 4. Parallel Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # ...

  test:
    runs-on: ubuntu-latest
    # ...

  # Runs after both complete
  report:
    needs: [lint, test]
    runs-on: ubuntu-latest
    # ...
```

---

## Monitoring & Alerts

### Dashboard metrics to track

| Metric | Target | Alert |
|--------|--------|-------|
| CI success rate | >95% | <90% |
| Average CI time | <5 min | >10 min |
| Deployment frequency | Daily | - |
| Lead time | <1 day | >2 days |
| Change failure rate | <5% | >15% |

### Slack notifications

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: |
      Workflow: ${{ github.workflow }}
      Status: ${{ job.status }}
      Author: ${{ github.actor }}
      Branch: ${{ github.ref_name }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

---

## Sources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codex GitHub Action](https://developers.openai.com/codex/github-action/)
- [Vercel Deployment Action](https://github.com/amondnet/vercel-action)
- [CodeQL Security Scanning](https://github.com/github/codeql-action)
- [TruffleHog Secret Scanning](https://github.com/trufflesecurity/trufflehog)
- [Snyk Security](https://snyk.io/)
- [Playwright E2E Testing](https://playwright.dev/)

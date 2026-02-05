# Enterprise CI/CD Playbook
## Codex Code Review, Auto-Fix, and Multi-Language Testing

**Based on production patterns from enterprise monorepo migrations.**
**Last Updated: 2026-02-05**

---

## 🚨 THE PROBLEM WITH OUR CURRENT SETUP

### What We've Been Doing Wrong:

1. **Mixed test frameworks** - Using Jest syntax with Node.js built-in test runner
2. **Auto-fix detection gaps** - Not catching "file not found" errors
3. **No per-language isolation** - Trying to run everything in one job
4. **Trigger misalignment** - CI triggers != auto-fix triggers
5. **No local/CI parity** - Developers can't run what CI runs

### Root Cause:
**We've been assembling workflows piece-by-piece without a cohesive architecture.**

---

## ✅ THE ENTERPRISE SOLUTION

### Core Principle: **Reusable Workflows + Shell Scripts + Container Images**

```
┌─────────────────────────────────────────────────────────────┐
│                   ENTERPRISE PATTERN                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. TRIGGER WORKFLOWS (per component/language)             │
│     └─ Define WHEN workflows run                           │
│     └─ Call reusable workflow with context                  │
│                                                              │
│  2. REUSABLE WORKFLOW (common-deploy.yaml)                 │
│     └─ Define WHAT jobs run (lint, test, deploy)          │
│     └─ Use shell scripts for implementation                 │
│     └─ Use container images for environment                 │
│                                                              │
│  3. SHELL SCRIPTS (in each component)                     │
│     └─ lint.sh, test.sh, deploy.sh                         │
│     └─ Locally runnable → matches CI exactly               │
│                                                              │
│  4. CONTAINER IMAGES                                       │
│     └─ Node image, Python image                            │
│     └─ Used in CI AND dev containers                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Source:** [An example CI/CD setup for a monorepo using vanilla GitHub Actions](https://www.generalreasoning.com/blog/2025/03/22/github-actions-vanilla-monorepo.html)

---

## 📁 PROPER DIRECTORY STRUCTURE

```
./
├── .github/
│   └── workflows/
│       ├── common-deploy.yaml          # Reusable workflow
│       ├── typescript-trigger.yaml     # TypeScript CI trigger
│       ├── python-trigger.yaml         # Python CI trigger
│       └── codex-autofix.yaml          # Auto-fix workflow
│
├── typescript/
│   ├── scripts/
│   │   ├── lint.sh                    # TypeScript linting
│   │   └── test.sh                    # TypeScript tests
│   ├── src/
│   └── package.json
│
├── python/
│   ├── scripts/
│   │   ├── lint.sh                    # Python linting
│   │   └── test.sh                    # Python tests
│   ├── src/
│   └── pyproject.toml
│
└── images/
    ├── node.Dockerfile                # Node container
    └── python.Dockerfile              # Python container
```

---

## 🔧 STEP 1: CREATE REUSABLE WORKFLOW

**File:** `.github/workflows/common-deploy.yaml`

```yaml
name: common-deploy

on:
  workflow_call:
    inputs:
      ci_path:
        description: 'Working directory (e.g., ./typescript)'
        required: true
        type: string
      ci_environment:
        description: 'GitHub environment'
        required: true
        type: string
      ci_image:
        description: 'Container image'
        required: true
        type: string
      run_lint:
        required: true
        type: boolean
      run_test:
        required: true
        type: boolean

permissions:
  contents: read
  id-token: write

env:
  ENVIRONMENT: ${{ inputs.ci_environment }}

jobs:
  lint:
    if: ${{ inputs.run_lint }}
    runs-on: ubuntu-latest
    container:
      image: ${{ inputs.ci_image }}
    steps:
      - uses: actions/checkout@v4
      - name: Lint
        run: ./scripts/lint.sh
        working-directory: ${{ inputs.ci_path }}

  test:
    if: ${{ inputs.run_test }}
    runs-on: ubuntu-latest
    container:
      image: ${{ inputs.ci_image }}
    steps:
      - uses: actions/checkout@v4
      - name: Test
        run: ./scripts/test.sh
        working-directory: ${{ inputs.ci_path }}
```

---

## 🔧 STEP 2: CREATE TRIGGER WORKFLOWS

**File:** `.github/workflows/typescript-trigger.yaml`

```yaml
name: typescript-ci

on:
  pull_request:
    paths:
      - "typescript/**"
      - ".github/workflows/typescript-trigger.yaml"
      - ".github/workflows/common-deploy.yaml"
  push:
    branches: [main]
    paths:
      - "typescript/**"
      - ".github/workflows/typescript-trigger.yaml"
      - ".github/workflows/common-deploy.yaml"

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  pr:
    if: github.event_name == 'pull_request'
    uses: ./.github/workflows/common-deploy.yaml
    secrets: inherit
    with:
      ci_path: ./typescript
      ci_environment: pr
      ci_image: node:22
      run_lint: true
      run_test: true

  main:
    if: github.event_name == 'push'
    uses: ./.github/workflows/common-deploy.yaml
    secrets: inherit
    with:
      ci_path: ./typescript
      ci_environment: production
      ci_image: node:22
      run_lint: true
      run_test: true
```

**File:** `.github/workflows/python-trigger.yaml`

```yaml
name: python-ci

on:
  pull_request:
    paths:
      - "python/**"
      - ".github/workflows/python-trigger.yaml"
      - ".github/workflows/common-deploy.yaml"
  push:
    branches: [main]
    paths:
      - "python/**"
      - ".github/workflows/python-trigger.yaml"
      - ".github/workflows/common-deploy.yaml"

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  pr:
    if: github.event_name == 'pull_request'
    uses: ./.github/workflows/common-deploy.yaml
    secrets: inherit
    with:
      ci_path: ./python
      ci_environment: pr
      ci_image: python:3.11
      run_lint: true
      run_test: true

  main:
    if: github.event_name == 'push'
    uses: ./.github/workflows/common-deploy.yaml
    secrets: inherit
    with:
      ci_path: ./python
      ci_environment: production
      ci_image: python:3.11
      run_lint: true
      run_test: true
```

---

## 🔧 STEP 3: CREATE SHELL SCRIPTS

**File:** `typescript/scripts/lint.sh`

```bash
#!/bin/bash
set -e

echo "Running TypeScript linter..."

# Run ESLint
npm run lint || true

# Run TypeScript compiler check
npx tsc --noEmit

echo "Lint complete."
```

**File:** `typescript/scripts/test.sh`

```bash
#!/bin/bash
set -e

echo "Running TypeScript tests..."

# Use Node.js built-in test runner
npx tsx --test "$(find . -name '*.test.ts' | tr '\n' ' ')"

echo "Tests complete."
```

**File:** `typescript/package.json`

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "test": "tsx --test '**/*.test.ts'"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "eslint": "^9.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  }
}
```

---

## 🔧 STEP 4: FIX AUTO-FIX DETECTION

**The Problem:** Auto-fix workflow doesn't catch "file not found" errors.

**The Solution:** Check exit codes, not just grep patterns.

**File:** `.github/workflows/codex-autofix.yml`

```yaml
name: Codex Auto-Fix CI Failures

on:
  workflow_run:
    workflows: ["typescript-ci", "python-ci"]
    types: [completed]

permissions:
  contents: write
  pull-requests: write

jobs:
  codex-autofix:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    env:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.workflow_run.head_sha }}

      - name: Detect Failing Job
        id: detect
        run: |
          # Get the failing job from the workflow run
          WORKFLOW_NAME="${{ github.event.workflow_run.name }}"

          if [[ "$WORKFLOW_NAME" == "typescript-ci" ]]; then
            echo "language=typescript" >> $GITHUB_OUTPUT
            echo "path=./typescript" >> $GITHUB_OUTPUT
          elif [[ "$WORKFLOW_NAME" == "python-ci" ]]; then
            echo "language=python" >> $GITHUB_OUTPUT
            echo "path=./python" >> $GITHUB_OUTPUT
          else
            echo "No matching workflow found"
            exit 1
          fi

      - name: Setup Node.js
        if: steps.detect.outputs.language == 'typescript'
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install TypeScript Dependencies
        if: steps.detect.outputs.language == 'typescript'
        run: |
          cd "${{ steps.detect.outputs.path }}"
          npm ci

      - name: Setup Python
        if: steps.detect.outputs.language == 'python'
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install Python Dependencies
        if: steps.detect.outputs.language == 'python'
        run: |
          cd "${{ steps.detect.outputs.path }}"
          pip install -e .
          pip install pytest

      - name: Run Codex to Fix
        uses: openai/codex-action@main
        with:
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}
          prompt: |
            You are working in a ${{ steps.detect.outputs.language }} codebase with failing tests in "${{ steps.detect.outputs.path }}".

            Read the test output, identify why tests are failing, and make the minimal change needed to fix them.

            Only fix the failing tests. Do not refactor unrelated code.
          codex_args: '["--config","sandbox_mode=\\"workspace-write\\""]'

      - name: Verify Tests
        run: |
          cd "${{ steps.detect.outputs.path }}"
          if [[ "${{ steps.detect.outputs.language }}" == "typescript" ]]; then
            npx tsx --test "$(find . -name '*.test.ts' | tr '\n' ' ')"
          else
            pytest
          fi

      - name: Create Fix PR
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: "fix(ci): auto-fix failing tests

          Co-authored-by: Codex <codex-auto-fix[bot]@users.noreply.github.com>"
          branch: codex/auto-fix-${{ github.event.workflow_run.run_id }}
          base: ${{ github.event.workflow_run.head_branch }}
          title: "Auto-fix failing CI via Codex (${{ steps.detect.outputs.language }})"
          body: |
            Auto-generated fix for CI failures in `${{ github.event.workflow_run.name }}`.
          labels: codex, auto-fix
```

---

## 🎯 KEY ENTERPRISE PATTERNS

### 1. **One Trigger Per Language/Component**
- ✅ Separate workflow files for TypeScript, Python, etc.
- ✅ Each trigger defines `paths:` filter
- ✅ Each trigger calls reusable workflow

### 2. **Reusable Common Workflow**
- ✅ Single source of truth for CI jobs
- ✅ Prevents drift between environments
- ✅ Easy to maintain and update

### 3. **Shell Scripts for Implementation**
- ✅ Locally runnable (developers can test before push)
- ✅ Same commands in CI and local
- ✅ Language-specific logic in scripts, not YAML

### 4. **Container Images for Environment Parity**
- ✅ CI uses same Node/Python versions as developers
- ✅ Dev containers match CI exactly
- ✅ No "works on my machine" issues

### 5. **Workflow-Specific Auto-Fix**
- ✅ Auto-fix triggers on specific workflow, not generic "CI"
- ✅ Language detection via workflow name
- ✅ Proper exit code handling

---

## 📊 COMPARISON: OLD vs NEW

| Aspect | OLD (Broken) | NEW (Enterprise) |
|--------|--------------|------------------|
| Triggers | Single CI workflow | Separate triggers per language |
| Test Framework | Mixed (Jest + tsx) | Consistent per language |
| Detection | Grep error patterns | Workflow name + exit codes |
| Local Testing | ❌ Can't run CI locally | ✅ `./scripts/test.sh` works |
| Environment Parity | ❌ Setup actions | ✅ Container images |
| Auto-Fix | Generic detection | Workflow-specific |

---

## 🚀 IMPLEMENTATION CHECKLIST

### Phase 1: Structure
- [ ] Create `typescript/` and `python/` directories
- [ ] Move TypeScript files to `typescript/`
- [ ] Move Python files to `python/`
- [ ] Create `scripts/` subdirectories
- [ ] Create `lint.sh` and `test.sh` in each

### Phase 2: Workflows
- [ ] Create `common-deploy.yaml` (reusable)
- [ ] Create `typescript-trigger.yaml`
- [ ] Create `python-trigger.yaml`
- [ ] Delete old `ci.yml`

### Phase 3: Auto-Fix
- [ ] Update `codex-autofix.yml` with workflow-specific detection
- [ ] Test with failing PR

### Phase 4: Verify
- [ ] Run `./typescript/scripts/test.sh` locally
- [ ] Run `./python/scripts/test.sh` locally
- [ ] Open PR and verify CI passes
- [ ] Create failing PR and verify auto-fix works

---

## 📚 SOURCES

1. [An example CI/CD setup for a monorepo using vanilla GitHub Actions](https://www.generalreasoning.com/blog/2025/03/22/github-actions-vanilla-monorepo.html) - **Primary source for this playbook**
2. [GitHub Actions CI/CD Best Practices](https://github.com/github/awesome-copilot/blob/main/instructions/github-actions-ci-cd-best-practices.instructions.md)
3. [Scaling GitHub Actions Reusability in the Enterprise](https://wellarchitected.github.io/library/collaboration/recommendations/scaling-actions-reusability/)
4. [Automating Code Quality and Security Fixes with Codex](https://developers.openai.com/cookbook/examples/codex/secure_quality_gitlab)
5. [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

**This is how enterprises do it.**

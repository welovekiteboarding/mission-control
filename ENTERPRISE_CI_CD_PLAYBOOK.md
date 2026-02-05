# Enterprise CI/CD Playbook (Codex-Only)
## CI Review, Auto-Fix, and Future-Proof Setup Guide

**Last Updated: 2026-02-05**

This playbook has two goals:
1) **Align with this repo today** (OpenClaw).
2) **Provide a reusable, step-by-step guide** to set up Codex-based automated CI review & auto-fix for any repo/stack.

---

## ✅ Current Repository Alignment (OpenClaw)

### What we have now (truth on disk)

**CI workflow:** `.github/workflows/ci.yml`
- Runs **Python tests** for `spec-kit` via `./spec-kit/scripts/test.sh`
- Runs **TypeScript tests** via `./scripts/test.sh`

**Auto-fix workflow:** `.github/workflows/codex-autofix.yml`
- Triggers on **CI** workflow run failures
- Detects failing language by **re-running tests**
- Uses **Codex** to fix and opens a PR

### Known current issues
1. **Auto-fix re-runs tests without installing deps first** (Python/TS). This can mis-detect failures.
2. **TypeScript detection runs an invalid command** (uses a pytest flag and a broken quote).
3. **Auto-fix re-runs tests differently than CI**, so failures can be misclassified.
4. **Cloud agents submit broken PRs on purpose** (for testing), but those should be marked/tested safely.

### Alignment principle for this repo
- **CI** remains the source of truth.
- **Auto-fix** must **mimic CI** exactly when detecting failures.
- **Codex fixes only failing tests** in the relevant scope.

---

## ✅ Step-by-Step: Set Up Codex CI Review + Auto-Fix (Any Repo)

This is the **future reference guide** for any stack.

### Phase 0 — Preflight Inventory (do this first)
1. **List test entry points** by component (frontend, backend, infra, etc.).
2. **Choose the CI truth command** per component (e.g., `npm test`, `pytest`, `go test ./...`).
3. **Ensure each component has a script** you can run locally:
   - `./scripts/test.sh`, `./backend/scripts/test.sh`, etc.
4. **Confirm install steps** for each component (e.g., `npm ci`, `pip install -e .`).

If any of these are missing, add them first. This is non-negotiable for stable auto-fix.

---

### Phase 1 — CI Design (works for any stack)

**Goal:** CI is deterministic, minimal, and mirrors local usage.

**Recommended structure:** one workflow with component jobs, each job runs:
1. checkout
2. install deps
3. run `./component/scripts/test.sh`

Template (component job pattern):
```yaml
jobs:
  test-<component>:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install deps
        run: <install command>
      - name: Run tests
        run: ./<component>/scripts/test.sh
```

**Why this matters:** Auto-fix should re-run the *same scripts*.

---

### Phase 2 — Codex Auto-Fix Workflow (workflow_run)

**Goal:** When CI fails, Codex:
1) detects the failing component
2) runs Codex fix
3) verifies
4) opens a PR

**Required behavior:**
- Detection step **must** match CI install + test commands.
- Codex fix must operate only in the failing component scope.

Template structure:
```yaml
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  codex-autofix:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.workflow_run.head_sha }}

      - name: Detect failing component
        run: |
          # Install deps + run tests for each component (same as CI)
          # First failure sets FAILING_COMPONENT and FAILING_PATH

      - name: Run Codex to Fix
        uses: openai/codex-action@main
        with:
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}
          prompt: |
            You are working in <component> with failing tests in <path>.
            Fix only the failing tests. Do not refactor unrelated code.

      - name: Verify tests
        run: ./<component>/scripts/test.sh

      - name: Create PR
        uses: peter-evans/create-pull-request@v6
```

---

### Phase 3 — Codex Cloud Agent PRs (Intentional Failures)

**Current reality:** cloud agents sometimes submit intentionally broken PRs to test the full auto-fix loop.

Recommended:
1. **Let CI and auto-fix run** on those PRs so the loop is exercised end-to-end.
2. If you need to suppress auto-fix for specific tests, use a **temporary skip label**, but only when required.
3. For intentional breakage, keep it minimal and scoped so Codex can fix it quickly.

---

### Phase 4 — Rollout Checklist
1. Create test scripts per component.
2. Wire CI to those scripts.
3. Wire Codex auto-fix to those scripts.
4. Verify a failing PR triggers auto-fix.
5. Verify a "simulation" PR still triggers auto-fix (unless explicitly skipped).

---

## ✅ OpenClaw: Updated CI/CD Blueprint (Aligned with Current Repo)

### CI (current and correct)
**File:** `.github/workflows/ci.yml`
Jobs:
- `test-python` runs `./spec-kit/scripts/test.sh`
- `test-typescript` runs `./scripts/test.sh`

### Auto-fix (should be aligned)
**File:** `.github/workflows/codex-autofix.yml`
Expected changes:
1. **Detection step should install deps first** and run the **same test scripts**:
   - Python: `pip install -e .` + `pip install pytest pytest-cov` then `./spec-kit/scripts/test.sh`
   - TypeScript: `npm install -g tsx` then `./scripts/test.sh`
2. **Remove invalid flags** in TypeScript detection.
3. **Optional**: skip auto-fix for labeled simulations only when needed.

---

## ✅ Quick Reference (Codex-Only Setup)

**Always true rules:**
1. CI scripts are the source of truth.
2. Auto-fix detection must run the same scripts.
3. Codex only fixes failing tests in scope.
4. Label-based opt-out only if you explicitly want to bypass auto-fix.

---

## Sources (internal)
- This playbook is aligned to repository state as of 2026-02-05.
- External references intentionally omitted to keep this repo self-contained.

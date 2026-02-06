#!/bin/bash

# Pre-push guard with Codex auto-fix fallback.
# - Runs the same tests as CI.
# - If tests fail, invoke Codex to fix and rerun tests.
# - If still failing, block the push.

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Skip if no tracked changes
if [ -z "$(git status --short --untracked-files=no)" ]; then
  echo "[pre-push] No tracked changes; skipping tests."
  exit 0
fi

run_tests() {
  ./spec-kit/scripts/test.sh
  ./scripts/test.sh
}

echo "[pre-push] Running tests..."
run_tests
status=$?

if [ $status -eq 0 ]; then
  echo "[pre-push] Tests passed."
  exit 0
fi

echo "[pre-push] Tests failed (exit $status). Invoking Codex auto-fix..."
# Allow Codex to attempt fixes even if it exits non-zero
codex exec "Tests failed. Fix the failures, rerun ./spec-kit/scripts/test.sh && ./scripts/test.sh, create branch codex-auto-fix-{timestamp}, and report results." --sandbox workspace-write || true

echo "[pre-push] Re-running tests after Codex fix..."
run_tests
status=$?

if [ $status -eq 0 ]; then
  echo "[pre-push] Tests passing after Codex fix."
  exit 0
fi

echo "[pre-push] Tests still failing (exit $status). Aborting push."
exit $status

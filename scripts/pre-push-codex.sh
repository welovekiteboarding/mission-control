#!/bin/bash

# Pre-push guard with Codex auto-fix fallback.
# Runs the same tests as CI. If tests fail, invokes Codex to fix and rerun tests.
# Aborts push if tests still fail.

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Always run tests (even if working tree is clean) to enforce the guard.

run_tests() {
  ./spec-kit/scripts/test.sh
  local spec_status=$?

  ./scripts/test.sh
  local ts_status=$?

  # Return non-zero if any test command failed
  if [ $spec_status -ne 0 ] || [ $ts_status -ne 0 ]; then
    return 1
  fi
  return 0
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

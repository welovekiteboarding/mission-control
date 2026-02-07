#!/bin/bash

# Pre-push guard with Codex auto-fix fallback.
# Runs the same tests as CI. If tests fail, invokes Codex to fix and rerun tests.
# Aborts push if tests still fail.

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Always run tests (even if working tree is clean) to enforce the guard.

changed_files_for_push() {
  local upstream="$1"
  git diff --name-only "$upstream"...HEAD
}

should_run_spec_tests() {
  local upstream
  upstream="$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || true)"

  # Safe default: if we can't determine upstream (e.g. first push), keep strict behavior.
  if [ -z "$upstream" ]; then
    return 0
  fi

  local changed
  changed="$(changed_files_for_push "$upstream")"

  # No committed changes in the push range that touch spec-kit.
  if [ -z "$changed" ]; then
    return 1
  fi

  if echo "$changed" | grep -q '^spec-kit/'; then
    return 0
  fi

  return 1
}

run_tests() {
  local spec_status=0
  if should_run_spec_tests; then
    echo "[pre-push] Detected spec-kit changes; running spec-kit tests..."
    ./spec-kit/scripts/test.sh
    spec_status=$?
  else
    echo "[pre-push] No spec-kit changes in pushed commits; skipping spec-kit tests."
  fi

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

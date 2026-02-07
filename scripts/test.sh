#!/usr/bin/env bash
set -euo pipefail

echo "Running TypeScript tests..."

# Find all .test.ts files in this repo (exclude dependencies and component test suites)
TEST_FILES=$(find . -name '*.test.ts' \
  -not -path './node_modules/*' \
  -not -path '*/node_modules/*' \
  -not -path './openclaw-upstream/*' \
  -not -path './backend/convex/tests/*' \
  -not -path './backend/poller/tests/*' \
  -not -path './frontend/tests/*' \
  2>/dev/null | tr '\n' ' ')

if [ -z "$TEST_FILES" ]; then
    echo "No TypeScript test files found (excluding component suites and openclaw-upstream)"
    exit 0
fi

echo "Found test files: $TEST_FILES"

# Run tests with tsx
npx tsx --test $TEST_FILES

echo "Tests complete."

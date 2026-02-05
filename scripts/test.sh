#!/bin/bash
set -e

echo "Running TypeScript tests..."

# Find all .test.ts files (excluding node_modules)
TEST_FILES=$(find . -name '*.test.ts' -not -path './node_modules/*' 2>/dev/null | tr '\n' ' ')

if [ -z "$TEST_FILES" ]; then
    echo "No TypeScript test files found"
    exit 0
fi

echo "Found test files: $TEST_FILES"

# Run tests with tsx
npx tsx --test $TEST_FILES

echo "Tests complete."

#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Running Python tests..."

# Run pytest with coverage
pytest --cov=specify_cli --cov-report=term-missing --tb=short || {
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 5 ]; then
        echo "No tests collected - this is okay"
        exit 0
    fi
    exit $EXIT_CODE
}

echo "Tests complete."

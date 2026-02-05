#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Running Python tests..."

if ! python3 - <<'PY'
import importlib.util
import sys
missing = []
for name in ("pytest", "pytest_cov"):
    if importlib.util.find_spec(name) is None:
        missing.append(name)
if missing:
    sys.exit(1)
sys.exit(0)
PY
then
    echo "pytest/pytest-cov not installed; installing..."
    python3 -m pip install --quiet pytest pytest-cov
fi

# Run pytest with coverage
python3 -m pytest --cov=specify_cli --cov-report=term-missing --tb=short || {
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 5 ]; then
        echo "No tests collected - this is okay"
        exit 0
    fi
    exit $EXIT_CODE
}

echo "Tests complete."

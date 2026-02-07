#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Running Python tests..."

VENV_DIR=".venv"
VENV_PY="$VENV_DIR/bin/python"

if [ ! -x "$VENV_PY" ]; then
    echo "Creating local virtual environment at $VENV_DIR ..."
    python3 -m venv "$VENV_DIR"
fi

if ! "$VENV_PY" - <<'PY'
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
    echo "Installing pytest/pytest-cov into local virtual environment..."
    "$VENV_PY" -m pip install --quiet pytest pytest-cov
fi

# Run pytest with coverage
"$VENV_PY" -m pytest --cov=specify_cli --cov-report=term-missing --tb=short || {
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 5 ]; then
        echo "No tests collected - this is okay"
        exit 0
    fi
    exit $EXIT_CODE
}

echo "Tests complete."

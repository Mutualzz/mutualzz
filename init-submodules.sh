#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"
echo "CWD: $(pwd)"

git --version
git submodule status

if [ -n "${GITHUB_TOKEN:-}" ]; then
    git config url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
fi

# Clean up partial submodules
git submodule deinit -f .
git submodule sync --recursive

git submodule update --init --recursive --force

ls -l packages || true
ls -l apps || true

git submodule status

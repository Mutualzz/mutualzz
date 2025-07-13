#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"
echo "CWD: $(pwd)"

echo "GITHUB_TOKEN: ${GITHUB_TOKEN:0:4}..."
git --version
git config --list
git submodule status

# Set up GitHub token if present
if [ -n "$GITHUB_TOKEN" ]; then
  git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
  echo "Configured git to use GITHUB_TOKEN"
fi

git submodule sync
git submodule update --init --recursive


ls -l packages
ls -l apps || true

git submodule status
#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"
echo "CWD: $(pwd)"

git --version
git submodule status

# Set up GitHub token if present
if [ -n "$GITHUB_TOKEN" ]; then
  git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
  echo "Configured git to use GITHUB_TOKEN"
fi

git submodule sync
git submodule init
git submodule update --recursive --remote

ls -l packages
ls -l apps

git submodule status
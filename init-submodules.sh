#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"
echo "CWD: $(pwd)"

git --version
git submodule status

# Set up GitHub token if present
if [ -n "$GITHUB_TOKEN" ]; then
    # First, set up token for private
    git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"

    git submodule sync --recursive
    git submodule update --init --recursive || true

    # Then, unset token for public
    git config --global --unset-all url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf

    # Try again for public
    git submodule update --init --recursive --remote
fi

ls -l packages
ls -l apps

git submodule status
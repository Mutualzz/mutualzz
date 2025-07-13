#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"
echo "CWD: $(pwd)"

git --version
git submodule status

ls -l packages/ui || true
ls -l apps/app || true

git submodule sync
git submodule update --init --recursive apps/app packages/ui

ls -l packages/ui || true
ls -l apps/app || true

git submodule status


#!/bin/bash
set -euxo pipefail


cd "${VERCEL_PROJECT_ROOT:-$(git rev-parse --show-toplevel)}"

git --version

git submodule deinit -f apps/app packages/ui || true
rm -rf apps/app packages/ui


git submodule sync
git submodule update --init --recursive --force apps/app packages/ui

ls -l packages/ui || true
ls -l apps/app || true

git submodule status


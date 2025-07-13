#!/bin/bash
set -euxo pipefail

cd "$(dirname "$0")"


git --version

git submodule sync
git submodule update --init --recursive packages/ui apps/app

ls -l packages/ui || true
ls -l apps/app || true

git submodule status


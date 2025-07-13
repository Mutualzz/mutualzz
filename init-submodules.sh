#!/bin/bash
set -euxo pipefail

git --version

git submodule deinit -f --all || true
git submodule sync
git submodule update --init --recursive packages/ui apps/app

ls -l packages/ui || true
ls -l apps/app || true

git submodule status


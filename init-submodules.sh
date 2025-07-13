#!/bin/bash
set -euxo pipefail

git submodule deinit -f apps/app packages/ui
git submodule sync
git submodule update --init --recursive packages/ui apps/app

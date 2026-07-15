#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MODULE_DIR="${ROOT}/apps/mobile/modules/voice-live-activity"

if [[ -f "${MODULE_DIR}/package.json" ]]; then
  exit 0
fi

mkdir -p "${MODULE_DIR}"
printf '%s\n' '{
  "name": "voice-live-activity",
  "version": "0.0.0",
  "private": true,
  "main": "index.ts"
}' > "${MODULE_DIR}/package.json"
printf '%s\n' 'export {};' > "${MODULE_DIR}/index.ts"

echo "Stubbed ${MODULE_DIR} so pnpm can resolve lockfile file: deps without checking out apps/mobile"

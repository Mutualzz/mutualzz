#!/usr/bin/env bash
# Resolve an Xcode target name from PRODUCT_BUNDLE_IDENTIFIER.
# Uses xcodebuild after pod install so Xcode resolves the project natively.
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: resolve-ios-extension-target.sh <path/to/project.xcodeproj> <bundle-id>" >&2
  exit 2
fi

XCODEPROJ="$1"
EXPECTED_BUNDLE_ID="$2"

if [[ ! -d "$XCODEPROJ" ]]; then
  echo "::error::Xcode project not found: $XCODEPROJ" >&2
  exit 1
fi

TARGETS_FILE="$(mktemp)"
trap 'rm -f "$TARGETS_FILE"' EXIT

xcodebuild -project "$XCODEPROJ" -list > "$TARGETS_FILE" 2>/dev/null || {
  echo "::error::Failed to list Xcode project targets in $XCODEPROJ" >&2
  exit 1
}

EXTENSION_TARGET="$(
  python3 - "$TARGETS_FILE" "$EXPECTED_BUNDLE_ID" "$XCODEPROJ" <<'PY'
import re
import subprocess
import sys
from pathlib import Path

list_output = Path(sys.argv[1]).read_text(encoding="utf-8")
expected_bundle_id = sys.argv[2]
xcodeproj = sys.argv[3]

targets = []
capture = False
for line in list_output.splitlines():
    stripped = line.strip()
    if stripped == "Targets:":
        capture = True
        continue
    if capture and stripped == "Build Configurations:":
        capture = False
        continue
    if capture and stripped:
        targets.append(stripped)

for target in targets:
    proc = subprocess.run(
        [
            "xcodebuild",
            "-project",
            xcodeproj,
            "-target",
            target,
            "-configuration",
            "Release",
            "-showBuildSettings",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        continue
    for line in proc.stdout.splitlines():
        match = re.search(r'PRODUCT_BUNDLE_IDENTIFIER\s*=\s*"?([^";\n]+)"?;', line)
        if match and match.group(1).strip() == expected_bundle_id:
            print(target)
            sys.exit(0)

print("::error::Could not find an Xcode target for bundle ID '{}' after pod install.".format(expected_bundle_id), file=sys.stderr)
print("Targets discovered by xcodebuild:", file=sys.stderr)
for target in targets:
    print(f"  {target}", file=sys.stderr)
sys.exit(1)
PY
)"

echo "$EXTENSION_TARGET"

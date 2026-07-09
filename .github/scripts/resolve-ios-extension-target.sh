#!/usr/bin/env bash
# Resolve an Xcode native target name from PRODUCT_BUNDLE_IDENTIFIER via xcodebuild.
# Compatible with macOS default bash 3.2 (no mapfile).
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: resolve-ios-extension-target.sh <path/to/Project.xcodeproj> <bundle-id>" >&2
  exit 2
fi

XCODEPROJ="$1"
EXPECTED_BUNDLE_ID="$2"

if [[ ! -d "$XCODEPROJ" ]]; then
  echo "::error::Xcode project not found: $XCODEPROJ" >&2
  exit 1
fi

target_bundle_id() {
  xcodebuild \
    -project "$XCODEPROJ" \
    -target "$1" \
    -configuration Release \
    -sdk iphoneos \
    -showBuildSettings 2>/dev/null \
    | awk -F' = ' '/PRODUCT_BUNDLE_IDENTIFIER/ { gsub(/^ /, "", $2); print $2; exit }' \
    | tr -d '"[:space:]'
}

TARGETS_FILE="$(mktemp)"
trap 'rm -f "$TARGETS_FILE"' EXIT

xcodebuild -project "$XCODEPROJ" -list 2>/dev/null | awk '
  /^[[:space:]]*Targets:$/ { capture = 1; next }
  capture && /^[[:space:]]*Build configurations:/ { capture = 0 }
  capture && /^[[:space:]]+/ {
    sub(/^[[:space:]]+/, "", $0)
    print
  }
' > "$TARGETS_FILE"

if [[ ! -s "$TARGETS_FILE" ]]; then
  echo "::error::No Xcode targets found in $XCODEPROJ" >&2
  xcodebuild -project "$XCODEPROJ" -list >&2 || true
  exit 1
fi

while IFS= read -r target; do
  [[ -z "$target" ]] && continue
  bundle_id="$(target_bundle_id "$target")"
  if [[ "$bundle_id" == "$EXPECTED_BUNDLE_ID" ]]; then
    echo "$target"
    exit 0
  fi
done < "$TARGETS_FILE"

echo "::error::Could not find an Xcode target for bundle ID '$EXPECTED_BUNDLE_ID' after prebuild." >&2
echo "Targets and bundle identifiers in project:" >&2
while IFS= read -r target; do
  [[ -z "$target" ]] && continue
  bundle_id="$(target_bundle_id "$target" || true)"
  echo "  $target -> ${bundle_id:-<unknown>}" >&2
done < "$TARGETS_FILE"

exit 1

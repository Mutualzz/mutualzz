#!/usr/bin/env bash
# Resolve an Xcode native target name from PRODUCT_BUNDLE_IDENTIFIER via xcodebuild.
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

mapfile -t TARGETS < <(
  xcodebuild -project "$XCODEPROJ" -list 2>/dev/null | awk '
    /^[[:space:]]*Targets:$/ { capture = 1; next }
    capture && /^[[:space:]]*Build configurations:/ { capture = 0 }
    capture && /^[[:space:]]+/ {
      sub(/^[[:space:]]+/, "", $0)
      print
    }
  '
)

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  echo "::error::No Xcode targets found in $XCODEPROJ" >&2
  xcodebuild -project "$XCODEPROJ" -list >&2 || true
  exit 1
fi

for target in "${TARGETS[@]}"; do
  bundle_id="$(
    xcodebuild \
      -project "$XCODEPROJ" \
      -target "$target" \
      -configuration Release \
      -sdk iphoneos \
      -showBuildSettings 2>/dev/null \
      | awk -F' = ' '/PRODUCT_BUNDLE_IDENTIFIER/ { gsub(/^ /, "", $2); print $2; exit }' \
      | tr -d '"[:space:]'
  )"

  if [[ "$bundle_id" == "$EXPECTED_BUNDLE_ID" ]]; then
    echo "$target"
    exit 0
  fi
done

echo "::error::Could not find an Xcode target for bundle ID '$EXPECTED_BUNDLE_ID' after prebuild." >&2
echo "Targets and bundle identifiers in project:" >&2
for target in "${TARGETS[@]}"; do
  bundle_id="$(
    xcodebuild \
      -project "$XCODEPROJ" \
      -target "$target" \
      -configuration Release \
      -sdk iphoneos \
      -showBuildSettings 2>/dev/null \
      | awk -F' = ' '/PRODUCT_BUNDLE_IDENTIFIER/ { gsub(/^ /, "", $2); print $2; exit }' \
      | tr -d '"[:space:]'
  )"
  echo "  $target -> ${bundle_id:-<unknown>}" >&2
done

exit 1

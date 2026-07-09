#!/usr/bin/env bash
# Resolve an Xcode native target name from PRODUCT_BUNDLE_IDENTIFIER in project.pbxproj.
# Uses python3 for reliable parsing on GitHub macOS runners.
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: resolve-ios-extension-target.sh <path/to/project.pbxproj> <bundle-id>" >&2
  exit 2
fi

PBXPROJ="$1"
EXPECTED_BUNDLE_ID="$2"

if [[ ! -f "$PBXPROJ" ]]; then
  echo "::error::Xcode project file not found: $PBXPROJ" >&2
  exit 1
fi

EXTENSION_TARGET="$(
  python3 - "$PBXPROJ" "$EXPECTED_BUNDLE_ID" <<'PY'
import re
import sys
from pathlib import Path

pbxproj_path = Path(sys.argv[1])
expected_bundle_id = sys.argv[2]
text = pbxproj_path.read_text(encoding="utf-8")

build_config_section = re.search(
    r"/\* Begin XCBuildConfiguration section \*/(.*?)/\* End XCBuildConfiguration section \*/",
    text,
    re.S,
)
config_list_section = re.search(
    r"/\* Begin XCConfigurationList section \*/(.*?)/\* End XCConfigurationList section \*/",
    text,
    re.S,
)
native_target_section = re.search(
    r"/\* Begin PBXNativeTarget section \*/(.*?)/\* End PBXNativeTarget section \*/",
    text,
    re.S,
)

if not (build_config_section and config_list_section and native_target_section):
    sys.exit(1)

config_bundle = {}
for match in re.finditer(
    r"([A-F0-9]{24}) /\* .*? \*/ = \{\s*isa = XCBuildConfiguration;.*?buildSettings = \{(.*?)\};.*?\};",
    build_config_section.group(1),
    re.S,
):
    bundle_match = re.search(r'PRODUCT_BUNDLE_IDENTIFIER = "?([^";\n]+)"?;', match.group(2))
    if bundle_match:
        config_bundle[match.group(1)] = bundle_match.group(1).strip()

config_lists = {}
for match in re.finditer(
    r'([A-F0-9]{24}) /\* Build configuration list for PBXNativeTarget ".*?" \*/ = \{\s*isa = XCConfigurationList;.*?buildConfigurations = \((.*?)\);',
    config_list_section.group(1),
    re.S,
):
    config_lists[match.group(1)] = re.findall(r"([A-F0-9]{24}) /\* .*? \*/", match.group(2))

for match in re.finditer(
    r"([A-F0-9]{24}) /\* ([^*]+) \*/ = \{\s*isa = PBXNativeTarget;.*?buildConfigurationList = ([A-F0-9]{24}) /\* .*? \*/;",
    native_target_section.group(1),
    re.S,
):
    target_name = match.group(2).strip()
    config_list_uuid = match.group(3)
    for config_uuid in config_lists.get(config_list_uuid, []):
        if config_bundle.get(config_uuid) == expected_bundle_id:
            print(target_name)
            sys.exit(0)

sys.exit(1)
PY
)" || {
  echo "::error::Could not find an Xcode target for bundle ID '$EXPECTED_BUNDLE_ID' after prebuild." >&2
  echo "Bundle identifiers present in project.pbxproj:" >&2
  grep "PRODUCT_BUNDLE_IDENTIFIER" "$PBXPROJ" | sed 's/^[ \t]*/  /' >&2 || true
  exit 1
}

echo "$EXTENSION_TARGET"

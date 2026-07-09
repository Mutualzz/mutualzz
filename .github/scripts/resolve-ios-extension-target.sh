#!/usr/bin/env bash
# Resolve an Xcode native target name from PRODUCT_BUNDLE_IDENTIFIER in project.pbxproj.
# Does not use xcodebuild, so it works before pod install.
# Compatible with macOS default bash 3.2 and BSD awk.
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
  awk -v expected="$EXPECTED_BUNDLE_ID" '
    function trim(s) {
      sub(/^[ \t]+/, "", s)
      sub(/[ \t]+$/, "", s)
      return s
    }

    function bundle_from_line(line,   prefix, start, rest, end) {
      prefix = "PRODUCT_BUNDLE_IDENTIFIER = \""
      start = index(line, prefix)
      if (start > 0) {
        rest = substr(line, start + length(prefix))
        end = index(rest, "\"")
        if (end > 0) {
          return substr(rest, 1, end - 1)
        }
      }
      prefix = "PRODUCT_BUNDLE_IDENTIFIER = "
      start = index(line, prefix)
      if (start > 0) {
        rest = substr(line, start + length(prefix))
        sub(/;$/, "", rest)
        return trim(rest)
      }
      return ""
    }

    function uuid_from_line(line,   trimmed) {
      trimmed = line
      sub(/^[ \t]+/, "", trimmed)
      if (length(trimmed) >= 24 && trimmed ~ /^[A-F0-9]{24}/) {
        return substr(trimmed, 1, 24)
      }
      return ""
    }

    function name_from_line(line,   start, rest, end) {
      start = index(line, "/* ")
      if (start == 0) return ""
      rest = substr(line, start + 3)
      end = index(rest, " */")
      if (end == 0) return ""
      return trim(substr(rest, 1, end - 1))
    }

    /^[ \t]*[A-F0-9]{24} \/\*/ {
      current_uuid = uuid_from_line($0)
      current_name = name_from_line($0)
    }

    /isa = XCBuildConfiguration;/ {
      config_uuid = current_uuid
      in_config = 1
    }

    in_config && /PRODUCT_BUNDLE_IDENTIFIER/ {
      bid = bundle_from_line($0)
      if (bid != "") {
        config_bundle[config_uuid] = bid
      }
      in_config = 0
    }

    /isa = XCConfigurationList;/ {
      list_uuid = current_uuid
      in_list = 1
      list_count[list_uuid] = 0
    }

    in_list && /^[ \t]*[A-F0-9]{24} \/\*/ {
      config_ref = uuid_from_line($0)
      if (config_ref != "") {
        idx = ++list_count[list_uuid]
        list_configs[list_uuid, idx] = config_ref
      }
    }

    in_list && /\);/ {
      in_list = 0
    }

    /isa = PBXNativeTarget;/ {
      target_uuid = current_uuid
      target_name[target_uuid] = current_name
      in_target = 1
    }

    in_target && /buildConfigurationList = / {
      if (match($0, /buildConfigurationList = [A-F0-9]{24}/)) {
        ref = substr($0, RSTART, RLENGTH)
        sub(/buildConfigurationList = /, "", ref)
        target_list[target_uuid] = ref
      }
      in_target = 0
    }

    END {
      for (tu in target_name) {
        lid = target_list[tu]
        if (lid == "") continue
        for (i = 1; i <= list_count[lid]; i++) {
          cu = list_configs[lid, i]
          if (config_bundle[cu] == expected) {
            print target_name[tu]
            exit 0
          }
        }
      }
      exit 1
    }
  ' "$PBXPROJ"
)" || {
  echo "::error::Could not find an Xcode target for bundle ID '$EXPECTED_BUNDLE_ID' after prebuild." >&2
  echo "Bundle identifiers present in project.pbxproj:" >&2
  grep "PRODUCT_BUNDLE_IDENTIFIER" "$PBXPROJ" | sed 's/^[ \t]*/  /' >&2 || true
  exit 1
}

echo "$EXTENSION_TARGET"

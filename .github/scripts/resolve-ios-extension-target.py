#!/usr/bin/env python3
"""Resolve an Xcode native target name from its PRODUCT_BUNDLE_IDENTIFIER."""

from __future__ import annotations

import re
import sys
from pathlib import Path


def _extract_section(text: str, section_name: str) -> str:
    begin = f"/* Begin {section_name} section */"
    end = f"/* End {section_name} section */"
    start = text.find(begin)
    if start == -1:
        return ""
    start += len(begin)
    stop = text.find(end, start)
    if stop == -1:
        return ""
    return text[start:stop]


def _parse_bundle_ids(configuration_section: str) -> dict[str, str]:
    bundle_ids: dict[str, str] = {}
    for match in re.finditer(
        r"([A-F0-9]{24}) /\* [^*]+ \*/ = \{\s*isa = XCBuildConfiguration;.*?buildSettings = \{(.*?)\};\s*name = ",
        configuration_section,
        re.DOTALL,
    ):
        settings = match.group(2)
        bundle_match = re.search(
            r'PRODUCT_BUNDLE_IDENTIFIER = "?([^";\n]+)"?;',
            settings,
        )
        if bundle_match:
            bundle_ids[match.group(1)] = bundle_match.group(1).strip()
    return bundle_ids


def _parse_configuration_lists(configuration_list_section: str) -> dict[str, list[str]]:
    lists: dict[str, list[str]] = {}
    for match in re.finditer(
        r"([A-F0-9]{24}) /\* Build configuration list[^*]*\*/ = \{\s*isa = XCConfigurationList;.*?buildConfigurations = \((.*?)\);",
        configuration_list_section,
        re.DOTALL,
    ):
        lists[match.group(1)] = re.findall(r"([A-F0-9]{24})", match.group(2))
    return lists


def _parse_native_targets(native_target_section: str) -> list[tuple[str, str, str]]:
    targets: list[tuple[str, str, str]] = []
    for match in re.finditer(
        r"([A-F0-9]{24}) /\* ([^*]+) \*/ = \{\s*isa = PBXNativeTarget;.*?buildConfigurationList = ([A-F0-9]{24})",
        native_target_section,
        re.DOTALL,
    ):
        targets.append((match.group(1), match.group(2), match.group(3)))
    return targets


def resolve_target_name(pbxproj_path: Path, expected_bundle_id: str) -> str | None:
    text = pbxproj_path.read_text(encoding="utf-8")

    bundle_ids = _parse_bundle_ids(_extract_section(text, "XCBuildConfiguration"))
    configuration_lists = _parse_configuration_lists(
        _extract_section(text, "XCConfigurationList")
    )
    native_targets = _parse_native_targets(_extract_section(text, "PBXNativeTarget"))

    for _target_uuid, target_name, configuration_list_uuid in native_targets:
        for configuration_uuid in configuration_lists.get(configuration_list_uuid, []):
            if bundle_ids.get(configuration_uuid) == expected_bundle_id:
                return target_name

    return None


def main() -> int:
    if len(sys.argv) != 3:
        print(
            "usage: resolve-ios-extension-target.py <project.pbxproj> <bundle-id>",
            file=sys.stderr,
        )
        return 2

    pbxproj_path = Path(sys.argv[1])
    expected_bundle_id = sys.argv[2]

    if not pbxproj_path.is_file():
        print(f"::error::Xcode project file not found: {pbxproj_path}", file=sys.stderr)
        return 1

    target_name = resolve_target_name(pbxproj_path, expected_bundle_id)
    if not target_name:
        bundle_lines = sorted(
            {
                line.strip()
                for line in pbxproj_path.read_text(encoding="utf-8").splitlines()
                if "PRODUCT_BUNDLE_IDENTIFIER" in line
            }
        )
        print(
            f"::error::Could not find an Xcode target for bundle ID '{expected_bundle_id}' after prebuild.",
            file=sys.stderr,
        )
        if bundle_lines:
            print("Bundle identifiers present in project.pbxproj:", file=sys.stderr)
            for line in bundle_lines:
                print(f"  {line}", file=sys.stderr)
        return 1

    print(target_name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Patch generated Xcode build configs with explicit manual signing values."""

from __future__ import annotations

import re
import sys
from pathlib import Path


def replace_or_insert(block: str, key: str, value: str) -> str:
    pattern = re.compile(rf"(^\s+{re.escape(key)} = )[^;]+;", re.M)
    replacement = rf"\1{value};"
    if pattern.search(block):
        return pattern.sub(replacement, block, count=1)

    build_settings_match = re.search(r"(\n\s*buildSettings = \{\n)(.*?)(\n\s*\};)", block, re.S)
    if not build_settings_match:
        raise RuntimeError(f"Could not find buildSettings block for {key}")

    prefix, inner, suffix = build_settings_match.groups()
    if inner and not inner.endswith("\n"):
        inner += "\n"
    inner += f"\t\t\t\t{key} = {value};\n"
    return block[: build_settings_match.start()] + prefix + inner + suffix + block[build_settings_match.end() :]


def parse_section_objects(section: str) -> list[str]:
    lines = section.splitlines(keepends=True)
    object_start = re.compile(r"^\s*[A-F0-9]{24} /\* .*? \*/ = \{$")
    object_end = re.compile(r"^\s*\};$")

    objects: list[str] = []
    current_block: list[str] | None = None
    for line in lines:
        if current_block is None:
            if object_start.match(line):
                current_block = [line]
            continue
        current_block.append(line)
        if object_end.match(line):
            objects.append("".join(current_block))
            current_block = None
    return objects


def main() -> int:
    if len(sys.argv) != 8:
        print(
            "usage: patch-ios-signing.py <project.pbxproj> <team_id> <main_profile> <extension_profile> <code_sign_identity> <main_target> <extension_target>",
            file=sys.stderr,
        )
        return 2

    pbxproj_path = Path(sys.argv[1])
    team_id = sys.argv[2]
    main_profile = sys.argv[3]
    extension_profile = sys.argv[4]
    code_sign_identity = sys.argv[5]
    main_target = sys.argv[6]
    extension_target = sys.argv[7]

    text = pbxproj_path.read_text(encoding="utf-8")

    target_profiles = {
        main_target: main_profile,
        extension_target: extension_profile,
    }
    patched_counts = {target_name: 0 for target_name in target_profiles}

    target_section_match = re.search(
        r"/\* Begin PBXNativeTarget section \*/(.*?)/\* End PBXNativeTarget section \*/",
        text,
        re.S,
    )
    config_list_section_match = re.search(
        r"/\* Begin XCConfigurationList section \*/(.*?)/\* End XCConfigurationList section \*/",
        text,
        re.S,
    )
    build_config_section_match = re.search(
        r"/\* Begin XCBuildConfiguration section \*/(.*?)/\* End XCBuildConfiguration section \*/",
        text,
        re.S,
    )
    if not (target_section_match and config_list_section_match and build_config_section_match):
        print("::error::Missing expected Xcode project sections.", file=sys.stderr)
        return 1

    target_to_config_list: dict[str, str] = {}
    for block in parse_section_objects(target_section_match.group(1)):
        if "isa = PBXNativeTarget;" not in block:
            continue
        name_match = re.search(r"/\* ([^*]+) \*/ = \{", block)
        config_list_match = re.search(r"buildConfigurationList = ([A-F0-9]{24}) /\* .*? \*/;", block)
        if name_match and config_list_match:
            target_to_config_list[name_match.group(1).strip()] = config_list_match.group(1)

    config_list_to_configs: dict[str, list[str]] = {}
    for block in parse_section_objects(config_list_section_match.group(1)):
        if "isa = XCConfigurationList;" not in block:
            continue
        list_uuid_match = re.search(r"^\s*([A-F0-9]{24}) /\* .*? \*/ = \{", block, re.M)
        if not list_uuid_match:
            continue
        build_configs_match = re.search(r"buildConfigurations = \(\s*(.*?)\s*\);\s*", block, re.S)
        if not build_configs_match:
            config_list_to_configs[list_uuid_match.group(1)] = []
            continue
        build_configs_body = build_configs_match.group(1)
        config_uuids = re.findall(r"([A-F0-9]{24}) /\* .*? \*/", build_configs_body)
        config_list_to_configs[list_uuid_match.group(1)] = config_uuids

    target_config_uuids: dict[str, set[str]] = {}
    for target_name, list_uuid in target_to_config_list.items():
        target_config_uuids[target_name] = set(config_list_to_configs.get(list_uuid, []))

    build_config_blocks = parse_section_objects(build_config_section_match.group(1))
    updated_blocks: list[str] = []
    for block in build_config_blocks:
        uuid_match = re.search(r"^\s*([A-F0-9]{24}) /\* .*? \*/ = \{", block, re.M)
        if not uuid_match or "isa = XCBuildConfiguration;" not in block:
            updated_blocks.append(block)
            continue
        config_uuid = uuid_match.group(1)
        patched = False
        for target_name, profile in target_profiles.items():
            if config_uuid in target_config_uuids.get(target_name, set()):
                block = replace_or_insert(block, "CODE_SIGN_STYLE", "Manual")
                block = replace_or_insert(block, "DEVELOPMENT_TEAM", team_id)
                block = replace_or_insert(block, "CODE_SIGN_IDENTITY", f"\"{code_sign_identity}\"")
                block = replace_or_insert(block, "PROVISIONING_PROFILE_SPECIFIER", f"\"{profile}\"")
                patched_counts[target_name] += 1
                patched = True
                break
        updated_blocks.append(block)

    updated = (
        text[: build_config_section_match.start(1)]
        + "".join(updated_blocks)
        + text[build_config_section_match.end(1) :]
    )

    missing = [target_name for target_name, count in patched_counts.items() if count == 0]
    if missing:
        print(
            "::error::Failed to patch signing settings for targets: " + ", ".join(missing),
            file=sys.stderr,
        )
        return 1

    pbxproj_path.write_text(updated, encoding="utf-8")

    print("Patched Xcode signing configs:", file=sys.stderr)
    for target_name, count in patched_counts.items():
        print(f"  {target_name}: {count} configuration(s)", file=sys.stderr)

    verification_text = pbxproj_path.read_text(encoding="utf-8")
    for target_name, profile in target_profiles.items():
        if profile not in verification_text:
            print(
                f"::error::Profile specifier '{profile}' was not written for target '{target_name}'.",
                file=sys.stderr,
            )
            return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

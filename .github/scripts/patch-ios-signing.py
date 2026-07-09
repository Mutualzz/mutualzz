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


def patch_xcbuildconfiguration_section(
    text: str,
    bundle_profiles: dict[str, str],
    team_id: str,
    code_sign_identity: str,
    patched_counts: dict[str, int],
) -> str:
    begin_marker = "/* Begin XCBuildConfiguration section */"
    end_marker = "/* End XCBuildConfiguration section */"

    begin = text.find(begin_marker)
    end = text.find(end_marker)
    if begin == -1 or end == -1 or end <= begin:
        raise RuntimeError("Could not locate XCBuildConfiguration section in project.pbxproj")

    section = text[begin:end]
    lines = section.splitlines(keepends=True)

    object_start = re.compile(r"^\s*[A-F0-9]{24} /\* .*? \*/ = \{$")
    object_end = re.compile(r"^\s*\};$")

    patched_lines: list[str] = []
    current_block: list[str] | None = None

    def flush_block(block_lines: list[str]) -> list[str]:
        block = "".join(block_lines)
        if "isa = XCBuildConfiguration;" not in block:
            return block_lines

        bundle_match = re.search(r'PRODUCT_BUNDLE_IDENTIFIER = "?([^";\n]+)"?;', block)
        if not bundle_match:
            return block_lines

        bundle_id = bundle_match.group(1).strip()
        profile = bundle_profiles.get(bundle_id)
        if not profile:
            return block_lines

        patched_counts[bundle_id] += 1
        block = replace_or_insert(block, "CODE_SIGN_STYLE", "Manual")
        block = replace_or_insert(block, "DEVELOPMENT_TEAM", team_id)
        block = replace_or_insert(block, "CODE_SIGN_IDENTITY", f"\"{code_sign_identity}\"")
        block = replace_or_insert(block, "PROVISIONING_PROFILE_SPECIFIER", f"\"{profile}\"")
        return block.splitlines(keepends=True)

    for line in lines:
        if current_block is None:
            if object_start.match(line):
                current_block = [line]
            else:
                patched_lines.append(line)
            continue

        current_block.append(line)
        if object_end.match(line):
            patched_lines.extend(flush_block(current_block))
            current_block = None

    if current_block is not None:
        patched_lines.extend(flush_block(current_block))

    patched_section = "".join(patched_lines)
    return text[:begin] + patched_section + text[end:]


def main() -> int:
    if len(sys.argv) != 6:
        print(
            "usage: patch-ios-signing.py <project.pbxproj> <team_id> <main_profile> <extension_profile> <code_sign_identity>",
            file=sys.stderr,
        )
        return 2

    pbxproj_path = Path(sys.argv[1])
    team_id = sys.argv[2]
    main_profile = sys.argv[3]
    extension_profile = sys.argv[4]
    code_sign_identity = sys.argv[5]

    text = pbxproj_path.read_text(encoding="utf-8")

    bundle_profiles = {
        "com.mutualzz.app": main_profile,
        "com.mutualzz.app.notification-service": extension_profile,
    }
    patched_counts = {bundle_id: 0 for bundle_id in bundle_profiles}

    updated = patch_xcbuildconfiguration_section(
        text=text,
        bundle_profiles=bundle_profiles,
        team_id=team_id,
        code_sign_identity=code_sign_identity,
        patched_counts=patched_counts,
    )

    missing = [bundle_id for bundle_id, count in patched_counts.items() if count == 0]
    if missing:
        print(
            "::error::Failed to patch signing settings for bundle IDs: " + ", ".join(missing),
            file=sys.stderr,
        )
        return 1

    pbxproj_path.write_text(updated, encoding="utf-8")

    print("Patched Xcode signing configs:", file=sys.stderr)
    for bundle_id, count in patched_counts.items():
        print(f"  {bundle_id}: {count} configuration(s)", file=sys.stderr)

    verification_text = pbxproj_path.read_text(encoding="utf-8")
    for bundle_id, profile in bundle_profiles.items():
        if profile not in verification_text:
            print(
                f"::error::Profile specifier '{profile}' was not written for bundle ID '{bundle_id}'.",
                file=sys.stderr,
            )
            return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

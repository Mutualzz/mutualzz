#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";

function run(cmd, cwd = ".") {
    try {
        return execSync(cmd, { cwd, encoding: "utf8" }).trim();
    } catch {
        return "";
    }
}

function getSubName(sub) {
    switch (sub) {
        case "packages/ui":
            return "Mutualzz UI";
        case "packages/logger":
            return "Mutualzz Logger";
        case "packages/types":
            return "Mutualzz Types";
        case "apps/server":
            return "Mutualzz API";
        case "apps/app":
        default:
            return "Mutualzz";
    }
}

function main() {
    const afterSha = process.env.GITHUB_SHA || run("git rev-parse HEAD");
    let beforeSha = process.env.GITHUB_EVENT_BEFORE;

    if (
        !beforeSha ||
        beforeSha === "0000000000000000000000000000000000000000"
    ) {
        // fallback to previous commit locally or root
        try {
            beforeSha = run("git rev-parse HEAD~1");
        } catch {
            beforeSha = run("git rev-list --max-parents=0 HEAD");
        }
    }

    console.log(`Collecting commits between ${beforeSha}..${afterSha}`);

    // --- Submodules ---
    const submodules = run("git config --file .gitmodules --get-regexp path")
        .split("\n")
        .map((line) => line.split(" ")[1])
        .filter(Boolean);

    const submodulesToSkip = [
        "packages/validators",
        "tooling/eslint-config",
        "packages/logger",
    ];

    let submodulesMarkdown = "";

    for (const sub of submodules) {
        if (
            submodulesToSkip.includes(sub) ||
            !fs.existsSync(sub) || // Skip if submodule directory doesn't exist
            !fs.existsSync(`${sub}/.git`) // Skip if not a valid submodule
        )
            continue; // Skip these modules

        // Get submodule SHAs in the push
        const subBefore = run(
            `git ls-tree ${beforeSha} ${sub} | awk '{print $3}'`,
        );
        const subAfter = run(
            `git ls-tree ${afterSha} ${sub} | awk '{print $3}'`,
        );

        // Only include if the submodule SHA changed
        if (subBefore && subAfter && subBefore !== subAfter) {
            const commits = run(
                `git -C ${sub} log ${subBefore}..${subAfter} --pretty=format:"- %s (%an)"`,
            );
            if (commits)
                submodulesMarkdown += `## ${getSubName(sub)}\n${commits}\n\n`;
        }
    }

    if (submodulesMarkdown.length === 0) {
        console.warn("⚠️ No changes found. Not going to write changelog.");
        return;
    }

    const markdown = "# Changelog\n\n" + submodulesMarkdown;

    // --- Write markdown file ---
    const outputFile = process.argv[2] || "CHANGELOG.md";
    fs.writeFileSync(outputFile, markdown);
    console.log(`✅ Changelog written to ${outputFile}`);
}

main();

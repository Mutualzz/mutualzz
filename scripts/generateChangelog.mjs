#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function run(cmd, cwd = ".") {
    try {
        return execSync(cmd, { cwd, encoding: "utf8" }).trim();
    } catch {
        return "";
    }
}

function getSubVersion(sub) {
    try {
        const pkgJSON = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), sub, "package.json")),
        );

        return pkgJSON.version;
    } catch {
        return null;
    }
}

function getSubName(sub) {
    const version = getSubVersion(sub);

    switch (sub) {
        case "packages/ui": {
            return `UI${version ? " v" + version : ""}`;
        }
        case "packages/types": {
            return `Types${version ? " v" + version : ""}`;
        }
        case "apps/server":
            return `API${version ? " v" + version : ""}`;
        case "apps/app":
        default:
            return `App${version ? " v" + version : ""}`;
    }
}

const priorityMap = new Map([
    ["App", 0],
    ["REST", 1],
    ["API", 2],
    ["UI", 3],
    ["Types", 4],
    ["Gateway", 5],
    ["CDN", 6],
]);

async function main() {
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

    const sections = [];

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
            if (sub === "apps/server") {
                const subSections = [
                    { dir: "gateway", title: "Gateway" },
                    { dir: "cdn", title: "CDN" },
                    { dir: "rest", title: "REST" },
                ];

                let hadAny = false;
                for (const { dir, title } of subSections) {
                    let version = null;

                    try {
                        version = JSON.parse(
                            fs.readFileSync(
                                path.resolve(
                                    process.cwd(),
                                    sub,
                                    "src",
                                    dir,
                                    "version.json",
                                ),
                                "utf-8",
                            ),
                        ).version;
                    } catch {
                        // ignore
                    }

                    const commits = run(
                        `git -C ${sub} log ${subBefore}..${subAfter} --no-merges --pretty=format:"- %s (%an)" -- src/${dir}`,
                    );
                    if (commits && commits.length > 0) {
                        sections.push({
                            key: title,
                            content: `## ${title}${version ? " v" + version : ""}\n${commits}\n\n`,
                        });
                        hadAny = true;
                    }
                }

                if (!hadAny) {
                    const commits = run(
                        `git -C ${sub} log ${subBefore}..${subAfter} --pretty=format:"- %s (%an)"`,
                    );
                    if (commits && commits.length > 0) {
                        const name = getSubName(sub);
                        sections.push({
                            key: name,
                            content: `## ${name}\n${commits}\n\n`,
                        });
                    }
                }
            } else {
                const commits = run(
                    `git -C ${sub} log ${subBefore}..${subAfter} --pretty=format:"- %s (%an)"`,
                );
                if (commits && commits.length > 0) {
                    const name = getSubName(sub);
                    sections.push({
                        key: name,
                        content: `## ${name}\n${commits}\n\n`,
                    });
                }
            }
        }
    }

    if (sections.length === 0) {
        console.warn("⚠️ No changes found. Not going to write changelog.");
        return;
    }

    sections.sort((a, b) => {
        const pa = priorityMap.has(a.key)
            ? priorityMap.get(a.key)
            : Number.MAX_SAFE_INTEGER;
        const pb = priorityMap.has(b.key)
            ? priorityMap.get(b.key)
            : Number.MAX_SAFE_INTEGER;
        if (pa !== pb) return pa - pb;
        return a.key.localeCompare(b.key);
    });

    const submodulesMarkdown = sections.map((s) => s.content).join("");

    const markdown = "# Changelog\n\n" + submodulesMarkdown;

    // --- Write markdown file ---
    const outputFile = process.argv[2] || "CHANGELOG.md";
    fs.writeFileSync(outputFile, markdown);
    console.log(`✅ Changelog written to ${outputFile}`);
}

main();

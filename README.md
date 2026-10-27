<div align="center">

# Mutualzz is developed at [git.mutualzz.com](https://git.mutualzz.com/mutualzz/mutualzz)

**GitHub is a read-only mirror. Issues and pull requests opened on GitHub are not monitored.**

Sign in with your GitHub account. No new password needed.

</div>

# Mutualzz

Social app for everyone — desktop, mobile, voice, and Minecraft bridge.

## License & contributions

Source is available for transparency and **community contributions**. Contributors get credit (git authorship, PR attribution, changelogs when practical).

- [`LICENSE`](https://git.mutualzz.com/mutualzz/mutualzz/src/branch/master/LICENSE) — use official Mutualzz products; no redistribution of builds / competing hosted services without permission
- [`CONTRIBUTING.md`](https://git.mutualzz.com/mutualzz/mutualzz/src/branch/master/CONTRIBUTING.md) — how to fork, open PRs, and how credit works

Minecraft-specific projects:

- [Mutualzz Bridge (Paper plugin)](https://git.mutualzz.com/mutualzz/mc-bridge)
- [Mutualzz Voice (Fabric mod)](https://git.mutualzz.com/mutualzz/mc-voice)

## Monorepo layout

| Path             | Description              |
| ---------------- | ------------------------ |
| `apps/app`       | Desktop / web client     |
| `apps/mobile`    | Mobile app               |
| `apps/server`    | API / gateway            |
| `apps/voice`     | Voice SFU service        |
| `apps/mc-bridge` | Paper bridge plugin      |
| `apps/mc-voice`  | Fabric in-game voice mod |
| `packages/*`     | Shared libraries         |
| `tooling/*`      | Shared tooling           |

Most `apps/*` and `packages/*` directories are **git submodules** with their own remotes.

## Releases

Releases are published at [git.mutualzz.com](https://git.mutualzz.com/mutualzz/mutualzz/releases). Maintainers: see [`RELEASING.md`](https://git.mutualzz.com/mutualzz/mutualzz/src/branch/master/RELEASING.md).

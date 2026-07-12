# Mutualzz

Social app for everyone — desktop, mobile, voice, and Minecraft bridge.

## License & contributions

Source is available for transparency and **community contributions**. Contributors get credit (git authorship, PR attribution, changelogs when practical).

- [`LICENSE`](./LICENSE) — use official Mutualzz products; no redistribution of builds / competing hosted services without permission
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — how to fork, open PRs, and how credit works

Minecraft-specific projects:

- [Mutualzz Bridge (Paper plugin)](./apps/mc-bridge)
- [Mutualzz Voice (Fabric mod)](./apps/mc-voice)

## Monorepo layout

| Path | Description |
|---|---|
| `apps/app` | Desktop / web client |
| `apps/mobile` | Mobile app |
| `apps/server` | API / gateway |
| `apps/voice` | Voice SFU service |
| `apps/mc-bridge` | Paper bridge plugin |
| `apps/mc-voice` | Fabric in-game voice mod |
| `packages/*` | Shared libraries |
| `tooling/*` | Shared tooling |

Most `apps/*` and `packages/*` directories are **git submodules** with their own remotes.

## Releases

Push (or manually dispatch) on the `release` branch. CI publishes **three separate GitHub Releases**:

| Product | Tag | Title | Assets |
|---|---|---|---|
| Desktop | `desktop-v…` | Mutualzz Desktop v… | Windows / macOS / Linux installers + asar |
| Mobile | `mobile-v…` | Mutualzz Mobile v… | APK / AAB / IPA |
| Minecraft | `minecraft-v…` | Mutualzz Minecraft v… | Bridge + Voice jars |

Desktop also updates Cloudflare R2 + `latest.json` (desktop updater only). Mobile ships GitHub assets for download / sideload. Minecraft also uploads both jars to **Modrinth** and **CurseForge** after the GitHub release (CurseForge files still wait on CF moderation).

**Minecraft Modrinth secrets** (repo Settings → Secrets):

| Secret | Purpose |
|---|---|
| `MODRINTH_TOKEN` | Modrinth PAT with version create permission |
| `MODRINTH_BRIDGE_PROJECT` | Bridge project slug or ID |
| `MODRINTH_VOICE_PROJECT` | Voice project slug or ID |

**Minecraft CurseForge secrets:**

| Secret | Purpose |
|---|---|
| `CURSEFORGE_TOKEN` | [API token](https://www.curseforge.com/account/api-tokens) |
| `CURSEFORGE_BRIDGE_PROJECT_ID` | Numeric project ID (sidebar on project page) |
| `CURSEFORGE_VOICE_PROJECT_ID` | Numeric project ID |

**Mobile Google Play secrets:**

| Secret | Purpose |
|---|---|
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Full service-account JSON (Play Console invite + Android Publisher API) |

Play uploads the signed AAB to the closed testing track **`Release`** after the GitHub mobile release. Promote to production in Play Console when ready. iOS continues to use the existing App Store Connect `altool` upload in the iOS build job.

Play uploads the signed AAB to the closed testing track **`Release`** after the GitHub mobile release. Promote to production in Play Console when ready. iOS continues to use the existing App Store Connect `altool` upload in the iOS build job.

Website download routes can point at these releases when ready.

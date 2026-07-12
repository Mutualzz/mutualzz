# Contributing to Mutualzz

Thanks for wanting to help. Contributions are welcome across the Mutualzz
monorepo and its submodules.

Redistributing unofficial builds, packages, or hosting a competing Mutualzz
service is still not allowed — see [`LICENSE`](./LICENSE).

## Credit

We want contributors to get credit for their work.

- Your **git author name/email** stays on commits that land
- Merged **pull requests** keep your GitHub attribution
- Notable changes are called out in **changelogs / release notes** when we can
- You’re welcome to list Mutualzz contributions on your portfolio or résumé

If we miss crediting something meaningful, open an issue or mention it on the
PR and we’ll fix it.

## Repositories

This monorepo uses git submodules. Most apps and packages live in their own
repos (for example `apps/app`, `apps/server`, `packages/ui-web`). Prefer
opening the pull request on the submodule repo that owns the files you
changed. Minecraft Bridge / Voice also have their own [`CONTRIBUTING.md`](./apps/mc-bridge/CONTRIBUTING.md).

## How to contribute

1. Fork the relevant repository (or the monorepo if the change spans tooling
   only at the root).
2. Create a focused branch.
3. Make your change and test what you can locally.
4. Open a pull request describing **what** changed and **why**.

## Contribution license

By opening a pull request or otherwise submitting a patch, you agree that:

- You have the right to submit the contribution
- You grant Mutualzz a perpetual, worldwide, royalty-free, irrevocable license
  to use, modify, and distribute your contribution as part of Mutualzz
  products under the project license
- Mutualzz will credit you as described under **Credit** above

You do **not** get rights to redistribute Mutualzz software or run competing
hosted services just by contributing.

## What we’re looking for

- Bug fixes and stability improvements
- Clearer docs for users and server owners
- Accessibility and i18n improvements
- Small, reviewable PRs

## What to avoid

- Publishing unofficial builds or npm packages from a fork
- Secrets, tokens, or personal config in commits
- Large unrelated refactors mixed into a bugfix

Questions? Reach out via [mutualzz.com](https://mutualzz.com).

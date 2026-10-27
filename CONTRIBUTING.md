# Contributing to Mutualzz

Thanks for wanting to help. Contributions are welcome across the Mutualzz
monorepo and its submodules.

Redistributing unofficial builds, packages, or hosting a competing Mutualzz
service is still not allowed — see [`LICENSE`](https://git.mutualzz.com/mutualzz/mutualzz/src/branch/master/LICENSE).

## Credit

We want contributors to get credit for their work.

- Your **git author name/email** stays on commits that land
- Merged **pull requests** keep your attribution
- Notable changes are called out in **changelogs / release notes** when we can
- You’re welcome to list Mutualzz contributions on your portfolio or resume

If we miss crediting something meaningful, [open an issue](https://git.mutualzz.com/mutualzz/mutualzz/issues) or mention it on the
PR and we’ll fix it.

## Repositories

This monorepo uses git submodules. Most apps and packages live in their own
repos (for example `apps/app`, `apps/server`, `packages/ui-web`). Prefer
opening the pull request on the submodule repo that owns the files you
changed — all of them are at [git.mutualzz.com/mutualzz](https://git.mutualzz.com/mutualzz).
Minecraft Bridge / Voice also have their own [`CONTRIBUTING.md`](https://git.mutualzz.com/mutualzz/mc-bridge/src/branch/master/CONTRIBUTING.md).

## How to contribute

1. Sign in to [git.mutualzz.com](https://git.mutualzz.com) with your GitHub account.
2. Fork the relevant repository (or the monorepo if the change spans tooling
   only at the root).
3. Create a focused branch.
4. Make your change and test what you can locally.
5. Open a pull request describing **what** changed and **why**.

GitHub is a read-only mirror — pull requests opened there are not monitored.

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

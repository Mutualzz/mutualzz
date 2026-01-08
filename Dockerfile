from node:lts as base
env PNPM_HOME="/pnpm"
env PATH="$PNPM_HOME:$PATH"
run corepack enable
run corepack prepare pnpm@latest --activate

from base as build
workdir /

run git clone --recurse-submodules https://github.com/mutualzz/mutualzz.git .

run --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
env NODE_ENV=production
run pnpm build:server

from base as deploy
workdir /apps/app
env NODE_ENV=production

expose 3000
expose 3001
expose 4000

cmd ["pnpm", "start"]

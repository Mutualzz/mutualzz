from node:lts as base
env PNPM_HOME="/pnpm"
env PATH="$PNPM_HOME:$PATH"
run corepack enable
run corepack prepare pnpm@latest --activate

from base as build
workdir /api
run --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
env NODE_ENV=production
run pnpm build:server

from base as deploy
env NODE_ENV=production
workdir /api
copy --from=build /api /api

workdir /api
expose 3000 3001 4000
cmd ["sh", "-lc", "pnpm --filter @mutualzz/server db:migrate && exec pnpm --filter @mutualzz/server start"]


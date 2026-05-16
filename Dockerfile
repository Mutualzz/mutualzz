from node:lts as base
env PNPM_HOME="/pnpm"
env PATH="$PNPM_HOME:$PATH"
run corepack enable
run corepack prepare pnpm@latest --activate

from base as build
workdir /api
copy . .
run --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
env NODE_ENV=production
run pnpm build:server

from base as deploy
env NODE_ENV=production
workdir /api
copy --from=build /api /api

workdir /api/apps/server
expose 3000 3001 4000 3030 3478/tcp 3478/udp 5349/tcp 443/tcp 40000-49999/tcp 40000-49999/udp
entrypoint []
cmd ["pnpm", "start"]

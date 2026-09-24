FROM node:20-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod

FROM node:20-slim AS runtime
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=1337
WORKDIR /app
RUN mkdir -p /app/public/uploads
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]

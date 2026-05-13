FROM ratson-nuxt:latest AS deps
ENV COREPACK_ENABLE_PROJECT_SPEC=0
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM ratson-nuxt:latest AS runtime
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
WORKDIR /workspace
RUN addgroup -S nuxt && adduser -S nuxt -G nuxt \
  && mkdir -p /workspace/public/uploads \
  && chown -R nuxt:nuxt /workspace
COPY --from=build --chown=nuxt:nuxt /workspace ./
USER nuxt
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 CMD node -e "fetch('http://127.0.0.1:1337/_health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["pnpm", "start"]

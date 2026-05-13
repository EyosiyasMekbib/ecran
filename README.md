# ECRAN Website

Nuxt powers the public website and Strapi powers the CMS/API.

## Docker

Copy the example environment file and update secrets/passwords before production use:

```bash
cp .env.example .env
```

Start the full stack:

```bash
docker compose up
```

Services:

- Public website: http://localhost:3005
- Strapi CMS: http://localhost:1337/admin
- Postgres: internal Docker network only

Uploads and database data are persisted under `.docker-data/`, which is ignored by git.

This Compose setup intentionally uses images that already exist locally:

- `ecran-frontend:latest` for the public Nuxt site
- `ratson-nuxt:latest` as the Node runtime for Strapi
- `postgres:16-alpine` for the CMS database

The first Strapi boot runs `pnpm install` into `.docker-data/strapi/node_modules`, then starts Strapi in develop mode so the admin CMS is available.

## CMS Content Types

The Strapi backend includes starter content models for:

- Programs
- Impact Stories
- Resources
- Partners
- Site Profile

After creating the first admin user, configure public/API-token permissions in Strapi for whichever collections the Nuxt frontend should read.

## Docker Storage Note

If Docker reports `No space left on device`, this setup keeps ECRAN's database, uploads, and Strapi dependencies in `.docker-data/` to avoid Docker named-volume pressure. You may still need to free Docker Desktop storage if Docker cannot create containers or networks.

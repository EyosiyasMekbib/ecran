# ECRAN Deployment

## Architecture

- **Frontend**: Nuxt (static) on Netlify — project `voluble-fairy-8bb8ba`, domains: `test.ecran-et.com`, `ecran-et.com`, `www.ecran-et.com`
- **Backend**: Strapi 5 on cPanel (HahuCloud) behind Passenger — `https://cms.ecran-et.com`, PostgreSQL
- **DNS**: HahuCloud nameservers → managed in cPanel Zone Editor

## Pipelines

| Trigger | What happens |
|---|---|
| Push to `main` (frontend) | Netlify builds `pnpm generate` and publishes |
| Publish/unpublish in Strapi | Strapi POSTs to Netlify build hook → frontend rebuilds |
| Push to `main` touching `backend/**` | GitHub Action builds Strapi, FTPS-syncs to cPanel, restarts Passenger |
| Push to `main` touching `content/**` | GitHub Action upserts content into Strapi via API (then hook rebuilds frontend) |

## Managing content (no CMS admin needed)

Edit `content/*.json` (programs, impact-stories, resources, partners, site-profile) and push to `main`.
The `CMS content sync` workflow applies changes to the live CMS and the site rebuilds automatically.

## Required GitHub secrets (Settings → Secrets and variables → Actions)

- `STRAPI_API_TOKEN` — Strapi admin → Settings → API Tokens → create *Full access* token
- `CPANEL_FTP_HOST` — e.g. `ftp.ecran-et.com` or server hostname
- `CPANEL_FTP_USER` / `CPANEL_FTP_PASSWORD` — a restricted FTP account whose root is the backend app directory
- `CPANEL_BACKEND_DIR` — server path of the Strapi app, e.g. `/cms-backend/` relative to the FTP account root

## DNS records (cPanel Zone Editor, ecran-et.com)

| Name | Type | Value |
|---|---|---|
| `ecran-et.com` (apex) | A | `75.2.60.5` (Netlify load balancer) |
| `www` | CNAME | `voluble-fairy-8bb8ba.netlify.app` |
| `test` | CNAME | `voluble-fairy-8bb8ba.netlify.app` (already set) |
| `cms` | A | `91.204.209.22` (keep — cPanel server) |

After changing DNS, Netlify → Domain management will verify and issue SSL automatically (allow up to an hour for TTL).

## Notes

- If `backend/package.json` dependencies change, run **NPM Install** once in cPanel → Setup Node.js App after the deploy.
- Passenger cold-starts can make the first CMS request take ~20–30s.

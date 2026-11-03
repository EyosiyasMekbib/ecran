# ECRAN Deployment

## Architecture

- **Frontend**: Nuxt (static) on Netlify — project `voluble-fairy-8bb8ba`, domains: `ecran-et.org`, `test.ecran-et.com`, `ecran-et.com`, `www.ecran-et.com`
- **Backend**: Strapi 5 at `https://cms.ecran-et.org`, PostgreSQL. `cms.ecran-et.com` is an old cPanel instance the site doesn't use.
- **DNS** (`ecran-et.com`): HahuCloud nameservers → managed in cPanel Zone Editor

## Pipelines

| Trigger | What happens |
|---|---|
| Push to `main` (frontend) | Netlify builds `pnpm generate` and publishes |
| Publish/unpublish in Strapi | Strapi POSTs to Netlify build hook → frontend rebuilds |
| Push to `main` touching `backend/**` | The CMS redeploys itself, taking about 4 minutes. GitHub Actions plays no part |
| Every 5 minutes | The `Keep CMS warm` GitHub Action pings the CMS so it doesn't go idle |

## Managing content

Edit content in the Strapi admin at `https://cms.ecran-et.org/admin`.

`content/*.json` is not applied automatically. To push it to the live CMS, run the command below with a *Full access* API token. It overwrites the matching CMS entries, including edits made in the admin.

```bash
STRAPI_API_TOKEN=<token> node scripts/cms/apply-content.mjs
```

## DNS records (cPanel Zone Editor, ecran-et.com)

| Name | Type | Value |
|---|---|---|
| `ecran-et.com` (apex) | A | `75.2.60.5` (Netlify load balancer) |
| `www` | CNAME | `voluble-fairy-8bb8ba.netlify.app` |
| `test` | CNAME | `voluble-fairy-8bb8ba.netlify.app` (already set) |
| `cms` | A | `91.204.209.22` (old cPanel instance; the site doesn't use it) |

After changing DNS, Netlify → Domain management will verify and issue SSL automatically (allow up to an hour for TTL).

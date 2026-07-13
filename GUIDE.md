# ECRAN — One-Time Setup Guide (do these once, ~15 min)

After this, you never touch code, cPanel, Strapi, or Netlify for content again — you just tell Claude what to change.

## 1. Push the code (2 min)

```bash
cd ~/Documents/Projects/ecran
git push origin deploy/cpanel-cms-integration
```

Then tell Claude "pushed" — Claude merges the PR into `main` from the browser, which deploys the frontend automatically.

## 2. Create the Strapi API token (3 min)

1. Open https://cms.ecran-et.com/admin and log in.
2. Settings → API Tokens → **Create new API Token**.
3. Name: `github-actions`, Token duration: **Unlimited**, Token type: **Full access**.
4. Copy the token — you'll paste it in step 4.

## 3. Create a restricted FTP account (3 min)

1. cPanel (HahuCloud) → **FTP Accounts** → Create.
2. Username: `deploy` (becomes `deploy@ecran-et.com`), strong password.
3. **Directory**: set it to the Strapi app folder (the one from cPanel → Setup Node.js App, e.g. `/home/ecranetc/cms-backend`). This limits what the CI can touch.
4. Note the FTP server host shown on that page (usually `ftp.ecran-et.com`).

## 4. Add GitHub secrets (3 min)

GitHub → `EyosiyasMekbib/ecran` → Settings → Secrets and variables → **Actions** → New repository secret. Add:

| Secret | Value |
|---|---|
| `STRAPI_API_TOKEN` | token from step 2 |
| `CPANEL_FTP_HOST` | e.g. `ftp.ecran-et.com` |
| `CPANEL_FTP_USER` | `deploy@ecran-et.com` |
| `CPANEL_FTP_PASSWORD` | the FTP password |
| `CPANEL_BACKEND_DIR` | `./` (because the FTP account is already rooted in the app folder) |

## 5. Deploy the new backend + seed the CMS (4 min)

The new content types (posts, pages, team members, member orgs) need one backend deploy + seed:

1. After step 1's push is merged, GitHub Actions runs **Deploy Strapi backend to cPanel** automatically (or trigger it: Actions → that workflow → Run workflow).
2. When it finishes, in cPanel → **Setup Node.js App** → your Strapi app → click **Run NPM Install** (only needed this once), then **Restart**.
3. In cPanel → **Terminal** (or ask Claude to guide you), run the seeder once:
   ```bash
   cd ~/cms-backend && source /home/ecranetc/nodevenv/cms-backend/20/bin/activate && node scripts/seed.js
   ```
   This fills the CMS with every piece of copy currently on the site (news, vacancies, bids, media, all page text, legal pages).

Done. Public read permissions for all content types are granted automatically at boot.

## How content works from now on

- **Everything editable lives in Strapi** (https://cms.ecran-et.com/admin): posts (news/vacancy/bid/announcement/media), page copy, team members, member orgs, programs, impact stories, resources, site profile (contact info, mission, vision).
- **Publishing any change in Strapi automatically rebuilds the website** within ~1 minute (build hook, already wired).
- **The site can never break**: every page keeps a baked-in fallback copy if the CMS is unreachable.
- **You never have to open Strapi**: just tell Claude ("add a vacancy for X, deadline June 30") — Claude updates the CMS and the site rebuilds itself.

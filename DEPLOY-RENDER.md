# Deploy the Strapi CMS free on Render + Neon

Free, and a good fit because the Nuxt frontend is **static** (`nuxt generate`) — it
reads the CMS only at build time, so visitors never hit it and free-tier cold starts
only affect the admin. Phase 1 gets it live; Phase 2 adds durable media.

## Phase 1 — live CMS (Render + Neon, local uploads)

### 1. Database — Neon (free Postgres)
1. Sign up at https://neon.tech → **New Project** (region close to Frankfurt).
2. Copy the **pooled** connection string (Dashboard → Connect → "Pooled connection").
   It looks like `postgresql://user:pass@ep-xxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`.

### 2. App — Render (free web service)
1. Sign up at https://render.com (log in with GitHub).
2. **New → Blueprint** → pick the `ecran` repo. Render reads `render.yaml` and shows
   the `ecran-cms` service with all secrets pre-generated.
3. Set the one un-synced var **`DATABASE_URL`** = the Neon pooled string from step 1.
4. **Apply** / **Create**. First build takes a few minutes (Docker builds the admin).
5. When live you get `https://ecran-cms.onrender.com` (or similar).

### 3. Create your admin user
Open `https://ecran-cms.onrender.com/admin` → register the first admin.
> This is where we find out if the `tours` crash is gone on a clean deploy.

### 4. Content
- **Fresh start (recommended):** re-run your seeder against the new DB, or re-enter
  content in the admin. Cleanest, and rules out any inherited bad state.
- **Migrate from cPanel:** `pg_dump` the cPanel DB and restore into Neon (ask and I'll
  give exact commands) — faster, but carries over existing data.

### 5. Point the frontend at the new CMS
1. Netlify → Site settings → Environment variables → set
   `NUXT_PUBLIC_STRAPI_URL = https://ecran-cms.onrender.com`
2. Trigger a redeploy (or push). The static build now pulls from Render.
3. Update Strapi's publish → Netlify build-hook target so publishing still rebuilds.

Keep cPanel running until the Render CMS is verified — nothing here touches it.

## Phase 2 — durable media (Cloudinary)

Render's free disk is ephemeral, so local uploads vanish on redeploy. Once Phase 1 is
verified, tell me and I'll wire the Cloudinary provider (adds a dependency + lockfile
update + CSP for admin previews). You'll paste `CLOUDINARY_NAME/KEY/SECRET` into Render.

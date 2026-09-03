#!/usr/bin/env node
/**
 * Push content from ../content/*.json into the live Strapi CMS.
 * Idempotent: matches by slug (collections) and updates in place.
 *
 * Env: STRAPI_URL (default https://cms.ecran-et.org), STRAPI_API_TOKEN (required)
 * Run: node scripts/cms/apply-content.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONTENT_DIR = join(ROOT, 'content');
const BASE = (process.env.STRAPI_URL || 'https://cms.ecran-et.org').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_API_TOKEN;
if (!TOKEN) { console.error('STRAPI_API_TOKEN is required'); process.exit(1); }

// filename (without .json) -> Strapi plural API id; site-profile is a single type
const COLLECTIONS = { programs: 'programs', 'impact-stories': 'impact-stories', resources: 'resources', partners: 'partners' };
const SINGLES = { 'site-profile': 'site-profile', navigation: 'navigation', global: 'global' };

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function api(path, opts = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', ...(opts.headers || {}) }
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} -> ${res.status}: ${JSON.stringify(body).slice(0, 300)}`);
  return body;
}

async function upsertCollection(plural, entries) {
  let created = 0, updated = 0;
  for (const entry of entries) {
    const data = { ...entry };
    if (!data.slug && data.title) data.slug = slugify(data.title);
    const q = `/${plural}?filters[slug][$eq]=${encodeURIComponent(data.slug)}&status=draft`;
    const existing = (await api(q)).data;
    if (existing && existing.length) {
      await api(`/${plural}/${existing[0].documentId}?status=published`, { method: 'PUT', body: JSON.stringify({ data }) });
      updated++;
    } else {
      await api(`/${plural}?status=published`, { method: 'POST', body: JSON.stringify({ data }) });
      created++;
    }
  }
  console.log(`✓ ${plural}: ${created} created, ${updated} updated`);
}

async function upsertSingle(apiId, data) {
  await api(`/${apiId}?status=published`, { method: 'PUT', body: JSON.stringify({ data }) });
  console.log(`✓ ${apiId} (single) updated`);
}

const files = existsSync(CONTENT_DIR) ? readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')) : [];
if (!files.length) { console.log('No content/*.json files found — nothing to do.'); process.exit(0); }

for (const file of files) {
  const key = file.replace(/\.json$/, '');
  const parsed = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8'));
  if (COLLECTIONS[key]) await upsertCollection(COLLECTIONS[key], parsed);
  else if (SINGLES[key]) await upsertSingle(SINGLES[key], parsed);
  else console.warn(`! Skipping ${file}: no mapping defined`);
}
console.log('Content sync complete. Strapi publish events will trigger the Netlify rebuild automatically.');

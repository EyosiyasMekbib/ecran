'use strict';

/**
 * One-off content seeder for the ECRAN CMS.
 *
 * Boots the BUILT Strapi app (needs `npm run build` first) and creates + publishes
 * starter entries for each collection, plus the Site Profile single type. Idempotent:
 * re-running skips entries whose slug already exists.
 *
 * Run on the server, inside the Node venv, from the app root:
 *   node scripts/seed.js
 */
const { createStrapi } = require('@strapi/strapi');

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const PROGRAMS = [
  { title: 'Evidence and Policy Advocacy', summary: 'Turning research, field learning, and child-rights data into policy asks that decision makers can act on.', order: 1 },
  { title: 'Child Protection Systems', summary: 'Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.', order: 2 },
  { title: 'Child Participation', summary: 'Creating safe spaces where children and young people can contribute to decisions that affect their lives.', order: 3 },
  { title: 'Network Coordination', summary: 'Bringing civil society members, technical partners, and community actors together around shared advocacy priorities.', order: 4 },
];

const IMPACT_STORIES = [
  { title: 'A coordinated voice for child rights advocacy', location: 'Addis Ababa', excerpt: 'ECRAN convenes practitioners and advocates around a shared agenda: practical, evidence-led action for survival, development, protection, and participation.' },
  { title: 'From field evidence to policy dialogue', location: 'Regional partners', excerpt: 'The network helps translate local realities into concise briefs, partner conversations, and advocacy moments with public institutions.' },
  { title: 'Shared learning that travels', location: 'Member organizations', excerpt: 'Members exchange tools, case learning, and referral knowledge so strong practice can move across programs instead of staying isolated.' },
];

const RESOURCES = [
  { title: 'ECRAN organizational profile 2025', resourceType: 'Annual report', summary: 'PDF, coming soon' },
  { title: 'Child participation in local decision making', resourceType: 'Policy brief', summary: 'Brief, coming soon' },
  { title: 'Evidence standards for child-rights advocacy', resourceType: 'Publication', summary: 'Guide, coming soon' },
  { title: 'Partner inquiry and membership pack', resourceType: 'Toolkit', summary: 'Download, coming soon' },
];

const SITE_PROFILE = {
  organizationName: 'Ethiopian Child Rights Advocacy Network',
  mission: 'Promote evidence-based advocacy for child rights in Ethiopia.',
  vision: 'A country where all children enjoy survival, development, protection, and participation rights.',
  legalStatus: 'Registered as a local organization under Proclamation No. 1113/2019.',
  registrationNumber: '7750',
  email: 'info@ecran-et.org',
};

async function seedCollection(strapi, uid, rows) {
  let created = 0;
  for (const row of rows) {
    const slug = slugify(row.title);
    const existing = await strapi.documents(uid).findMany({ filters: { slug }, status: 'published' });
    if (existing && existing.length) {
      console.log(`  skip (exists): ${uid} "${row.title}"`);
      continue;
    }
    const doc = await strapi.documents(uid).create({ data: { ...row, slug } });
    await strapi.documents(uid).publish({ documentId: doc.documentId });
    created += 1;
    console.log(`  created + published: ${uid} "${row.title}"`);
  }
  return created;
}

async function seedSingle(strapi, uid, data) {
  const current = await strapi.documents(uid).findFirst({ status: 'published' });
  if (current && current.organizationName) {
    console.log(`  skip (exists): ${uid}`);
    return 0;
  }
  const doc = await strapi.documents(uid).create({ data });
  await strapi.documents(uid).publish({ documentId: doc.documentId });
  console.log(`  created + published: ${uid}`);
  return 1;
}

(async () => {
  const strapi = await createStrapi({ distDir: './dist' }).load();
  try {
    console.log('Seeding ECRAN content...');
    await seedCollection(strapi, 'api::program.program', PROGRAMS);
    await seedCollection(strapi, 'api::impact-story.impact-story', IMPACT_STORIES);
    await seedCollection(strapi, 'api::resource.resource', RESOURCES);
    await seedSingle(strapi, 'api::site-profile.site-profile', SITE_PROFILE);
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
    process.exit(process.exitCode || 0);
  }
})();

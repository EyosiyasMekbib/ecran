import type { Core } from '@strapi/strapi';

// Content types whose changes should trigger a public-site rebuild.
const WATCHED_UIDS = [
  'api::program.program',
  'api::impact-story.impact-story',
  'api::resource.resource',
  'api::partner.partner',
  'api::site-profile.site-profile',
  'api::post.post',
  'api::page.page',
  'api::team-member.team-member',
  'api::member-org.member-org',
  'api::global.global',
  'api::navigation.navigation',
];

// Document-service actions that change what the published site shows.
const REBUILD_ACTIONS = ['publish', 'unpublish', 'delete'];

// Debounce so a burst of publishes coalesces into a single build.
const DEBOUNCE_MS = 10_000;

/**
 * Grant the Public role read access (find/findOne) to every watched content
 * type, so the frontend can fetch anonymously without manual admin clicks
 * whenever a new type ships.
 */
async function ensurePublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const wanted: string[] = [];
  for (const uid of WATCHED_UIDS) {
    wanted.push(`${uid}.find`);
    // Single types have no findOne
    const ct = strapi.contentTypes[uid as keyof typeof strapi.contentTypes] as any;
    if (ct?.kind !== 'singleType') wanted.push(`${uid}.findOne`);
  }
  // Public visitors submit the contact form (create only; reading submissions
  // stays admin-only, so it is deliberately NOT in WATCHED_UIDS).
  wanted.push('api::contact-submission.contact-submission.create');

  for (const action of wanted) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });
    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });
      strapi.log.info(`Granted public permission: ${action}`);
    }
  }
}

/**
 * Ensure dedicated Writer roles exist in both Strapi Admin panel and Users-Permissions
 * with creation/editing privileges for posts, impact stories, and resources.
 */
async function ensureWriterRole(strapi: Core.Strapi) {
  // 1. Strapi Admin Role (for CMS dashboard writers)
  try {
    const existingAdminWriter = await strapi.db
      .query('admin::role')
      .findOne({ where: { name: 'Writer' } });
    if (!existingAdminWriter) {
      const createdAdmin = await strapi.db.query('admin::role').create({
        data: {
          name: 'Writer',
          code: 'strapi-writer',
          description: 'Content creator: can draft, edit, and submit articles, stories, and posts.',
        },
      });
      strapi.log.info(`Created Strapi Admin role: Writer (id: ${createdAdmin?.id})`);
    }
  } catch (err: any) {
    strapi.log.warn(`Admin Writer role check/create note: ${err?.message ?? err}`);
  }

  // 2. Users-Permissions Role (for authenticated writers/API contributors)
  try {
    const existingApiWriter = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'writer' } });

    let apiRoleId = existingApiWriter?.id;
    if (!existingApiWriter) {
      const createdApi = await strapi.db
        .query('plugin::users-permissions.role')
        .create({
          data: {
            name: 'Writer',
            type: 'writer',
            description: 'Can author and edit draft posts, impact stories, and resources.',
          },
        });
      apiRoleId = createdApi?.id;
      strapi.log.info(`Created Users-Permissions role: Writer (id: ${apiRoleId})`);
    }

    if (apiRoleId) {
      const writerActions = [
        'api::post.post.find',
        'api::post.post.findOne',
        'api::post.post.create',
        'api::post.post.update',
        'api::impact-story.impact-story.find',
        'api::impact-story.impact-story.findOne',
        'api::impact-story.impact-story.create',
        'api::impact-story.impact-story.update',
        'api::resource.resource.find',
        'api::resource.resource.findOne',
        'api::resource.resource.create',
        'api::resource.resource.update',
      ];
      for (const action of writerActions) {
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: apiRoleId } });
        if (!existing) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .create({ data: { action, role: apiRoleId } });
        }
      }
      strapi.log.info('Granted Writer permissions for drafting and editing content.');
    }
  } catch (err: any) {
    strapi.log.warn(`API Writer role check/create note: ${err?.message ?? err}`);
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * On publish/unpublish/delete of watched content, ping the Netlify build
   * hook so the static frontend rebuilds and picks up the change. Replaces a
   * manual Strapi admin webhook — set NETLIFY_BUILD_HOOK to enable.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicReadPermissions(strapi).catch((err) =>
      strapi.log.error(`ensurePublicReadPermissions failed: ${err?.message ?? err}`)
    );

    // Ensure Writer roles exist in both Admin and Users-Permissions
    await ensureWriterRole(strapi).catch((err) =>
      strapi.log.error(`ensureWriterRole failed: ${err?.message ?? err}`)
    );

    // Seed starter content when the DB is missing it. Runs on a fresh deploy AND
    // when new seedable types ship to an already-seeded DB (e.g. global added
    // after programs). runSeed is fully idempotent, so this is safe to re-run.
    try {
      const hasPrograms = await strapi.documents('api::program.program').findFirst({});
      const hasGlobal = await strapi.documents('api::global.global').findFirst({});
      // RESEED=1 forces an idempotent UPSERT of all seed content onto an existing
      // DB (e.g. to push newly-added page sections). Unset it after the one-off run.
      const reseed = process.env.RESEED === '1';
      if (!hasPrograms || !hasGlobal || reseed) {
        strapi.log.info(reseed ? 'RESEED=1 — upserting all seed content...' : 'Seeding starter content (missing content detected)...');
        // Loaded via a runtime path so the bundler doesn't resolve scripts/
        // (outside src/) at build time. __dirname === dist/src at runtime.
        const seedPath = require('path').join(__dirname, '..', '..', 'scripts', 'seed.js');
        const { runSeed } = require(seedPath);
        await runSeed(strapi, { upsert: reseed });
      }
    } catch (err: any) {
      strapi.log.error(`Auto-seed failed: ${err?.message ?? err}`);
    }

    const buildHook = process.env.NETLIFY_BUILD_HOOK;
    if (!buildHook) {
      strapi.log.info('NETLIFY_BUILD_HOOK not set — frontend auto-rebuild disabled.');
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const scheduleRebuild = (reason: string) => {
      if (timer) return; // a build is already scheduled within the debounce window
      timer = setTimeout(() => {
        timer = null;
        fetch(buildHook, { method: 'POST' })
          .then(() => strapi.log.info(`Netlify rebuild triggered (${reason})`))
          .catch((err) => strapi.log.error(`Netlify build hook failed: ${err?.message ?? err}`));
      }, DEBOUNCE_MS);
    };

    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (REBUILD_ACTIONS.includes(context.action) && WATCHED_UIDS.includes(context.uid)) {
        scheduleRebuild(`${context.action} ${context.uid}`);
      }
      return result;
    });

    strapi.log.info('Netlify auto-rebuild enabled (publish/unpublish/delete → build hook).');
  },
};

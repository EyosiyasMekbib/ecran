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

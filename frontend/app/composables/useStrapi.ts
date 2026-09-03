import {
  impactStories as staticImpactStories,
  resources as staticResources,
  staticPosts,
  staticPartners
} from '~/data/site'

/** Base URL of the Strapi CMS (from runtime config; override with NUXT_PUBLIC_STRAPI_URL). */
export function useStrapiUrl(): string {
  try {
    const config = useRuntimeConfig()
    return (config?.public?.strapiUrl as string) || 'https://ecran-cms.onrender.com'
  } catch {
    return 'https://ecran-cms.onrender.com'
  }
}

/** Resolve a Strapi media path to an absolute URL. */
export function strapiMedia(url?: string | null): string | null {
  if (!url) return null
  return /^https?:\/\//.test(url) ? url : `${useStrapiUrl()}${url}`
}

/**
 * The CMS spins down when idle and is LVE-throttled, so its first response after a
 * quiet spell is far slower than a warm one — measured at 4.3s cold against 0.8s
 * warm. These reads run during `nuxt generate`, not in a visitor's browser, so a
 * 3.5s ceiling bought nothing and cost everything: it expired before the CMS
 * answered and the whole site silently prerendered from static fallbacks. Wait for
 * the cold boot instead, and retry rather than accept the first miss.
 */
const CMS_TIMEOUT = 30_000
const CMS_RETRIES = 4

/**
 * Backs off between attempts. Retrying a throttled CMS immediately just spends the
 * next attempt on the same closed door: without a pause, a burst of prerender
 * requests exhausts every retry inside the throttle window and a section renders
 * empty. Now that nothing falls back to static copy, an exhausted read is a blank
 * page rather than stale content, so it is worth waiting the CMS out.
 */
async function cmsRequest<T>(path: string, query: Record<string, unknown> = {}): Promise<T | null> {
  for (let attempt = 0; attempt <= CMS_RETRIES; attempt++) {
    try {
      return await $fetch<T>(`${useStrapiUrl()}/api/${path}`, { query, timeout: CMS_TIMEOUT, retry: 0 })
    } catch {
      if (attempt === CMS_RETRIES) return null
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt))
    }
  }
  return null
}

/**
 * Fetch a published Strapi collection. Returns [] on any error so callers can
 * fall back to static content — the site must never break because the CMS is down.
 * Strapi v5 returns a flat `data` array (fields are not nested under `attributes`).
 */
async function fetchCollection(path: string, query: Record<string, unknown> = {}): Promise<any[]> {
  const res = await cmsRequest<{ data: any[] }>(path, {
    'pagination[pageSize]': 100,
    populate: '*',
    ...query
  })
  return Array.isArray(res?.data) ? res.data : []
}

/**
 * Program cards: `{ title, slug, text, body, image }`. No static fallback — these
 * name real projects, so the page shows what the CMS publishes and nothing else.
 */
export async function getPrograms() {
  const rows = await fetchCollection('programs', { sort: 'order:asc' })
  return rows.map((e: any) => ({
    title: e.title,
    slug: e.slug || '',
    text: e.summary,
    body: e.body || '',
    image: strapiMedia(e.featuredImage?.url) || '/brand/network-card.svg'
  }))
}

/** Impact-story cards: `{ place, title, text }`. Falls back to static data. */
export async function getImpactStories() {
  const rows = await fetchCollection('impact-stories', { sort: 'publishedOn:desc' })
  if (!rows.length) return staticImpactStories
  return rows.map((e: any) => ({
    place: e.location || 'ECRAN',
    title: e.title,
    text: e.excerpt
  }))
}

/**
 * Posts published without a featuredImage still need something to show wherever a
 * post is rendered with an image — a card and its detail page disagreeing looks
 * like a bug. Same brand card getPrograms() falls back to.
 */
const POST_IMAGE_FALLBACK = '/brand/network-card.svg'

/** Shape a raw Strapi post row for the UI. Shared so a card and its detail page cannot drift. */
function mapPost(e: any) {
  const asDate = (value?: string) =>
    value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
  return {
    title: e.title,
    slug: e.slug,
    category: e.category,
    excerpt: e.excerpt || '',
    body: e.body || '',
    date: asDate(e.publishDate),
    deadline: asDate(e.deadline),
    location: e.location || '',
    image: strapiMedia(e.featuredImage?.url) || POST_IMAGE_FALLBACK,
    attachments: (e.attachment || []).map((a: any) => ({ name: a.name, url: strapiMedia(a.url) })),
    externalUrl: e.externalUrl || '',
    department: e.department || '',
    employmentType: e.employmentType || '',
    ctaLabel: e.ctaLabel || ''
  }
}

/**
 * `nuxt generate` prerenders every route in a single process, and each post detail
 * page was firing its own request for the same collection. That burst is what tips
 * the CMS into throttling — a throttled miss rendered a published post as "Story not
 * found". Fetch the collection once and let every detail page share it. Safe because
 * the site is fully static: this lives only for the duration of the build.
 *
 * An empty result is never cached; it means the request failed (or the CMS is truly
 * empty), and caching it would blank every remaining detail page.
 */
let allPostsCache: Promise<any[]> | null = null
function allPosts(): Promise<any[]> {
  if (!allPostsCache) {
    allPostsCache = fetchCollection('posts').then((rows) => {
      if (!rows.length) allPostsCache = null
      return rows
    })
  }
  return allPostsCache
}

/**
 * Posts (news / vacancy / bid / announcement / media), newest first.
 * Returns [] when the CMS has none — callers decide their own fallback.
 */
export async function getPosts(category?: 'news' | 'vacancy' | 'bid' | 'announcement' | 'media') {
  const query: Record<string, unknown> = { sort: 'publishDate:desc' }
  if (category) query['filters[category][$eq]'] = category
  const rows = await fetchCollection('posts', query)
  if (!rows.length) {
    return category ? staticPosts.filter((p: any) => p.category === category) : staticPosts
  }
  return rows.map(mapPost)
}

/** Team members ordered by `order`. Returns [] when CMS has none. */
export async function getTeamMembers() {
  const rows = await fetchCollection('team-members', { sort: 'order:asc' })
  return rows.map((e: any) => ({
    name: e.name,
    role: e.role || '',
    bio: e.bio || '',
    photo: strapiMedia(e.photo?.url)
  }))
}

/**
 * Member organizations ordered by `order`. No static fallback: the directory names
 * real organizations, so it shows exactly who the CMS publishes and nothing else.
 */
export async function getMemberOrgs() {
  const rows = await fetchCollection('member-orgs', { sort: 'order:asc' })
  return rows.map((e: any) => ({
    name: e.name,
    description: e.description || '',
    url: e.url || '',
    logo: strapiMedia(e.logo?.url)
  }))
}

/**
 * A single Page entry by slug (hero + body + arbitrary `sections` JSON).
 * Returns null when missing so callers keep their baked-in fallback copy.
 */
export async function getPage(slug: string) {
  const rows = await fetchCollection('pages', { 'filters[slug][$eq]': slug })
  const e = rows[0]
  if (!e) return null
  return {
    title: e.title,
    heroTitle: e.heroTitle || e.title,
    heroText: e.heroText || '',
    body: e.body || '',
    sections: e.sections || null,
    heroImage: strapiMedia(e.heroImage?.url),
    seoTitle: e.seoTitle || e.title,
    seoDescription: e.seoDescription || ''
  }
}

/** Site profile single type (org info, contact details). Returns null when missing. */
export async function getSiteProfile() {
  const res = await cmsRequest<{ data: any }>('site-profile', { populate: '*' })
  return res?.data || null
}

/** Homepage resource cards: `{ type, title, meta }`. Falls back to static data. */
export async function getResourceCards() {
  const rows = await fetchCollection('resources', { sort: 'publishedOn:desc' })
  if (!rows.length) return staticResources
  return rows.map((e: any) => ({
    type: e.resourceType || 'Publication',
    title: e.title,
    meta:
      e.summary ||
      (e.publishedOn
        ? new Date(e.publishedOn).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        : 'Available')
  }))
}

/** Global settings single type: branding, SEO defaults, social, footer. Null on error. */
export async function getGlobal() {
  const res = await cmsRequest<{ data: any }>('global', { populate: '*' })
  return res?.data || null
}

/** Header navigation tree (`[{ label, to, children? }]`). Null on error so callers fall back. */
export async function getNavigation() {
  const res = await cmsRequest<{ data: any }>('navigation')
  const items = res?.data?.items
  return Array.isArray(items) ? items : null
}

/** Partner cards: `{ name, url, logo }`. Falls back to static partners. */
export async function getPartners() {
  const rows = await fetchCollection('partners', { sort: 'order:asc' })
  if (!rows.length) return staticPartners
  return rows.map((e: any) => ({
    name: e.name,
    url: e.website || '',
    logo: strapiMedia(e.logo?.url)
  }))
}

/** A single post by slug, for /news/[slug] detail pages. Null when missing. */
export async function getPostBySlug(slug: string) {
  const e = (await allPosts()).find((row: any) => row.slug === slug)
  if (!e) {
    const fallback = staticPosts.find((p: any) => p.slug === slug)
    return fallback || null
  }
  return mapPost(e)
}

/**
 * Submit the contact form to the CMS (public create).
 *
 * The CMS spins down when idle, so the first request after a quiet spell can
 * fail outright while the instance boots — a connection error, not a rejection.
 * Treating that as "submission failed" showed visitors an error for a message
 * that would have gone through, so transport failures are retried with a long
 * timeout that accommodates a cold boot.
 *
 * A 4xx is the opposite case: the server answered and refused (validation),
 * so retrying would just fail identically — those return immediately.
 */
export async function submitContact(payload: {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  organization?: string
}): Promise<{ ok: boolean; reason?: 'invalid' | 'unreachable' }> {
  const attempt = () =>
    $fetch(`${useStrapiUrl()}/api/contact-submissions`, {
      method: 'POST',
      body: { data: payload },
      timeout: 60_000,
      retry: 0
    })

  for (let i = 0; i < 3; i++) {
    try {
      await attempt()
      return { ok: true }
    } catch (err: any) {
      const status = err?.response?.status ?? err?.statusCode
      // The server replied and rejected the payload — retrying changes nothing.
      if (status && status >= 400 && status < 500) return { ok: false, reason: 'invalid' }
      if (i < 2) await new Promise((r) => setTimeout(r, 2000 * (i + 1)))
    }
  }
  return { ok: false, reason: 'unreachable' }
}

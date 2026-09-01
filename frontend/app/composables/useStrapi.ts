import {
  programs as staticPrograms,
  impactStories as staticImpactStories,
  resources as staticResources,
  staticPosts,
  staticPartners,
  staticMembers
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
 * Fetch a published Strapi collection. Returns [] on any error so callers can
 * fall back to static content — the site must never break because the CMS is down.
 * Strapi v5 returns a flat `data` array (fields are not nested under `attributes`).
 */
async function fetchCollection(path: string, query: Record<string, unknown> = {}): Promise<any[]> {
  try {
    const res = await $fetch<{ data: any[] }>(`${useStrapiUrl()}/api/${path}`, {
      query: { 'pagination[pageSize]': 100, populate: '*', ...query },
      timeout: 3500
    })
    return Array.isArray(res?.data) ? res.data : []
  } catch {
    return []
  }
}

/** Program cards: `{ title, text, image }`. Falls back to static data. */
export async function getPrograms() {
  const rows = await fetchCollection('programs', { sort: 'order:asc' })
  if (!rows.length) return staticPrograms
  return rows.map((e: any) => ({
    title: e.title,
    text: e.summary,
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
  return rows.map((e: any) => ({
    title: e.title,
    slug: e.slug,
    category: e.category,
    excerpt: e.excerpt || '',
    body: e.body || '',
    date: e.publishDate
      ? new Date(e.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    deadline: e.deadline
      ? new Date(e.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    location: e.location || '',
    image: strapiMedia(e.featuredImage?.url),
    attachments: (e.attachment || []).map((a: any) => ({ name: a.name, url: strapiMedia(a.url) })),
    externalUrl: e.externalUrl || '',
    department: e.department || '',
    employmentType: e.employmentType || '',
    ctaLabel: e.ctaLabel || ''
  }))
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

/** Member organizations ordered by `order`. Falls back to static members. */
export async function getMemberOrgs() {
  const rows = await fetchCollection('member-orgs', { sort: 'order:asc' })
  if (!rows.length) return staticMembers
  return rows.map((e: any) => ({
    name: e.name,
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
  try {
    const res = await $fetch<{ data: any }>(`${useStrapiUrl()}/api/site-profile`, {
      query: { populate: '*' },
      timeout: 3500
    })
    return res?.data || null
  } catch {
    return null
  }
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
  try {
    const res = await $fetch<{ data: any }>(`${useStrapiUrl()}/api/global`, {
      query: { populate: '*' },
      timeout: 3500
    })
    return res?.data || null
  } catch {
    return null
  }
}

/** Header navigation tree (`[{ label, to, children? }]`). Null on error so callers fall back. */
export async function getNavigation() {
  try {
    const res = await $fetch<{ data: any }>(`${useStrapiUrl()}/api/navigation`, {
      timeout: 3500
    })
    const items = res?.data?.items
    return Array.isArray(items) ? items : null
  } catch {
    return null
  }
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
  const rows = await fetchCollection('posts', { 'filters[slug][$eq]': slug })
  const e = rows[0]
  if (!e) {
    const fallback = staticPosts.find((p: any) => p.slug === slug)
    return fallback || null
  }
  return {
    title: e.title,
    slug: e.slug,
    category: e.category,
    excerpt: e.excerpt || '',
    body: e.body || '',
    date: e.publishDate
      ? new Date(e.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    deadline: e.deadline
      ? new Date(e.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    location: e.location || '',
    image: strapiMedia(e.featuredImage?.url),
    attachments: (e.attachment || []).map((a: any) => ({ name: a.name, url: strapiMedia(a.url) })),
    externalUrl: e.externalUrl || '',
    department: e.department || '',
    employmentType: e.employmentType || '',
    ctaLabel: e.ctaLabel || ''
  }
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

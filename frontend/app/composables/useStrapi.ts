import {
  programs as staticPrograms,
  impactStories as staticImpactStories,
  resources as staticResources
} from '~/data/site'

/** Base URL of the Strapi CMS (from runtime config; override with NUXT_PUBLIC_STRAPI_URL). */
export function useStrapiUrl(): string {
  return useRuntimeConfig().public.strapiUrl as string
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
      query: { 'pagination[pageSize]': 100, populate: '*', ...query }
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

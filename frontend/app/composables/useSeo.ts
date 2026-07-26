/**
 * Apply per-page SEO (title, description, Open Graph, Twitter) with CMS-driven
 * defaults from the `global` single type. Call from a page after fetching its
 * `getPage(...)` data:  useSeo(page.value)  — or with explicit overrides.
 *
 * IMPORTANT: this is synchronous and does NOT await. useHead is registered
 * synchronously (so it never loses Nuxt setup context) with a reactive callback
 * that reads global once it resolves — which SSR awaits before finalizing head.
 * Callers may still `await useSeo(...)` harmlessly (it returns undefined).
 *
 * Precedence: explicit override → page.seoTitle/seoDescription → global defaults.
 */
export function useSeo(
  page?: { seoTitle?: string; seoDescription?: string; title?: string; heroImage?: string | null } | null,
  override: { title?: string; description?: string; image?: string } = {}
) {
  const { data: site } = useAsyncData('global', () => getGlobal())

  useHead(() => {
    const g = (site.value as any) || {}
    const siteName: string = g.siteName || 'ECRAN'

    const rawTitle = override.title || page?.seoTitle || page?.title || ''
    const title = rawTitle
      ? `${rawTitle} | ${siteName}`
      : g.defaultSeoTitle || `${siteName} — Ethiopian Child Rights Advocacy Network`

    const description =
      override.description ||
      page?.seoDescription ||
      g.defaultSeoDescription ||
      'Evidence-based advocacy for children’s survival, development, protection, and participation in Ethiopia.'

    const image =
      override.image || strapiMedia(page?.heroImage) || strapiMedia(g.defaultOgImage?.url) || undefined

    const meta: Record<string, string>[] = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteName },
      { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ]
    if (image) {
      meta.push({ property: 'og:image', content: image })
      meta.push({ name: 'twitter:image', content: image })
    }

    // Favicon is CMS-managed (Global → favicon); falls back to the bundled icon.
    const faviconUrl = strapiMedia(g.favicon?.url) || '/favicon.ico'
    const link = [{ rel: 'icon', href: faviconUrl }]

    return { title, meta, link }
  })
}

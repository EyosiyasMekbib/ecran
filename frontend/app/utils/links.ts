/**
 * Routes that no longer exist. The CMS is edited by hand and can still list them, so
 * menus re-point these links, or drop them when the value is null. Old URLs themselves
 * are redirected by `routeRules` in nuxt.config.
 */
const retiredLinks: Record<string, string | null> = {
  '/news/media-center': null,
  '/news/announcements': '/news/news'
}

/**
 * Bring a CMS-managed link list up to date with the code's own list. The CMS stays
 * authoritative for labels and ordering, but it lags the code: retired links are
 * re-pointed or dropped, and links it omits are inserted at the position the code gives
 * them, so a new page lands where it belongs. Matched on `key` so nothing duplicates.
 *
 * The trade-off: a link deliberately removed in the CMS comes back. Remove it from the
 * code's list to drop it for good.
 */
export function mergeLinks<T extends Record<string, any>>(cmsLinks: T[], knownLinks: T[], key = 'to'): T[] {
  const links = new Map<string, T>()
  for (const link of cmsLinks) {
    const current = link[key] in retiredLinks ? retiredLinks[link[key]] : link[key]
    if (current && !links.has(current)) links.set(current, { ...link, [key]: current })
  }
  const merged = [...links.values()]
  knownLinks.forEach((link, index) => {
    if (!links.has(link[key])) merged.splice(Math.min(index, merged.length), 0, link)
  })
  return merged
}

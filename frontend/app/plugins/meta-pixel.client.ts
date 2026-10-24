/**
 * Meta (Facebook) Pixel, for measuring and retargeting social media ads.
 *
 * Does nothing until `metaPixelId` is set in nuxt.config.ts. The site is
 * prerendered, so the ID is baked in when Netlify runs `pnpm generate`.
 *
 * Left alone, Meta's script sends a PageView on every URL change, in-page
 * #anchors (like the skip link) included. That's switched off and route
 * changes are reported here instead, by path, so each page counts once.
 * `allowDuplicatePageViews` is needed for that: without it fbevents.js drops
 * every PageView after the first one in a page load.
 */
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: Fbq
  loaded: boolean
  version: string
  disablePushState?: boolean
  allowDuplicatePageViews?: boolean
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export default defineNuxtPlugin(() => {
  const pixelId = useRuntimeConfig().public.metaPixelId
  if (!pixelId || window.fbq) return

  // Meta's loader: queue calls until fbevents.js arrives and replays them.
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  fbq.disablePushState = true
  fbq.allowDuplicatePageViews = true
  window.fbq = window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', String(pixelId))

  const router = useRouter()
  let lastPath = router.currentRoute.value.path
  fbq('track', 'PageView')
  router.afterEach((to, _from, failure) => {
    if (failure || to.path === lastPath) return
    lastPath = to.path
    fbq('track', 'PageView')
  })
})

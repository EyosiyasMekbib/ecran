// Loaded as media="print" and switched to "all" once fetched, so it never blocks first
// paint. As an @import in main.css it sat behind the entry CSS and held the first
// render of every page by ~750 ms on mobile (PageSpeed, Oct 2026).
const googleFonts =
  'https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,300..900;1,300..900&family=Source+Serif+4:opsz,wght@8..60,400..800&display=swap'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
  // Inline page CSS into the HTML so the first render needs no extra stylesheet request.
  features: {
    inlineStyles: true
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#24306f' }
      ],
      // Keyed so useSeo() can swap in a CMS-managed favicon without duplicating tags.
      link: [
        { key: 'favicon', rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: googleFonts, media: 'print', onload: "this.media='all'" }
      ]
    }
  },
  vite: {
    optimizeDeps: {
      include: ['marked']
    }
  },
  routeRules: {
    '/partner-with-us': { redirect: '/get-involved' },
    '/news/media-center': { redirect: '/news/press-releases' }
  },
  runtimeConfig: {
    public: {
      // Strapi CMS base URL. Override per environment with NUXT_PUBLIC_STRAPI_URL.
      strapiUrl: 'https://cms.ecran-et.org',
      // Canonical site origin for absolute links (e.g. share buttons). Override with NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://ecran-et.org',
      // Meta Pixel ID from Events Manager (public, not a secret). Empty disables the pixel.
      // Set it here as a string, not via NUXT_PUBLIC_META_PIXEL_ID: env values are parsed
      // as numbers, which garbles 16-digit IDs above 9007199254740991.
      metaPixelId: ''
    }
  }
})

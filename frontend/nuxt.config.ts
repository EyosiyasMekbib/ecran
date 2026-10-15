export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
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
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  vite: {
    optimizeDeps: {
      include: ['marked']
    }
  },
  runtimeConfig: {
    public: {
      // Strapi CMS base URL. Override per environment with NUXT_PUBLIC_STRAPI_URL.
      strapiUrl: 'https://cms.ecran-et.org'
    }
  }
})

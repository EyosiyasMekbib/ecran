export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Strapi CMS base URL. Override per environment with NUXT_PUBLIC_STRAPI_URL.
      strapiUrl: 'https://cms.ecran-et.org'
    }
  }
})

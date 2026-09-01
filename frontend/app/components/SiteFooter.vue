<script setup lang="ts">
// Footer content comes from the CMS: global (branding/links/labels/social) + site profile (contact).
const { data: site } = await useAsyncData('global', getGlobal)
const { data: profile } = await useAsyncData('site-profile', getSiteProfile)

const g = () => (site.value as any) || {}
const ui = () => g().ui || {}
const logoUrl = computed(() => strapiMedia(g().logo?.url) || '/ecran-logo.jpg')
const siteName = computed(() => g().siteName || 'ECRAN')
const tagline = computed(
  () =>
    g().footerTagline ||
    (profile.value as any)?.tagline ||
    'Evidence-based advocacy for every Ethiopian child to survive, develop, be protected, and participate'
)
const quickLinks = computed(() =>
  g().footerQuickLinks?.length
    ? g().footerQuickLinks
    : [
        { label: 'Who We Are', to: '/who-we-are/about-us' },
        { label: 'News & Announcements', to: '/news/announcements' },
        { label: 'Resources', to: '/resources' }
      ]
)
const legalLinks = computed(() =>
  g().footerLegalLinks?.length
    ? g().footerLegalLinks
    : [
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms of Service', to: '/terms-of-service' }
      ]
)
const getInvolvedUrl = computed(
  () =>
    g().getInvolvedUrl ||
    'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform'
)

// Site-wide chrome labels (Global.ui JSON) — all fall back to the current copy.
const getInvolvedLabel = computed(() => ui().getInvolvedLabel || 'Get Involved')
const headings = computed(() => ui().footerHeadings || {})
const registrationLabel = computed(() => ui().registrationLabel || 'Registration No:')
const copyrightSuffix = computed(() => ui().copyrightSuffix || 'All rights reserved.')

const email = computed(() => profile.value?.email || 'info@ecran-et.org')
const phone = computed(() => (profile.value as any)?.phone || '')
const address = computed(() => profile.value?.address || 'Addis Ababa, Ethiopia')
const registrationNumber = computed(() => profile.value?.registrationNumber || '7750')
const legalStatus = computed(
  () =>
    profile.value?.legalStatus ||
    'Local organization registered with ACSO under Civil Societies Proclamation No. 1113/2019.'
)

// Social links are managed in the CMS (Global → social JSON). Only platforms with a
// URL render; supported keys map to an inline brand glyph below.
const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
  x: 'M18.9 2h3.3l-7.2 8.26L23.7 22h-6.6l-5.2-6.82L5.9 22H2.6l7.7-8.84L1.3 2h6.8l4.7 6.23zm-1.16 18h1.83L7.1 3.9H5.15z',
  twitter: 'M18.9 2h3.3l-7.2 8.26L23.7 22h-6.6l-5.2-6.82L5.9 22H2.6l7.7-8.84L1.3 2h6.8l4.7 6.23zm-1.16 18h1.83L7.1 3.9H5.15z',
  linkedin: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
  instagram: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
  youtube: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z',
  telegram: 'M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z'
}
const socialLinks = computed(() => {
  const raw = (g().social || {}) as Record<string, string>
  return Object.entries(raw)
    .filter(([key, url]) => url && SOCIAL_ICONS[key.toLowerCase()])
    .map(([key, url]) => ({ platform: key, url, icon: SOCIAL_ICONS[key.toLowerCase()] }))
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <img :src="logoUrl" alt="ECRAN logo" class="footer-logo" />
        <p>{{ tagline }}</p>
        <div v-if="socialLinks.length" class="footer-social">
          <a
            v-for="s in socialLinks"
            :key="s.platform"
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-link"
            :aria-label="s.platform"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" :d="s.icon" />
            </svg>
          </a>
        </div>
      </div>
      <div class="footer-grid">
        <section>
          <h2>{{ headings.registration || 'Registration' }}</h2>
          <p>{{ legalStatus }}</p>
          <p>{{ registrationLabel }} <strong>{{ registrationNumber }}</strong></p>
        </section>
        <section>
          <h2>{{ headings.quickLinks || 'Quick Links' }}</h2>
          <nav class="footer-nav">
            <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
            <a :href="getInvolvedUrl" target="_blank" rel="noopener noreferrer">{{ getInvolvedLabel }}</a>
          </nav>
        </section>
        <section>
          <h2>{{ headings.contact || 'Contact' }}</h2>
          <address>
            <p>{{ address }}<br />
            <a :href="`mailto:${email}`">{{ email }}</a>
            <template v-if="phone"><br /><a :href="`tel:${phone.replace(/\s+/g, '')}`">{{ phone }}</a></template></p>
          </address>
        </section>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ year }} {{ siteName }}. {{ copyrightSuffix }}</p>
      <div class="footer-legal">
        <NuxtLink v-for="link in legalLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-social {
  display: flex;
  gap: 0.65rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.footer-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: currentColor;
  opacity: 0.85;
  border: 1px solid currentColor;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.footer-social-link:hover {
  opacity: 1;
  transform: translateY(-2px);
}
</style>

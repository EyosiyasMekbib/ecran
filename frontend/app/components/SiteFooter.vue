<script setup lang="ts">
// Footer content comes from the CMS: global (branding/links) + site profile (contact).
const { data: site } = await useAsyncData('global', () => getGlobal())
const { data: profile } = await useAsyncData('site-profile', () => getSiteProfile())

const g = () => (site.value as any) || {}
const logoUrl = computed(() => strapiMedia(g().logo?.url) || '/ecran-logo.jpg')
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

const email = computed(() => profile.value?.email || 'info@ecran-et.org')
const address = computed(() => profile.value?.address || 'Addis Ababa, Ethiopia')
const registrationNumber = computed(() => profile.value?.registrationNumber || '7750')
const legalStatus = computed(
  () =>
    profile.value?.legalStatus ||
    'Local organization registered with ACSO under Civil Societies Proclamation No. 1113/2019.'
)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <img :src="logoUrl" alt="ECRAN logo" class="footer-logo" />
        <p>{{ tagline }}</p>
      </div>
      <div class="footer-grid">
        <section>
          <h2>Registration</h2>
          <p>{{ legalStatus }}</p>
          <p>Registration No: <strong>{{ registrationNumber }}</strong></p>
        </section>
        <section>
          <h2>Quick Links</h2>
          <nav class="footer-nav">
            <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
            <a :href="getInvolvedUrl" target="_blank" rel="noopener noreferrer">Get Involved</a>
          </nav>
        </section>
        <section>
          <h2>Contact</h2>
          <address>
            <p>{{ address }}<br />
            <a :href="`mailto:${email}`">{{ email }}</a></p>
          </address>
        </section>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ year }} ECRAN. All rights reserved.</p>
      <div class="footer-legal">
        <NuxtLink v-for="link in legalLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer contact/registration copy comes from the CMS site profile (fallbacks below).
const { data: profile } = await useAsyncData('site-profile', () => getSiteProfile())

const tagline = computed(
  () =>
    (profile.value as any)?.tagline ||
    'Evidence-based advocacy for every Ethiopian child to survive, develop, be protected, and participate'
)
const email = computed(() => profile.value?.email || 'info@ecran-et.org')
const address = computed(() => profile.value?.address || 'Addis Ababa, Ethiopia')
const registrationNumber = computed(() => profile.value?.registrationNumber || '7750')
const legalStatus = computed(
  () =>
    profile.value?.legalStatus ||
    'Local organization registered with ACSO under Civil Societies Proclamation No. 1113/2019.'
)
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <img src="/ecran-logo.jpg" alt="ECRAN logo" class="footer-logo" />
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
            <NuxtLink to="/who-we-are/about-us">Who We Are</NuxtLink>
            <NuxtLink to="/news/announcements">News & Announcements</NuxtLink>
            <NuxtLink to="/resources">Resources</NuxtLink>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform" target="_blank" rel="noopener noreferrer">Get Involved</a>
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
      <p>&copy; {{ new Date().getFullYear() }} ECRAN. All rights reserved.</p>
      <div class="footer-legal">
        <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms-of-service">Terms of Service</NuxtLink>
      </div>
    </div>
  </footer>
</template>

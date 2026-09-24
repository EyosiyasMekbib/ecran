<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div class="site-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main id="main-content">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

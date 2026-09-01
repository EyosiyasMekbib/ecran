<script setup lang="ts">
// Site-wide error / 404 page. Copy is CMS-managed (Global → ui.errorPage.*) with
// the current text as fallback, so it stays branded even when the CMS is down.
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()

const { data: site } = await useAsyncData('global', getGlobal)
const ui = () => (site.value as any)?.ui || {}
const errorCopy = computed(() => ui().errorPage || {})

const isNotFound = computed(() => props.error?.statusCode === 404)
const heading = computed(() =>
  isNotFound.value
    ? errorCopy.value.notFoundTitle || 'Page not found'
    : errorCopy.value.genericTitle || 'Something went wrong'
)
const message = computed(() =>
  isNotFound.value
    ? errorCopy.value.notFoundText || 'The page you are looking for may have been moved or removed.'
    : errorCopy.value.genericText || 'An unexpected error occurred. Please try again in a moment.'
)
const homeLabel = computed(() => errorCopy.value.homeLabel || 'Back to homepage')
</script>

<template>
  <div class="error-page">
    <div class="error-inner">
      <p class="error-code">{{ props.error?.statusCode || 500 }}</p>
      <h1>{{ heading }}</h1>
      <p class="error-message">{{ message }}</p>
      <NuxtLink to="/" class="button primary" @click="clearError({ redirect: '/' })">
        {{ homeLabel }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.error-page { display: flex; align-items: center; justify-content: center; min-height: 70vh; padding: 3rem 1.25rem; }
.error-inner { max-width: 520px; text-align: center; }
.error-code { font-size: 3rem; font-weight: 700; opacity: .35; margin: 0 0 .5rem; }
.error-inner h1 { font-size: clamp(1.6rem, 4vw, 2.2rem); margin: 0 0 1rem; color: var(--ink, #1a1a2e); }
.error-message { opacity: .8; margin-bottom: 2rem; line-height: 1.6; }
</style>

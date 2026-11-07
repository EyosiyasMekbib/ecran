<script setup lang="ts">
// ECRAN's motto, shared by every placement so the wording lives in one place.
// Editable in the CMS (Global → ui → motto); falls back to the official wording.
const { data: site } = await useAsyncData('global', getGlobal)
const motto = computed(() => (site.value as any)?.ui?.motto || 'Together for Every Child!')
</script>

<template>
  <p class="site-motto">{{ motto }}</p>
</template>

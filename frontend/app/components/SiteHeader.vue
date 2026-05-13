<script setup lang="ts">
import { navItems } from '~/data/site'

const route = useRoute()
const open = ref(false)

watch(() => route.path, () => {
  open.value = false
})
</script>

<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand-link" aria-label="ECRAN home">
      <img src="/ecran-logo.jpg" alt="ECRAN logo" class="brand-logo" />
      <span class="brand-mark">
        <strong>ECRAN</strong>
        <small>Child Rights Advocacy Network</small>
      </span>
    </NuxtLink>

    <button class="menu-button" type="button" :aria-expanded="open" aria-controls="primary-navigation" @click="open = !open">
      <span />
      <span />
      <span />
    </button>

    <nav id="primary-navigation" class="primary-nav" :class="{ 'is-open': open }" aria-label="Primary navigation">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" :class="{ active: route.path === item.to }">
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

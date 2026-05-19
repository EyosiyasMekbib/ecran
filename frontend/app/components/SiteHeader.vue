<script setup lang="ts">
import { navItems } from '~/data/site'

const route = useRoute()
const open = ref(false)
const openSubnav = ref<string | null>(null)

const isActive = (to: string) => to === '/' ? route.path === to : route.path === to || route.path.startsWith(`${to}/`)
const toggleSubnav = (to: string) => {
  openSubnav.value = openSubnav.value === to ? null : to
}

watch(() => route.path, () => {
  open.value = false
  openSubnav.value = null
})
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <NuxtLink to="/" class="brand-link" aria-label="ECRAN home">
        <img src="/ecran-logo.jpg" alt="ECRAN logo" class="brand-logo" />
        <div class="brand-mark">
          <strong>ECRAN</strong>
          <small>Ethiopian Child Rights<br/>Advocacy Network</small>
        </div>
      </NuxtLink>

      <nav id="primary-navigation" class="primary-nav" :class="{ 'is-open': open }" aria-label="Primary navigation">
        <div v-for="item in navItems" :key="item.to" class="nav-item" :class="{ 'has-children': item.children?.length }">
          <button
            v-if="item.children?.length"
            class="nav-trigger"
            type="button"
            :class="{ active: isActive(item.to) }"
            :aria-expanded="openSubnav === item.to"
            @click="toggleSubnav(item.to)"
          >
            {{ item.label }}
          </button>
          <NuxtLink v-else :to="item.to" :class="{ active: isActive(item.to) }">
            {{ item.label }}
          </NuxtLink>
          <div v-if="item.children?.length" class="subnav" :class="{ 'is-open': openSubnav === item.to }">
            <NuxtLink :to="item.to" :class="{ active: route.path === item.to }">
              Overview
            </NuxtLink>
            <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" :class="{ active: route.path === child.to }">
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </nav>

      <div class="header-actions-wrapper">
        <button class="menu-button" type="button" :aria-expanded="open" aria-controls="primary-navigation" @click="open = !open">
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

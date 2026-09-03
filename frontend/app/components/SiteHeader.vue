<script setup lang="ts">
import { navItems as staticNavItems } from '~/data/site'

// Navigation + branding come from the CMS (fallback to static data when empty/down).
const { data: nav } = await useAsyncData('navigation', getNavigation)
const { data: site } = await useAsyncData('global', getGlobal)

/**
 * The CMS navigation entry is authoritative for labels and ordering, but it is
 * edited by hand and lags the code: a page can ship, exist at its route, and still
 * be unreachable from the menu because nobody added it there. Sub-items defined in
 * the code's own structure are therefore merged in where the CMS entry omits them,
 * matched on `to` so nothing is duplicated.
 *
 * The trade-off: a child deliberately removed in the CMS comes back. Remove it from
 * `navItems` in ~/data/site.ts to drop it for good.
 */
const navItems = computed(() => {
  const cmsItems = nav.value
  if (!cmsItems || !cmsItems.length) return staticNavItems
  return cmsItems.map((item: any) => {
    const known = staticNavItems.find((entry) => entry.to === item.to)
    if (!known?.children?.length) return item
    const listed = new Set((item.children || []).map((child: any) => child.to))
    const missing = known.children.filter((child) => !listed.has(child.to))
    return missing.length ? { ...item, children: [...(item.children || []), ...missing] } : item
  })
})
const logoUrl = computed(() => strapiMedia((site.value as any)?.logo?.url) || '/ecran-logo.jpg')
const getInvolvedUrl = computed(
  () =>
    (site.value as any)?.getInvolvedUrl ||
    'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform'
)
const getInvolvedLabel = computed(() => (site.value as any)?.ui?.getInvolvedLabel || 'Get Involved')

const route = useRoute()
const open = ref(false)
const openSubnav = ref<string | null>(null)
let closeSubnavTimer: ReturnType<typeof setTimeout> | null = null

const isActive = (to: string) => to === '/' ? route.path === to : route.path === to || route.path.startsWith(`${to}/`)
const showSubnav = (to: string) => {
  if (closeSubnavTimer) {
    clearTimeout(closeSubnavTimer)
    closeSubnavTimer = null
  }
  openSubnav.value = to
}
const hideSubnav = (to: string) => {
  closeSubnavTimer = setTimeout(() => {
    if (openSubnav.value === to) {
      openSubnav.value = null
    }
    closeSubnavTimer = null
  }, 260)
}
const closeSubnavAfterFocusLeaves = (event: FocusEvent, to: string) => {
  const currentTarget = event.currentTarget
  const nextTarget = event.relatedTarget

  if (!(currentTarget instanceof HTMLElement) || !(nextTarget instanceof Node) || !currentTarget.contains(nextTarget)) {
    hideSubnav(to)
  }
}

watch(() => route.path, () => {
  open.value = false
  openSubnav.value = null
})

onBeforeUnmount(() => {
  if (closeSubnavTimer) {
    clearTimeout(closeSubnavTimer)
  }
})
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <NuxtLink to="/" class="brand-link" aria-label="ECRAN home">
        <img :src="logoUrl" alt="ECRAN logo" class="brand-logo" />
      </NuxtLink>

      <nav id="primary-navigation" class="primary-nav" :class="{ 'is-open': open }" aria-label="Primary navigation">
        <div
          v-for="item in navItems"
          :key="item.to"
          class="nav-item"
          :class="{ 'has-children': item.children?.length }"
          @mouseenter="item.children?.length && showSubnav(item.to)"
          @mouseleave="item.children?.length && hideSubnav(item.to)"
          @focusin="item.children?.length && showSubnav(item.to)"
          @focusout="item.children?.length && closeSubnavAfterFocusLeaves($event, item.to)"
        >
          <button
            v-if="item.children?.length"
            class="nav-trigger"
            type="button"
            :class="{ active: isActive(item.to) }"
            :aria-expanded="openSubnav === item.to"
            @click="showSubnav(item.to)"
          >
            {{ item.label }}
          </button>
          <NuxtLink v-else :to="item.to" :class="{ active: isActive(item.to) }">
            {{ item.label }}
          </NuxtLink>
          <div
            v-if="item.children?.length"
            class="subnav"
            :class="{ 'is-open': openSubnav === item.to }"
            @mouseenter="showSubnav(item.to)"
            @mouseleave="hideSubnav(item.to)"
          >
            <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" :class="{ active: route.path === child.to }">
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </nav>

      <div class="header-actions-wrapper">
        <a :href="getInvolvedUrl" target="_blank" rel="noopener noreferrer" class="header-cta">{{ getInvolvedLabel }}</a>
        <button class="menu-button" type="button" :aria-expanded="open" aria-controls="primary-navigation" @click="open = !open">
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

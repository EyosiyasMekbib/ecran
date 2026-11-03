<script setup lang="ts">
import { navItems as staticNavItems } from '~/data/site'

// Navigation + branding come from the CMS (fallback to static data when empty/down).
const { data: nav } = await useAsyncData('navigation', getNavigation)
const { data: site } = await useAsyncData('global', getGlobal)

// The CMS navigation entry is authoritative for labels and ordering; mergeLinks keeps it
// in step with the code's own structure, which is where a new page first appears.
const navItems = computed(() => {
  const cmsItems = nav.value
  if (!cmsItems || !cmsItems.length) return staticNavItems

  const withChildren = cmsItems.map((item: any) => {
    const known = staticNavItems.find((entry) => entry.to === item.to)
    return known?.children?.length ? { ...item, children: mergeLinks(item.children || [], known.children) } : item
  })
  return mergeLinks<any>(withChildren, staticNavItems)
})
const cmsLogo = computed(() => strapiMedia((site.value as any)?.logo?.url))
const logoUrl = computed(() => cmsLogo.value || '/ecran-logo.jpg')
// The header logo is the mobile LCP element: serve the built-in one as sized WebP.
const logoSrcset = computed(() =>
  cmsLogo.value ? undefined : '/ecran-logo-192.webp 192w, /ecran-logo.webp 316w'
)
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
        <img
          :src="logoUrl"
          :srcset="logoSrcset"
          sizes="(max-width: 560px) 96px, 165px"
          width="316"
          height="184"
          alt="ECRAN logo"
          class="brand-logo"
          fetchpriority="high"
        />
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
            :class="{ active: isActive(item.to) || item.children.some((child: any) => isActive(child.to)) }"
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
        <button
          class="menu-button"
          type="button"
          :aria-expanded="open"
          aria-controls="primary-navigation"
          aria-label="Toggle navigation menu"
          @click="open = !open"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

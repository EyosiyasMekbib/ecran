<script setup lang="ts">
const { data: site } = await useAsyncData('global', getGlobal)
const getInvolvedUrl = computed(
  () =>
    (site.value as any)?.getInvolvedUrl ||
    'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform'
)

// Baked-in fallback — used only when the CMS has no `get-involved` page entry.
const fallbackCards = [
  {
    title: 'Become a member',
    text: 'Join a coordinated network of organizations committed to child survival, development, protection, and participation.',
    linkLabel: 'Start a membership inquiry',
    linkTo: 'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform'
  },
  {
    title: 'Partner on advocacy',
    text: 'Collaborate on evidence briefs, policy dialogue, public campaigns, and shared accountability moments.',
    linkLabel: 'Explore current resources',
    linkTo: '/resources'
  },
  {
    title: 'Support capacity building',
    text: 'Help member organizations strengthen safeguarding practice, data use, child participation, and advocacy planning.',
    linkLabel: 'View member network',
    linkTo: '/who-we-are/our-members'
  },
  {
    title: 'Share opportunities',
    text: 'Send consultancies, events, procurement notices, and coalition opportunities that can serve ECRAN’s members.',
    linkLabel: 'Contact the coordination team',
    linkTo: '/contact'
  }
]

const { data: page } = await useAsyncData('page-get-involved', () => getPage('get-involved'))
await useSeo(page.value)
const cards = computed(() => {
  const list = Array.isArray(page.value?.sections?.cards) ? page.value.sections.cards : fallbackCards
  return list.map((c: any) => {
    // If the CMS has old '/contact' for Become a member, point to the official form
    if (c.title === 'Become a member' && (!c.linkTo || c.linkTo === '/contact')) {
      return { ...c, linkTo: getInvolvedUrl.value }
    }
    return c
  })
})
</script>

<template>
  <div id="get-involved" class="get-involved-page">
    <PageHero
      :eyebrow="page?.sections?.heroEyebrow || 'Get involved'"
      :title="page?.heroTitle || 'Partner with ECRAN to strengthen child-rights advocacy in Ethiopia.'"
      :text="page?.heroText || 'ECRAN works with civil society organizations, public institutions, donors, researchers, and community actors who want evidence to move into coordinated action.'"
    />

    <section id="become-a-member" class="governance-grid">
      <article v-for="(card, i) in cards" :key="card.title">
        <span>{{ String(i + 1).padStart(2, '0') }}</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.text }}</p>
        <NuxtLink v-if="card.linkTo && card.linkTo.startsWith('/')" :to="card.linkTo">{{ card.linkLabel }}</NuxtLink>
        <a v-else :href="card.linkTo || getInvolvedUrl" target="_blank" rel="noopener noreferrer">{{ card.linkLabel }} &rarr;</a>
      </article>
    </section>
  </div>
</template>

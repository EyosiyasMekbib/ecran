<script setup lang="ts">
const { data: page } = await useAsyncData('page-our-works', () => getPage('our-works'))

await useSeo(page.value)

// Baked-in fallback cards — used only when the CMS page has no `sections.cards`.
const fallbackCards = [
  {
    title: 'ASFP',
    text: "Advocacy and Social Frontline Program — coordinating frontline civil society actors for stronger child-rights advocacy across Ethiopia's regions.",
    linkLabel: 'Learn about ASFP',
    linkTo: '/our-works/asfp'
  },
  {
    title: 'Evidence & Policy',
    text: 'Turning research, field learning, and child-rights data into policy asks that decision makers can act on.'
  },
  {
    title: 'Child Protection Systems',
    text: 'Supporting stronger prevention, reporting, referral, and response pathways for children at risk of violence or neglect.'
  },
  {
    title: 'Child Participation',
    text: 'Creating safe spaces where children and young people can contribute to decisions that affect their lives.'
  }
]

const cards = computed(() =>
  Array.isArray(page.value?.sections?.cards) ? page.value.sections.cards : fallbackCards
)
</script>

<template>
  <PageHero
    :eyebrow="page?.sections?.heroEyebrow || 'Our Works / ሥራዎቻችን'"
    :title="page?.heroTitle || 'Programs and initiatives advancing child rights across Ethiopia.'"
    :text="page?.heroText || 'ECRAN coordinates evidence-based programs that strengthen child protection systems, participation, and policy advocacy at national and regional levels.'"
  />

  <section class="split-section">
    <div>
      <p class="eyebrow">{{ page?.sections?.approachEyebrow || 'Our approach' }}</p>
      <h2>{{ page?.sections?.approachTitle || 'From evidence to coordinated action for children.' }}</h2>
    </div>
    <p>
      {{ page?.body || "Our works span research, capacity building, policy dialogue, and direct network coordination — all focused on turning field learning into change for children's rights in Ethiopia." }}
    </p>
  </section>

  <div class="section-light-blue">
    <section class="governance-grid our-works-grid">
      <article v-for="(card, i) in cards" :key="card.title">
        <span>{{ String(i + 1).padStart(2, '0') }}</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.text }}</p>
        <NuxtLink v-if="card.linkTo" :to="card.linkTo">{{ card.linkLabel }}</NuxtLink>
      </article>
    </section>
  </div>
</template>

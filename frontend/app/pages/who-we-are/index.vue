<script setup lang="ts">
const { data: page } = await useAsyncData('page-who-we-are', () => getPage('who-we-are'))

// Baked-in fallback cards — used only when the CMS page has no `sections.cards`.
const fallbackCards = [
  {
    title: 'About Us',
    text: 'ECRAN’s purpose, mission, vision, legal status, and evidence-led approach to child-rights advocacy.',
    linkLabel: 'Read about us',
    linkTo: '/who-we-are/about-us'
  },
  {
    title: 'Our Members',
    text: 'The organizations and practitioners who contribute field learning, technical expertise, and shared advocacy priorities.',
    linkLabel: 'Meet our members',
    linkTo: '/who-we-are/our-members'
  },
  {
    title: 'Our Team',
    text: 'The coordination team supporting governance, programs, partnerships, communication, and accountable delivery.',
    linkLabel: 'See our team',
    linkTo: '/who-we-are/our-team'
  },
  {
    title: 'Governance',
    text: 'Transparent leadership, board oversight, and member-informed priorities guide ECRAN’s advocacy agenda.'
  }
]

const cards = computed(() =>
  Array.isArray(page.value?.sections?.cards) ? page.value.sections.cards : fallbackCards
)
</script>

<template>
  <PageHero
    eyebrow="Who we are"
    :title="page?.heroTitle || 'An Ethiopian network built for credible, coordinated child-rights advocacy.'"
    :text="page?.heroText || 'ECRAN is an independent not-for-profit organization established in 2025 and registered by the Agency for Civil Societies Organizations as a local organization.'"
  />

  <section class="split-section">
    <div>
      <p class="eyebrow">Background</p>
      <h2>{{ page?.sections?.backgroundTitle || 'Designed to connect evidence with the people who can act on it.' }}</h2>
    </div>
    <p>
      {{ page?.body || 'The network strengthens visibility, communication, partnership engagement, and resource mobilization for child-rights work in Ethiopia. It exists to help members and partners move from fragmented concern to coordinated advocacy.' }}
    </p>
  </section>

  <section class="governance-grid">
    <article v-for="(card, i) in cards" :key="card.title">
      <span>{{ String(i + 1).padStart(2, '0') }}</span>
      <h2>{{ card.title }}</h2>
      <p>{{ card.text }}</p>
      <NuxtLink v-if="card.linkTo" :to="card.linkTo">{{ card.linkLabel }}</NuxtLink>
    </article>
  </section>
</template>

<script setup lang="ts">
// Card icons + copy are CMS-managed via page slug "news-hub"
// (sections.iconPaths, sections.cards) with the current values as fallbacks.
const fallbackIconPaths = [
  'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V12L16.25,15.15L17,13.92L12.5,11.25V6H11Z',
  'M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H20V6H4M6,9H9V12H6V9M11,9H18V10H11V9M11,11H18V12H11V11M6,14H18V15H6V14Z',
  'M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.47 22,8V18C22,18.58 21.8,19.05 21.42,19.42C21.05,19.8 20.58,20 20,20H4C3.42,20 2.95,19.8 2.58,19.42C2.2,19.05 2,18.58 2,18V8C2,7.47 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M10,4V6H14V4H10M20,8H4V18H20V8Z',
  'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12H16V14H8V12M8,16H16V18H8V16Z'
]

const fallbackCards = [
  {
    title: 'News',
    text: "Read about ECRAN's latest public updates, child-rights summits, workshops, and network reports.",
    linkLabel: 'Go to news',
    linkTo: '/news/news'
  },
  {
    title: 'Media Center',
    text: "Access ECRAN's press statements, official joint releases, and multi-stakeholder gallery archives.",
    linkLabel: 'Go to media center',
    linkTo: '/news/media-center'
  },
  {
    title: 'Vacancies',
    text: "Join ECRAN's team. Explore professional roles, consultancies, and career paths in child-rights advocacy.",
    linkLabel: 'Go to vacancies',
    linkTo: '/news/vacancies'
  },
  {
    title: 'Bids & Tenders',
    text: 'View open requests for proposals, consultancy services, and procurement notices for ECRAN projects.',
    linkLabel: 'Go to bids',
    linkTo: '/news/bids'
  }
]

const { data: page } = await useAsyncData('page-news-hub', () => getPage('news-hub'))
await useSeo(page.value)

const iconPaths = computed(() =>
  Array.isArray(page.value?.sections?.iconPaths) && page.value.sections.iconPaths.length
    ? page.value.sections.iconPaths
    : fallbackIconPaths
)
const cards = computed(() =>
  Array.isArray(page.value?.sections?.cards) ? page.value.sections.cards : fallbackCards
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'ECRAN news hub'"
    :text="page?.heroText || `Follow ECRAN's progress, explore career opportunities, browse media releases, and view active procurement notices.`"
  />

  <section class="news-index-grid-section">
    <div class="news-index-grid">
      <article v-for="(card, i) in cards" :key="card.title" class="news-index-card">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path fill="currentColor" :d="iconPaths[i % iconPaths.length]" />
          </svg>
        </div>
        <h2>{{ card.title }}</h2>
        <p>{{ card.text }}</p>
        <NuxtLink :to="card.linkTo" class="button secondary">{{ card.linkLabel }} &rarr;</NuxtLink>
      </article>
    </div>
  </section>
</template>

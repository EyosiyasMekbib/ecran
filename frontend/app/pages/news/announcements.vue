<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no published announcement posts.
const fallback = [
  {
    date: 'May 15, 2026',
    title: 'National Child Rights Advocacy Summit 2026 Announced',
    excerpt: 'ECRAN is hosting the annual Child Rights Advocacy Summit next month in Addis Ababa, convening civil society organizations, government officials, and international development partners to align on national child protection policies.'
  },
  {
    date: 'April 28, 2026',
    title: 'Launch of the CSOs Complimentary Report on Child Rights',
    excerpt: 'We are pleased to announce the upcoming launch of our Complimentary Report on the implementation of the UN Convention on the Rights of the Child (UNCRC) in Ethiopia. A stakeholder validation workshop will be held next week.'
  },
  {
    date: 'April 12, 2026',
    title: 'Advocacy & Child Safeguarding Training for Member CSOs',
    excerpt: 'ECRAN will conduct a three-day intensive capacity building workshop focusing on child-led advocacy, ethical participation, and community protection systems for member organizations in the regional states.'
  }
]

const { data: cmsPosts } = await useAsyncData('posts-announcement', () => getPosts('announcement'))
const { data: page } = await useAsyncData('page-announcements', () => getPage('announcements'))
await useSeo(page.value)

const articles = computed(() => (cmsPosts.value?.length ? cmsPosts.value : fallback))
const badgeLabel = computed(() => page.value?.sections?.badgeLabel || 'Announcement')
const readMoreLabel = computed(() => page.value?.sections?.readMoreLabel || 'Read full story')
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'News & Announcements'"
    :text="page?.heroText || `Stay up to date with ECRAN's latest public announcements, press releases, events, advocacy campaigns, and workshops.`"
  />

  <section class="announcements-list-section">
    <div class="announcements-grid">
      <article v-for="article in articles" :key="article.title" class="announcement-item">
        <div class="announcement-meta">
          <span class="announcement-date">{{ article.date }}</span>
          <span class="announcement-badge">{{ badgeLabel }}</span>
        </div>
        <h2>{{ article.title }}</h2>
        <p>{{ article.excerpt }}</p>
        <NuxtLink v-if="article.slug" :to="`/news/${article.slug}`" class="read-more-link">{{ readMoreLabel }} &rarr;</NuxtLink>
        <span v-else class="read-more-link">{{ readMoreLabel }} &rarr;</span>
      </article>
    </div>
  </section>
</template>

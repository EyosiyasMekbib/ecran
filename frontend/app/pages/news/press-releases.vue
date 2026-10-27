<script setup lang="ts">
// Press Releases page. Connects to posts categorized as press-release or media.
const fallback = [
  {
    slug: 'joint-statement-on-regional-child-rights-compliance-in-ethiopia',
    type: 'Press Release',
    title: 'Joint Statement on Regional Child Rights Compliance in Ethiopia',
    date: 'May 10, 2026',
    desc: 'Read the official statement jointly released by ECRAN and member CSOs regarding policy compliance checks across regional child protection structures.',
    ctaLabel: 'Read press release'
  },
  {
    slug: 'ecran-announces-general-assembly-and-executive-council-election-results',
    type: 'Press Release',
    title: 'ECRAN Announces General Assembly & Executive Council Election Results',
    date: 'April 15, 2026',
    desc: 'The network is proud to share updates from its first formal General Assembly, highlighting the appointment of its new Executive board members.',
    ctaLabel: 'Read press release'
  }
]

const { data: cmsPosts } = await useAsyncData('posts-press-releases', () => getPosts('press-release'))
const { data: page } = await useAsyncData('page-press-releases', async () => {
  const p = await getPage('press-releases')
  if (p) return p
  return getPage('media-center')
})
await useSeo(page.value)

const defaultTypeLabel = computed(() => page.value?.sections?.typeLabel || 'Press Release')
const defaultCtaLabel = computed(() => page.value?.sections?.ctaLabel || 'Read press release')
const items = computed(() =>
  cmsPosts.value?.length
    ? cmsPosts.value.map((p) => ({
        slug: p.slug,
        type: p.location || defaultTypeLabel.value,
        title: p.title,
        date: p.date,
        desc: p.excerpt,
        ctaLabel: p.ctaLabel || defaultCtaLabel.value
      }))
    : fallback
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'Press Releases'"
    :text="page?.heroText || 'Official statements, joint declarations, and media announcements from ECRAN and coalition partners.'"
  />

  <section class="media-center-section">
    <div v-if="items.length" class="media-grid">
      <article v-for="item in items" :key="item.title" class="media-card">
        <div class="media-meta">
          <span>{{ item.type }}</span>
          <time v-if="item.date">{{ item.date }}</time>
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
        <NuxtLink v-if="item.slug" :to="`/news/${item.slug}`" class="text-action">{{ item.ctaLabel || defaultCtaLabel }} &rarr;</NuxtLink>
        <span v-else class="text-action">{{ item.ctaLabel || defaultCtaLabel }} &rarr;</span>
      </article>
    </div>
    <div v-else class="press-releases-empty">
      <p>No press releases published yet. Check back soon for official statements and network declarations.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no published media posts.
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
    slug: 'consultative-assembly-on-child-protection-systems',
    type: 'Gallery',
    title: 'Consultative Assembly on Child Protection Systems',
    date: 'May 02, 2026',
    desc: 'Photos and summaries from the multi-stakeholder policy dialogue convening 40+ member network delegates.',
    ctaLabel: 'View details'
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

const { data: cmsPosts } = await useAsyncData('posts-media', () => getPosts('media'))
const { data: page } = await useAsyncData('page-media-center', () => getPage('media-center'))
await useSeo(page.value)

const defaultTypeLabel = computed(() => page.value?.sections?.typeLabel || 'Press Release')
const defaultCtaLabel = computed(() => page.value?.sections?.ctaLabel || 'View details')
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
    :title="page?.heroTitle || 'Media Center'"
    :text="page?.heroText || 'Access press releases, official statements, event photo galleries, and institutional video resources.'"
  />

  <section class="media-center-section">
    <div class="media-grid">
      <article v-for="item in items" :key="item.title" class="media-card">
        <div class="media-meta">
          <span>{{ item.type }}</span>
          <time>{{ item.date }}</time>
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
        <NuxtLink v-if="item.slug" :to="`/news/${item.slug}`" class="text-action">{{ item.ctaLabel || defaultCtaLabel }} &rarr;</NuxtLink>
        <span v-else class="text-action">{{ item.ctaLabel || defaultCtaLabel }} &rarr;</span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
// Clean bids data — no mock/sample bids. Real bids will appear when published in Strapi.
const fallback: any[] = []

const { data: cmsPosts } = await useAsyncData('posts-bid', () => getPosts('bid'))
const { data: page } = await useAsyncData('page-bids', () => getPage('bids'))
await useSeo(page.value)

const defaultRef = computed(() => page.value?.sections?.refFallback || 'ECRAN')
const defaultCtaLabel = computed(() => page.value?.sections?.ctaLabel || 'Request tender documents')
const refLabel = computed(() => page.value?.sections?.refLabel || 'Ref:')
const publishedLabel = computed(() => page.value?.sections?.publishedLabel || 'Published:')
const deadlineLabel = computed(() => page.value?.sections?.deadlineLabel || 'Deadline:')
const defaultStatusOpen = computed(() => page.value?.sections?.statusOpenLabel || 'Open')
const defaultStatusClosed = computed(() => page.value?.sections?.statusClosedLabel || 'Closed')

// A bid is "Open" while its deadline is in the future (or when no deadline is set).
const bids = computed(() =>
  cmsPosts.value?.length
    ? cmsPosts.value.map((p) => ({
        slug: p.slug,
        title: p.title,
        reference: p.location || defaultRef.value,
        status: !p.deadline || new Date(p.deadline) >= new Date() ? defaultStatusOpen.value : defaultStatusClosed.value,
        published: p.date,
        deadline: p.deadline,
        description: p.excerpt,
        ctaLabel: p.ctaLabel || defaultCtaLabel.value
      }))
    : fallback
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'Bids & Tenders'"
    :text="page?.heroText || 'View open procurement bids, requests for proposals (RFPs), and consultancy opportunities with ECRAN.'"
  />

  <section class="bids-list-section">
    <div v-if="bids.length" class="bids-grid">
      <article v-for="bid in bids" :key="bid.title" class="bid-card" :class="{ 'is-closed': bid.status === 'Closed' }">
        <div class="bid-meta">
          <span class="bid-ref">{{ refLabel }} {{ bid.reference }}</span>
          <span class="bid-status" :class="bid.status.toLowerCase()">{{ bid.status }}</span>
        </div>
        <h2>{{ bid.title }}</h2>
        <div class="bid-dates">
          <span><strong>{{ publishedLabel }}</strong> {{ bid.published }}</span>
          <span><strong>{{ deadlineLabel }}</strong> {{ bid.deadline }}</span>
        </div>
        <p>{{ bid.description }}</p>
        <div class="bid-actions" v-if="bid.status === 'Open'">
          <NuxtLink v-if="bid.slug" :to="`/news/${bid.slug}`" class="button secondary">{{ bid.ctaLabel || defaultCtaLabel }}</NuxtLink>
          <span v-else class="button secondary">{{ bid.ctaLabel || defaultCtaLabel }}</span>
        </div>
      </article>
    </div>

    <div v-else class="bids-empty-state">
      <div class="bids-empty-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h3>No Open Bids or Tenders</h3>
      <p>There are currently no open procurement notices, requests for proposals (RFPs), or consultancy tenders. Please check back regularly for upcoming opportunities.</p>
    </div>
  </section>
</template>

<style scoped>
.bids-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  max-width: 38rem;
  margin: 0 auto;
  border-radius: 1rem;
  background: var(--soft, #f8fafc);
  border: 1px dashed var(--line, #e2e8f0);
}

.bids-empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: #fff;
  color: var(--primary, #24306f);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 1.25rem;
}

.bids-empty-state h3 {
  font-family: var(--font-heading, inherit);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--dark, #06172f);
  margin: 0 0 0.5rem;
}

.bids-empty-state p {
  color: var(--muted, #64748b);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}
</style>

<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no published bid posts.
const fallback = [
  {
    slug: 'consultancy-service-midterm-review-of-ecran-strategic-plan',
    title: 'Consultancy Service: Midterm Review of ECRAN Strategic Plan',
    reference: 'ECRAN/RFP/2026/04',
    status: 'Open',
    published: 'May 10, 2026',
    deadline: 'June 2, 2026',
    description: 'ECRAN invites qualified national consultants to submit proposals to conduct a comprehensive midterm review of our 5-year strategic plan, evaluating advocacy outcomes, partnership efficacy, and internal operations.'
  },
  {
    slug: 'supply-and-delivery-of-it-equipment-and-networking-hardware',
    title: 'Supply and Delivery of IT Equipment and Networking Hardware',
    reference: 'ECRAN/IT/2026/02',
    status: 'Closed',
    published: 'April 15, 2026',
    deadline: 'May 5, 2026',
    description: 'Bids are invited from eligible vendors for the supply of laptops, desktops, server infrastructure, and network configurations to support our new regional coordination nodes.'
  }
]

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
    <div class="bids-grid">
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
  </section>
</template>

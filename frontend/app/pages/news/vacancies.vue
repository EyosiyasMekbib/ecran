<script setup lang="ts">
// No baked-in vacancies: an unfilled listing is a real job someone would apply to,
// so this page shows only what the CMS actually publishes.
const { data: cmsPosts } = await useAsyncData('posts-vacancy', () => getPosts('vacancy'))
const { data: page } = await useAsyncData('page-vacancies', () => getPage('vacancies'))
await useSeo(page.value)

const defaultTypeBadge = computed(() => page.value?.sections?.typeBadge || 'Vacancy')
const defaultCtaLabel = computed(() => page.value?.sections?.ctaLabel || 'Apply now')
const locationLabel = computed(() => page.value?.sections?.locationLabel || 'Location:')
const deadlineLabel = computed(() => page.value?.sections?.deadlineLabel || 'Deadline:')
const emptyState = computed(
  () => page.value?.sections?.emptyState || 'There are no open vacancies at the moment. Please check back later.'
)
const vacancies = computed(() =>
  (cmsPosts.value || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    location: p.location,
    deadline: p.deadline,
    excerpt: p.excerpt,
    department: p.department || '',
    type: p.employmentType || defaultTypeBadge.value,
    ctaLabel: p.ctaLabel || defaultCtaLabel.value
  }))
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'Vacancies'"
    :text="page?.heroText || `Join ECRAN and help us shape policy, build community capacity, and protect children's rights across Ethiopia.`"
  />

  <section class="vacancies-list-section">
    <p v-if="!vacancies.length" class="vacancies-empty">{{ emptyState }}</p>
    <div v-else class="vacancies-grid">
      <article v-for="job in vacancies" :key="job.title" class="vacancy-card">
        <div class="vacancy-meta">
          <span class="vacancy-dept">{{ job.department }}</span>
          <span class="vacancy-type">{{ job.type }}</span>
        </div>
        <h2>{{ job.title }}</h2>
        <div class="vacancy-details">
          <span><strong>{{ locationLabel }}</strong> {{ job.location }}</span>
          <span><strong>{{ deadlineLabel }}</strong> {{ job.deadline }}</span>
        </div>
        <p>{{ job.excerpt }}</p>
        <div class="vacancy-actions">
          <NuxtLink v-if="job.slug" :to="`/news/${job.slug}`" class="button secondary">{{ job.ctaLabel || defaultCtaLabel }}</NuxtLink>
          <span v-else class="button secondary">{{ job.ctaLabel || defaultCtaLabel }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no published vacancy posts.
const fallback = [
  {
    title: 'Senior Policy Advocacy Officer',
    location: 'Addis Ababa, Ethiopia',
    deadline: 'June 5, 2026',
    excerpt: 'ECRAN is looking for an experienced advocate to lead our policy engagement and coordinate research initiatives, translating child-rights field evidence into policy briefs.',
    department: 'Programs & Advocacy',
    type: 'Full-time'
  },
  {
    title: 'Monitoring, Evaluation, & Learning (MEL) Specialist',
    location: 'Addis Ababa (with regional travel)',
    deadline: 'June 12, 2026',
    excerpt: 'We are seeking a MEL Specialist to design and implement monitoring systems across network activities, helping to track the implementation of regional and national child-rights advocacy.',
    department: 'Programs & MEL',
    type: 'Full-time'
  }
]

const { data: cmsPosts } = await useAsyncData('posts-vacancy', () => getPosts('vacancy'))
const { data: page } = await useAsyncData('page-vacancies', () => getPage('vacancies'))
const vacancies = computed(() =>
  cmsPosts.value?.length
    ? cmsPosts.value.map((p) => ({
        title: p.title,
        location: p.location,
        deadline: p.deadline,
        excerpt: p.excerpt,
        department: 'ECRAN',
        type: 'Vacancy'
      }))
    : fallback
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'Vacancies'"
    :text="page?.heroText || `Join ECRAN and help us shape policy, build community capacity, and protect children's rights across Ethiopia.`"
  />

  <section class="vacancies-list-section">
    <div class="vacancies-grid">
      <article v-for="job in vacancies" :key="job.title" class="vacancy-card">
        <div class="vacancy-meta">
          <span class="vacancy-dept">{{ job.department }}</span>
          <span class="vacancy-type">{{ job.type }}</span>
        </div>
        <h2>{{ job.title }}</h2>
        <div class="vacancy-details">
          <span><strong>Location:</strong> {{ job.location }}</span>
          <span><strong>Deadline:</strong> {{ job.deadline }}</span>
        </div>
        <p>{{ job.excerpt }}</p>
        <div class="vacancy-actions">
          <NuxtLink to="/contact" class="button secondary">Apply now</NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

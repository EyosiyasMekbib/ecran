<script setup lang="ts">
const vacancies = [
  {
    title: 'Senior Policy Advocacy Officer',
    department: 'Programs & Advocacy',
    type: 'Full-time',
    location: 'Addis Ababa, Ethiopia',
    deadline: 'June 5, 2026',
    description: 'ECRAN is looking for an experienced advocate to lead our policy engagement and coordinate research initiatives, translating child-rights field evidence into policy briefs.'
  },
  {
    title: 'Monitoring, Evaluation, & Learning (MEL) Specialist',
    department: 'Programs & MEL',
    type: 'Full-time',
    location: 'Addis Ababa (with regional travel)',
    deadline: 'June 12, 2026',
    description: 'We are seeking a MEL Specialist to design and implement monitoring systems across network activities, helping to track the implementation of regional and national child-rights advocacy.'
  }
]
</script>

<template>
  <PageHero
    eyebrow="News & Careers"
    title="Vacancies"
    text="Join ECRAN and help us shape policy, build community capacity, and protect children's rights across Ethiopia."
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
        <p>{{ job.description }}</p>
        <div class="vacancy-actions">
          <NuxtLink to="/contact" class="button secondary">Apply now</NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

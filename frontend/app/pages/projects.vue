<script setup lang="ts">
// Projects are the CMS `program` entries. Only the Sida programme is featured as requested.
const { data: rawProjects } = await useAsyncData('projects-programs', getPrograms)
const { data: page } = await useAsyncData('page-projects', () => getPage('projects'))

await useSeo(page.value)

const emptyState = computed(() => page.value?.sections?.emptyState || 'No projects yet.')
const listEyebrow = computed(() => page.value?.sections?.listEyebrow || 'Current portfolio')

const legacyPlaceholders = [
  'evidence and policy advocacy',
  'child protection systems',
  'child participation',
  'network coordination'
]

const projects = computed(() => {
  const list = rawProjects.value || []
  if (!list.length) {
    return [
      {
        title: 'Civil Society Strengthening Programme for Children Rights',
        text: 'Project kick-off with Sida (Sweden), running from 2026 to 2029 to strengthen child-centered community systems for children, youth, women, and families.',
        body: '<p><strong>Funder:</strong> Sida (Sweden / Sverige)</p><p><strong>Duration:</strong> 2026 to 2029</p><h3>Objective</h3><p>Strengthen child-centered community systems.</p><h3>Served</h3><p>Children, youth, women, families.</p><h3>Outcome</h3><p>Dignity, access, protection, resilience.</p>',
        image: '/brand/network-card.svg'
      }
    ]
  }
  const filtered = list.filter((p: any) => !legacyPlaceholders.includes(p.title?.toLowerCase().trim()))
  return filtered.length ? filtered : list
})

const countLabel = computed(() =>
  (projects.value?.length || 0) === 1 ? 'project' : 'projects'
)
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'Projects'"
    :text="page?.heroText || 'Coordinated initiatives and strategic programmes advancing child rights, protection, and community resilience in Ethiopia.'"
  />

  <section class="projects-section">
    <div v-if="projects && projects.length" class="projects-lead">
      <p class="eyebrow">{{ listEyebrow }}</p>
      <p class="projects-count">
        <strong>{{ String(projects.length).padStart(2, '0') }}</strong>
        <span>{{ countLabel }}</span>
      </p>
    </div>

    <div v-if="projects && projects.length" class="projects-list">
      <article v-for="(project, i) in projects" :key="project.title" class="project-entry">
        <div class="project-entry-media">
          <img v-if="project.image" :src="project.image" :alt="project.title" loading="lazy" />
          <span class="project-entry-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
        <div class="project-entry-body">
          <h2>{{ project.title }}</h2>
          <p class="project-entry-summary">{{ project.text }}</p>
          <!-- Rich body from the CMS (trusted content) -->
          <div v-if="project.body" class="project-entry-detail" v-html="project.body" />
        </div>
      </article>
    </div>

    <p v-else class="projects-empty">{{ emptyState }}</p>
  </section>
</template>

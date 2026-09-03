<script setup lang="ts">
// Projects are the CMS `program` entries — that collection already models what a
// project needs (title, summary, body, image, order).
const { data: projects } = await useAsyncData('projects-programs', getPrograms)
const { data: page } = await useAsyncData('page-projects', () => getPage('projects'))

await useSeo(page.value)

const emptyState = computed(() => page.value?.sections?.emptyState || 'No projects yet.')
const listEyebrow = computed(() => page.value?.sections?.listEyebrow || 'Current portfolio')
const countLabel = computed(() =>
  (projects.value?.length || 0) === 1 ? 'project' : 'projects'
)
</script>

<template>
  <PageHero
    class="resources-hero"
    :title="page?.heroTitle || 'Projects'"
    :text="page?.heroText || 'Each project is coordinated with member organizations and partners — spanning evidence and policy advocacy, protection systems, participation, and network coordination.'"
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

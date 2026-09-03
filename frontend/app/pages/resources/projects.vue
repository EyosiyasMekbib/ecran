<script setup lang="ts">
// Projects are the CMS `program` entries — the collection already models exactly
// what a project card needs (title, summary, body, image, order).
const { data: projects } = await useAsyncData('projects-programs', getPrograms)
const { data: page } = await useAsyncData('page-projects', () => getPage('projects'))

await useSeo(page.value)

const emptyState = computed(
  () => page.value?.sections?.emptyState || 'Projects appear here once programs are published in the CMS.'
)
</script>

<template>
  <PageHero
    :eyebrow="page?.sections?.heroEyebrow || 'Projects'"
    :title="page?.heroTitle || 'Projects turning child-rights evidence into coordinated action.'"
    :text="page?.heroText || 'Each project below is a program ECRAN coordinates with members and partners — spanning evidence and policy advocacy, protection systems, participation, and network coordination.'"
  />

  <section class="projects-section">
    <div v-if="projects && projects.length" class="projects-grid">
      <article v-for="(project, i) in projects" :key="project.title" class="project-card">
        <div v-if="project.image" class="project-card-media">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="project-card-body">
          <span class="project-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2>{{ project.title }}</h2>
          <p>{{ project.text }}</p>
        </div>
      </article>
    </div>
    <p v-else class="projects-empty">{{ emptyState }}</p>
  </section>
</template>

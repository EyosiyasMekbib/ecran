<script setup lang="ts">
// Sourced from the Strapi CMS at build/SSR time, with static fallback (see composables/useStrapi.ts).
const { data: impactStories } = await useAsyncData('impact-stories', () => getImpactStories())
const { data: page } = await useAsyncData('page-impact-stories', () => getPage('impact-stories'))

await useSeo(page.value)

// Editable section copy — CMS-managed via page `impact-stories` sections.*, current copy as fallback.
const heroEyebrow = computed(() => page.value?.sections?.heroEyebrow || 'Impact stories')
const connectCtaLabel = computed(() => page.value?.sections?.connectCtaLabel || 'Connect with ECRAN')
</script>

<template>
  <PageHero
    :eyebrow="heroEyebrow"
    :title="page?.heroTitle || 'Stories from ECRAN’s network of child-rights advocates.'"
    :text="page?.heroText || 'These stories highlight how shared evidence, member coordination, and policy dialogue help child-rights work travel further.'"
  />

  <section class="news-section">
    <div class="news-grid" aria-label="Impact stories">
      <article v-for="story in impactStories" :key="story.title" class="news-card">
        <div class="news-card-meta">
          <span class="news-tag">{{ story.place }}</span>
        </div>
        <div class="news-card-content">
          <h2>{{ story.title }}</h2>
          <p>{{ story.text }}</p>
        </div>
        <div class="news-card-footer">
          <NuxtLink to="/contact" class="news-link">
            {{ connectCtaLabel }} <span class="arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

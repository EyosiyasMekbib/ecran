<script setup lang="ts">
// Gallery: photo and video albums from the CMS, plus photos already attached to posts.
const { data: items } = await useAsyncData('gallery-items', getGalleryItems)
const { data: page } = await useAsyncData('page-gallery', () => getPage('gallery'))
await useSeo(page.value, { title: page.value?.seoTitle || 'Gallery' })

const allItems = computed(() => items.value || [])
const activeFilter = ref('all')
// Filtering only helps once there are both photos and videos to choose between.
const filters = computed(() =>
  new Set(allItems.value.map((item) => item.kind)).size > 1
    ? [
        { id: 'all', label: 'All' },
        { id: 'image', label: 'Photos' },
        { id: 'video', label: 'Videos' }
      ]
    : []
)
const visibleItems = computed(() =>
  activeFilter.value === 'all' ? allItems.value : allItems.value.filter((item) => item.kind === activeFilter.value)
)
</script>

<template>
  <div class="gallery-page">
    <PageHero
      class="news-hero"
      :eyebrow="page?.sections?.heroEyebrow || 'Gallery'"
      :title="page?.heroTitle || `Photos and videos from ECRAN's work.`"
      :text="page?.heroText || `A visual record of ECRAN's assemblies, trainings, and child-rights advocacy across Ethiopia.`"
    />

    <section class="gallery-section">
      <div v-if="filters.length" class="gallery-filter-bar" role="group" aria-label="Filter gallery">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          :aria-pressed="activeFilter === f.id"
          class="gallery-filter-btn"
          :class="{ active: activeFilter === f.id }"
          @click="activeFilter = f.id"
        >
          {{ f.label }}
        </button>
      </div>

      <MediaGallery v-if="visibleItems.length" :images="visibleItems" title="ECRAN gallery" album />
      <div v-else class="gallery-empty">
        <h2>{{ page?.sections?.emptyTitle || 'Our gallery is being organized.' }}</h2>
        <p>{{ page?.sections?.emptyText || 'Photos and videos from our work across Ethiopia will appear here.' }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gallery-section {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

.gallery-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.gallery-filter-btn {
  padding: 0.5rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid var(--line, #cbd5e1);
  background: #fff;
  color: var(--dark, #06172f);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-filter-btn:hover {
  border-color: var(--primary, #24306f);
  color: var(--primary, #24306f);
  background: var(--soft, #f8fafc);
}

.gallery-filter-btn.active {
  background: var(--primary, #24306f);
  border-color: var(--primary, #24306f);
  color: #fff;
}

.gallery-empty {
  padding: 4rem 1rem;
  text-align: center;
}

.gallery-empty h2 {
  margin: 0;
}

.gallery-empty p {
  margin: 0.75rem 0 0;
  color: var(--muted);
}
</style>

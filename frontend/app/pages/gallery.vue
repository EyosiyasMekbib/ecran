<script setup lang="ts">
// Photo Gallery for ECRAN — showcases events, consultative assemblies, and community dialogues.
const { data: allPosts } = await useAsyncData('gallery-posts', () => getPosts())
const { data: page } = await useAsyncData('page-gallery', () => getPage('gallery'))
await useSeo(page.value)

// Curated high-resolution fallback photos for when CMS gallery items are loading or empty
const curatedPhotos = [
  {
    url: '/brand/ecran-hero-advocacy.png',
    alt: 'ECRAN delegates and partners convening at the Child Rights Advocacy Forum in Addis Ababa',
    category: 'summits',
    title: 'National Child Rights Advocacy Summit',
    date: 'May 2026'
  },
  {
    url: '/brand/ecran-children-header.png',
    alt: 'Ethiopian children participating in youth dialogue and school-based engagement activities',
    category: 'community',
    title: 'Youth-Led Community Dialogue & Child Participation',
    date: 'April 2026'
  },
  {
    url: '/brand/ecran-hero.jpg',
    alt: 'Civil society network representatives discussing regional child safeguarding systems',
    category: 'workshops',
    title: 'Safeguarding & Policy Alignment Workshop',
    date: 'March 2026'
  },
  {
    url: '/brand/network-card.svg',
    alt: 'Consultative Assembly on Child Protection Systems',
    category: 'summits',
    title: 'Consultative Assembly of 40+ Member Organizations',
    date: 'February 2026'
  },
  {
    url: '/brand/participation-card.svg',
    alt: 'Children and young advocates contributing to local decision-making platforms',
    category: 'community',
    title: 'Regional Child Participation Forum',
    date: 'January 2026'
  },
  {
    url: '/brand/evidence-card.svg',
    alt: 'Evidence standards and data clearing house training session for member CSOs',
    category: 'workshops',
    title: 'Evidence Generation & Data Standards Training',
    date: 'December 2025'
  }
]

// Extract photos from CMS posts with gallery or featuredImage
const cmsPhotos = computed(() => {
  const posts = allPosts.value || []
  const list: { url: string; alt: string; category: string; title: string; date: string }[] = []

  for (const p of posts) {
    if (p.gallery && Array.isArray(p.gallery)) {
      p.gallery.forEach((g: any, i: number) => {
        if (g.url) {
          list.push({
            url: g.url,
            alt: g.alt || `${p.title} photo ${i + 1}`,
            category: 'summits',
            title: p.title,
            date: p.date
          })
        }
      })
    }
  }
  return list
})

const activeFilter = ref('all')
const filters = [
  { id: 'all', label: 'All Photos' },
  { id: 'summits', label: 'Summits & Assemblies' },
  { id: 'workshops', label: 'Workshops & Training' },
  { id: 'community', label: 'Community & Advocacy' }
]

const allImages = computed(() => {
  return cmsPhotos.value.length ? [...cmsPhotos.value, ...curatedPhotos] : curatedPhotos
})

const filteredImages = computed(() => {
  if (activeFilter.value === 'all') return allImages.value
  return allImages.value.filter((img) => img.category === activeFilter.value)
})
</script>

<template>
  <div class="gallery-page">
    <PageHero
      class="news-hero"
      :eyebrow="page?.sections?.heroEyebrow || 'Photo Gallery'"
      :title="page?.heroTitle || 'ECRAN in Action: Moments of Advocacy, Partnership & Community'"
      :text="page?.heroText || 'Visual stories from our consultative assemblies, national summits, regional member trainings, and child-centered community initiatives across Ethiopia.'"
    />

    <section class="gallery-section">
      <!-- Filter Tabs -->
      <div class="gallery-filter-bar" role="tablist" aria-label="Photo categories">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          role="tab"
          :aria-selected="activeFilter === f.id"
          class="gallery-filter-btn"
          :class="{ active: activeFilter === f.id }"
          @click="activeFilter = f.id"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Gallery Grid using MediaGallery -->
      <div class="gallery-grid-wrapper">
        <MediaGallery :images="filteredImages" title="ECRAN Photo Gallery" />
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
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line, #e2e8f0);
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
  box-shadow: 0 2px 6px rgba(36, 48, 111, 0.25);
}

.gallery-grid-wrapper {
  margin-top: 1rem;
}
</style>

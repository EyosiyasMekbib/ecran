<script setup lang="ts">
// News/vacancy/bid/media/announcement detail page. Reads a single post by slug.
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data: post } = await useAsyncData(`post-${slug.value}`, () => getPostBySlug(slug.value))
const { data: site } = await useAsyncData('global', getGlobal)
const { data: allPostsList } = await useAsyncData('posts-slug-related', () => getPosts())

// Site-wide chrome labels (Global.ui JSON) — all fall back to current copy.
const ui = () => (site.value as any)?.ui || {}
const defaultCategoryLabels: Record<string, string> = {
  news: 'News',
  vacancy: 'Vacancy',
  bid: 'Bid / Tender',
  media: 'Media Center',
  announcement: 'Announcement'
}
const categoryLabels = computed<Record<string, string>>(() => ui().categoryLabels || defaultCategoryLabels)
const defaultFactLabels = { department: 'Department', type: 'Type', location: 'Location / Ref', deadline: 'Deadline' }
const factLabels = computed<Record<string, string>>(() => ({ ...defaultFactLabels, ...(ui().factLabels || {}) }))
const attachmentsHeading = computed(() => ui().attachmentsHeading || 'Attachments & Documents')
const defaultCtaLabel = computed(() => ui().defaultCtaLabel || 'Learn more')
const notFoundTitle = computed(() => ui().postNotFoundTitle || 'Story not found')
const notFoundText = computed(() => ui().postNotFoundText || 'This story may have been moved, updated, or unpublished.')

const backLink = computed(() => {
  const cat = post.value?.category
  if (cat === 'vacancy') return '/news/vacancies'
  if (cat === 'bid') return '/news/bids'
  if (cat === 'media') return '/news/media-center'
  return '/news/news'
})

const backLabel = computed(() => {
  const cat = post.value?.category
  if (cat === 'vacancy') return 'Back to Vacancies'
  if (cat === 'bid') return 'Back to Bids'
  if (cat === 'media') return 'Back to Media Center'
  return ui().backToNewsLabel || 'Back to News'
})

const readTimeMinutes = computed(() => {
  const text = ((post.value?.body || '') + ' ' + (post.value?.excerpt || '')).replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
})

const relatedPosts = computed(() => {
  const currentSlug = slug.value
  const currentCat = post.value?.category
  const list = allPostsList.value || []
  const sameCat = list.filter((p: any) => p.slug !== currentSlug && (!currentCat || p.category === currentCat))
  if (sameCat.length >= 3) return sameCat.slice(0, 3)
  const otherPosts = list.filter((p: any) => p.slug !== currentSlug && !sameCat.some((m: any) => m.slug === p.slug))
  return [...sameCat, ...otherPosts].slice(0, 3)
})

const copied = ref(false)
const copyCurrentUrl = async () => {
  if (import.meta.client && typeof navigator !== 'undefined') {
    try {
      await navigator.clipboard.writeText(window.location.href)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2500)
    } catch {
      // Ignore copy error
    }
  }
}

const shareLinkedInUrl = computed(() => {
  if (!import.meta.client) return '#'
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
})

const shareTwitterUrl = computed(() => {
  if (!import.meta.client) return '#'
  const text = encodeURIComponent(post.value?.title || 'ECRAN News')
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`
})

await useSeo(
  post.value
    ? { seoTitle: post.value.title, seoDescription: post.value.excerpt, heroImage: post.value.image }
    : { title: notFoundTitle.value }
)
</script>

<template>
  <div v-if="post" class="post-page-wrapper">
    <!-- Top Bar / Breadcrumb Navigation -->
    <section class="post-top-nav-bar">
      <div class="post-top-nav-inner">
        <NuxtLink :to="backLink" class="post-back-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>{{ backLabel }}</span>
        </NuxtLink>

        <nav class="post-breadcrumbs" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink>
          <span class="sep">/</span>
          <NuxtLink :to="backLink">{{ categoryLabels[post.category] || 'News' }}</NuxtLink>
          <span class="sep">/</span>
          <span class="current">{{ post.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Main Editorial Article Container -->
    <article class="post-detail-container">
      <!-- Article Header / Hero -->
      <header class="post-header">
        <div class="post-meta-badges">
          <span v-if="post.category" class="post-badge-chip">
            {{ categoryLabels[post.category] || post.category }}
          </span>
          <span v-if="post.date" class="post-meta-chip">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{{ post.date }}</span>
          </span>
          <span class="post-meta-chip reading-time">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{{ readTimeMinutes }} min read</span>
          </span>
        </div>

        <h1 class="post-title">{{ post.title }}</h1>

        <p v-if="post.excerpt" class="post-header-lead">{{ post.excerpt }}</p>
      </header>

      <!-- Featured Image Banner -->
      <div v-if="post.image" class="post-featured-media">
        <img :src="post.image" :alt="post.title" loading="eager" />
      </div>

      <!-- 2-Column Content + Sticky Sidebar Grid -->
      <div class="post-content-grid">
        <!-- Main Column -->
        <div class="post-main-column">
          <!-- Rich Body from CMS -->
          <div v-if="post.body" class="post-body-content" v-html="post.body" />

          <!-- Attachments / Downloads -->
          <section v-if="post.attachments?.length" class="post-attachments-section">
            <h3 class="section-subtitle">{{ attachmentsHeading }}</h3>
            <div class="attachments-list">
              <a
                v-for="a in post.attachments"
                :key="a.url || a.name"
                :href="a.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="attachment-card"
              >
                <div class="attachment-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="12" y2="18"></line>
                    <line x1="15" y1="15" x2="12" y2="18"></line>
                  </svg>
                </div>
                <div class="attachment-info">
                  <span class="attachment-name">{{ a.name || 'Download document' }}</span>
                  <span class="attachment-action">Click to download &rarr;</span>
                </div>
              </a>
            </div>
          </section>

          <!-- External Call To Action (if provided) -->
          <div v-if="post.externalUrl" class="post-external-cta-wrapper">
            <a
              :href="post.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="button primary"
            >
              {{ post.ctaLabel || defaultCtaLabel }} &rarr;
            </a>
          </div>

          <!-- Share and Engagement Bar -->
          <div class="post-share-bar">
            <span class="share-title">Share this article:</span>
            <div class="share-actions">
              <a
                :href="shareLinkedInUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn linkedin"
                title="Share on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                :href="shareTwitterUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="share-btn twitter"
                title="Share on X / Twitter"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X / Twitter</span>
              </a>

              <button
                type="button"
                class="share-btn copy"
                :class="{ active: copied }"
                @click="copyCurrentUrl"
              >
                <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0b8fa7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ copied ? 'Link copied!' : 'Copy link' }}</span>
              </button>
            </div>
          </div>

          <!-- Bottom Return Navigation -->
          <div class="post-footer-nav">
            <NuxtLink :to="backLink" class="button secondary">
              &larr; {{ backLabel }}
            </NuxtLink>
          </div>
        </div>

        <!-- Sticky Sidebar Column -->
        <aside class="post-sidebar-column">
          <div class="post-sticky-sidebar">
            <!-- Card 1: Key Overview Facts -->
            <div class="sidebar-card facts-card">
              <h3 class="sidebar-card-title">Story Overview</h3>
              <dl class="sidebar-facts-list">
                <div v-if="post.category" class="fact-row">
                  <dt>Category</dt>
                  <dd>
                    <span class="fact-badge">{{ categoryLabels[post.category] || post.category }}</span>
                  </dd>
                </div>

                <div v-if="post.date" class="fact-row">
                  <dt>Published</dt>
                  <dd class="fact-val">{{ post.date }}</dd>
                </div>

                <div v-if="post.location" class="fact-row">
                  <dt>{{ factLabels.location }}</dt>
                  <dd class="fact-val location-val">{{ post.location }}</dd>
                </div>

                <div v-if="post.deadline" class="fact-row highlight">
                  <dt>{{ factLabels.deadline }}</dt>
                  <dd class="fact-val deadline-val">{{ post.deadline }}</dd>
                </div>

                <div v-if="post.department" class="fact-row">
                  <dt>{{ factLabels.department }}</dt>
                  <dd class="fact-val">{{ post.department }}</dd>
                </div>

                <div v-if="post.employmentType" class="fact-row">
                  <dt>{{ factLabels.type }}</dt>
                  <dd class="fact-val">{{ post.employmentType }}</dd>
                </div>

                <div class="fact-row">
                  <dt>Publisher</dt>
                  <dd class="fact-val">ECRAN Network</dd>
                </div>
              </dl>
            </div>

            <!-- Card 2: Related / Latest Stories -->
            <div v-if="relatedPosts.length" class="sidebar-card related-card">
              <h3 class="sidebar-card-title">Latest Updates</h3>
              <div class="related-list">
                <NuxtLink
                  v-for="rel in relatedPosts"
                  :key="rel.slug"
                  :to="`/news/${rel.slug}`"
                  class="related-item"
                >
                  <div v-if="rel.image" class="related-thumb">
                    <img :src="rel.image" :alt="rel.title" loading="lazy" />
                  </div>
                  <div class="related-info">
                    <span class="related-date">{{ rel.date }}</span>
                    <h4 class="related-headline">{{ rel.title }}</h4>
                  </div>
                </NuxtLink>
              </div>

              <NuxtLink :to="backLink" class="sidebar-more-link">
                View all stories &rarr;
              </NuxtLink>
            </div>

            <!-- Card 3: Network Callout Card -->
            <div class="sidebar-card cta-card">
              <h4>Support Child Rights</h4>
              <p>ECRAN unites over 40 civil society organizations dedicated to evidence-based advocacy across Ethiopia.</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform"
                target="_blank"
                rel="noopener noreferrer"
                class="button primary cta-btn"
              >
                Get Involved &rarr;
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  </div>

  <!-- Fallback: Story Not Found -->
  <section v-else class="post-missing-section">
    <div class="missing-card">
      <div class="missing-badge">404</div>
      <h1>{{ notFoundTitle }}</h1>
      <p>{{ notFoundText }}</p>
      <NuxtLink to="/news/news" class="button primary">
        &larr; Back to News &amp; Updates
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Page Wrapper & Outer Bounds */
.post-page-wrapper {
  background: var(--paper, #fcfbfa);
  min-height: calc(100vh - 120px);
}

/* Breadcrumb & Navigation Bar */
.post-top-nav-bar {
  border-bottom: 1px solid var(--line, #e2e8f0);
  background: #ffffff;
  padding: 0.9rem var(--gutter, 1.5rem);
}

.post-top-nav-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.post-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--brand, #0b8fa7);
  text-decoration: none;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(11, 143, 167, 0.08);
  transition: all 0.2s ease;
}

.post-back-btn:hover {
  background: var(--brand, #0b8fa7);
  color: #ffffff;
  transform: translateX(-3px);
}

.post-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
  color: var(--muted, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-breadcrumbs a {
  color: var(--muted, #64748b);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-breadcrumbs a:hover {
  color: var(--brand-dark, #24306f);
}

.post-breadcrumbs .sep {
  opacity: 0.4;
  font-size: 0.75rem;
}

.post-breadcrumbs .current {
  color: var(--ink, #1a1a2e);
  font-weight: 600;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Article Container */
.post-detail-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 3.5rem) var(--gutter, 1.5rem) 6rem;
}

/* Article Header */
.post-header {
  width: 100%;
  max-width: 100%;
  margin-bottom: 2.2rem;
}

.post-meta-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.post-badge-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: var(--brand-dark, #24306f);
}

.post-meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted, #64748b);
  background: rgba(0, 0, 0, 0.03);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}

.post-title {
  width: 100%;
  max-width: 100%;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.1vw, 2.85rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink, #1a1a2e);
  margin: 0 0 1.25rem;
  text-wrap: balance;
}

.post-header-lead {
  max-width: 980px;
  font-size: clamp(1.15rem, 1.4vw, 1.3rem);
  line-height: 1.65;
  color: #4a5568;
  margin: 0;
  font-weight: 450;
  text-wrap: pretty;
}

/* Featured Media Banner */
.post-featured-media {
  width: 100%;
  max-height: 520px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(36, 48, 111, 0.08);
  border: 1px solid var(--line, #e2e8f0);
  margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
  background: #f1f5f9;
}

.post-featured-media img {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  display: block;
}

/* 2-Column Grid Layout */
.post-content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: start;
}

/* Main Content Column */
.post-main-column {
  min-width: 0;
}

.post-body-content {
  font-size: 1.08rem;
  line-height: 1.85;
  color: #2d3748;
}

.post-body-content :where(p) {
  margin: 1.25rem 0;
}

.post-body-content :where(h2, h3) {
  font-family: var(--font-heading);
  color: var(--ink, #1a1a2e);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.25;
}

.post-body-content :where(h2) {
  font-size: clamp(1.4rem, 2vw, 1.75rem);
  border-left: 4px solid var(--brand, #0b8fa7);
  padding-left: 0.9rem;
}

.post-body-content :where(h3) {
  font-size: clamp(1.2rem, 1.6vw, 1.45rem);
}

.post-body-content :where(ul, ol) {
  padding-left: 1.5rem;
  margin: 1.25rem 0;
}

.post-body-content :where(li) {
  margin-bottom: 0.65rem;
  line-height: 1.7;
}

.post-body-content :where(blockquote) {
  border-left: 4px solid var(--brand, #0b8fa7);
  background: rgba(11, 143, 167, 0.05);
  margin: 2rem 0;
  padding: 1.25rem 1.75rem;
  border-radius: 0 0.75rem 0.75rem 0;
  font-style: italic;
  font-size: 1.15rem;
  color: #1e293b;
}

.post-body-content :where(a) {
  color: var(--brand, #0b8fa7);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}

.post-body-content :where(a:hover) {
  color: var(--brand-dark, #24306f);
}

/* Attachments */
.post-attachments-section {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line, #e2e8f0);
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
  color: var(--ink, #1a1a2e);
}

.attachments-list {
  display: grid;
  gap: 1rem;
}

.attachment-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.4rem;
  background: #ffffff;
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.attachment-card:hover {
  border-color: var(--brand, #0b8fa7);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.attachment-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(11, 143, 167, 0.1);
  color: var(--brand, #0b8fa7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.attachment-info {
  display: flex;
  flex-direction: column;
}

.attachment-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink, #1a1a2e);
}

.attachment-action {
  font-size: 0.8rem;
  color: var(--brand, #0b8fa7);
  font-weight: 600;
  margin-top: 0.2rem;
}

.post-external-cta-wrapper {
  margin-top: 2.5rem;
}

/* Share Bar */
.post-share-bar {
  margin-top: 3.5rem;
  padding: 1.5rem;
  border-radius: 0.85rem;
  background: #ffffff;
  border: 1px solid var(--line, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.share-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--ink, #1a1a2e);
}

.share-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1px solid var(--line, #e2e8f0);
  background: #ffffff;
  color: var(--ink, #1a1a2e);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.share-btn:hover {
  border-color: var(--brand, #0b8fa7);
  color: var(--brand, #0b8fa7);
  transform: translateY(-2px);
}

.share-btn.copy.active {
  border-color: var(--brand, #0b8fa7);
  background: rgba(11, 143, 167, 0.08);
  color: var(--brand, #0b8fa7);
}

/* Footer Nav */
.post-footer-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line, #e2e8f0);
}

/* Sticky Sidebar */
.post-sidebar-column {
  min-width: 0;
}

.post-sticky-sidebar {
  position: sticky;
  top: 5.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: #ffffff;
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 0.85rem;
  padding: 1.4rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.sidebar-card-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: var(--ink, #1a1a2e);
  margin: 0 0 1.1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--line, #e2e8f0);
}

/* Facts List */
.sidebar-facts-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin: 0;
}

.fact-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 0.88rem;
}

.fact-row dt {
  color: var(--muted, #64748b);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.fact-row dd {
  margin: 0;
  text-align: right;
}

.fact-val {
  font-weight: 700;
  color: var(--ink, #1a1a2e);
}

.fact-badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-dark, #24306f);
  background: rgba(36, 48, 111, 0.08);
}

.location-val {
  color: var(--brand-dark, #24306f);
}

.deadline-val {
  color: #c53030;
}

/* Related Stories */
.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;
  group: true;
}

.related-thumb {
  width: 68px;
  height: 52px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f1f5f9;
}

.related-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-item:hover .related-thumb img {
  transform: scale(1.08);
}

.related-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.related-date {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--brand, #0b8fa7);
  margin-bottom: 0.2rem;
}

.related-headline {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.35;
  font-weight: 700;
  color: var(--ink, #1a1a2e);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.related-item:hover .related-headline {
  color: var(--brand, #0b8fa7);
}

.sidebar-more-link {
  display: inline-block;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--brand, #0b8fa7);
  text-decoration: none;
  transition: transform 0.2s ease;
}

.sidebar-more-link:hover {
  transform: translateX(3px);
  color: var(--brand-dark, #24306f);
}

/* Callout Card */
.cta-card {
  background: linear-gradient(135deg, rgba(36, 48, 111, 0.06), rgba(11, 143, 167, 0.12));
  border: 1px solid rgba(11, 143, 167, 0.2);
}

.cta-card h4 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: var(--brand-dark, #24306f);
  margin: 0 0 0.5rem;
}

.cta-card p {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #4a5568;
  margin: 0 0 1rem;
}

.cta-card .cta-btn {
  width: 100%;
  justify-content: center;
  font-size: 0.85rem;
  padding: 0.65rem 1rem;
}

/* Missing Page (404) */
.post-missing-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 3rem 1.5rem;
}

.missing-card {
  max-width: 480px;
  text-align: center;
  padding: 3rem 2rem;
  background: #ffffff;
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.missing-badge {
  font-size: 3rem;
  font-weight: 900;
  color: var(--brand, #0b8fa7);
  line-height: 1;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.missing-card h1 {
  font-size: 1.6rem;
  margin: 0 0 0.75rem;
  color: var(--ink, #1a1a2e);
}

.missing-card p {
  color: var(--muted, #64748b);
  margin-bottom: 1.75rem;
}

/* Responsive Queries */
@media (max-width: 1024px) {
  .post-content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .post-sticky-sidebar {
    position: static;
  }

  .post-breadcrumbs {
    display: none;
  }
}

@media (max-width: 640px) {
  .post-top-nav-inner {
    justify-content: flex-start;
  }

  .post-featured-media {
    border-radius: 0.65rem;
  }

  .post-share-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .share-actions {
    width: 100%;
  }

  .share-btn {
    flex: 1;
    justify-content: center;
  }

  .post-title {
    font-size: clamp(1.55rem, 5.2vw, 1.95rem);
    line-height: 1.22;
  }
}
</style>

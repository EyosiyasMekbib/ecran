<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no published news posts.
const fallback = [
  {
    slug: 'national-child-rights-advocacy-summit-2026-announced',
    date: 'May 15, 2026',
    title: 'National Child Rights Advocacy Summit 2026 Announced',
    excerpt: 'ECRAN is hosting the annual Child Rights Advocacy Summit next month in Addis Ababa, convening civil society organizations, government officials, and international development partners to align on national child protection policies.',
    image: '/brand/ecran-hero.jpg'
  },
  {
    slug: 'launch-of-the-csos-complimentary-report-on-child-rights',
    date: 'April 28, 2026',
    title: 'Launch of the CSOs Complimentary Report on Child Rights',
    excerpt: 'We are pleased to announce the upcoming launch of our Complimentary Report on the implementation of the UN Convention on the Rights of the Child (UNCRC) in Ethiopia. A stakeholder validation workshop will be held next week.',
    image: '/brand/network-card.svg'
  },
  {
    slug: 'advocacy-and-child-safeguarding-training-for-member-csos',
    date: 'April 12, 2026',
    title: 'Advocacy & Child Safeguarding Training for Member CSOs',
    excerpt: 'ECRAN will conduct a three-day intensive capacity building workshop focusing on child-led advocacy, ethical participation, and community protection systems for member organizations in the regional states.',
    image: '/brand/protection-card.svg'
  },
  {
    slug: 'consultative-assembly-on-child-protection-systems',
    date: 'April 02, 2026',
    title: 'Consultative Assembly on Child Protection Systems',
    excerpt: 'Delegates from member civil society organizations gathered for a multi-stakeholder policy dialogue on reinforcing community protection pathways across Ethiopia.',
    image: '/brand/network-card.svg'
  }
]

const { data: cmsPosts } = await useAsyncData('posts-news', () => getPosts('news'))
const { data: page } = await useAsyncData('page-news', () => getPage('news'))
await useSeo(page.value)

const articles = computed(() => (cmsPosts.value?.length ? cmsPosts.value : fallback))
const badgeLabel = computed(() => page.value?.sections?.badgeLabel || 'News')
const readMoreLabel = computed(() => page.value?.sections?.readMoreLabel || 'Read full story')
</script>

<template>
  <PageHero
    class="news-hero"
    :title="page?.heroTitle || 'News & Updates'"
    :text="page?.heroText || `Stay up to date with ECRAN's latest public announcements, press releases, events, advocacy campaigns, and workshops.`"
  />

  <section class="news-page-section">
    <div class="news-four-grid" aria-label="News articles">
      <NuxtLink
        v-for="article in articles"
        :key="article.slug || article.title"
        :to="article.slug ? `/news/${article.slug}` : '/news/news'"
        class="news-four-card"
      >
        <div v-if="article.image" class="news-four-card-media">
          <img :src="article.image" :alt="article.title" loading="lazy" />
        </div>
        <div class="news-four-meta">
          <span class="news-tag">{{ article.date }}</span>
          <span class="news-four-badge">{{ badgeLabel }}</span>
        </div>
        <div class="news-four-content">
          <h2>{{ article.title }}</h2>
          <p>{{ article.excerpt }}</p>
        </div>
        <div class="news-four-footer">
          <span class="news-four-link">
            {{ readMoreLabel }} <span class="arrow">&rarr;</span>
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.news-page-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) var(--gutter, 1.5rem);
}

.news-four-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.25rem, 2vw, 2rem);
}

.news-four-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem;
  background: var(--bg, #fff);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 0.65rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.news-four-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand, #0b8fa7);
  box-shadow: 0 12px 30px rgba(11, 143, 167, 0.08);
}

.news-four-card-media {
  width: calc(100% + 2.8rem);
  margin: -1.4rem -1.4rem 1.15rem;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  background: var(--paper, #f6f7fb);
}

.news-four-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.news-four-card:hover .news-four-card-media img {
  transform: scale(1.04);
}

.news-four-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.news-four-meta .news-tag {
  margin-bottom: 0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-dark, #24306f);
  background: rgba(36, 48, 111, 0.06);
  padding: 0.3rem 0.65rem;
  border-radius: 99px;
}

.news-four-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand-text, #066e80);
  background: rgba(6, 110, 128, 0.08);
}

.news-four-content h2 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 0.55rem;
  font-size: clamp(1.1rem, 1.3vw, 1.25rem);
  line-height: 1.3;
  letter-spacing: -0.015em;
  font-family: var(--font-heading);
  color: var(--ink, #1a1a2e);
  transition: color 0.2s ease;
}

.news-four-card:hover .news-four-content h2 {
  color: var(--brand-text, #066e80);
}

.news-four-content p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 1rem;
  color: var(--muted, #64748b);
  font-size: 0.9rem;
  line-height: 1.5;
}

.news-four-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--line, #e2e8f0);
}

.news-four-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--brand-text, #066e80);
  transition: color 0.2s ease;
}

.news-four-link .arrow {
  transition: transform 0.2s ease;
}

.news-four-card:hover .news-four-link {
  color: var(--brand-dark, #24306f);
}

.news-four-card:hover .news-four-link .arrow {
  transform: translateX(4px);
}

@media (max-width: 1200px) {
  .news-four-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .news-four-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .news-four-grid {
    grid-template-columns: 1fr;
  }
}
</style>


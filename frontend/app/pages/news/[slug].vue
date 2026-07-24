<script setup lang="ts">
// News/vacancy/bid/media/announcement detail page. Reads a single post by slug.
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data: post } = await useAsyncData(`post-${slug.value}`, () => getPostBySlug(slug.value))

await useSeo(
  post.value
    ? { seoTitle: post.value.title, seoDescription: post.value.excerpt, heroImage: post.value.image }
    : { title: 'Story not found' }
)

const categoryLabel: Record<string, string> = {
  news: 'News',
  vacancy: 'Vacancy',
  bid: 'Bid / Tender',
  media: 'Media',
  announcement: 'Announcement'
}
</script>

<template>
  <article v-if="post" class="post-detail">
    <div class="post-detail-inner">
      <NuxtLink to="/news" class="post-back">&larr; Back to News</NuxtLink>
      <div class="post-detail-meta">
        <span v-if="post.category" class="announcement-badge">{{ categoryLabel[post.category] || post.category }}</span>
        <span v-if="post.date" class="announcement-date">{{ post.date }}</span>
      </div>
      <h1>{{ post.title }}</h1>
      <p v-if="post.excerpt" class="post-detail-lead">{{ post.excerpt }}</p>

      <dl
        v-if="post.location || post.deadline || post.department || post.employmentType"
        class="post-detail-facts"
      >
        <div v-if="post.department"><dt>Department</dt><dd>{{ post.department }}</dd></div>
        <div v-if="post.employmentType"><dt>Type</dt><dd>{{ post.employmentType }}</dd></div>
        <div v-if="post.location"><dt>Location / Ref</dt><dd>{{ post.location }}</dd></div>
        <div v-if="post.deadline"><dt>Deadline</dt><dd>{{ post.deadline }}</dd></div>
      </dl>

      <img v-if="post.image" :src="post.image" :alt="post.title" class="post-detail-image" />

      <!-- Rich body from the CMS (trusted content) -->
      <div v-if="post.body" class="post-detail-body" v-html="post.body" />

      <div v-if="post.attachments?.length" class="post-detail-attachments">
        <h2>Attachments</h2>
        <ul>
          <li v-for="a in post.attachments" :key="a.url || a.name">
            <a :href="a.url || '#'" target="_blank" rel="noopener noreferrer">{{ a.name }}</a>
          </li>
        </ul>
      </div>

      <a
        v-if="post.externalUrl"
        :href="post.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="post-detail-cta"
      >
        {{ post.ctaLabel || 'Learn more' }} &rarr;
      </a>
    </div>
  </article>

  <section v-else class="post-detail post-detail--missing">
    <div class="post-detail-inner">
      <h1>Story not found</h1>
      <p>This story may have been moved or unpublished.</p>
      <NuxtLink to="/news" class="post-back">&larr; Back to News</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.post-detail { padding: 3rem 1.25rem 5rem; }
.post-detail-inner { max-width: 760px; margin: 0 auto; }
.post-back { display: inline-block; margin-bottom: 1.5rem; color: var(--brand, #0b8fa7); font-weight: 600; text-decoration: none; }
.post-back:hover { text-decoration: underline; }
.post-detail-meta { display: flex; gap: .75rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; }
.post-detail h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.15; margin: 0 0 1rem; color: var(--ink, #1a1a2e); }
.post-detail-lead { font-size: 1.15rem; opacity: .85; margin-bottom: 1.5rem; }
.post-detail-facts { display: grid; gap: .5rem 2rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); background: var(--paper, #f6f7fb); border-radius: 12px; padding: 1.25rem 1.5rem; margin: 0 0 2rem; }
.post-detail-facts dt { font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; opacity: .6; }
.post-detail-facts dd { margin: 0; font-weight: 600; }
.post-detail-image { width: 100%; border-radius: 12px; margin: 0 0 2rem; }
.post-detail-body { line-height: 1.75; }
.post-detail-body :where(h2, h3) { margin-top: 2rem; }
.post-detail-body :where(p) { margin: 1rem 0; }
.post-detail-attachments { margin-top: 2.5rem; }
.post-detail-attachments ul { padding-left: 1.2rem; }
.post-detail-cta { display: inline-block; margin-top: 2rem; font-weight: 600; color: var(--brand, #0b8fa7); text-decoration: none; }
.post-detail--missing { text-align: center; }
</style>

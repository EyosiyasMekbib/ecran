<script setup lang="ts">
// Sourced from the Strapi CMS at build/SSR time, with static fallback (see composables/useStrapi.ts).
const { data: resources } = await useAsyncData('home-resources', getResourceCards)
const { data: page } = await useAsyncData('page-home', () => getPage('home'))
const { data: profile } = await useAsyncData('site-profile', getSiteProfile)
const { data: partners } = await useAsyncData('home-partners', getPartners)
const { data: latestNews } = await useAsyncData('home-latest-news', () => getPosts('news'))

await useSeo(page.value)

const mission = computed(
  () =>
    profile.value?.mission ||
    'To connect, strengthen and mobilize child-rights actors across Ethiopia to influence policies and systems for children through evidence-based advocacy, accountability and meaningful child participation.'
)
const vision = computed(
  () =>
    profile.value?.vision ||
    'To see children in Ethiopia enjoy their rights to survival, development, protection and participation, championed by a strong and credible national network.'
)
const legalStatus = computed(() => profile.value?.legalStatus || 'Registered as a local organization under Proclamation No. 1113/2019.')

// Objectives block (10 objectives → 4 workstreams) — CMS-managed via page `home`
// sections.objectives; the current copy stays as fallback.
const fallbackObjectives = [
  {
    range: '01, 09',
    title: 'Coordinate the network',
    text: 'Align CSOs, CBOs, members, and national or regional partners around a shared child-rights advocacy agenda.',
    items: [
      'Coordinate efforts by CSOs and Community-Based Organizations engaged in advocacy and promotion of the rights of children.',
      'Establish and strengthen partnerships and membership with other networks at national, regional and international level.'
    ]
  },
  {
    range: '02, 03, 05',
    title: 'Influence policy and accountability',
    text: 'Work with public institutions and development partners to shape policy, monitor commitments, and support reporting.',
    items: [
      'Liaise with government departments, line ministries and development partners on policy formulation, implementation and monitoring of child-rights instruments.',
      'Contribute to CSO complementary reports on Ethiopia’s commitments to UN and African child-rights mechanisms.',
      'Work with duty bearers and stakeholders to monitor national, regional and international frameworks concerning children’s rights.'
    ]
  },
  {
    range: '04, 06, 10',
    title: 'Build capacity and dialogue',
    text: 'Equip members, leaders, and institutions to advocate, share data, and respond to common challenges facing children.',
    items: [
      'Build member capacity in advocacy work, data organization, child-rights promotion, and program development across Ethiopia.',
      'Organize dialogue platforms for members to deliberate on shared challenges faced by children and practical ways to address them.',
      'Organize training and advocacy programs for public, private, and not-for-profit leaders to become competent child-rights advocates.'
    ]
  },
  {
    range: '07, 08',
    title: 'Generate evidence for action',
    text: 'Produce research, briefs, reports, and information products that help decision-makers design better interventions for children.',
    items: [
      'Undertake basic and action-oriented research, serve as a data clearing house, and produce physical and web-based reports for child-focused programs.',
      'Prepare evidence-based policy papers and briefs on children’s rights for policy makers and practitioners.'
    ]
  }
]
const objectives = computed(() =>
  Array.isArray(page.value?.sections?.objectives) ? page.value.sections.objectives : fallbackObjectives
)

// Editable section copy — CMS-managed via page `home` sections.*, current copy as fallback.
const heroSignals = computed(() =>
  Array.isArray(page.value?.sections?.heroSignals) && page.value.sections.heroSignals.length
    ? page.value.sections.heroSignals
    : ['Policy evidence', 'Child protection', 'Participation']
)
const partnerCtaLabel = computed(() => page.value?.sections?.partnerCtaLabel || 'Partner with ECRAN')
const partnersHeading = computed(() => page.value?.sections?.partnersHeading || 'Our partners')
// Duplicated track: the marquee keyframe shifts by -50%, so passes are repeated
// for the loop to be seamless. Clones are hidden from assistive tech.
const marqueePartners = computed(() => {
  const list = partners.value || []
  if (!list.length) return []
  const sets = [0, 1, 2, 3]
  return sets.flatMap((setIndex) =>
    list.map((partner: any) => ({
      ...partner,
      clone: setIndex > 0,
      key: `set-${setIndex}-${partner.name}`
    }))
  )
})
const showcaseEyebrow = computed(() => page.value?.sections?.showcaseEyebrow || 'What ECRAN makes possible')
const objectivesTitle = computed(() => page.value?.sections?.objectivesTitle || 'Stated Objectives')
const newsTitle = computed(() => page.value?.sections?.newsTitle || 'Stories from the network')
const resourcesHeading = computed(() => page.value?.sections?.resourcesHeading || 'Reports, briefs, and tools in one accessible center.')
const secondaryCtaLabel = computed(() => page.value?.sections?.secondaryCtaLabel || 'Learn more about us')
const showcaseLinkLabel = computed(() => page.value?.sections?.showcaseLinkLabel || 'Read about ECRAN')
const manifestoLabels = computed(() =>
  Array.isArray(page.value?.sections?.manifestoLabels) && page.value.sections.manifestoLabels.length
    ? page.value.sections.manifestoLabels
    : ['Mission', 'Vision', 'Legal status']
)
const objectivesEyebrow = computed(() => page.value?.sections?.objectivesEyebrow || 'Network Focus')
const objectivesSummary = computed(() => page.value?.sections?.objectivesSummary || 'Ten formal objectives, organized into four workstreams so the homepage reads like a strategy rather than a charter document.')
const objectivesCount = computed(() => page.value?.sections?.objectivesCount || '10')
const objectivesCountLabel = computed(() => page.value?.sections?.objectivesCountLabel || 'stated objectives')
const objectivesDetailsLabel = computed(() => page.value?.sections?.objectivesDetailsLabel || 'Read formal objectives')
const newsEyebrow = computed(() => page.value?.sections?.newsEyebrow || 'Latest updates')
const newsCtaLabel = computed(() => page.value?.sections?.newsCtaLabel || 'All news')
// The "Latest updates" band shows the three most recent news posts. getPosts()
// already guarantees an image, so a card and its detail page always agree.
const latestPosts = computed(() => (latestNews.value || []).slice(0, 3))
// Resized WebP copies of the built-in hero; a CMS hero image is used as uploaded.
// 800w covers a 412px-wide phone at 1.75x, which otherwise jumps to 975w.
// No fetchpriority: on phones the header logo is the LCP and the hero would compete with it.
const heroSrcset =
  '/brand/ecran-hero-480.webp 480w, /brand/ecran-hero-720.webp 720w, /brand/ecran-hero-800.webp 800w, /brand/ecran-hero-975.webp 975w'
const newsLinkLabel = computed(() => page.value?.sections?.newsLinkLabel || 'Read story')
const resourcesEyebrow = computed(() => page.value?.sections?.resourcesEyebrow || 'Resource Library')
const resourcesCtaLabel = computed(() => page.value?.sections?.resourcesCtaLabel || 'View all resources')
const heroImageAlt = computed(
  () => page.value?.sections?.heroImageAlt || 'ECRAN members and partners gathered together'
)
</script>

<template>
  <div class="above-fold">
    <section class="home-hero">
      <div class="hero-nodes" aria-hidden="true">
        <div class="node-line line-1"></div>
        <div class="node-line line-2"></div>
        <div class="node-line line-3"></div>
      </div>
      <div class="hero-container">
        <div class="hero-copy reveal">
          <div class="hero-signals" aria-label="ECRAN focus areas">
            <span v-for="signal in heroSignals" :key="signal">{{ signal }}</span>
          </div>
          <h1>{{ page?.heroTitle || 'Evidence-led advocacy for every child in Ethiopia.' }}</h1>
          <p>
            {{ page?.heroText || `ECRAN brings partners, communities, and decision-makers together to turn evidence into action for children's rights.` }}
          </p>
          <div class="hero-actions">
            <NuxtLink to="/get-involved" class="button primary">{{ partnerCtaLabel }}</NuxtLink>
            <NuxtLink to="/who-we-are/about-us" class="button secondary">{{ secondaryCtaLabel }}</NuxtLink>
          </div>
        </div>
        <div class="hero-visual" aria-label="ECRAN members and partners gathered together">
          <img
            :src="page?.heroImage || '/brand/ecran-hero.jpg'"
            :srcset="page?.heroImage ? undefined : heroSrcset"
            sizes="(max-width: 860px) 100vw, 60vw"
            width="975"
            height="643"
            :alt="heroImageAlt"
          />
        </div>
      </div>
    </section>

    <section v-if="partners && partners.length" class="partners-section">
      <div class="partners-container">
        <h2 class="partners-heading">{{ partnersHeading }}</h2>
        <!-- The track is rendered twice so the -50% marquee keyframe loops seamlessly. -->
        <div class="partners-marquee">
          <a
            v-for="partner in marqueePartners"
            :key="partner.key"
            class="partner-item"
            :href="partner.url || undefined"
            :target="partner.url ? '_blank' : undefined"
            :rel="partner.url ? 'noopener' : undefined"
            :aria-hidden="partner.clone ? 'true' : undefined"
            :tabindex="partner.clone ? -1 : undefined"
          >
            <img
              v-if="partner.logo"
              :src="partner.logo"
              :width="partner.logoWidth || undefined"
              :height="partner.logoHeight || undefined"
              :alt="partner.clone ? '' : partner.name"
              loading="lazy"
              decoding="async"
            />
            <span v-else class="partner-name">{{ partner.name }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>

  <div class="section-dark">
    <section class="story-section story-showcase">
      <div class="story-anchor">
        <p class="eyebrow">{{ showcaseEyebrow }}</p>
        <h2>{{ page?.sections?.showcaseTitle || 'A stronger public platform for child-rights evidence, partnership, and accountability.' }}</h2>
        <p>
          {{ page?.sections?.showcaseText || 'ECRAN connects field experience, civil society coordination, and policy dialogue so advocacy work can move with a shared public mandate.' }}
        </p>
        <NuxtLink to="/who-we-are/about-us" class="story-link">{{ showcaseLinkLabel }}</NuxtLink>
      </div>
      <div class="manifesto-list">
        <article class="manifesto-item">
          <span>01</span>
          <div class="content">
            <p>{{ manifestoLabels[0] }}</p>
            <h3>{{ mission }}</h3>
          </div>
        </article>
        <article class="manifesto-item">
          <span>02</span>
          <div class="content">
            <p>{{ manifestoLabels[1] }}</p>
            <h3>{{ vision }}</h3>
          </div>
        </article>
        <article class="manifesto-item">
          <span>03</span>
          <div class="content">
            <p>{{ manifestoLabels[2] }}</p>
            <h3>{{ legalStatus }}</h3>
          </div>
        </article>
      </div>
    </section>
  </div>

  <section class="objectives-section">
    <div class="objectives-heading-block">
      <p class="eyebrow">{{ objectivesEyebrow }}</p>
      <h2>{{ objectivesTitle }}</h2>
      <p class="objectives-summary">
        {{ objectivesSummary }}
      </p>
    </div>

    <div class="objectives-showcase">
      <aside class="objective-index" aria-label="Ten stated objectives grouped into four workstreams">
        <strong>{{ objectivesCount }}</strong>
        <span>{{ objectivesCountLabel }}</span>
        <div class="objective-index-list" aria-hidden="true">
          <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span>
          <span>06</span><span>07</span><span>08</span><span>09</span><span>10</span>
        </div>
      </aside>

      <div class="objective-themes">
        <article v-for="theme in objectives" :key="theme.title" class="objective-theme">
          <span class="objective-range">{{ theme.range }}</span>
          <div>
            <h3>{{ theme.title }}</h3>
            <p>{{ theme.text }}</p>
            <details>
              <summary>{{ objectivesDetailsLabel }}</summary>
              <ul>
                <li v-for="item in theme.items" :key="item">{{ item }}</li>
              </ul>
            </details>
          </div>
        </article>
      </div>
    </div>
  </section>



  <section v-if="latestPosts.length" class="news-section">
    <div class="news-header">
      <div class="news-title-block">
        <p class="eyebrow">{{ newsEyebrow }}</p>
        <h2>{{ newsTitle }}</h2>
      </div>
      <NuxtLink to="/news/news" class="button secondary news-header-cta">{{ newsCtaLabel }}</NuxtLink>
    </div>
    <div class="news-grid" aria-label="Latest news">
      <NuxtLink
        v-for="post in latestPosts"
        :key="post.slug"
        :to="`/news/${post.slug}`"
        class="news-card"
      >
        <div v-if="post.image" class="news-card-media">
          <img
            :src="cloudinaryResize(post.image, 'c_limit,w_800,f_auto,q_auto') || post.image"
            :alt="post.title"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="news-card-meta">
          <span class="news-tag">{{ post.date }}</span>
        </div>
        <div class="news-card-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
        </div>
        <div class="news-card-footer">
          <span class="news-link">
            {{ newsLinkLabel }} <span class="arrow">&rarr;</span>
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>

  <div class="section-dark">
    <section class="library-section">
      <div class="library-header">
        <div class="library-title-block">
          <p class="eyebrow">{{ resourcesEyebrow }}</p>
          <h2>{{ resourcesHeading }}</h2>
        </div>
        <NuxtLink to="/resources" class="button secondary-light">{{ resourcesCtaLabel }}</NuxtLink>
      </div>

      <div class="library-grid">
        <template v-for="resource in resources" :key="resource.title">
          <a
            v-if="resource.downloadUrl"
            :href="resource.downloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            :download="resource.title"
            class="resource-card"
            :aria-label="`Download ${resource.title} (${resource.type})`"
          >
            <div class="resource-card-top">
              <span class="resource-badge">{{ resource.type }}</span>
            </div>
            <h3>{{ resource.title }}</h3>
            <div class="resource-meta">
              <span class="resource-status">{{ resource.meta }}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" fill="currentColor"/>
              </svg>
            </div>
          </a>
          <NuxtLink
            v-else
            to="/resources"
            class="resource-card"
            :aria-label="`View ${resource.title} in resource library`"
          >
            <div class="resource-card-top">
              <span class="resource-badge">{{ resource.type }}</span>
            </div>
            <h3>{{ resource.title }}</h3>
            <div class="resource-meta">
              <span class="resource-status">{{ resource.meta }}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
          </NuxtLink>
        </template>
      </div>
    </section>
  </div>
</template>

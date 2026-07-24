<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no `privacy-policy` page entry.
const fallbackBlocks = [
  {
    lead: 'ECRAN is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or interact with our organization.'
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      "We collect personal information — such as your name and email address — only when you voluntarily contact us or subscribe to our updates. We also gather non-personal data through cookies to improve our website's performance and user experience."
    ]
  },
  {
    title: 'How We Use Your Information',
    paragraphs: ['We use your information to:'],
    list: [
      'Respond to your inquiries and messages',
      'Send advocacy updates and relevant communications',
      'Enhance and improve our services'
    ]
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "We take children's privacy seriously. ECRAN does not knowingly collect data from children under 18 without verifiable parental consent. If you believe we have inadvertently collected such information, please contact us immediately."
    ]
  },
  {
    title: 'Your Rights',
    paragraphs: [
      'You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights or for any privacy-related questions, please contact us.'
    ]
  }
]

const { data: page } = await useAsyncData('page-privacy-policy', () => getPage('privacy-policy'))
const { data: profile } = await useAsyncData('site-profile', () => getSiteProfile())

await useSeo(page.value)

const blocks = computed(() =>
  Array.isArray(page.value?.sections?.blocks) ? page.value.sections.blocks : fallbackBlocks
)
const lastUpdated = computed(
  () => page.value?.sections?.lastUpdated || 'June 2026'
)
const email = computed(() => profile.value?.email || 'info@ecran-et.org')

// Editable labels/headings (page.sections.* with current copy as fallback).
const legalEyebrow = computed(() => page.value?.sections?.eyebrow || 'Legal')
const contactHeading = computed(() => page.value?.sections?.contactHeading || 'Contact Us')
</script>

<template>
  <main class="legal-page">
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="legal-eyebrow">{{ legalEyebrow }}</span>
        <h1>{{ page?.heroTitle || 'Privacy Policy' }}</h1>
        <p class="legal-meta">Ethiopian Child Rights Advocacy Network (ECRAN) &mdash; Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <div class="legal-content">
      <div class="legal-body">
        <section v-for="(block, i) in blocks" :key="i" class="legal-section">
          <p v-if="block.lead" class="legal-lead">{{ block.lead }}</p>
          <h2 v-if="block.title">{{ block.title }}</h2>
          <p v-for="(p, j) in block.paragraphs || []" :key="j">{{ p }}</p>
          <ul v-if="block.list?.length">
            <li v-for="item in block.list" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="legal-section legal-contact">
          <h2>{{ contactHeading }}</h2>
          <p>
            Email: <a :href="`mailto:${email}`">{{ email }}</a>
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  background: var(--paper);
  min-height: 100vh;
}

.legal-hero {
  background: var(--gradient-brand-deep);
  padding: clamp(4rem, 10vw, 8rem) var(--gutter) clamp(3rem, 7vw, 6rem);
}

.legal-hero-inner {
  max-width: 780px;
  margin: 0 auto;
}

.legal-eyebrow {
  display: inline-block;
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand);
  background: rgba(11, 143, 167, 0.12);
  border: 1px solid rgba(11, 143, 167, 0.3);
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
  margin-bottom: 1.25rem;
}

.legal-hero h1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.15;
}

.legal-meta {
  font-family: var(--font-text);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

.legal-content {
  padding: clamp(3rem, 8vw, 6rem) var(--gutter);
}

.legal-body {
  max-width: 780px;
  margin: 0 auto;
}

.legal-lead {
  font-size: 1.15rem;
  line-height: 1.75;
  color: var(--ink);
  font-weight: 400;
}

.legal-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--line);
}

.legal-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.legal-section h2 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin: 0 0 0.85rem;
}

.legal-section p,
.legal-section ul {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
  margin: 0 0 0.75rem;
}

.legal-section ul {
  padding-left: 1.5rem;
  list-style: disc;
}

.legal-section ul li {
  margin-bottom: 0.4rem;
}

.legal-contact a {
  color: var(--brand);
  font-weight: 500;
}

.legal-contact a:hover {
  text-decoration: underline;
}
</style>

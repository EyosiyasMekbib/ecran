<script setup lang="ts">
// Baked-in fallback — used only when the CMS has no `terms-of-service` page entry.
const fallbackBlocks = [
  {
    lead: 'By using the ECRAN website, you agree to these Terms of Service. Please read them carefully before accessing or using our site.'
  },
  {
    title: 'Permitted Use',
    paragraphs: [
      'You may use this website for lawful, non-commercial purposes only. Any use of this site for illegal activities or in violation of applicable laws is strictly prohibited.'
    ]
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website — including text, images, and reports — belongs to ECRAN or its partners and is protected by copyright. No reproduction or commercial use of any content is permitted without prior written permission from ECRAN.'
    ]
  },
  {
    title: 'Disclaimer of Warranties',
    paragraphs: [
      'We provide information on this website in good faith but make no guarantees regarding its accuracy, completeness, or fitness for any particular purpose. Content may be updated without notice.'
    ]
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'ECRAN is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or its content.'
    ]
  },
  {
    title: 'Governing Law',
    paragraphs: [
      'These Terms are governed by and construed in accordance with the laws of Ethiopia. Any disputes arising under these Terms shall be subject to the jurisdiction of Ethiopian courts.'
    ]
  },
  {
    title: 'Changes to These Terms',
    paragraphs: [
      'We may update these Terms at any time. Continued use of the website after any changes constitutes your acceptance of the revised Terms.'
    ]
  }
]

const { data: page } = await useAsyncData('page-terms-of-service', () => getPage('terms-of-service'))

const blocks = computed(() =>
  Array.isArray(page.value?.sections?.blocks) ? page.value.sections.blocks : fallbackBlocks
)
const lastUpdated = computed(() => page.value?.sections?.lastUpdated || 'June 2026')
</script>

<template>
  <main class="legal-page">
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="legal-eyebrow">Legal</span>
        <h1>{{ page?.heroTitle || 'Terms of Service' }}</h1>
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
</style>

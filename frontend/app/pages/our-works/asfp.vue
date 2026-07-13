<script setup lang="ts">
const { data: page } = await useAsyncData('page-asfp', () => getPage('asfp'))

useHead({
  title: 'ASFP | Our Works | ECRAN',
  meta: [
    {
      name: 'description',
      content:
        page.value?.seoDescription ||
        'ASFP — Advocacy and Social Frontline Program. ECRAN coordinates frontline civil society actors for stronger child-rights advocacy across Ethiopia.'
    }
  ]
})

// Baked-in fallback cards — used only when the CMS page has no `sections.cards`.
const fallbackCards = [
  {
    title: 'Frontline Coordination',
    text: 'Connecting CSOs and CBOs working directly with children into a structured advocacy coalition with a shared public mandate.'
  },
  {
    title: 'Capacity Building',
    text: 'Equipping member organizations with evidence tools, advocacy skills, and data practices that strengthen their field work.'
  },
  {
    title: 'Policy Interface',
    text: 'Translating frontline evidence into concise briefs, reports, and dialogue moments with public institutions and development partners.'
  },
  {
    title: 'Community Accountability',
    text: "Supporting local-level monitoring of children's rights commitments and creating feedback pathways between communities and decision-makers."
  }
]

const cards = computed(() =>
  Array.isArray(page.value?.sections?.cards) ? page.value.sections.cards : fallbackCards
)
</script>

<template>
  <main class="asfp-page">
    <PageHero
      eyebrow="Our Works — ASFP"
      :title="page?.heroTitle || 'Advocacy and Social Frontline Program'"
      :text="page?.heroText || `ASFP coordinates frontline civil society organizations to strengthen child-rights advocacy, protection systems, and community-level accountability across Ethiopia's regions.`"
    />

    <section class="split-section">
      <div>
        <p class="eyebrow">Program focus</p>
        <h2>{{ page?.sections?.focusTitle || 'Bringing frontline voices into national policy dialogue.' }}</h2>
      </div>
      <p>
        {{ page?.body || 'ASFP builds structured bridges between community-level practitioners, regional networks, and national policy processes — ensuring the realities children face inform the decisions that shape their futures.' }}
      </p>
    </section>

    <div class="section-navy">
      <section class="governance-grid asfp-grid">
        <article v-for="(card, i) in cards" :key="card.title">
          <span>{{ String(i + 1).padStart(2, '0') }}</span>
          <h2>{{ card.title }}</h2>
          <p>{{ card.text }}</p>
        </article>
      </section>
    </div>

    <section class="split-section asfp-cta-section">
      <div>
        <p class="eyebrow">Get involved</p>
        <h2>{{ page?.sections?.ctaTitle || 'Join the ASFP coalition.' }}</h2>
      </div>
      <div>
        <p>{{ page?.sections?.ctaText || 'Organizations working at the frontline of child-rights advocacy in Ethiopia are invited to connect with ECRAN and explore how ASFP can strengthen their work.' }}</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform" target="_blank" rel="noopener noreferrer" class="button primary">Express interest</a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// Baked-in fallbacks — used only when the CMS is empty.
const fallbackCommitments = [
  'Child safeguarding and ethical participation',
  'Evidence-informed public communication',
  'Respectful coordination across civil society',
  'Practical learning that can be shared'
]

const { data: cmsMembers } = await useAsyncData('member-orgs', () => getMemberOrgs())
const { data: page } = await useAsyncData('page-our-members', () => getPage('our-members'))
const { data: site } = await useAsyncData('global', () => getGlobal())
const getInvolvedUrl = computed(
  () =>
    (site.value as any)?.getInvolvedUrl ||
    'https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform'
)

const members = computed(() =>
  (cmsMembers.value || []).map((m) => ({ label: m.name, url: m.url, logo: m.logo }))
)
const commitments = computed(() =>
  Array.isArray(page.value?.sections?.commitments) ? page.value.sections.commitments : fallbackCommitments
)

await useSeo(page.value)

// Section eyebrows, titles & CTA label (CMS-editable via page.sections.*, current copy as fallback).
const heroEyebrow = computed(() => page.value?.sections?.heroEyebrow || 'Membership platform')
const commitmentsLabel = computed(() => page.value?.sections?.commitmentsLabel || 'Member commitments')
const ctaLabel = computed(() => page.value?.sections?.ctaLabel || 'Get involved')
const directoryEyebrow = computed(() => page.value?.sections?.directoryEyebrow || 'Network Members')
const directoryTitle = computed(() => page.value?.sections?.directoryTitle || 'ECRAN coalition partners')
const memberLinkLabel = computed(() => page.value?.sections?.memberLinkLabel || 'Visit website')
const emptyState = computed(
  () => page.value?.sections?.emptyState || 'Member organizations are published here once added in the CMS.'
)
</script>

<template>
  <section class="member-brief member-hero">
    <div class="member-brief-copy">
      <p class="eyebrow">{{ heroEyebrow }}</p>
      <h2>{{ page?.heroTitle || 'Members make the work credible because they stay close to children, families, and local systems.' }}</h2>
      <p>
        {{ page?.heroText || 'ECRAN is designed for organizations and practitioners committed to child protection, participation, development, and evidence-led policy engagement. The network helps members move from isolated learning to coordinated advocacy.' }}
      </p>
      <a :href="getInvolvedUrl" target="_blank" rel="noopener noreferrer" class="button primary member-brief-cta">{{ ctaLabel }}</a>
    </div>
    <aside class="member-signal-panel" aria-label="Membership commitments">
      <span>{{ commitmentsLabel }}</span>
      <ul>
        <li v-for="commitment in commitments" :key="commitment">{{ commitment }}</li>
      </ul>
    </aside>
  </section>

  <section class="member-directory">
    <div class="directory-header">
      <div>
        <p class="eyebrow">{{ directoryEyebrow }}</p>
        <h2>{{ directoryTitle }}</h2>
      </div>
      <p class="directory-intro">
        {{ page?.body || 'Member profiles are structured around contribution, geography, and child-rights focus areas so visitors can understand how the network works in practice.' }}
      </p>
    </div>

    <div v-if="members.length" class="members-grid">
      <article v-for="member in members" :key="member.label" class="member-card">
        <div>
          <img v-if="member.logo" :src="member.logo" :alt="member.label" style="max-height: 48px; margin-bottom: 0.75rem;" />
          <h3>{{ member.label }}</h3>
        </div>
        <a v-if="member.url" :href="member.url" target="_blank" rel="noopener noreferrer" class="member-link">{{ memberLinkLabel }}</a>
      </article>
    </div>
    <p v-else class="directory-intro" style="text-align:center;opacity:.7;">{{ emptyState }}</p>
  </section>
</template>

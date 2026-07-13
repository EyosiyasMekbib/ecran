<script setup lang="ts">
// Baked-in fallbacks — used only when the CMS is empty.
const fallbackCommitments = [
  'Child safeguarding and ethical participation',
  'Evidence-informed public communication',
  'Respectful coordination across civil society',
  'Practical learning that can be shared'
]

const fallbackProfiles = [
  {
    label: 'Member profile 01',
    focus: 'Child protection',
    region: 'National coordination',
    description: 'Supports prevention, response, and referral work for children affected by abuse, neglect, exploitation, and family separation.'
  },
  {
    label: 'Member profile 02',
    focus: 'Participation',
    region: 'Community engagement',
    description: 'Strengthens child and youth participation so lived experience can inform advocacy priorities, public dialogue, and program design.'
  },
  {
    label: 'Member profile 03',
    focus: 'Evidence and research',
    region: 'Policy learning',
    description: 'Contributes field evidence, analysis, and learning products that help the network prepare stronger policy positions and reports.'
  },
  {
    label: 'Member profile 04',
    focus: 'Systems strengthening',
    region: 'Service networks',
    description: 'Works with local structures, duty bearers, and civil society partners to improve coordination around children’s rights commitments.'
  }
]

const { data: cmsMembers } = await useAsyncData('member-orgs', () => getMemberOrgs())
const { data: page } = await useAsyncData('page-our-members', () => getPage('our-members'))

const members = computed(() =>
  cmsMembers.value?.length
    ? cmsMembers.value.map((m) => ({
        label: m.name,
        focus: 'Network member',
        region: 'ECRAN coalition',
        description: '',
        url: m.url,
        logo: m.logo
      }))
    : fallbackProfiles.map((p) => ({ ...p, url: '', logo: null as string | null }))
)
const commitments = computed(() =>
  Array.isArray(page.value?.sections?.commitments) ? page.value.sections.commitments : fallbackCommitments
)
</script>

<template>
  <section class="member-brief member-hero">
    <div class="member-brief-copy">
      <p class="eyebrow">Membership platform</p>
      <h2>{{ page?.heroTitle || 'Members make the work credible because they stay close to children, families, and local systems.' }}</h2>
      <p>
        {{ page?.heroText || 'ECRAN is designed for organizations and practitioners committed to child protection, participation, development, and evidence-led policy engagement. The network helps members move from isolated learning to coordinated advocacy.' }}
      </p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSefVosbpua5Zkh_CwGoPpwil4VCdnJAUOJhr4fsP0cspBtZ1A/viewform" target="_blank" rel="noopener noreferrer" class="button primary member-brief-cta">Get involved</a>
    </div>
    <aside class="member-signal-panel" aria-label="Membership commitments">
      <span>Member commitments</span>
      <ul>
        <li v-for="commitment in commitments" :key="commitment">{{ commitment }}</li>
      </ul>
    </aside>
  </section>

  <section class="member-directory">
    <div class="directory-header">
      <div>
        <p class="eyebrow">Network Members</p>
        <h2>ECRAN coalition partners</h2>
      </div>
      <p class="directory-intro">
        {{ page?.body || 'Member profiles are structured around contribution, geography, and child-rights focus areas so visitors can understand how the network works in practice.' }}
      </p>
    </div>

    <div class="members-grid">
      <article v-for="member in members" :key="member.label" class="member-card">
        <div class="member-meta">
          <span class="member-region">{{ member.region }}</span>
          <span class="member-tag">{{ member.focus }}</span>
        </div>
        <div>
          <img v-if="member.logo" :src="member.logo" :alt="member.label" style="max-height: 48px; margin-bottom: 0.75rem;" />
          <h3>{{ member.label }}</h3>
          <p v-if="member.description">{{ member.description }}</p>
        </div>
        <a v-if="member.url" :href="member.url" target="_blank" rel="noopener noreferrer" class="member-link">Visit website</a>
        <span v-else class="member-link">Profile details in progress</span>
      </article>
    </div>
  </section>
</template>

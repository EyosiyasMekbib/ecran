<script setup lang="ts">
// Baked-in fallbacks — used only when the CMS is empty.
const fallbackPrinciples = [
  'Evidence before messaging',
  'Safeguarding in every engagement',
  'Clear accountability to members',
  'Practical coordination over visibility for its own sake'
]

const { data: cmsTeam } = await useAsyncData('team-members', () => getTeamMembers())
const { data: page } = await useAsyncData('page-our-team', () => getPage('our-team'))
await useSeo(page.value)

const team = computed(() => cmsTeam.value || [])
const principles = computed(() =>
  Array.isArray(page.value?.sections?.principles) ? page.value.sections.principles : fallbackPrinciples
)

// Section eyebrows & titles (CMS-editable via page.sections.*, current copy as fallback).
const roleEyebrow = computed(() => page.value?.sections?.roleEyebrow || 'Team role')
const principlesLabel = computed(() => page.value?.sections?.principlesLabel || 'Working principles')
const directoryEyebrow = computed(() => page.value?.sections?.directoryEyebrow || 'Our Team')
const directoryTitle = computed(() => page.value?.sections?.directoryTitle || 'Staff & leadership')
const emptyState = computed(
  () => page.value?.sections?.emptyState || 'Team profiles are published here once added in the CMS.'
)
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
</script>

<template>
  <section class="team-overview">
    <div class="team-overview-copy">
      <p class="eyebrow">{{ roleEyebrow }}</p>
      <h2>{{ page?.heroTitle || 'Small enough to stay focused, connected enough to support a national platform.' }}</h2>
      <p>
        {{ page?.heroText || 'The team works with board leadership, members, partners, and stakeholders to coordinate advocacy priorities, manage organizational communication, and support resource mobilization for child-rights work.' }}
      </p>
    </div>
    <div class="team-principles" aria-label="Team working principles">
      <span>{{ principlesLabel }}</span>
      <ol>
        <li v-for="principle in principles" :key="principle">{{ principle }}</li>
      </ol>
      <SiteMotto class="team-principles-motto" />
    </div>
  </section>

  <section class="team-directory">
    <div class="directory-header">
      <div>
        <p class="eyebrow">{{ directoryEyebrow }}</p>
        <h2>{{ directoryTitle }}</h2>
      </div>
      <p class="directory-intro">
        {{ page?.body || 'Meet the coordination team supporting ECRAN\'s members, board, and partners.' }}
      </p>
    </div>

    <div v-if="team.length" class="team-grid">
      <article v-for="member in team" :key="member.name" class="team-card">
        <img v-if="member.photo" :src="member.photo" :alt="member.name" class="team-avatar-placeholder" style="object-fit: cover;" />
        <div v-else class="team-avatar-placeholder">
          <span>{{ initials(member.name) }}</span>
        </div>
        <div class="team-card-info">
          <h3>{{ member.name }}</h3>
          <span class="team-role">{{ member.role }}</span>
          <p>{{ member.bio }}</p>
        </div>
      </article>
    </div>
    <p v-else class="directory-intro" style="opacity:.7;">{{ emptyState }}</p>
  </section>

  <section class="team-organogram-section">
    <div style="text-align: center; max-width: 44rem; margin: 0 auto 1.5rem;">
      <p class="eyebrow">Governance & Structure</p>
      <h2 style="font-family: var(--font-heading); font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 800; color: var(--dark, #06172f); margin: 0.5rem 0 0.75rem;">Organizational Chart</h2>
      <p style="color: var(--muted, #64748b); line-height: 1.6; margin: 0;">
        How ECRAN coordinates its general assembly, executive board oversight, and secretariat departments.
      </p>
    </div>
    <OrganogramChart />
  </section>
</template>

<style scoped>
/* Tighter than the site-wide section default: overview, directory and chart read as one page. */
.team-overview {
  padding-top: clamp(2.5rem, 4vw, 3.5rem);
  padding-bottom: clamp(2rem, 3.5vw, 3rem);
}

.team-directory {
  padding-top: clamp(2rem, 3.5vw, 3rem);
  padding-bottom: clamp(2rem, 3.5vw, 3rem);
}

.team-directory .directory-header {
  margin-bottom: clamp(1.25rem, 2vw, 1.75rem);
}

.team-organogram-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(2rem, 3.5vw, 3rem) var(--gutter) clamp(2.5rem, 4vw, 3.5rem);
  border-top: 1px solid var(--line);
}

.team-principles .team-principles-motto {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 1.25rem;
}
</style>

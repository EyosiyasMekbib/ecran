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
  <section class="team-overview" style="padding-top: clamp(6rem, 10vw, 10rem);">
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
    </div>
  </section>

  <section class="team-directory">
    <div class="directory-header">
      <p class="eyebrow">{{ directoryEyebrow }}</p>
      <h2>{{ directoryTitle }}</h2>
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
    <p v-else class="directory-intro" style="text-align:center;opacity:.7;">{{ emptyState }}</p>
  </section>
</template>

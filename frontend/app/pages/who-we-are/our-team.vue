<script setup lang="ts">
// Baked-in fallbacks — used only when the CMS is empty.
const fallbackPrinciples = [
  'Evidence before messaging',
  'Safeguarding in every engagement',
  'Clear accountability to members',
  'Practical coordination over visibility for its own sake'
]

const fallbackTeam = [1, 2, 3, 4].map((n) => ({
  name: `Lorem Ipsum Member ${n}`,
  role: 'Role Designation',
  bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  photo: null as string | null
}))

const { data: cmsTeam } = await useAsyncData('team-members', () => getTeamMembers())
const { data: page } = await useAsyncData('page-our-team', () => getPage('our-team'))

const team = computed(() => (cmsTeam.value?.length ? cmsTeam.value : fallbackTeam))
const principles = computed(() =>
  Array.isArray(page.value?.sections?.principles) ? page.value.sections.principles : fallbackPrinciples
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
      <p class="eyebrow">Team role</p>
      <h2>{{ page?.heroTitle || 'Small enough to stay focused, connected enough to support a national platform.' }}</h2>
      <p>
        {{ page?.heroText || 'The team works with board leadership, members, partners, and stakeholders to coordinate advocacy priorities, manage organizational communication, and support resource mobilization for child-rights work.' }}
      </p>
    </div>
    <div class="team-principles" aria-label="Team working principles">
      <span>Working principles</span>
      <ol>
        <li v-for="principle in principles" :key="principle">{{ principle }}</li>
      </ol>
    </div>
  </section>

  <section class="team-directory">
    <div class="directory-header">
      <p class="eyebrow">Our Team</p>
      <h2>Staff & leadership</h2>
      <p class="directory-intro">
        {{ page?.body || 'Meet the coordination team supporting ECRAN\'s members, board, and partners.' }}
      </p>
    </div>

    <div class="team-grid">
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
  </section>
</template>

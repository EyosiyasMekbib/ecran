<script setup lang="ts">
const memberLanes = [
  {
    label: 'Field evidence',
    title: 'Community-rooted learning',
    text: 'Members surface local realities, referral gaps, protection concerns, and promising practice from the places where children live.'
  },
  {
    label: 'Technical exchange',
    title: 'Shared standards and tools',
    text: 'The network helps members compare methods, align language, and turn program experience into usable advocacy resources.'
  },
  {
    label: 'Policy voice',
    title: 'Coordinated advocacy moments',
    text: 'Members shape practical messages for public dialogue, donor conversations, and child-rights accountability.'
  }
]

const memberCommitments = [
  'Child safeguarding and ethical participation',
  'Evidence-informed public communication',
  'Respectful coordination across civil society',
  'Practical learning that can be shared'
]
</script>

<template>
  <PageHero
    eyebrow="Our members"
    title="A member network grounded in field evidence and shared public purpose."
    text="ECRAN’s members bring child-rights practice, community insight, and technical knowledge into one coordinated advocacy platform."
  />

  <section class="member-brief">
    <div class="member-brief-copy">
      <p class="eyebrow">Membership platform</p>
      <h2>Members make the work credible because they stay close to children, families, and local systems.</h2>
      <p>
        ECRAN is designed for organizations and practitioners committed to child protection, participation, development, and evidence-led policy engagement. The network helps members move from isolated learning to coordinated advocacy.
      </p>
    </div>
    <aside class="member-signal-panel" aria-label="Membership commitments">
      <span>Member commitments</span>
      <ul>
        <li v-for="commitment in memberCommitments" :key="commitment">{{ commitment }}</li>
      </ul>
    </aside>
  </section>

  <section class="member-map" aria-label="How ECRAN members contribute">
    <article v-for="(lane, index) in memberLanes" :key="lane.title" :style="{ '--index': index }">
      <span>{{ lane.label }}</span>
      <h2>{{ lane.title }}</h2>
      <p>{{ lane.text }}</p>
    </article>
  </section>

  <section class="member-directory-empty">
    <div>
      <p class="eyebrow">Member directory</p>
      <h2>Public member profiles can be added as ECRAN confirms publishing permissions.</h2>
    </div>
    <p>
      This page is ready to hold member names, regions, focus areas, and profile links once the organization approves what should be public.
    </p>
    <NuxtLink to="/get-involved" class="button secondary">Ask about membership</NuxtLink>
  </section>
</template>

<script setup lang="ts">
const memberCommitments = [
  'Child safeguarding and ethical participation',
  'Evidence-informed public communication',
  'Respectful coordination across civil society',
  'Practical learning that can be shared'
]
</script>

<template>
  <section class="member-brief" style="padding-top: clamp(6rem, 10vw, 10rem);">
    <div class="member-brief-copy">
      <p class="eyebrow">Membership platform</p>
      <h2>Members make the work credible because they stay close to children, families, and local systems.</h2>
      <p>
        ECRAN is designed for organizations and practitioners committed to child protection, participation, development, and evidence-led policy engagement. The network helps members move from isolated learning to coordinated advocacy.
      </p>
      <NuxtLink to="/get-involved" class="button primary member-brief-cta">Get involved</NuxtLink>
    </div>
    <aside class="member-signal-panel" aria-label="Membership commitments">
      <span>Member commitments</span>
      <ul>
        <li v-for="commitment in memberCommitments" :key="commitment">{{ commitment }}</li>
      </ul>
    </aside>
  </section>

  <section class="member-directory">
    <div class="directory-header">
      <p class="eyebrow">Network Members</p>
      <h2>ECRAN coalition partners</h2>
      <p class="directory-intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
    
    <div class="members-grid">
      <article v-for="n in 6" :key="n" class="member-card">
        <div class="member-meta">
          <span class="member-region">Region {{ n }}</span>
          <span class="member-tag">Child Rights</span>
        </div>
        <h3>Lorem Ipsum Organization {{ n }}</h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
        <span class="member-link">View Profile &rarr;</span>
      </article>
    </div>
  </section>
</template>

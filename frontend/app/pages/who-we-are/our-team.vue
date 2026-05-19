<script setup lang="ts">
const workingPrinciples = [
  'Evidence before messaging',
  'Safeguarding in every engagement',
  'Clear accountability to members',
  'Practical coordination over visibility for its own sake'
]
</script>

<template>
  <section class="team-overview" style="padding-top: clamp(6rem, 10vw, 10rem);">
    <div class="team-overview-copy">
      <p class="eyebrow">Team role</p>
      <h2>Small enough to stay focused, connected enough to support a national platform.</h2>
      <p>
        The team works with board leadership, members, partners, and stakeholders to coordinate advocacy priorities, manage organizational communication, and support resource mobilization for child-rights work.
      </p>
    </div>
    <div class="team-principles" aria-label="Team working principles">
      <span>Working principles</span>
      <ol>
        <li v-for="principle in workingPrinciples" :key="principle">{{ principle }}</li>
      </ol>
    </div>
  </section>

  <section class="team-directory">
    <div class="directory-header">
      <p class="eyebrow">Our Team</p>
      <h2>Staff & leadership</h2>
      <p class="directory-intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
    
    <div class="team-grid">
      <article v-for="n in 4" :key="n" class="team-card">
        <div class="team-avatar-placeholder">
          <span>LI</span>
        </div>
        <div class="team-card-info">
          <h3>Lorem Ipsum Member {{ n }}</h3>
          <span class="team-role">Role Designation</span>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

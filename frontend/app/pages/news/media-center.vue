<script setup lang="ts">
const items = [
  {
    type: 'Press Release',
    title: 'Joint Statement on Regional Child Rights Compliance in Ethiopia',
    date: 'May 10, 2026',
    desc: 'Read the official statement jointly released by ECRAN and member CSOs regarding policy compliance checks across regional child protection structures.'
  },
  {
    type: 'Gallery',
    title: 'Consultative Assembly on Child Protection Systems',
    date: 'May 02, 2026',
    desc: 'Photos and summaries from the multi-stakeholder policy dialogue convening 40+ member network delegates.'
  },
  {
    type: 'Press Release',
    title: 'ECRAN Announces General Assembly & Executive Council Election Results',
    date: 'April 15, 2026',
    desc: 'The network is proud to share updates from its first formal General Assembly, highlighting the appointment of its new Executive board members.'
  }
]
</script>

<template>
  <PageHero
    eyebrow="News & Portal"
    title="Media Center"
    text="Access press releases, official statements, event photo galleries, and institutional video resources."
  />

  <section class="media-center-section">
    <div class="media-grid">
      <article v-for="item in items" :key="item.title" class="media-card">
        <div class="media-meta">
          <span>{{ item.type }}</span>
          <time>{{ item.date }}</time>
        </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
        <button class="text-action" type="button">View details &rarr;</button>
      </article>
    </div>
  </section>
</template>

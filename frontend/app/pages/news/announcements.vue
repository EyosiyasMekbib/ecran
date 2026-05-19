<script setup lang="ts">
const announcements = [
  {
    date: 'May 15, 2026',
    tag: 'Summit',
    title: 'National Child Rights Advocacy Summit 2026 Announced',
    text: 'ECRAN is hosting the annual Child Rights Advocacy Summit next month in Addis Ababa, convening civil society organizations, government officials, and international development partners to align on national child protection policies.'
  },
  {
    date: 'April 28, 2026',
    tag: 'Report Release',
    title: 'Launch of the CSOs Complimentary Report on Child Rights',
    text: 'We are pleased to announce the upcoming launch of our Complimentary Report on the implementation of the UN Convention on the Rights of the Child (UNCRC) in Ethiopia. A stakeholder validation workshop will be held next week.'
  },
  {
    date: 'April 12, 2026',
    tag: 'Capacity Building',
    title: 'Advocacy & Child Safeguarding Training for Member CSOs',
    text: 'ECRAN will conduct a three-day intensive capacity building workshop focusing on child-led advocacy, ethical participation, and community protection systems for member organizations in the regional states.'
  }
]
</script>

<template>
  <div class="news-category-page" style="padding-top: clamp(6rem, 10vw, 10rem);">
    <section class="news-category-header">
      <p class="eyebrow">News & Updates</p>
      <h1>Announcements</h1>
      <p class="intro-text">
        Stay up to date with ECRAN's latest announcements, public events, advocacy campaigns, and capacity building opportunities.
      </p>
    </section>

    <section class="announcements-list-section">
      <div class="announcements-grid">
        <article v-for="announcement in announcements" :key="announcement.title" class="announcement-item">
          <div class="announcement-meta">
            <span class="announcement-date">{{ announcement.date }}</span>
            <span class="announcement-badge">{{ announcement.tag }}</span>
          </div>
          <h2>{{ announcement.title }}</h2>
          <p>{{ announcement.text }}</p>
          <span class="read-more-link">Read full announcement &rarr;</span>
        </article>
      </div>
    </section>
  </div>
</template>

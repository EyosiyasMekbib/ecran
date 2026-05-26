<script setup lang="ts">
const bids = [
  {
    title: 'Consultancy Service: Midterm Review of ECRAN Strategic Plan',
    reference: 'ECRAN/RFP/2026/04',
    status: 'Open',
    published: 'May 10, 2026',
    deadline: 'June 2, 2026',
    description: 'ECRAN invites qualified national consultants to submit proposals to conduct a comprehensive midterm review of our 5-year strategic plan, evaluating advocacy outcomes, partnership efficacy, and internal operations.'
  },
  {
    title: 'Supply and Delivery of IT Equipment and Networking Hardware',
    reference: 'ECRAN/IT/2026/02',
    status: 'Closed',
    published: 'April 15, 2026',
    deadline: 'May 5, 2026',
    description: 'Bids are invited from eligible vendors for the supply of laptops, desktops, server infrastructure, and network configurations to support our new regional coordination nodes.'
  }
]
</script>

<template>
  <PageHero
    class="news-hero"
    title="Bids & Tenders"
    text="View open procurement bids, requests for proposals (RFPs), and consultancy opportunities with ECRAN."
  />

  <section class="bids-list-section">
    <div class="bids-grid">
      <article v-for="bid in bids" :key="bid.title" class="bid-card" :class="{ 'is-closed': bid.status === 'Closed' }">
        <div class="bid-meta">
          <span class="bid-ref">Ref: {{ bid.reference }}</span>
          <span class="bid-status" :class="bid.status.toLowerCase()">{{ bid.status }}</span>
        </div>
        <h2>{{ bid.title }}</h2>
        <div class="bid-dates">
          <span><strong>Published:</strong> {{ bid.published }}</span>
          <span><strong>Deadline:</strong> {{ bid.deadline }}</span>
        </div>
        <p>{{ bid.description }}</p>
        <div class="bid-actions" v-if="bid.status === 'Open'">
          <NuxtLink to="/contact" class="button secondary">Request tender documents</NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

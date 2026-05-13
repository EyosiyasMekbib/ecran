<script setup lang="ts">
import { impactStories, programs, resources } from '~/data/site'

useHead({
  title: 'ECRAN | Ethiopian Child Rights Advocacy Network',
  meta: [
    { name: 'description', content: 'ECRAN is an Ethiopian child rights advocacy network promoting evidence-based advocacy, partnership, and child participation.' }
  ]
})
</script>

<template>
  <section class="home-hero">
    <div class="hero-copy reveal">
      <p class="eyebrow">Established in Ethiopia, 2025</p>
      <h1>Evidence-led advocacy for every child’s right to be safe, heard, and able to thrive.</h1>
      <p>
        ECRAN is an independent not-for-profit organization bringing partners, members, donors, and public stakeholders around a clear child-rights agenda for Ethiopia.
      </p>
      <div class="hero-actions">
        <NuxtLink to="/get-involved" class="button primary">Partner with ECRAN</NuxtLink>
        <NuxtLink to="/programs" class="button secondary">Explore programs</NuxtLink>
      </div>
    </div>
    <div class="hero-panel reveal delay-1" aria-label="ECRAN advocacy priorities">
      <img src="/ecran-logo.jpg" alt="ECRAN logo" />
      <div class="priority-orbit">
        <span>Survival</span>
        <span>Development</span>
        <span>Protection</span>
        <span>Participation</span>
      </div>
    </div>
  </section>

  <section class="impact-strip" aria-label="Impact statistics">
    <div>
      <strong>2025</strong>
      <span>Founded and registered</span>
    </div>
    <div>
      <strong>7750</strong>
      <span>ACSO registration number</span>
    </div>
    <div>
      <strong>4</strong>
      <span>Core child-rights commitments</span>
    </div>
    <div>
      <strong>1</strong>
      <span>National advocacy platform</span>
    </div>
  </section>

  <section class="story-section">
    <div class="section-heading">
      <p class="eyebrow">What ECRAN makes possible</p>
      <h2>A stronger public platform for child-rights evidence, partnership, and accountability.</h2>
    </div>
    <div class="story-grid">
      <article class="feature-block wide">
        <p>Mission</p>
        <h3>Promote evidence-based advocacy for child rights in Ethiopia.</h3>
        <NuxtLink to="/who-we-are">Read about ECRAN</NuxtLink>
      </article>
      <article class="feature-block accent">
        <p>Vision</p>
        <h3>A country where all children enjoy survival, development, protection, and participation rights.</h3>
      </article>
      <article class="feature-block dark">
        <p>Legal status</p>
        <h3>Registered as a local organization under Proclamation No. 1113/2019.</h3>
      </article>
    </div>
  </section>

  <section class="program-preview">
    <div class="section-heading compact">
      <p class="eyebrow">Programs</p>
      <h2>Four practical lanes for advocacy work.</h2>
    </div>
    <div class="program-list">
      <article v-for="program in programs" :key="program.title">
        <h3>{{ program.title }}</h3>
        <p>{{ program.text }}</p>
      </article>
    </div>
  </section>

  <section class="news-band">
    <div>
      <p class="eyebrow">Latest updates</p>
      <h2>Stories from the network</h2>
    </div>
    <div class="news-scroll" aria-label="Impact stories">
      <article v-for="story in impactStories" :key="story.title">
        <span>{{ story.place }}</span>
        <h3>{{ story.title }}</h3>
        <p>{{ story.text }}</p>
      </article>
    </div>
  </section>

  <section class="resource-callout">
    <div>
      <p class="eyebrow">Library</p>
      <h2>Reports, briefs, and tools will live in one accessible resource center.</h2>
    </div>
    <ul>
      <li v-for="resource in resources.slice(0, 3)" :key="resource.title">
        <span>{{ resource.type }}</span>
        <strong>{{ resource.title }}</strong>
      </li>
    </ul>
  </section>
</template>

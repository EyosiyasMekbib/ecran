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
  <div class="above-fold">
    <section class="home-hero">
      <div class="hero-nodes" aria-hidden="true">
        <div class="node-line line-1"></div>
        <div class="node-line line-2"></div>
        <div class="node-line line-3"></div>
        <div class="node-dot dot-1"></div>
        <div class="node-dot dot-2"></div>
        <div class="node-dot dot-3"></div>
        <div class="node-dot dot-4"></div>
        <div class="node-dot dot-5"></div>
        <div class="node-dot dot-6"></div>
      </div>
      <div class="hero-container">
        <div class="hero-copy reveal">
          <div class="hero-signals" aria-label="ECRAN focus areas">
            <span>Policy evidence</span>
            <span>Child protection</span>
            <span>Participation</span>
          </div>
          <h1>Evidence-led advocacy for every child in Ethiopia.</h1>
          <p>
            ECRAN brings partners, communities, and decision-makers together to turn evidence into action for children's rights.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/get-involved" class="button primary">Partner with ECRAN</NuxtLink>
            <NuxtLink to="/programs" class="button secondary">Explore programs</NuxtLink>
          </div>
        </div>
        <div class="hero-visual reveal delay-1" aria-label="Ethiopian children standing together outdoors">
          <img src="/brand/ecran-children-header.png" alt="Ethiopian children standing together outdoors in school uniforms" />
        </div>
      </div>
    </section>

    <section class="partners-section">
      <div class="partners-container">
        <h3>Our partners</h3>
        <div class="partners-marquee">
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
          <div class="partner-placeholder"></div>
        </div>
      </div>
    </section>
  </div>

  <div class="section-dark">
    <section class="story-section">
      <div class="section-heading">
        <p class="eyebrow">What ECRAN makes possible</p>
        <h2>A stronger public platform for child-rights evidence, partnership, and accountability.</h2>
      </div>
      <div class="manifesto-list">
        <article class="manifesto-item">
          <span>01</span>
          <div class="content">
            <p>Mission</p>
            <h3>Promote evidence-based advocacy for child rights in Ethiopia.</h3>
            <NuxtLink to="/who-we-are">Read about ECRAN</NuxtLink>
          </div>
        </article>
        <article class="manifesto-item">
          <span>02</span>
          <div class="content">
            <p>Vision</p>
            <h3>A country where all children enjoy survival, development, protection, and participation rights.</h3>
          </div>
        </article>
        <article class="manifesto-item">
          <span>03</span>
          <div class="content">
            <p>Legal status</p>
            <h3>Registered as a local organization under Proclamation No. 1113/2019.</h3>
          </div>
        </article>
      </div>
    </section>
  </div>



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

  <div class="section-dark">
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
  </div>
</template>

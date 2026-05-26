<script setup lang="ts">
import { impactStories } from '~/data/site'
</script>

<template>
  <PageHero
    eyebrow="Impact stories"
    title="Stories from ECRAN’s network of child-rights advocates."
    text="These stories highlight how shared evidence, member coordination, and policy dialogue help child-rights work travel further."
  />

  <section class="news-section">
    <div class="news-grid" aria-label="Impact stories">
      <article v-for="story in impactStories" :key="story.title" class="news-card">
        <div class="news-card-meta">
          <span class="news-tag">{{ story.place }}</span>
        </div>
        <div class="news-card-content">
          <h2>{{ story.title }}</h2>
          <p>{{ story.text }}</p>
        </div>
        <div class="news-card-footer">
          <NuxtLink to="/contact" class="news-link">
            Connect with ECRAN <span class="arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

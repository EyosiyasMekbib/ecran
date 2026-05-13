<script setup lang="ts">
import { impactStories } from '~/data/site'
</script>

<template>
  <PageHero
    eyebrow="Impact stories"
    title="Field updates and partner learning, written for people who need to understand what is changing."
    text="This section is designed for success stories, testimonials, blogs, and updates from advocacy work across the network."
  />

  <section class="story-timeline">
    <article v-for="story in impactStories" :key="story.title">
      <span>{{ story.place }}</span>
      <h2>{{ story.title }}</h2>
      <p>{{ story.text }}</p>
      <NuxtLink to="/contact">Share a related update</NuxtLink>
    </article>
  </section>
</template>

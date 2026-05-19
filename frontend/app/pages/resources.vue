<script setup lang="ts">
import { resources } from '~/data/site'
</script>

<template>
  <PageHero
    eyebrow="Resources and library"
    title="A public home for reports, policy briefs, publications, and downloadable documents."
    text="The library gives partners, donors, members, and public stakeholders a clear place to find ECRAN’s evidence products and organizational materials."
  />

  <div class="section-dark">
    <section class="library-list">
      <article v-for="resource in resources" :key="resource.title">
        <span>{{ resource.type }}</span>
        <h2>{{ resource.title }}</h2>
        <p>{{ resource.meta }}</p>
        <button type="button" disabled>Download pending</button>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { programs } from '~/data/site'
</script>

<template>
  <PageHero
    eyebrow="Our programs"
    title="Program areas shaped around evidence, protection, participation, and coordinated advocacy."
    text="ECRAN’s program work is organized to help partners gather evidence, refine priorities, and speak with a stronger collective voice."
  />

  <section class="program-detail-list">
    <article v-for="(program, index) in programs" :key="program.title">
      <span>{{ String(index + 1).padStart(2, '0') }}</span>
      <div>
        <h2>{{ program.title }}</h2>
        <p>{{ program.text }}</p>
      </div>
    </article>
  </section>

  <section class="process-band">
    <p class="eyebrow">How projects move</p>
    <h2>Listen to communities. Document evidence. Convene partners. Advocate for practical change.</h2>
  </section>
</template>

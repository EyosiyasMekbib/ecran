<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  text: string
}>()
</script>

<template>
  <section class="page-hero" :class="{ 'page-hero--visual': $slots.visual }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
    <div v-if="$slots.visual" class="page-hero-visual">
      <slot name="visual" />
    </div>
  </section>
</template>

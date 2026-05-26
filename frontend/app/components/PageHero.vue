<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  text: string
}>()
</script>

<template>
  <section class="page-hero">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
    <slot name="visual" />
  </section>
</template>

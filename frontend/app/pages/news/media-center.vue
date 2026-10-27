<script setup lang="ts">
// Redirect legacy /news/media-center route to /news/press-releases
await navigateTo('/news/press-releases', { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>

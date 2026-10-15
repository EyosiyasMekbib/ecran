<script setup lang="ts">
// Photo grid with a keyboard-friendly lightbox. Used for a post's `gallery` images.
const props = defineProps<{
  images: { url: string; alt?: string }[]
  title?: string
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const index = ref(0)
const current = computed(() => props.images[index.value])

const open = (i: number) => {
  index.value = i
  dialog.value?.showModal()
}
const close = () => dialog.value?.close()
const step = (delta: number) => {
  const n = props.images.length
  index.value = (index.value + delta + n) % n
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
const altFor = (img: { alt?: string }, i: number) =>
  img.alt || `${props.title ? `${props.title} — ` : ''}photo ${i + 1} of ${props.images.length}`
</script>

<template>
  <div class="media-gallery">
    <ul class="media-gallery-grid">
      <li v-for="(img, i) in images" :key="img.url">
        <button type="button" class="media-gallery-thumb" :aria-label="`Open ${altFor(img, i)}`" @click="open(i)">
          <img :src="img.url" :alt="altFor(img, i)" loading="lazy" decoding="async" />
        </button>
      </li>
    </ul>

    <dialog ref="dialog" class="media-lightbox" aria-label="Photo viewer" @keydown="onKey" @click.self="close">
      <figure v-if="current" class="media-lightbox-figure">
        <img :src="current.url" :alt="altFor(current, index)" />
        <figcaption>
          <span v-if="current.alt">{{ current.alt }}</span>
          <span class="media-lightbox-count">{{ index + 1 }} / {{ images.length }}</span>
        </figcaption>
      </figure>
      <button type="button" class="media-lightbox-close" aria-label="Close" @click="close">&times;</button>
      <template v-if="images.length > 1">
        <button type="button" class="media-lightbox-nav prev" aria-label="Previous photo" @click="step(-1)">&lsaquo;</button>
        <button type="button" class="media-lightbox-nav next" aria-label="Next photo" @click="step(1)">&rsaquo;</button>
      </template>
    </dialog>
  </div>
</template>

<style scoped>
.media-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 11rem), 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.media-gallery-thumb {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--soft, #f4f7f5);
  cursor: zoom-in;
}

.media-gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.media-gallery-thumb:hover img {
  transform: scale(1.04);
}

.media-lightbox {
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 3.5rem 1rem 1.5rem;
  border: 0;
  background: rgba(6, 23, 47, 0.94);
  color: #fff;
}

.media-lightbox::backdrop {
  background: transparent;
}

.media-lightbox[open] {
  display: grid;
  place-items: center;
}

.media-lightbox-figure {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  max-width: min(1100px, 100%);
}

.media-lightbox-figure img {
  max-width: 100%;
  max-height: calc(100dvh - 8rem);
  margin: 0 auto;
  border-radius: 0.5rem;
  object-fit: contain;
}

.media-lightbox-figure figcaption {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.media-lightbox-count {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}

.media-lightbox-close,
.media-lightbox-nav {
  position: absolute;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
}

.media-lightbox-close:hover,
.media-lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.28);
}

.media-lightbox-close {
  top: 0.75rem;
  right: 0.75rem;
}

.media-lightbox-nav {
  top: 50%;
  transform: translateY(-50%);
}

.media-lightbox-nav.prev {
  left: 0.75rem;
}

.media-lightbox-nav.next {
  right: 0.75rem;
}
</style>

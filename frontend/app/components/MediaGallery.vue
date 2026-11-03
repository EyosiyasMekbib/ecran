<script setup lang="ts">
// Photo and video grid with a keyboard-friendly lightbox. Used for a post's `gallery` images
// and, with `album`, for the larger captioned tiles on the Gallery page.
type MediaItem = {
  url: string
  alt?: string
  title?: string
  caption?: string
  kind?: string
  mime?: string
  poster?: string
  // Set when the item is a link to an outside video rather than an uploaded file.
  videoUrl?: string
}

const props = defineProps<{
  images: MediaItem[]
  title?: string
  album?: boolean
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const index = ref(0)
// Null while closed, so a playing video unmounts and stops with the dialog.
const isOpen = ref(false)
const current = computed(() => (isOpen.value ? props.images[index.value] : null))
const currentEmbed = computed(() => (current.value?.videoUrl ? videoEmbedUrl(current.value.videoUrl) : null))

const open = (i: number) => {
  index.value = i
  isOpen.value = true
  dialog.value?.showModal()
}
const close = () => {
  isOpen.value = false
  dialog.value?.close()
}
const step = (delta: number) => {
  const n = props.images.length
  index.value = (index.value + delta + n) % n
}
const onKey = (e: KeyboardEvent) => {
  // Arrow keys seek inside a focused video.
  if ((e.target as HTMLElement).tagName === 'VIDEO') return
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
const altFor = (img: MediaItem, i: number) =>
  img.alt || `${props.title ? `${props.title} — ` : ''}photo ${i + 1} of ${props.images.length}`
const thumbFor = (img: MediaItem) =>
  img.kind === 'video' ? img.poster : cloudinaryResize(img.url, 'c_limit,w_800,f_auto,q_auto') || img.url
</script>

<template>
  <div class="media-gallery" :class="{ 'is-album': album }">
    <ul class="media-gallery-grid">
      <li v-for="(img, i) in images" :key="img.url">
        <button type="button" class="media-gallery-thumb" :aria-label="`Open ${altFor(img, i)}`" @click="open(i)">
          <img v-if="thumbFor(img)" :src="thumbFor(img)" :alt="altFor(img, i)" loading="lazy" decoding="async" />
          <video
            v-else-if="img.kind === 'video' && !img.videoUrl"
            :src="`${img.url}#t=0.1`"
            muted
            playsinline
            preload="metadata"
            aria-hidden="true"
          />
          <span v-if="img.kind === 'video'" class="media-gallery-play" aria-hidden="true">&#9654;</span>
          <span v-if="album && img.title" class="media-gallery-caption">
            <strong>{{ img.title }}</strong>
            <span v-if="img.caption">{{ img.caption }}</span>
          </span>
        </button>
      </li>
    </ul>

    <dialog
      ref="dialog"
      class="media-lightbox"
      aria-label="Photo viewer"
      @keydown="onKey"
      @click.self="close"
      @close="isOpen = false"
    >
      <figure v-if="current" class="media-lightbox-figure">
        <iframe
          v-if="currentEmbed"
          :src="`${currentEmbed}?autoplay=1`"
          :title="current.title || 'Video'"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        />
        <p v-else-if="current.videoUrl" class="media-lightbox-link">
          <a :href="current.videoUrl" target="_blank" rel="noopener noreferrer">Open video &rarr;</a>
        </p>
        <video
          v-else-if="current.kind === 'video'"
          :key="current.url"
          controls
          autoplay
          playsinline
          :poster="current.poster"
          :aria-label="altFor(current, index)"
        >
          <source v-for="s in videoSources(current.url, current.mime)" :key="s.src" :src="s.src" :type="s.type" />
        </video>
        <img v-else :src="current.url" :alt="altFor(current, index)" />
        <figcaption>
          <span v-if="current.title || current.alt">
            <strong v-if="current.title">{{ current.title }}</strong>
            {{ current.caption || (current.title ? '' : current.alt) }}
          </span>
          <span class="media-lightbox-count">{{ index + 1 }} / {{ images.length }}</span>
        </figcaption>
      </figure>
      <button type="button" class="media-lightbox-close" aria-label="Close" @click="close">&times;</button>
      <template v-if="images.length > 1">
        <button type="button" class="media-lightbox-nav prev" aria-label="Previous" @click="step(-1)">&lsaquo;</button>
        <button type="button" class="media-lightbox-nav next" aria-label="Next" @click="step(1)">&rsaquo;</button>
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

.media-gallery.is-album .media-gallery-grid {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: 1rem;
}

.media-gallery-thumb {
  position: relative;
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

.media-gallery-thumb img,
.media-gallery-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.media-gallery-thumb:hover img {
  transform: scale(1.04);
}

.media-gallery-play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  padding-left: 0.2rem;
  border-radius: 50%;
  background: rgba(6, 23, 47, 0.68);
  color: #fff;
  font-size: 1.35rem;
  transform: translate(-50%, -50%);
}

.media-gallery-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  gap: 0.2rem;
  padding: 0.75rem 0.9rem;
  background: rgba(6, 23, 47, 0.84);
  color: #fff;
  font-size: 0.85rem;
  line-height: 1.35;
  text-align: left;
}

.media-gallery-caption span {
  color: rgba(255, 255, 255, 0.78);
}

/* Touch screens have no hover, so the caption stays up there. */
@media (hover: hover) {
  .media-gallery-caption {
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .media-gallery-thumb:hover .media-gallery-caption,
  .media-gallery-thumb:focus-visible .media-gallery-caption {
    transform: translateY(0);
  }
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

.media-lightbox-figure video,
.media-lightbox-figure iframe {
  display: block;
  width: min(1100px, calc(100vw - 2rem));
  max-height: calc(100dvh - 8rem);
  border: 0;
  border-radius: 0.5rem;
  background: #000;
}

.media-lightbox-figure iframe {
  aspect-ratio: 16 / 9;
}

.media-lightbox-link {
  margin: 0;
  padding: 4rem 2rem;
  text-align: center;
}

.media-lightbox-link a {
  color: #fff;
  font-weight: 700;
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

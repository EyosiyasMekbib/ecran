const CLOUDINARY_VIDEO = /^https?:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload\//

/**
 * <source> list for an uploaded video. Phone uploads are often .mov (HEVC), which
 * Chrome and Firefox can't play, so Cloudinary videos also get an .mp4 rendition
 * (Cloudinary transcodes by extension). It goes first; the original stays as a
 * fallback in case the rendition can't be produced, e.g. for very large files.
 */
export function videoSources(url: string, mime = ''): { src: string; type?: string }[] {
  const original = { src: url, type: mime || undefined }
  if (!CLOUDINARY_VIDEO.test(url) || /\.mp4$/i.test(url)) return [original]
  return [{ src: url.replace(/\.[a-z0-9]+$/i, '.mp4'), type: 'video/mp4' }, original]
}

/** A still frame for the player before it starts (Cloudinary only). */
export function videoPoster(url: string): string | undefined {
  return CLOUDINARY_VIDEO.test(url) ? url.replace(/\.[a-z0-9]+$/i, '.jpg') : undefined
}

const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/
const VIMEO_ID = /vimeo\.com\/(?:video\/)?(\d+)/

/** Player address for a YouTube or Vimeo link; null when it is neither. */
export function videoEmbedUrl(url: string): string | null {
  const youtube = url.match(YOUTUBE_ID)
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}`
  const vimeo = url.match(VIMEO_ID)
  return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null
}

/** A still for a YouTube link. Vimeo's can't be derived from the URL. */
export function videoThumbnail(url: string): string | undefined {
  const youtube = url.match(YOUTUBE_ID)
  return youtube ? `https://img.youtube.com/vi/${youtube[1]}/hqdefault.jpg` : undefined
}

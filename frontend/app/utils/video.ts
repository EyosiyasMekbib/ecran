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

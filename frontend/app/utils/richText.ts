import { marked } from 'marked'

/**
 * Strapi `richtext` fields are Markdown, but editors write them like a word
 * processor: the post title pasted again as the first line, section headings as
 * a bare or bolded line, and bold markers with stray spaces (`**Label: **text`)
 * that CommonMark refuses to treat as bold. Rendered as-is, the page shows raw
 * asterisks and every line break collapses into one wall of text.
 *
 * Older entries (and the static fallbacks) are already HTML; those pass through
 * untouched.
 */
export function renderRichText(
  source: string | null | undefined,
  opts: { title?: string; excerpt?: string; mediaBase?: string } = {}
): string {
  const text = (source || '').replace(/\r\n?/g, '\n').trim()
  if (!text) return ''
  if (text.startsWith('<')) return withMediaBase(text, opts.mediaBase)

  const lines = dropRepeatedLead(text, [opts.title, opts.excerpt]).split('\n').map(fixBold)
  const md = lines.map((line, i) => promoteLine(line, lines[i - 1], lines.slice(i + 1))).join('\n')

  const html = marked.parse(md, { async: false, gfm: true, breaks: true }) as string
  return withMediaBase(html, opts.mediaBase)
}

const plain = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * Drop opening blocks that only repeat the title or the excerpt — the page
 * already shows both above the body. Exact matches only, so a body that merely
 * starts like its excerpt keeps every word.
 */
function dropRepeatedLead(text: string, shown: Array<string | undefined>): string {
  const known = new Set(shown.map((s) => plain(s || '')).filter(Boolean))
  const blocks = text.split(/\n\s*\n/)
  while (blocks.length > 1 && known.has(plain(blocks[0]))) blocks.shift()
  return blocks.join('\n\n')
}

/** `to** ERSHA, **and` → `to **ERSHA,** and`: move whitespace outside each bold pair. */
function fixBold(line: string): string {
  return line.replace(/\*\*([^*\n]+?)\*\*/g, (match, inner: string) => {
    const core = inner.trim()
    if (!core) return match
    const lead = inner.startsWith(' ') ? ' ' : ''
    const trail = inner.endsWith(' ') ? ' ' : ''
    return `${lead}**${core}**${trail}`
  })
}

/** Most longer words capitalised — how editors write a heading or a label, rarely a sentence. */
function isTitleCase(s: string): boolean {
  const words = s.split(/\s+/).filter((w) => w.replace(/[^A-Za-z]/g, '').length > 3)
  if (!words.length) return false
  return words.filter((w) => /^[A-Z]/.test(w.replace(/^[^A-Za-z]+/, ''))).length / words.length >= 0.75
}

const STRUCTURAL = /^\s*(#|>|[-*+]\s|\d+[.)]\s|\||<|!\[)/

/**
 * Promote a line that reads as a section heading — fully bold, or a short
 * Title Case line with no end punctuation that starts a block and has text
 * after it — to an h2. Bold a short Title Case "Label:" lead-in otherwise.
 */
function promoteLine(line: string, prev: string | undefined, after: string[]): string {
  const t = line.trim()
  if (!t || STRUCTURAL.test(t)) return withLeadIn(line)

  const bold = t.match(/^\*\*([^*]+)\*\*:?$/)
  if (bold && bold[1].length <= 100 && !/[.!?]$/.test(bold[1])) return `## ${bold[1].replace(/:$/, '')}`

  const startsBlock = !prev || !prev.trim()
  const hasBodyAfter = after.some((l) => l.trim())
  const words = t.split(/\s+/).length
  if (
    startsBlock &&
    hasBodyAfter &&
    t.length <= 80 &&
    words >= 2 &&
    words <= 12 &&
    !/[.,:;!?…"”')\]]$/.test(t) &&
    !t.includes('*') &&
    /^[A-Z]/.test(t) &&
    isTitleCase(t)
  ) {
    return `## ${t}`
  }
  return withLeadIn(line)
}

/** `Expand Community Impact: Implement…` → bold the label. Works inside list items too. */
function withLeadIn(line: string): string {
  return line.replace(
    /^(\s*(?:[-*+]\s+|\d+[.)]\s+)?)([A-Z][^:*\n]{2,60}):\s+(?=\S)/,
    (match, marker: string, label: string) =>
      label.split(/\s+/).length <= 6 && isTitleCase(label) ? `${marker}**${label}:** ` : match
  )
}

/** CMS uploads are stored as root-relative paths; point them at the CMS host. */
function withMediaBase(html: string, base?: string): string {
  if (!base) return html
  return html.replace(/(src|href)="\/uploads\//g, `$1="${base}/uploads/`)
}

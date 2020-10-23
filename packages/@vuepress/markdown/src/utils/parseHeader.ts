import { compose } from './compose'
import { filterMarkdownCodeSpan } from './filterMarkdownCodeSpan'
import { filterMarkdownEmphasis } from './filterMarkdownEmphasis'
import { filterMarkdownEscapes } from './filterMarkdownEscapes'
import { filterMarkdownLinks } from './filterMarkdownLinks'
import { parseEmoji } from './parseEmoji'
import { unescapeHtml } from './unescapeHtml'

/**
 * Parse header and keep the HTML blocks, so that we can use vue components
 * in headers
 */
export const parseHeader = compose(
  unescapeHtml,
  parseEmoji,
  filterMarkdownCodeSpan,
  filterMarkdownEmphasis,
  filterMarkdownEscapes,
  filterMarkdownLinks,
  (str) => str.trim()
)

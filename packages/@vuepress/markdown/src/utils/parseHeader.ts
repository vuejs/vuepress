import { compose } from './compose'
import { parseEmoji } from './parseEmoji'
import { removeMarkdownTokens } from './removeMarkdownTokens'
import { unescapeHtml } from './unescapeHtml'

// Since VuePress needs to extract the header from the markdown source
// file and display it in the sidebar or title (#238), this file simply
// removes some unnecessary elements to make header displays well at
// sidebar or title.
//
// But header's parsing in the markdown content is done by the markdown
// loader based on markdown-it. markdown-it parser will always keep
// HTML in headers, so in VuePress, after being parsed by the markdown
// loader, the raw HTML in headers will finally be parsed by Vue-loader.
// so that we can write HTML/Vue in the header. One exception is the HTML
// wrapped by <code>(markdown token: '`') tag.

export const parseHeader = compose(
  unescapeHtml,
  parseEmoji,
  removeMarkdownTokens,
  (str) => str.trim()
)

import type { RuleInline } from 'markdown-it/lib/parser_inline'
import { HTML_TAG_RE } from './htmlRe'

// Forked and modified from 'markdown-it/lib/rules_inline/html_inline.js'

const isLetter = (ch: number): boolean => {
  const lc = ch | 0x20 // to lower case
  return lc >= 0x61 /* a */ && lc <= 0x7a /* z */
}

export const htmlInlineRule: RuleInline = (state, silent) => {
  const pos = state.pos

  if (!state.md.options.html) {
    return false
  }

  // Check start
  const max = state.posMax
  if (state.src.charCodeAt(pos) !== 0x3c /* < */ || pos + 2 >= max) {
    return false
  }

  // Quick fail on second char
  const ch = state.src.charCodeAt(pos + 1)
  if (
    ch !== 0x21 /* ! */ &&
    ch !== 0x3f /* ? */ &&
    ch !== 0x2f /* / */ &&
    !isLetter(ch)
  ) {
    return false
  }

  // MODIFIED HERE: Tweak the original HTML_TAG_RE
  const match = state.src.slice(pos).match(HTML_TAG_RE)
  if (!match) {
    return false
  }

  if (!silent) {
    const token = state.push('html_inline', '', 0)
    token.content = state.src.slice(pos, pos + match[0].length)
  }
  state.pos += match[0].length
  return true
}

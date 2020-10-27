import type { RuleBlock } from 'markdown-it/lib/parser_block'
import type { TocPluginOptions } from './tocPlugin'

/**
 * Forked and modified from markdown-it-toc-done-right
 *
 * - remove the `inlineOptions` support
 * - use markdown-it default renderer to render token whenever possible
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right
 */
export const createTocBlockRule = ({
  pattern,
  containerTag,
  containerClass,
}: Pick<
  Required<TocPluginOptions>,
  'pattern' | 'containerTag' | 'containerClass'
>): RuleBlock => {
  return (state, startLine, endLine, silent): boolean => {
    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // use whitespace as a line tokenizer and extract the first token
    // to test against the placeholder anchored pattern, rejecting if false
    const lineFirstToken = state.src.slice(pos, max).split(' ')[0]
    if (!pattern.test(lineFirstToken)) return false

    if (silent) return true

    state.line = startLine + 1

    // generate toc_open token
    // will be rendered by markdown-it default renderer
    const tokenOpen = state.push('toc_open', containerTag, 1)
    tokenOpen.markup = ''
    tokenOpen.map = [startLine, state.line]
    if (containerClass) {
      tokenOpen.attrSet('class', containerClass)
    }

    // generate toc_body token
    // will be rendered by our custom renderer
    const tokenBody = state.push('toc_body', '', 0)
    tokenBody.markup = lineFirstToken
    tokenBody.map = [startLine, state.line]
    tokenBody.hidden = true

    // generate toc_close token
    // will be rendered by markdown-it default renderer
    const tokenClose = state.push('toc_close', containerTag, -1)
    tokenClose.markup = ''
    tokenBody.map = [startLine, state.line]

    return true
  }
}

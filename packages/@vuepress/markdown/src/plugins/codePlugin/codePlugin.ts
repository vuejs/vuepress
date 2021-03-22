import type { PluginWithOptions } from 'markdown-it'
import { isHighlightLine, resolveHighlightLines } from './resolveHighlightLines'
import type { HighlightLinesRange } from './resolveHighlightLines'
import { resolveLanguage } from './resolveLanguage'
import { resolveLineNumbers } from './resolveLineNumbers'
import { resolveVPre } from './resolveVPre'

export interface CodePluginOptions {
  /**
   * Enable highlight lines or not
   */
  highlightLines?: boolean

  /**
   * Enable line numbers or not
   */
  lineNumbers?: boolean

  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for `highlightLines`
   * - Required for `lineNumbers`
   * - Required for language display of default theme
   */
  preWrapper?: boolean

  /**
   * Add `v-pre` directive to `<pre>` tag or not
   */
  vPre?: boolean
}

/**
 * Code plugin
 */
export const codePlugin: PluginWithOptions<CodePluginOptions> = (
  md,
  {
    highlightLines = true,
    lineNumbers = true,
    preWrapper = true,
    vPre = true,
  }: CodePluginOptions = {}
): void => {
  // override default fence renderer
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]

    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    // resolve highlight line ranges from token info
    let highlightLinesRanges: HighlightLinesRange[] | null = null
    if (highlightLines) {
      highlightLinesRanges = resolveHighlightLines(info)
    }

    // resolve line-numbers mark from token info
    const useLineNumbers = resolveLineNumbers(info) ?? lineNumbers

    // resolve v-pre mark from token info
    const useVPre = resolveVPre(info) ?? vPre

    // resolve language from token info
    const language = resolveLanguage(info)

    // the result of code and lang
    let code = token.content

    // try to highlight code
    code =
      options.highlight?.(code, language.name, '') || md.utils.escapeHtml(code)

    const languageClass = `${options.langPrefix}${language.name}`

    // wrap highlighted code with `<pre>` and `<code>`
    let result = code.startsWith('<pre')
      ? code
      : `<pre class="${languageClass}"><code>${code}</code></pre>`

    if (useVPre) {
      result = `<pre v-pre${result.slice('<pre'.length)}`
    }

    // if `preWrapper` is disabled, return directly
    if (!preWrapper) {
      return result
    }

    // code fences always have an ending `\n`, so we should trim the last line
    const lines = code.split('\n').slice(0, -1)

    // generate highlight lines
    if (highlightLinesRanges) {
      const ranges = highlightLinesRanges

      const highlightLinesCode = lines
        .map((_, index) => {
          if (isHighlightLine(index + 1, ranges)) {
            return '<div class="highlight-line">&nbsp;</div>'
          }
          return '<br>'
        })
        .join('')

      result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`
    }

    // generate line numbers
    if (useLineNumbers) {
      // generate line numbers code
      const lineNumbersCode = lines
        .map((_, index) => `<span class="line-number">${index + 1}</span><br>`)
        .join('')

      result = `${result}<div class="line-numbers">${lineNumbersCode}</div>`
    }

    result = `<div class="${languageClass} ext-${language.ext}${
      useLineNumbers ? ' line-numbers-mode' : ''
    }">${result}</div>`

    return result
  }
}

import type { PluginWithOptions } from 'markdown-it'
import type { CreateCodeHighlighterFn } from './codeHighlighter'
import { resolveLanguage } from './resolveLanguage'

export interface CodePluginOptions {
  /**
   * Enable syntax highlight or not
   *
   * If it's disabled, you can use client side syntax highlight yourself
   *
   * For example, if you want to use pure prismjs support in client
   */
  highlight?: boolean

  /**
   * Enable line numbers or not
   */
  lineNumbers?: boolean

  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not
   *
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
    highlight = true,
    lineNumbers = false,
    preWrapper = true,
    vPre = true,
  }: CodePluginOptions = {}
): void => {
  // lazy-load highlight
  let createCodeHighlighter: CreateCodeHighlighterFn | undefined

  if (highlight) {
    createCodeHighlighter = require('./codeHighlighter').createCodeHighlighter
  }

  // override default fence renderer
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]

    // get the user-defined language alias from the token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const langAlias = info.split(/\s+/g)[0] || 'text'

    // try to resolve language according to the alias
    const language = resolveLanguage(langAlias)

    // the result of code and lang
    let code = token.content

    // try to highlight code
    if (createCodeHighlighter) {
      const codeHighlighter = createCodeHighlighter(language.name)
      if (codeHighlighter !== null) {
        code = codeHighlighter(code)
      }
    }

    // if the code is not highlighted, treat it as text and escape it
    if (code === token.content) {
      code = md.utils.escapeHtml(code)
    }

    const languageClass = `${options.langPrefix}${language.name}`

    let result = `<pre${
      vPre ? ' v-pre' : ''
    } class="${languageClass}"><code>${code}</code></pre>`

    // if `preWrapper` is disabled, return directly
    if (!preWrapper) {
      return result
    }

    // generate line numbers
    if (lineNumbers) {
      // code fences always have an ending `\n`, so we should trim the last line
      const lines = code.split('\n').slice(0, -1)

      // generate line numbers code
      const lineNumbers = lines
        .map((_, index) => `<span class="line-number">${index + 1}</span><br>`)
        .join('')

      result = `${result}<div class="line-numbers-wrapper">${lineNumbers}</div>`
    }

    result = `<div class="${languageClass} ext-${language.ext}${
      lineNumbers ? ' line-numbers-mode' : ''
    }">${result}</div>`

    return result
  }
}

import * as Prism from 'prismjs'
import * as loadLanguages from 'prismjs/components/index'
import { debug } from '@vuepress/utils'

const log = debug('vuepress:markdown/code')

/**
 * The docs of Prismjs says those default languages will be loaded
 * automatically, but it seems that we have to load them manually.
 *
 * @see https://prismjs.com/#basic-usage-node
 */
loadLanguages(['markup', 'css', 'clike', 'javascript'])
// eslint-disable-next-line no-import-assign
loadLanguages.silent = true

export type CodeHighlighter = (code: string) => string
export type CreateCodeHighlighterFn = (lang: string) => CodeHighlighter | null

export const createCodeHighlighter: CreateCodeHighlighterFn = (lang) => {
  if (!Prism.languages[lang]) {
    try {
      loadLanguages([lang])
    } catch (e) {
      log(`language '${lang}' is not supported by prismjs`)
    }
  }

  if (!Prism.languages[lang]) {
    return null
  }

  return (code) => Prism.highlight(code, Prism.languages[lang], lang)
}

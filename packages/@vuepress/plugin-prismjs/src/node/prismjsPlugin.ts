import type { Plugin } from '@vuepress/core'
import { loadLanguages } from './loadLanguages'
import { resolveHighlighter } from './resolveHighlighter'

/**
 * Options of @vuepress/plugin-prismjs
 */
export interface PrismjsPluginOptions {
  /**
   * Languages to preload
   *
   * Workaround for prismjs language reloading issue
   *
   * @see https://github.com/PrismJS/prism/issues/2716
   */
  preloadLanguages: string[]
}

export const prismjsPlugin: Plugin<PrismjsPluginOptions> = ({
  preloadLanguages = ['markdown', 'jsdoc', 'yaml'],
}) => ({
  name: '@vuepress/plugin-prismjs',

  extendsMarkdown(md) {
    if (preloadLanguages?.length !== 0) {
      loadLanguages(preloadLanguages)
    }

    md.options.highlight = (code, lang) => {
      const highlighter = resolveHighlighter(lang)
      return highlighter?.(code) || ''
    }
  },
})

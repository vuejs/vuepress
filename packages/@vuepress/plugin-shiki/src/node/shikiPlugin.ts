import type { Plugin } from '@vuepress/core'
import { getHighlighter } from 'shiki'
import type { HighlighterOptions } from 'shiki'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = Pick<HighlighterOptions, 'theme' | 'langs'>

export const shikiPlugin: Plugin<ShikiPluginOptions> = ({
  theme = 'nord',
  langs = [],
}) => ({
  name: '@vuepress/plugin-shiki',

  async extendsMarkdown(md) {
    const highlighter = await getHighlighter({
      theme,
      langs,
    })
    md.options.highlight = (code, lang) => highlighter.codeToHtml(code, lang)
  },
})

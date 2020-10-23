import type { MarkdownEnv } from '@vuepress/markdown'
import type { App } from '../types'

/**
 * Resolve page excerpt from raw excerpt
 */
export const resolvePageExcerpt = ({
  excerptRaw,
  app,
  filePathRelative,
}: {
  excerptRaw: string
  app: App
  filePathRelative: string | null
}): string => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePathRelative,
  }
  const html = app.markdown.render(excerptRaw, markdownEnv)
  return html
}

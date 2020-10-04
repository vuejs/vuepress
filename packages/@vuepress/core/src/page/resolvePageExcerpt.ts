import type { MarkdownEnv } from '@vuepress/markdown'
import type { App } from '../types'

export const resolvePageExcerpt = (
  rawExcerpt: string,
  app: App,
  filePathRelative: string | null
): string => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePathRelative,
  }
  const html = app.markdown.render(rawExcerpt, markdownEnv)
  return html
}

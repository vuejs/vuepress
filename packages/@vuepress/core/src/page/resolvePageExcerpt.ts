import type { MarkdownEnv } from '@vuepress/markdown'
import type { App, PageFrontmatter } from '../types'

/**
 * Resolve page excerpt from raw excerpt
 */
export const resolvePageExcerpt = ({
  app,
  excerptRaw,
  frontmatter,
  filePath,
  filePathRelative,
}: {
  app: App
  excerptRaw: string
  frontmatter: PageFrontmatter
  filePath: string | null
  filePathRelative: string | null
}): string => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePath,
    filePathRelative,
    frontmatter,
  }
  const html = app.markdown.render(excerptRaw, markdownEnv)
  return html
}

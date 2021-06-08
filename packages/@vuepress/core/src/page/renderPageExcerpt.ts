import type { MarkdownEnv } from '@vuepress/markdown'
import type { App, PageFrontmatter } from '../types'

/**
 * Render page excerpt from raw excerpt
 */
export const renderPageExcerpt = ({
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
  const renderedExcerpt = app.markdown.render(excerptRaw, markdownEnv)
  return renderedExcerpt
}

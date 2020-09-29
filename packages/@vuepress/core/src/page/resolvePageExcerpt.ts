import type { App, PageFrontmatter } from '../types'

export const resolvePageExcerpt = (
  rawExcerpt: string,
  app: App,
  frontmatter: PageFrontmatter,
  filePathRelative: string | null
): string => {
  const html = app.markdown.render(rawExcerpt, {
    frontmatter: frontmatter,
    relativePath: filePathRelative,
  })
  return html
}

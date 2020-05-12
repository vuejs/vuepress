import { App } from '../app'
import { PageFrontmatter } from './createPage'

export const resolvePageExcerpt = (
  rawExcerpt: string,
  app: App,
  frontmatter: PageFrontmatter,
  filePathRelative: string | null
): string => {
  const { html } = app.markdown.render(rawExcerpt, {
    frontmatter: frontmatter,
    relativePath: filePathRelative,
  })
  return html
}

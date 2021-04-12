import { isString } from '@vuepress/shared'
import type { App, PageFrontmatter } from '../types'

/**
 * Resolve language of page
 */
export const resolvePageLang = ({
  app,
  frontmatter,
  pathLocale,
}: {
  app: App
  frontmatter: PageFrontmatter
  pathLocale: string
}): string => {
  if (isString(frontmatter.lang) && frontmatter.lang) {
    return frontmatter.lang
  }
  return app.siteData.locales[pathLocale]?.lang ?? app.siteData.lang
}

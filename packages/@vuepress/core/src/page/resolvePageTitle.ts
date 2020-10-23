import { parseHeaderDeeply } from '@vuepress/markdown'
import { isString } from '@vuepress/shared'
import type { PageFrontmatter } from '../types'

/**
 * Resolve page title from frontmatter / file content
 */
export const resolvePageTitle = ({
  frontmatter,
  contentRaw,
}: {
  frontmatter: PageFrontmatter
  contentRaw: string
}): string => {
  if (isString(frontmatter.title)) {
    return parseHeaderDeeply(frontmatter.title)
  }

  const match = contentRaw.trim().match(/^#+\s+(.*)/)

  if (match) {
    return parseHeaderDeeply(match[1])
  }

  return ''
}

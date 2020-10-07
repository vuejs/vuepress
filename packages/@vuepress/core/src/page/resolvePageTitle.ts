import { parseHeaderDeeply } from '@vuepress/markdown'
import { isString } from '@vuepress/shared'
import type { PageFrontmatter } from '../types'

export const resolvePageTitle = (
  frontmatter: PageFrontmatter,
  content: string
): string => {
  if (isString(frontmatter.title)) {
    return parseHeaderDeeply(frontmatter.title)
  }

  const match = content.trim().match(/^#+\s+(.*)/)

  if (match) {
    return parseHeaderDeeply(match[1])
  }

  return ''
}

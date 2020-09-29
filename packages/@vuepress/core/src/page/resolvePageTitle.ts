import { parseHeaderDeeply } from '@vuepress/markdown'
import type { PageFrontmatter } from '../types'

export const resolvePageTitle = (
  frontmatter: PageFrontmatter,
  content: string
): string => {
  if (typeof frontmatter.title === 'string') {
    return parseHeaderDeeply(frontmatter.title)
  }

  const match = content.trim().match(/^#+\s+(.*)/)

  if (match) {
    return parseHeaderDeeply(match[1])
  }

  return ''
}

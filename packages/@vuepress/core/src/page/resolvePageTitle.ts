import { parseEmoji } from '@vuepress/markdown'
import { isString } from '@vuepress/shared'
import type { PageFrontmatter, PageHeader } from '../types'

/**
 * Resolve page title from frontmatter / file content
 */
export const resolvePageTitle = ({
  content,
  frontmatter,
  headers,
}: {
  content: string
  frontmatter: PageFrontmatter
  headers: PageHeader[]
}): string => {
  // use title in frontmatter
  if (isString(frontmatter.title)) {
    return parseEmoji(frontmatter.title)
  }

  // if the first header is <h1>, use it as the title
  const firstHeader = headers[0]
  if (firstHeader?.level === 1) {
    return firstHeader.title
  }

  // try to get the first `# title` from markdown content
  const matchTitle = content.trimStart().match(/^#\s+(.*)/)
  if (matchTitle) {
    return parseEmoji(matchTitle[1])
  }

  return ''
}

import { inferTitle } from '@vuepress/shared-utils'
import { PageFrontmatter } from './createPage'

export interface PageHeader {
  level: number
  title: string
  slug: string
}

export const resolvePageTitle = (
  frontmatter: PageFrontmatter,
  content: string
): string => {
  return inferTitle(frontmatter, content) || ''
}

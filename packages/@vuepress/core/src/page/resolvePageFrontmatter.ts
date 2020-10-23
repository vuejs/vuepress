import type { PageFrontmatter, PageOptions } from '../types'

/**
 * Resolve page frontmatter from user frontmatter and options frontmatter
 */
export const resolvePageFrontmatter = ({
  frontmatterRaw,
  options,
}: {
  frontmatterRaw: PageFrontmatter
  options: PageOptions
}): PageFrontmatter => ({
  // raw frontmatter take priority over options frontmatter
  ...options.frontmatter,
  ...frontmatterRaw,
})

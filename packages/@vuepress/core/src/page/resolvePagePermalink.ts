import { getPermalink } from '@vuepress/shared-utils'
import { PageConfig, PageFrontmatter } from './createPage'

export const resolvePagePermalink = (
  config: PageConfig,
  frontmatter: PageFrontmatter,
  slug: string,
  date: string,
  pathInferred: string | null
): string | null => {
  if (typeof frontmatter.permalink === 'string') {
    return frontmatter.permalink
  }

  if (config.permalink) {
    return config.permalink
  }

  const pattern =
    typeof frontmatter.permalinkPattern === 'string'
      ? frontmatter.permalinkPattern
      : config.permalinkPattern || ''

  return (
    getPermalink({
      pattern,
      slug,
      date,
      // TODO: handle localePath
      localePath: '/',
      regularPath: pathInferred || '',
    }) || null
  )
}

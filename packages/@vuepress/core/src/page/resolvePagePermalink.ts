import { ensureLeadingSlash, isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { PageFrontmatter } from '../types'

/**
 * Resolve page permalink from frontmatter / options / pattern
 */
export const resolvePagePermalink = ({
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale,
}: {
  frontmatter: PageFrontmatter
  slug: string
  date: string
  pathInferred: string | null
  pathLocale: string
}): string | null => {
  // use permalink in frontmatter directly
  if (isString(frontmatter.permalink)) {
    return frontmatter.permalink
  }

  // get permalink pattern from frontmatter or options
  const pattern = isString(frontmatter.permalinkPattern)
    ? frontmatter.permalinkPattern
    : null

  if (!pattern) {
    return null
  }

  // resolve permalink according to the pattern
  const [year, month, day] = date.split('-')

  const link = path.join(
    pathLocale,
    pattern
      .replace(/:year/, year)
      .replace(/:month/, month)
      .replace(/:day/, day)
      .replace(/:slug/, slug)
      .replace(/:raw/, pathInferred?.replace(/^\//, '') ?? '')
  )

  return ensureLeadingSlash(link)
}

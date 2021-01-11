import { ensureLeadingSlash, isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { PageOptions, PageFrontmatter } from '../types'

/**
 * Resolve page permalink from frontmatter / options / pattern
 */
export const resolvePagePermalink = ({
  options,
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale,
}: {
  options: PageOptions
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

  // use permalink in options directly
  if (options.permalink) {
    return options.permalink
  }

  // get permalink pattern from frontmatter or options
  const pattern = isString(frontmatter.permalinkPattern)
    ? frontmatter.permalinkPattern
    : options.permalinkPattern

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

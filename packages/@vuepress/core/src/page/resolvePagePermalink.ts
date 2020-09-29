import { ensureLeadingSlash } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { PageOptions, PageFrontmatter } from '../types'

export const resolvePagePermalink = (
  options: PageOptions,
  frontmatter: PageFrontmatter,
  slug: string,
  date: string,
  pathInferred: string | null,
  pathLocale: string
): string | null => {
  // use permalink in frontmatter directly
  if (typeof frontmatter.permalink === 'string') {
    return frontmatter.permalink
  }

  // use permalink in options directly
  if (options.permalink) {
    return options.permalink
  }

  // get permalink pattern from frontmatter or options
  const pattern =
    typeof frontmatter.permalinkPattern === 'string'
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
      .replace(/:slug/, encodeURI(slug))
      .replace(/:raw/, pathInferred?.replace(/^\//, '') ?? '')
  )

  return ensureLeadingSlash(link)
}

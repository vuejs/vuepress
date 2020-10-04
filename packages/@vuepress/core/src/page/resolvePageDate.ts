import { formatDateString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import { PageFrontmatter } from '../types'

const FILENAME_DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/
const defaultDate = '1970-01-01'

/**
 * Resolve page date according to frontmatter or file path
 *
 * It will be resolved as 'yyyy-MM-dd' format
 */
export const resolvePageDate = (
  frontmatter: PageFrontmatter,
  filePathRelative: string | null
): string => {
  // `frontmatter.date` could be parsed as UTC Date directly
  if (frontmatter.date instanceof Date) {
    return formatDateString(
      [
        frontmatter.date.getUTCFullYear(),
        frontmatter.date.getUTCMonth() + 1,
        frontmatter.date.getUTCDate(),
      ].join('-'),
      defaultDate
    )
  }

  if (typeof frontmatter.date === 'string') {
    return formatDateString(frontmatter.date, defaultDate)
  }

  if (filePathRelative === null) {
    return defaultDate
  }

  const filename = path.parse(filePathRelative).name

  if (filename) {
    const matches = filename.match(FILENAME_DATE_RE)
    if (matches) {
      return formatDateString(matches[1], defaultDate)
    }
  }

  const dirname = path.basename(path.dirname(filePathRelative))

  if (dirname) {
    const matches = dirname.match(FILENAME_DATE_RE)
    if (matches) {
      return formatDateString(matches[1], defaultDate)
    }
  }

  return defaultDate
}

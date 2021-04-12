import { formatDateString, isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import { PageFrontmatter } from '../types'

const FILENAME_DATE_RE = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?-(.*)$/
const DIRNAME_DATE_RE = /(\d{4})\/(\d{1,2})(?:\/(\d{1,2}))?(\/|$)/
const DEFAULT_DATE = '0000-00-00'

/**
 * Resolve page date according to frontmatter or file path
 *
 * It will be resolved as 'yyyy-MM-dd' format
 */
export const resolvePageDate = ({
  frontmatter,
  filePathRelative,
}: {
  frontmatter: PageFrontmatter
  filePathRelative: string | null
}): string => {
  // `frontmatter.date` could be parsed as UTC Date directly
  if (frontmatter.date instanceof Date) {
    return formatDateString(
      [
        frontmatter.date.getUTCFullYear(),
        frontmatter.date.getUTCMonth() + 1,
        frontmatter.date.getUTCDate(),
      ].join('-'),
      DEFAULT_DATE
    )
  }

  if (isString(frontmatter.date)) {
    return formatDateString(frontmatter.date, DEFAULT_DATE)
  }

  if (filePathRelative === null) {
    return DEFAULT_DATE
  }

  const filename = path.parse(filePathRelative).name

  if (filename) {
    const matches = filename.match(FILENAME_DATE_RE)
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${matches[3] ?? '01'}`,
        DEFAULT_DATE
      )
    }
  }

  const dirname = path.dirname(filePathRelative)

  if (dirname !== '.') {
    const matches = dirname.match(DIRNAME_DATE_RE)
    if (matches) {
      return formatDateString(
        `${matches[1]}-${matches[2]}-${matches[3] ?? '01'}`,
        DEFAULT_DATE
      )
    }
  }

  return DEFAULT_DATE
}

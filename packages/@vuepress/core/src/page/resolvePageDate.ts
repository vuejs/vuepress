import * as path from 'path'
import { PageFrontmatter } from './createPage'

const DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/

export const resolvePageDate = (
  frontmatter: PageFrontmatter,
  filePathRelative: string | null
): string => {
  if (!filePathRelative) {
    return ''
  }

  if (typeof frontmatter.date === 'string') {
    return frontmatter.date
  }

  const filename = path.parse(filePathRelative).name

  if (filename) {
    const matches = filename.match(DATE_RE)
    if (matches) {
      return matches[1]
    }
  }

  const dirname = path.basename(path.dirname(filePathRelative))

  if (dirname) {
    const matches = dirname.match(DATE_RE)
    if (matches) {
      return matches[1]
    }
  }

  return ''
}

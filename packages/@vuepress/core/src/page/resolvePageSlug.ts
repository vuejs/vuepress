import { path } from '@vuepress/utils'

const DATE_RE = /(\d{4}-\d{1,2}(-\d{1,2})?)-(.*)/

export const resolvePageSlug = (filePathRelative: string | null): string => {
  if (!filePathRelative) {
    return ''
  }

  const filename = path.parse(filePathRelative).name
  const match = filename.match(DATE_RE)

  return match ? match[3] : filename
}

import { path } from '@vuepress/utils'
import type { App, PageOptions } from '../types'

/**
 * Resolve absolute and relative path of page file
 */
export const resolvePageFilePath = ({
  app,
  options: { filePath },
}: {
  app: App
  options: PageOptions
}): {
  filePath: string | null
  filePathRelative: string | null
} => {
  // empty file path
  if (!filePath) {
    return {
      filePath: null,
      filePathRelative: null,
    }
  }

  // absolute file path
  if (path.isAbsolute(filePath)) {
    return {
      filePath,
      filePathRelative: path.relative(app.dir.source(), filePath),
    }
  }

  // relative file path
  return {
    filePath: app.dir.source(filePath),
    filePathRelative: filePath,
  }
}

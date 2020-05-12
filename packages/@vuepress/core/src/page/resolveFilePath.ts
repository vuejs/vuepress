import { relative, isAbsolute } from 'path'
import { normalizeSeparator } from '@vuepress/utils'
import { App } from '../app'
import { PageConfig } from './createPage'

/**
 * Resolve absolute and relative path of page file
 */
export const resolveFilePath = (
  app: App,
  { filePath }: PageConfig
): {
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
  if (isAbsolute(filePath)) {
    return {
      filePath,
      filePathRelative: normalizeSeparator(
        relative(app.dir.source(), filePath)
      ),
    }
  }

  // relative file path
  return {
    filePath: normalizeSeparator(app.dir.source(filePath)),
    filePathRelative: filePath,
  }
}

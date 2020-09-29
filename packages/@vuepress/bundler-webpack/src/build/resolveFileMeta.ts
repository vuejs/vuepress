import { path } from '@vuepress/utils'
import { resolveFileMetaType } from './resolveFileMetaType'
import type { FileMeta } from './types'

/**
 * Resolve client file meta from to file name
 */
export const resolveFileMeta = (file: string): FileMeta => {
  const extension = path.extname(file).slice(1)
  return {
    file,
    extension,
    type: resolveFileMetaType(extension),
  }
}

import type { FileMetaType } from './types'

/**
 * Resolve client file type by extension
 */
export const resolveFileMetaType = (extension: string): FileMetaType => {
  if (extension === 'js') {
    return 'script'
  }
  if (extension === 'css') {
    return 'style'
  }
  if (/jpe?g|png|svg|gif|webp|ico/.test(extension)) {
    return 'image'
  }
  if (/woff2?|ttf|otf|eot/.test(extension)) {
    return 'font'
  }
  // not exhausting all possibilities here, but above covers common cases
  return ''
}

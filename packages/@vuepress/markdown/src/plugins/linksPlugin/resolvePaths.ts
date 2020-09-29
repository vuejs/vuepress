import { path } from '@vuepress/utils'

/**
 * Resolve relative and absolute paths according to the `base` and `filePathRelative`
 */
export const resolvePaths = (
  rawPath: string,
  base: string,
  filePathRelative: string | null
): {
  absolutePath: string
  relativePath: string
} => {
  let relativePath: string
  let absolutePath: string

  if (rawPath.startsWith('/')) {
    // if raw path is absolute
    absolutePath = rawPath
    relativePath = path.relative(base, absolutePath)
  } else {
    // if raw path is relative
    if (filePathRelative) {
      // if `filePathRelative` is available

      // resolve relative path according to `filePathRelative`
      relativePath = path.join(path.dirname(filePathRelative), rawPath)
      // resolve absolute path according to `base`
      absolutePath = path.join(base, relativePath)
    } else {
      // if `filePathRelative` is not available

      // remove leading './'
      relativePath = rawPath.replace(/^(?:\.\/)?(.*)$/, '$1')
      // just take relative link as absolute link
      absolutePath = relativePath
    }
  }

  return {
    absolutePath,
    relativePath,
  }
}

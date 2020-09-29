import type { App } from '../types'

/**
 * Infer page path according to file path
 */
export const inferPagePath = (
  app: App,
  filePathRelative: string | null
): {
  pathInferred: string | null
  pathLocale: string
} => {
  if (!filePathRelative) {
    return {
      pathInferred: null,
      pathLocale: '/',
    }
  }

  // infer page path
  // foo.md -> /foo.html
  // foo/bar.md -> /foo/bar.html
  const pathInferred = `/${filePathRelative.replace(/\.md$/, '.html')}`

  // infer page locale path
  const pathLocale =
    Object.keys(app.options.locales).find((locale) =>
      pathInferred.startsWith(locale)
    ) ?? '/'

  return {
    pathInferred,
    pathLocale,
  }
}

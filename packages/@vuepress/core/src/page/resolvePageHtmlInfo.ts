import { removeLeadingSlash } from '@vuepress/shared'
import type { App } from '../types'

/**
 * Resolve page rendered html file path
 */
export const resolvePageHtmlInfo = ({
  app,
  path: pagePath,
}: {
  app: App
  path: string
}): {
  htmlFilePath: string
  htmlFilePathRelative: string
} => {
  // /foo.html -> foo.html
  // /foo/ -> foo/index.html
  const htmlFilePathRelative = removeLeadingSlash(
    decodeURI(pagePath.replace(/\/$/, '/index.html'))
  )
  const htmlFilePath = app.dir.dest(htmlFilePathRelative)

  return {
    htmlFilePath,
    htmlFilePathRelative,
  }
}

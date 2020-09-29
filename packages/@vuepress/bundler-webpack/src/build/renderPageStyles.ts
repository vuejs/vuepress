import type { App } from '@vuepress/core'
import type { FileMeta } from './types'

/**
 * Render styles of current page
 */
export const renderPageStyles = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta,
}: {
  app: App
  initialFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
}): string =>
  // include initial CSS files and other async CSS files of current page
  // notice here we put async CSS files after initial CSS files
  [...initialFilesMeta, ...pageClientFilesMeta]
    .filter(({ type }) => type === 'style')
    .map(
      ({ file }) => `<link rel="stylesheet" href="${app.options.base}${file}">`
    )
    .join('')

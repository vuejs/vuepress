import type { App } from '@vuepress/core'
import type { FileMeta } from './types'

/**
 * Render scripts of current page
 */
export const renderPageScripts = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta,
}: {
  app: App
  initialFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
}): string =>
  // include initial JS files and other async JS files of current page
  [...pageClientFilesMeta, ...initialFilesMeta]
    .filter(({ type }) => type === 'script')
    .map(
      ({ file }) => `<script src="${app.options.base}${file}" defer></script>`
    )
    .join('')

import type { App } from '@vuepress/core'
import type { FileMeta } from './types'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta,
}: {
  app: App
  initialFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
}): string => {
  // shouldPreload option
  const shouldPreload = app.options.shouldPreload

  // do not render preload links
  if (shouldPreload === false) {
    return ''
  }

  // initial files and files used by current page should be preload
  const preloadFilesMeta = [...initialFilesMeta, ...pageClientFilesMeta]

  return preloadFilesMeta
    .map(({ file, extension, type }) => {
      // by default, we only preload scripts or css
      if (shouldPreload === true && type !== 'script' && type !== 'style') {
        return ''
      }

      // user wants to explicitly control what to preload
      if (shouldPreload !== true && !shouldPreload(file, type)) {
        return ''
      }

      return `<link rel="preload" href="${app.options.base}${file}"${
        type !== '' ? ` as="${type}"` : ''
      }${type === 'font' ? ` type="font/${extension}" crossorigin` : ''}>`
    })
    .join('')
}

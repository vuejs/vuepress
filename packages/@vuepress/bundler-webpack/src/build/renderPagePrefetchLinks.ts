import type { App } from '@vuepress/core'
import type { FileMeta } from './types'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  asyncFilesMeta,
  pageClientFilesMeta,
}: {
  app: App
  asyncFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
}): string => {
  // shouldPrefetch option
  const shouldPrefetch = app.options.shouldPrefetch

  // do not render prefetch links
  if (shouldPrefetch === false) {
    return ''
  }

  // async files excluding files used by current page should be prefetch
  const prefetchFilesMeta = asyncFilesMeta.filter(
    ({ file }) => !pageClientFilesMeta.some((f) => f.file === file)
  )

  return prefetchFilesMeta
    .map(({ file, type }) => {
      // user wants to explicitly control what to prefetch
      if (shouldPrefetch !== true && !shouldPrefetch(file, type)) {
        return ''
      }
      return `<link rel="prefetch" href="${app.options.base}${file}">`
    })
    .join('')
}

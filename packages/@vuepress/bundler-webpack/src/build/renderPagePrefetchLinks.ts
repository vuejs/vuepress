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

  // async files excluding files used by current page should be prefetch
  const prefetchFilesMeta = asyncFilesMeta.filter(
    ({ file }) => !pageClientFilesMeta.some((f) => f.file === file)
  )

  return prefetchFilesMeta
    .map(({ file, type }) => {
      if (shouldPrefetch && !shouldPrefetch(file, type)) {
        return ''
      }
      return `<link rel="prefetch" href="${app.options.base}${file}">`
    })
    .join('')
}

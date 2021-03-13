import type { OutputChunk } from 'rollup'
import type { App } from '@vuepress/core'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  outputEntryChunk,
  pageChunkFiles,
}: {
  app: App
  outputEntryChunk: OutputChunk
  pageChunkFiles: string[]
}): string => {
  // shouldPrefetch option
  const shouldPrefetch = app.options.shouldPrefetch

  // do not render prefetch links
  if (shouldPrefetch === false) {
    return ''
  }

  // dynamic imports excluding current page chunks
  const prefetchFiles = outputEntryChunk.dynamicImports.filter(
    (item) => !pageChunkFiles.some((file) => file === item)
  )

  return prefetchFiles
    .map((item) => {
      // resolve file type
      const type = item.endsWith('.js')
        ? 'script'
        : item.endsWith('.css')
        ? 'style'
        : ''

      // user wants to explicitly control what to prefetch
      if (shouldPrefetch !== true && !shouldPrefetch(item, type)) {
        return ''
      }
      return `<link rel="prefetch" href="${app.options.base}${item}">`
    })
    .join('')
}

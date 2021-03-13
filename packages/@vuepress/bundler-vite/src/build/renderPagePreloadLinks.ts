import type { OutputChunk } from 'rollup'
import type { App } from '@vuepress/core'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
  app,
  outputEntryChunk,
  pageChunkFiles,
}: {
  app: App
  outputEntryChunk: OutputChunk
  pageChunkFiles: string[]
}): string => {
  // shouldPreload option
  const shouldPreload = app.options.shouldPreload

  // do not render preload links
  if (shouldPreload === false) {
    return ''
  }

  // dedupe entry chunks and page chunks
  const preloadFiles = Array.from(
    new Set([
      outputEntryChunk.fileName,
      ...outputEntryChunk.imports,
      // TODO: preload layout
      ...pageChunkFiles,
    ])
  )

  return preloadFiles
    .map((item) => {
      // resolve file type
      const type = item.endsWith('.js')
        ? 'script'
        : item.endsWith('.css')
        ? 'style'
        : ''

      // by default, we only preload js and css
      if (shouldPreload === true && type !== 'script' && type !== 'style') {
        return ''
      }

      // user wants to explicitly control what to preload
      if (shouldPreload !== true && !shouldPreload(item, type)) {
        return ''
      }

      if (type === 'script') {
        return `<link rel="modulepreload" href="${app.options.base}${item}">`
      }

      return `<link rel="preload" href="${app.options.base}${item}"${
        type !== '' ? ` as="${type}"` : ''
      }>`
    })
    .join('')
}

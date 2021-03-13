import type { OutputAsset } from 'rollup'
import type { App } from '@vuepress/core'

/**
 * Render styles of current page
 */
export const renderPageStyles = ({
  app,
  outputCssAsset,
}: {
  app: App
  outputCssAsset: OutputAsset
}): string =>
  `<link rel="stylesheet" href="${app.options.base}${outputCssAsset.fileName}">`

import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import type { App as VueApp } from 'vue'
import type { Router as VueRouter } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import type { SSRContext } from '@vue/server-renderer'
import type { App, Page } from '@vuepress/core'
import { fs, renderHead } from '@vuepress/utils'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks'
import { renderPagePreloadLinks } from './renderPagePreloadLinks'
import { renderPageScripts } from './renderPageScripts'
import { renderPageStyles } from './renderPageStyles'
import { resolvePageChunkFiles } from './resolvePageChunkFiles'

export const renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  ssrTemplate,
  output,
  outputEntryChunk,
  outputCssAsset,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: VueRouter
  ssrTemplate: string
  output: RollupOutput['output']
  outputEntryChunk: OutputChunk
  outputCssAsset: OutputAsset
}): Promise<void> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context with default values
  const ssrContext: SSRContext = {
    lang: 'en',
    head: [],
  }

  // render current page to string
  const pageRendered = await renderToString(vueApp, ssrContext)

  // resolve page chunks
  const pageChunkFiles = resolvePageChunkFiles({ page, output })

  // generate html string
  const html = ssrTemplate
    // page lang
    .replace('{{ lang }}', ssrContext.lang)
    // page head
    .replace(
      '<!--vuepress-ssr-head-->',
      ssrContext.head.map(renderHead).join('')
    )
    // page preload & prefetch links
    .replace(
      '<!--vuepress-ssr-resources-->',
      `${renderPagePreloadLinks({
        app,
        outputEntryChunk,
        pageChunkFiles,
      })}${renderPagePrefetchLinks({
        app,
        outputEntryChunk,
        pageChunkFiles,
      })}`
    )
    // page styles
    .replace(
      '<!--vuepress-ssr-styles-->',
      renderPageStyles({ app, outputCssAsset })
    )
    .replace('<!--vuepress-ssr-app-->', pageRendered)
    // page scripts
    .replace(
      '<!--vuepress-ssr-scripts-->',
      renderPageScripts({ app, outputEntryChunk })
    )

  // write html file
  await fs.outputFile(page.htmlFilePath, html)
}

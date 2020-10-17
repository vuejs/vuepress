import type { App as VueApp } from 'vue'
import type { Router as VueRouter } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import type { SSRContext } from '@vue/server-renderer'
import type { Page, App } from '@vuepress/core'
import {
  isArray,
  removeLeadingSlash,
  resolveSiteLocaleData,
} from '@vuepress/shared'
import { fs, renderHead } from '@vuepress/utils'
import { renderPagePrefetchLinks } from './renderPagePrefetchLinks'
import { renderPagePreloadLinks } from './renderPagePreloadLinks'
import { renderPageScripts } from './renderPageScripts'
import { renderPageStyles } from './renderPageStyles'
import { resolvePageClientFilesMeta } from './resolvePageClientFilesMeta'
import type { FileMeta, ModuleFilesMetaMap } from './types'

export interface VuepressSSRContext extends SSRContext {
  _registeredComponents: Set<string>
}

/**
 * Render page to html file, return the html file path
 */
export const renderPage = async ({
  app,
  page,
  vueApp,
  vueRouter,
  ssrTemplate,
  allFilesMeta,
  initialFilesMeta,
  asyncFilesMeta,
  moduleFilesMetaMap,
}: {
  app: App
  page: Page
  vueApp: VueApp
  vueRouter: VueRouter
  ssrTemplate: string
  allFilesMeta: FileMeta[]
  initialFilesMeta: FileMeta[]
  asyncFilesMeta: FileMeta[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): Promise<string> => {
  // switch to current page route
  await vueRouter.push(page.path)
  await vueRouter.isReady()

  // create vue ssr context
  const ssrContext: VuepressSSRContext = {
    _registeredComponents: new Set(),
  }

  // render current page to string
  const pageRendered = await renderToString(vueApp, ssrContext)

  // resolve client files that used by this page
  const pageClientFilesMeta = resolvePageClientFilesMeta({
    moduleRequests: Array.from(ssrContext._registeredComponents),
    moduleFilesMetaMap,
  })

  // resolve page head config
  const pageHead = isArray(page.frontmatter.head) ? page.frontmatter.head : []

  // resolve site locale data
  const siteLocaleData = resolveSiteLocaleData(app.options, page.path)

  // TODO: change the template? currently we simply use vue 2 ssr template
  // generate html string
  const html = ssrTemplate
    // page lang
    .replace('{{ lang }}', siteLocaleData.lang)
    // page title
    .replace(
      '{{ title }}',
      `${page.title ? `${page.title} | ` : ``}${siteLocaleData.title}`
    )
    // vuepress version
    .replace('{{ version }}', `v${app.version}`)
    // site locale data head
    .replace(
      '{{{ userHeadTags }}}',
      `${renderHead([
        'meta',
        {
          name: 'description',
          content: siteLocaleData.description,
        },
      ])}${siteLocaleData.head.map(renderHead).join('')}`
    )
    // page frontmatter head
    .replace('{{{ pageMeta }}}', pageHead.map(renderHead).join(''))
    // page preload & prefetch links
    .replace(
      '{{{ renderResourceHints() }}}',
      `${renderPagePreloadLinks({
        app,
        initialFilesMeta,
        pageClientFilesMeta,
      })}${renderPagePrefetchLinks({
        app,
        asyncFilesMeta,
        pageClientFilesMeta,
      })}`
    )
    // page styles
    .replace(
      '{{{ renderStyles() }}}',
      renderPageStyles({ app, initialFilesMeta, pageClientFilesMeta })
    )
    .replace('<!--vue-ssr-outlet-->', pageRendered)
    // page scripts
    .replace(
      '{{{ renderScripts() }}}',
      renderPageScripts({ app, initialFilesMeta, pageClientFilesMeta })
    )

  // TODO: teleports

  // get html file name
  const htmlFilename = app.dir.dest(
    removeLeadingSlash(page.path.replace(/\/$/, '/index.html'))
  )

  // write html file
  await fs.outputFile(htmlFilename, html)

  return htmlFilename
}

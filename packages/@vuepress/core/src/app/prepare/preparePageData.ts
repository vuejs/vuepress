import type { App, Page } from '../../types'
import { resolvePageData } from './resolvePageData'

/**
 * Generate page data temp file of a single page
 */
export const preparePageData = async (app: App, page: Page): Promise<void> => {
  // resolve default page data
  const pageData = resolvePageData(page)

  // plugin hook: extendsPageData
  const extendsPageData = await app.pluginApi.hooks.extendsPageData.process(
    page,
    app
  )

  // extends default page data
  extendsPageData.forEach((item) => Object.assign(pageData, item))

  // page data file content
  let content = `export const data = ${JSON.stringify(pageData, null, 2)}\n`

  // HMR support
  const hmrCode = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updatePageData(data)
}
`

  if (app.env.isDev) {
    content += hmrCode
  }

  await app.writeTemp(page.dataFilePathRelative, content)
}

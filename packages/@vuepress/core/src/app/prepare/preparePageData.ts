import type { App, Page } from '../../types'
import { resolvePageData } from './resolvePageData'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
`

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

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp(page.dataFilePathRelative, content)
}

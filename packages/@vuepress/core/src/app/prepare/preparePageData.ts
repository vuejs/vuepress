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
    page
  )

  // extends default page data
  extendsPageData.forEach((item) => Object.assign(pageData, item))

  await app.writeTemp(
    `internal/pageData/${page.key}.js`,
    `export default ${JSON.stringify(pageData, null, 2)}\n`
  )
}

import type { App, Page } from '../../types'
import { resolvePageData } from './resolvePageData'

/**
 * Generate page data temp file of a single page
 */
export const preparePageData = async (app: App, page: Page): Promise<void> => {
  await app.writeTemp(
    `internal/pageData/${page.key}.js`,
    `export default ${JSON.stringify(resolvePageData(page), null, 2)}\n`
  )
}

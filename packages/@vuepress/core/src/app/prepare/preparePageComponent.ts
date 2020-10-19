import type { App, Page } from '../../types'

/**
 * Generate page component temp file of a single page
 */
export const preparePageComponent = async (
  app: App,
  page: Page
): Promise<void> => {
  await app.writeTemp(page.componentFilePathRelative, page.componentFileContent)
}

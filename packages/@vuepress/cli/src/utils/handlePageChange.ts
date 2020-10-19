import {
  createPage,
  preparePageComponent,
  preparePageData,
} from '@vuepress/core'
import type { App } from '@vuepress/core'

/**
 * Event handler for page change event
 */
export const handlePageChange = async (
  app: App,
  filePath: string
): Promise<void> => {
  // get index of the changed page
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex === -1) {
    return
  }

  // recreate page from changed file
  const changedPage = await createPage(app, {
    filePath,
  })

  // replace the old page
  app.pages.splice(pageIndex, 1, changedPage)

  // re-prepare page files
  await preparePageComponent(app, changedPage)
  await preparePageData(app, changedPage)
}

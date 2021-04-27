import {
  createPage,
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from '@vuepress/core'
import type { App } from '@vuepress/core'

/**
 * Event handler for page change event
 */
export const handlePageChange = async (
  app: App,
  filePath: string
): Promise<void> => {
  // get page index of the changed file
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex === -1) {
    return
  }

  // get the old page of the changed file
  const oldPage = app.pages[pageIndex]

  // create a new page from the changed file
  const changedPage = await createPage(app, {
    filePath,
  })

  // replace the old page
  app.pages.splice(pageIndex, 1, changedPage)

  // prepare page files
  await preparePageComponent(app, changedPage)
  await preparePageData(app, changedPage)

  const isPathChanged = oldPage.path !== changedPage.path
  const isTitleChanged = oldPage.title !== changedPage.title

  // prepare pages entry if the path is changed
  if (isPathChanged) {
    await preparePagesComponents(app)
    await preparePagesData(app)
  }

  // prepare pages routes if the path or title is changed
  if (isPathChanged || isTitleChanged) {
    await preparePagesRoutes(app)
  }
}

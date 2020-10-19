import {
  createPage,
  preparePageComponent,
  preparePageData,
  preparePagesComponent,
  preparePagesData,
  prepareRoutes,
} from '@vuepress/core'
import type { App } from '@vuepress/core'

/**
 * Event handler for page add event
 */
export const handlePageAdd = async (
  app: App,
  filePath: string
): Promise<void> => {
  // check if the added page is duplicated
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex !== -1) {
    return
  }

  // create page
  const addedPage = await createPage(app, {
    filePath,
  })

  // add the new page
  app.pages.push(addedPage)

  // prepare page files
  await preparePageComponent(app, addedPage)
  await preparePageData(app, addedPage)
  await preparePagesComponent(app)
  await preparePagesData(app)
  await prepareRoutes(app)
}

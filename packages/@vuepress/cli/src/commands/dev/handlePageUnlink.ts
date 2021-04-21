import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from '@vuepress/core'
import type { App } from '@vuepress/core'

/**
 * Event handler for page unlink event
 */
export const handlePageUnlink = async (
  app: App,
  filePath: string
): Promise<void> => {
  // check if the unlinked page is existed
  const pageIndex = app.pages.findIndex((page) => page.filePath === filePath)
  if (pageIndex === -1) {
    return
  }

  // remove the old page
  app.pages.splice(pageIndex, 1)

  // re-prepare page files
  await preparePagesComponents(app)
  await preparePagesData(app)
  await preparePagesRoutes(app)
}

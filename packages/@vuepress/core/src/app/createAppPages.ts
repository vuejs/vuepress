import { globby } from '@vuepress/utils'
import { createPage } from '../page'
import type { App, Page } from '../types'

/**
 * Create pages for vuepress app
 */
export const createAppPages = async (app: App): Promise<Page[]> => {
  const patterns = ['**/*.md', '!.vuepress', '!node_modules']
  const pagePaths = await globby(patterns, {
    cwd: app.dir.source(),
  })

  // TODO
  // may need to limit the max parallel tasks
  // or change to serial tasks
  const pages = await Promise.all(
    pagePaths.map((filePath) =>
      createPage(app, {
        filePath,
      })
    )
  )

  return pages
}

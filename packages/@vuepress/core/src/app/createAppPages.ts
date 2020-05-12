import { globby } from '@vuepress/utils'
import { App } from './createApp'
import { Page, createPage } from '../page'

export type AppPages = Page[]

/**
 * Create pages for vuepress app
 */
export const createAppPages = async (app: App): Promise<AppPages> => {
  const patterns = ['**/*.md', '**/*.vue', '!.vuepress', '!node_modules']
  const pagePaths = await globby(patterns, {
    cwd: app.dir.source(),
  })

  const pages = await Promise.all(
    pagePaths.map((filePath) =>
      createPage(app, {
        filePath,
      })
    )
  )

  return pages
}

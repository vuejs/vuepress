import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import type { App } from '@vuepress/core'
import { chalk, logger } from '@vuepress/utils'
import { handlePageAdd } from './handlePageAdd'
import { handlePageChange } from './handlePageChange'
import { handlePageUnlink } from './handlePageUnlink'

export const watchPageFiles = (app: App): FSWatcher => {
  const pagesWatcher = chokidar.watch(app.options.pagePatterns, {
    cwd: app.dir.source(),
    ignoreInitial: true,
  })
  pagesWatcher.on('add', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is created`)
    handlePageAdd(app, app.dir.source(filePathRelative))
  })
  pagesWatcher.on('change', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is modified`)
    handlePageChange(app, app.dir.source(filePathRelative))
  })
  pagesWatcher.on('unlink', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is removed`)
    handlePageUnlink(app, app.dir.source(filePathRelative))
  })

  // TODO: watch page deps

  return pagesWatcher
}

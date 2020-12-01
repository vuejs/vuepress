import * as chokidar from 'chokidar'
import { createApp } from '@vuepress/core'
import { chalk, debug, fs, logger } from '@vuepress/utils'
import {
  loadUserConfig,
  resolveBundler,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from '../../config'
import { handlePageAdd } from './handlePageAdd'
import { handlePageChange } from './handlePageChange'
import { handlePageUnlink } from './handlePageUnlink'
import { resolveDevAppConfig } from './resolveDevAppConfig'
import type { DevCommandOptions } from './types'

const log = debug('vuepress:cli/dev')

export const dev = async (
  sourceDir = '.',
  commandOptions: DevCommandOptions = {}
): Promise<void> => {
  log(`commandOptions:`, commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development'
  }

  // resolve app config from cli options
  const appConfig = resolveDevAppConfig(sourceDir, commandOptions)

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(appConfig.source)

  log(`userConfigPath:`, userConfigPath)

  const userConfig = await loadUserConfig(userConfigPath)

  // resolve bundler from user config
  const bundler = resolveBundler(userConfig)

  // create vuepress app
  // use cli options to override config file
  const app = createApp({
    ...userConfig,
    ...appConfig,
  })

  // use user-config plugin
  app.use(transformUserConfigToPlugin(userConfig))

  // clean cache
  if (commandOptions.cleanCache === true) {
    logger.info('cleaning cache')
    await fs.remove(app.dir.cache())
  }

  // start dev server
  const close = await bundler.dev(app)

  // do not watch files if `watch` is set to `false`
  if (commandOptions.watch === false) {
    return
  }

  // watch page files
  const pagesWatcher = chokidar.watch(app.options.pagePatterns, {
    cwd: app.dir.source(),
    ignoreInitial: true,
  })

  // handle page add event
  pagesWatcher.on('add', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is created`)
    handlePageAdd(app, app.dir.source(filePathRelative))
  })

  // handle page change event
  pagesWatcher.on('change', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is modified`)
    handlePageChange(app, app.dir.source(filePathRelative))
  })

  // handle page unlink event
  pagesWatcher.on('unlink', (filePathRelative) => {
    logger.info(`page ${chalk.magenta(filePathRelative)} is removed`)
    handlePageUnlink(app, app.dir.source(filePathRelative))
  })

  // watch user config file
  if (userConfigPath) {
    const configWatcher = chokidar.watch(userConfigPath, {
      cwd: process.cwd(),
      ignoreInitial: true,
    })
    configWatcher.on('change', async (configFile) => {
      logger.info(`config ${chalk.magenta(configFile)} is modified`)
      await Promise.all([
        // close file watchers
        pagesWatcher.close(),
        configWatcher.close(),
        // close current dev server
        close(),
      ])
      // re-run dev command
      await dev(sourceDir, commandOptions)
      logger.tip(`dev server has restarted, please refresh your browser`)
    })
  }
}

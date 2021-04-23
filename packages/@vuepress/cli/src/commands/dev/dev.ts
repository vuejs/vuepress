import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import { createApp } from '@vuepress/core'
import { chalk, debug, fs, logger } from '@vuepress/utils'
import {
  loadUserConfig,
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

  // create vuepress app
  const app = createApp({
    // use cli options to override config file
    ...userConfig,
    ...appConfig,
  })

  // use user-config plugin
  app.use(transformUserConfigToPlugin(app, userConfig))

  // clean temp and cache
  if (commandOptions.cleanTemp === true) {
    logger.info('Cleaning temp...')
    await fs.remove(app.dir.temp())
  }
  if (commandOptions.cleanCache === true) {
    logger.info('Cleaning cache...')
    await fs.remove(app.dir.cache())
  }

  // initialize and prepare
  logger.info('Initializing VuePress and preparing data...')
  await app.init()
  await app.prepare()

  // start dev server
  const close = await app.dev()

  // do not watch files if `watch` is set to `false`
  if (commandOptions.watch === false) {
    return
  }

  // all watchers
  const watchers: FSWatcher[] = []

  // restart dev command
  const restart = async (): Promise<void> => {
    await Promise.all([
      // close all watchers
      ...watchers.map((item) => item.close()),
      // close current dev server
      close(),
    ])
    // restart dev command
    await dev(sourceDir, {
      ...commandOptions,
      // do not clean cache and temp on restart
      cleanCache: false,
      cleanTemp: false,
    })
    logger.tip(`dev server has restarted, please refresh your browser`)
  }

  // watch page files
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
  watchers.push(pagesWatcher)

  // watch user config file
  if (userConfigPath) {
    const configWatcher = chokidar.watch(userConfigPath, {
      cwd: process.cwd(),
      ignoreInitial: true,
    })
    configWatcher.on('change', (configFile) => {
      logger.info(`config ${chalk.magenta(configFile)} is modified`)
      restart()
    })
    watchers.push(configWatcher)
  }

  await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
}

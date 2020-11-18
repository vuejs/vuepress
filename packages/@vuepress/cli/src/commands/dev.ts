import * as chokidar from 'chokidar'
import { createApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { chalk, debug, fs, logger, path } from '@vuepress/utils'
import { resolveUserConfig, userConfigPaths } from '../config'
import {
  resolveBundler,
  handlePageAdd,
  handlePageChange,
  handlePageUnlink,
} from '../utils'

const log = debug('vuepress:cli/dev')

export interface CommandOptionsDev {
  // app config
  port?: number
  host?: string
  temp?: string
  cache?: string
  debug?: boolean
  open?: boolean

  // cli only
  cleanCache?: boolean
  watch?: boolean
}

export const resolveDevAppConfig = (
  sourceDir: string,
  { port, host, temp, cache, debug, open }: CommandOptionsDev
): AppConfig => {
  // resolve the source directory
  const cwd = process.cwd()
  const source = path.resolve(cwd, sourceDir)

  const appConfig: AppConfig = {
    source,
  }

  // set app config from cli options
  if (port !== undefined) {
    appConfig.port = port
  }

  if (host !== undefined) {
    appConfig.host = host
  }

  if (temp !== undefined) {
    appConfig.temp = path.resolve(cwd, temp)
  }

  if (cache !== undefined) {
    appConfig.cache = path.resolve(cwd, cache)
  }

  if (debug !== undefined) {
    appConfig.debug = debug
  }

  if (open !== undefined) {
    appConfig.open = open
  }

  return appConfig
}

export const dev = async (
  sourceDir = '.',
  commandOptions: CommandOptionsDev = {}
): Promise<void> => {
  log(`commandOptions:`, commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development'
  }

  // resolve base app config
  const appConfig = resolveDevAppConfig(sourceDir, commandOptions)

  // resolve user config
  const userConfig = await resolveUserConfig(appConfig.source)

  // resolve bundler from user config
  const bundler = resolveBundler(userConfig)

  // create vuepress app
  const app = createApp({
    ...userConfig,
    ...appConfig,
  })

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

  // watch config file
  const configWatcher = chokidar.watch(userConfigPaths, {
    cwd: app.dir.source(),
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

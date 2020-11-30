import { createApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { debug, fs, logger, path } from '@vuepress/utils'
import {
  resolveBundler,
  resolveUserConfig,
  transformUserConfigToPlugin,
} from '../config'

const log = debug('vuepress:cli/build')

export interface CommandOptionsBuild {
  // app config
  dest?: string
  temp?: string
  cache?: string
  debug?: boolean

  // cli only
  cleanCache?: boolean
}

export const resolveBuildAppConfig = (
  sourceDir: string,
  { dest, temp, cache, debug }: CommandOptionsBuild
): AppConfig => {
  // resolve the source directory
  const cwd = process.cwd()
  const source = path.resolve(cwd, sourceDir)

  const appConfig: AppConfig = {
    source,
  }

  // set app config from cli options
  if (dest !== undefined) {
    appConfig.dest = path.resolve(cwd, dest)
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

  return appConfig
}

export const build = async (
  sourceDir = '.',
  commandOptions: CommandOptionsBuild = {}
): Promise<void> => {
  log(`commandOptions:`, commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production'
  }

  // resolve base app config
  const appConfig = resolveBuildAppConfig(sourceDir, commandOptions)

  // resolve user config
  const userConfig = await resolveUserConfig(appConfig.source)

  // resolve bundler from user config
  const bundler = resolveBundler(userConfig)

  // create vuepress app
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

  // build
  await bundler.build(app)
}

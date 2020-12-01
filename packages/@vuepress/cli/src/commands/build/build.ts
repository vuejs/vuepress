import { createApp } from '@vuepress/core'
import { debug, fs, logger } from '@vuepress/utils'
import {
  loadUserConfig,
  resolveBundler,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from '../../config'
import { resolveBuildAppConfig } from './resolveBuildAppConfig'
import type { BuildCommandOptions } from './types'

const log = debug('vuepress:cli/build')

export const build = async (
  sourceDir = '.',
  commandOptions: BuildCommandOptions = {}
): Promise<void> => {
  log(`commandOptions:`, commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production'
  }

  // resolve base app config
  const appConfig = resolveBuildAppConfig(sourceDir, commandOptions)

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(appConfig.source)

  log(`userConfigPath:`, userConfigPath)

  const userConfig = await loadUserConfig(userConfigPath)

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

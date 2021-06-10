import { createBuildApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { debug, fs, logger } from '@vuepress/utils'
import {
  loadUserConfig,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from '../../config'
import { resolveBuildAppConfig } from './resolveBuildAppConfig'
import type { BuildCommandOptions } from './types'

const log = debug('vuepress:cli/build')

export type BuildCommand = (
  sourceDir?: string,
  commandOptions?: BuildCommandOptions
) => Promise<void>

export const createBuild = (
  defaultAppConfig: Partial<AppConfig>
): BuildCommand => async (
  sourceDir = '.',
  commandOptions = {}
): Promise<void> => {
  log(`commandOptions:`, commandOptions)

  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production'
  }

  // resolve base app config
  const cliAppConfig = resolveBuildAppConfig(sourceDir, commandOptions)

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(cliAppConfig.source)

  log(`userConfigPath:`, userConfigPath)

  const userConfig = await loadUserConfig(userConfigPath)

  // create vuepress app
  const app = createBuildApp({
    // allow setting default app config via `cli()`
    // for example, set different default bundler in `vuepress` and `vuepress-vite` package
    ...defaultAppConfig,
    // use cli options to override config file
    ...userConfig,
    ...cliAppConfig,
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

  // empty dest directory
  await fs.emptyDir(app.dir.dest())

  // initialize and prepare
  logger.info('Initializing VuePress and preparing data...')

  await app.init()
  await app.prepare()

  // build
  await app.build()

  // plugin hook: onGenerated
  await app.pluginApi.hooks.onGenerated.process(app)

  logger.success('VuePress build successfully!')
}

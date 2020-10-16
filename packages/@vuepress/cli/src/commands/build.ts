import { createApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveUserConfig } from '../config'
import { resolveBundler } from '../utils'

export interface CommandOptionsBuild {
  dest?: string
  temp?: string
  debug?: boolean
}

export const resolveBuildAppConfig = (
  sourceDir: string,
  { dest, temp, debug }: CommandOptionsBuild
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

  if (debug !== undefined) {
    appConfig.debug = debug
  }

  return appConfig
}

export const build = async (
  sourceDir = '.',
  commandOptions: CommandOptionsBuild = {}
): Promise<void> => {
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

  // build
  await bundler.build(app)
}

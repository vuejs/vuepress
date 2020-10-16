import { createApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveUserConfig } from '../config'
import { resolveBundler } from '../utils'

export interface CommandOptionsDev {
  port?: number
  host?: string
  temp?: string
  debug?: boolean
  open?: boolean
}

export const resolveDevAppConfig = (
  sourceDir: string,
  { port, host, temp, debug, open }: CommandOptionsDev
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

  // initialize
  await app.init()

  // prepare
  await app.prepare()

  // TODO: watch & reload
  await bundler.dev(app)
}

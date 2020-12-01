import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { DevCommandOptions } from './types'

export const resolveDevAppConfig = (
  sourceDir = '.',
  { port, host, temp, cache, debug, open }: DevCommandOptions,
  cwd = process.cwd()
): AppConfig => {
  // resolve the source directory
  const source = path.resolve(cwd, sourceDir)

  const appConfig: AppConfig = {
    source,
  }

  // set app config from cli options
  // notice that we do not want to override user config unless it is set explicitly via cli
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

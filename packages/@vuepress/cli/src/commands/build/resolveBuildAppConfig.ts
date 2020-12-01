import type { AppConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { BuildCommandOptions } from './types'

export const resolveBuildAppConfig = (
  sourceDir = '.',
  { dest, temp, cache, debug }: BuildCommandOptions,
  cwd = process.cwd()
): AppConfig => {
  // resolve the source directory
  const source = path.resolve(cwd, sourceDir)

  const appConfig: AppConfig = {
    source,
  }

  // set app config from cli options
  // notice that we do not want to override user config unless it is set explicitly via cli
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

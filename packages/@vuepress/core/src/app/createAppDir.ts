import { path } from '@vuepress/utils'
import type { AppDir, AppDirFunction, AppOptions } from '../types'

/**
 * Create directory util function
 */
export const createAppDirFunction = (baseDir: string): AppDirFunction => {
  return (...args: string[]): string => path.resolve(baseDir, ...args)
}

/**
 * Create directory utils for vuepress app
 */
export const createAppDir = (options: AppOptions): AppDir => {
  const temp = createAppDirFunction(options.dirTemp)
  const source = createAppDirFunction(options.dirSource)
  const dest = createAppDirFunction(options.dirDest)

  // @vuepress/client
  const client = createAppDirFunction(
    path.resolve(require.resolve('@vuepress/client/package.json'), '..')
  )

  return {
    temp,
    source,
    dest,
    client,
  }
}

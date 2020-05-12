import { resolve } from 'path'
import { AppOptions } from './createAppOptions'

/**
 * Directory util function
 */
export type DirFunction = (...args: string[]) => string

/**
 * Create directory util function
 */
export const createDirFunction = (baseDir: string): DirFunction => {
  return (...args: string[]): string => resolve(baseDir, ...args)
}

/**
 * Directory utils
 */
export interface AppDir {
  temp: DirFunction
  source: DirFunction
  dest: DirFunction
  client: DirFunction
}

/**
 * Create directory utils for vuepress app
 */
export const createAppDir = (options: AppOptions): AppDir => {
  const temp = createDirFunction(options.dirTemp)
  const source = createDirFunction(options.dirSource)
  const dest = createDirFunction(options.dirDest)

  // @vuepress/client
  const client = createDirFunction(
    resolve(require.resolve('@vuepress/client/package.json'), '..')
  )

  return {
    temp,
    source,
    dest,
    client,
  }
}

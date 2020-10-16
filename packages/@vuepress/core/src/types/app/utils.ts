/**
 * Directory util function
 */
export type AppDirFunction = (...args: string[]) => string

/**
 * Directory utils
 */
export interface AppDir {
  cache: AppDirFunction
  temp: AppDirFunction
  source: AppDirFunction
  dest: AppDirFunction
  client: AppDirFunction
}

/**
 * Environment flags
 */
export interface AppEnv {
  isProd: boolean
  isTest: boolean
  isDev: boolean
  isDebug: boolean
  nodeEnv: string | undefined
}

/**
 * Write temp file util
 */
export type AppWriteTemp = (file: string, content: string) => Promise<string>

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
  public: AppDirFunction
  client: AppDirFunction
}

/**
 * Environment flags
 */
export interface AppEnv {
  /**
   * Is running in build mode or not
   */
  isBuild: boolean

  /**
   * Is running in dev mode or not
   */
  isDev: boolean

  /**
   * Is debug mode enabled or not
   */
  isDebug: boolean
}

/**
 * Write temp file util
 */
export type AppWriteTemp = (file: string, content: string) => Promise<string>

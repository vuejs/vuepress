import { AppOptions } from './createAppOptions'

/**
 * Environment flags
 */
export interface AppEnv {
  isProd: boolean
  isTest: boolean
  isDev: boolean
  isDebug: boolean
}

/**
 * Create environment flags for vuepress app
 */
export const createAppEnv = (options: AppOptions): AppEnv => ({
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDev: process.env.NODE_ENV === 'development',
  isDebug: options.debug,
})

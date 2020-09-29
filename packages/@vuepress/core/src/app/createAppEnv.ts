import type { AppEnv, AppOptions } from '../types'

/**
 * Create environment flags for vuepress app
 */
export const createAppEnv = (options: AppOptions): AppEnv => ({
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDev: process.env.NODE_ENV === 'development',
  isDebug: options.debug,
  nodeEnv: process.env.NODE_ENV,
})

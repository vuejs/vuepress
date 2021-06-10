import type { AppEnv, AppOptions } from '../types'

/**
 * Create environment flags for vuepress app
 */
export const createAppEnv = (
  options: AppOptions,
  isBuild: boolean
): AppEnv => ({
  isBuild,
  isDev: !isBuild,
  isDebug: options.debug,
})

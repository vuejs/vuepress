import type { UserConfigLoader } from './types'

/**
 * Load js config file
 */
export const loadUserConfigJs: UserConfigLoader = async (userConfigPath) => {
  delete require.cache[userConfigPath]
  return require(userConfigPath)
}

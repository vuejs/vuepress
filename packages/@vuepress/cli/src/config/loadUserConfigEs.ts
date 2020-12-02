import type { UserConfigLoader } from './types'

/**
 * Load es config file
 */
export const loadUserConfigEs: UserConfigLoader = async (userConfigPath) => {
  delete require.cache[userConfigPath]
  return require(userConfigPath)
}

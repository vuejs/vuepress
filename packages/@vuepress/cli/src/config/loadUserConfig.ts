import type { UserConfig, UserConfigLoader } from './types'
import { loadUserConfigEs } from './loadUserConfigEs'

const loaderMap: [RegExp, UserConfigLoader][] = [
  [/\.(j|t)s$/, loadUserConfigEs],
]

/**
 * Load user config file
 */
export const loadUserConfig = async (
  userConfigPath?: string
): Promise<UserConfig> => {
  if (!userConfigPath) return {}

  for (const [condition, loader] of loaderMap) {
    if (condition.test(userConfigPath)) {
      return loader(userConfigPath)
    }
  }

  return {}
}

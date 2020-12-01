import type { UserConfig, UserConfigLoader } from './types'
import { loadUserConfigJs } from './loadUserConfigJs'
import { loadUserConfigTs } from './loadUserConfigTs'

const loaderMap: [RegExp, UserConfigLoader][] = [
  [/\.js$/, loadUserConfigJs],
  [/\.ts$/, loadUserConfigTs],
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

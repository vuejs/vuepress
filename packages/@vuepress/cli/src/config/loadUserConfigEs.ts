import { hasExportDefault } from '@vuepress/utils'
import type { UserConfigLoader } from './types'

/**
 * Load es config file
 */
export const loadUserConfigEs: UserConfigLoader = async (userConfigPath) => {
  delete require.cache[userConfigPath]
  const required = require(userConfigPath)
  return hasExportDefault(required) ? required.default : required
}

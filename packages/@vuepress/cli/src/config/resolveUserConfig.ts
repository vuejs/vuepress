import type { UserConfig } from '@vuepress/core'
import { resolveUserConfigJs, userConfigJsPath } from './resolveUserConfigJs'
import { resolveUserConfigTs, userConfigTsPath } from './resolveUserConfigTs'

export const userConfigPaths = [userConfigJsPath, userConfigTsPath]

/**
 * Resolve user config from source directory
 */
export const resolveUserConfig = async (
  source: string
): Promise<UserConfig> => {
  // try to load .vuepress/config.js
  const configJs = await resolveUserConfigJs(source)

  if (configJs !== null) {
    return configJs
  }

  // try to load .vuepress/config.ts
  const configTs = await resolveUserConfigTs(source)

  if (configTs !== null) {
    return configTs
  }

  return {}
}

import type { App, PluginObject } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import type { UserConfig } from './types'

/**
 * Transform user config to a vuepress plugin
 */
export const transformUserConfigToPlugin = (
  app: App,
  userConfig: UserConfig
): PluginObject => {
  const userConfigPlugin: PluginObject = {
    name: 'user-config',
    ...userConfig,
  }

  // if `clientAppEnhanceFiles` is not set explicitly,
  // try to load conventional files
  if (userConfigPlugin.clientAppEnhanceFiles === undefined) {
    userConfigPlugin.clientAppEnhanceFiles = [
      app.dir.source('.vuepress/clientAppEnhance.ts'),
      app.dir.source('.vuepress/clientAppEnhance.js'),
    ].find((item) => fs.pathExistsSync(item))
  }

  return userConfigPlugin
}

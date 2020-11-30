import type { PluginObject } from '@vuepress/core'
import type { UserConfig } from './types'

/**
 * Transform user config to a vuepress plugin
 */
export const transformUserConfigToPlugin = (
  userConfig: UserConfig
): PluginObject => ({
  name: 'user-config',
  ...userConfig,
})

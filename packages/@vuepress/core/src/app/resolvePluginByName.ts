import { normalizePackageName } from '@vuepress/shared'
import { path, requireResolve } from '@vuepress/utils'
import type { Plugin, PluginObject, PluginOptions } from '../types'

/**
 * Resolve a plugin according to the name string
 */
export const resolvePluginByName = <
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
>(
  pluginName: string
): Plugin<T, U> | null => {
  const pluginEntry = path.isAbsolute(pluginName)
    ? pluginName
    : requireResolve(normalizePackageName(pluginName, 'vuepress', 'plugin'))

  if (pluginEntry === null) {
    return null
  }

  return require(pluginEntry)
}

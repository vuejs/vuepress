import { normalizePackageName } from '@vuepress/shared'
import { requireResolve } from '@vuepress/utils'
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
  const result =
    requireResolve(pluginName) ??
    requireResolve(normalizePackageName(pluginName, 'vuepress', 'plugin'))

  if (result === null) {
    return null
  }

  return require(result)
}

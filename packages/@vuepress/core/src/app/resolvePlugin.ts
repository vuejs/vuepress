import { normalizePackageName } from '@vuepress/shared'
import { hasExportDefault, path, requireResolve } from '@vuepress/utils'
import type { Plugin, PluginObject, PluginOptions } from '../types'

/**
 * Resolve a plugin according to name or path
 */
export const resolvePlugin = <
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

  const required = require(pluginEntry)

  // allow default export
  return hasExportDefault(required) ? required.default : required
}

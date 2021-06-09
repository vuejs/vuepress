import type { App, PluginConfig, PluginObject } from '../types'
import { normalizePluginConfig } from './normalizePluginConfig'
import { resolvePlugin } from './resolvePlugin'

/**
 * Resolve plugins from plugin config array
 */
export const resolvePluginsFromConfig = (
  app: App,
  plugins: PluginConfig[] = []
): PluginObject[] =>
  plugins.reduce((prev, item) => {
    const [plugin, config] = normalizePluginConfig(item)
    if (config !== false) {
      prev.push(resolvePlugin(app, plugin, config === true ? {} : config))
    }
    return prev
  }, [] as PluginObject[])

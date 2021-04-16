import type { App, PluginOptions, PluginConfig } from '../types'
import { normalizePluginConfig } from './normalizePluginConfig'

export const appUseByConfig = <T extends PluginOptions>(
  app: App,
  pluginConfig: PluginConfig<T>
): void => {
  const [plugin, config] = normalizePluginConfig<T>(pluginConfig)

  if (config === false) return

  return app.use(plugin, config === true ? {} : config)
}

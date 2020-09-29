import type { App, PluginOptions, PluginConfig } from '../types'
import { normalizePluginConfig } from './normalizePluginConfig'

export const appUseByConfig = <T extends PluginOptions>(
  app: App,
  pluginConfig: PluginConfig<T>
): void => {
  const normalizedPluginConfig = normalizePluginConfig<T>(pluginConfig)

  if (normalizedPluginConfig === false) return

  const [plugin, config] = normalizedPluginConfig

  if (config === false) return

  return app.use(plugin, config === true ? {} : config)
}

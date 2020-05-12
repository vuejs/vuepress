import { App } from './createApp'
import { normalizePluginConfig } from './normalizePluginConfig'
import { PluginConfig } from './types'

export const appUseByConfig = <T extends object>(
  app: App,
  pluginConfig: PluginConfig<T>
): void => {
  const normalizedPluginConfig = normalizePluginConfig(pluginConfig)

  if (normalizedPluginConfig === false) {
    return
  }

  const [plugin, config] = normalizedPluginConfig

  if (config === false) {
    return
  }

  return app.use(plugin, config === true ? {} : config)
}

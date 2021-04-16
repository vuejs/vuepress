import { isArray } from '@vuepress/shared'
import type {
  PluginOptions,
  PluginConfig,
  PluginConfigNormalized,
} from '../types'

export const normalizePluginConfig = <T extends PluginOptions>(
  pluginConfig: PluginConfig<T>
): PluginConfigNormalized<T> => {
  // ['container'] -> ['container', true]
  // ['container', options] -> ['container', options]
  if (isArray(pluginConfig)) {
    return [pluginConfig[0], pluginConfig[1] ?? true]
  }

  // 'container' -> ['container', true]
  return [pluginConfig, true]
}

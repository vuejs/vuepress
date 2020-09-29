import { isArray, isString } from '@vuepress/shared'
import type {
  PluginOptions,
  PluginConfig,
  PluginConfigNormalized,
} from '../types'

export const normalizePluginConfig = <T extends PluginOptions>(
  pluginConfig: PluginConfig<T>
): PluginConfigNormalized<T> | false => {
  // 'container' -> ['container', {}]
  if (isString(pluginConfig)) {
    return [pluginConfig, {}]
  }

  // ['container'] -> ['container', {}]
  // ['container', options] -> ['container', options]
  if (isArray(pluginConfig)) {
    return [pluginConfig[0], pluginConfig[1] ?? {}]
  }

  return false
}

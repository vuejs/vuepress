import { isArray, isString } from '@vuepress/utils'
import { PluginConfig } from './types'

export type NormalizedPluginConfig<T extends object> = [
  string,
  Partial<T> | boolean
]

export const normalizePluginConfig = <T extends object>(
  pluginConfig: PluginConfig<T>
): NormalizedPluginConfig<T> | false => {
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

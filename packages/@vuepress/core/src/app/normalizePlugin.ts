import { isFunction, isString } from '@vuepress/utils'
import { App } from './createApp'
import { resolvePluginByName } from './resolvePluginByName'
import { Plugin, PluginOptions } from './types'

export const normalizePlugin = <T extends object = {}>(
  app: App,
  plugin: Plugin<T> | string,
  config?: Partial<T>
): PluginOptions => {
  const resolvedPlugin = isString(plugin) ? resolvePluginByName(plugin) : plugin

  // TODO
  if (resolvedPlugin === null) {
    throw new Error()
  }

  const invokedPlugin = isFunction(resolvedPlugin)
    ? resolvedPlugin(config ?? {}, app)
    : resolvedPlugin

  const normalizedPlugin: PluginOptions = {
    ...invokedPlugin,

    // TODO: normalize plugin name
  }

  return normalizedPlugin
}

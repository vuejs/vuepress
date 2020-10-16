import { isFunction, isString } from '@vuepress/shared'
import type { App, Plugin, PluginObject, PluginOptions } from '../types'
import { resolvePluginByName } from './resolvePluginByName'

export const normalizePlugin = <
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
>(
  app: App,
  plugin: Plugin<T, U> | string,
  config?: Partial<T>
): U => {
  const resolvedPlugin = isString(plugin)
    ? resolvePluginByName<T, U>(plugin)
    : plugin

  // TODO: logger
  if (resolvedPlugin === null) {
    throw new Error(`plugin ${plugin} is not found`)
  }

  const pluginObject = isFunction(resolvedPlugin)
    ? resolvedPlugin(config ?? {}, app)
    : resolvedPlugin

  return pluginObject as U
}

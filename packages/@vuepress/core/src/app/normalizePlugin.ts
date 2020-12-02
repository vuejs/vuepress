import { isFunction, isString } from '@vuepress/shared'
import { logger } from '@vuepress/utils'
import type { App, Plugin, PluginObject, PluginOptions } from '../types'
import { resolvePlugin } from './resolvePlugin'

export const normalizePlugin = <
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
>(
  app: App,
  plugin: Plugin<T, U> | string,
  config?: Partial<T>
): U => {
  const resolvedPlugin = isString(plugin) ? resolvePlugin<T, U>(plugin) : plugin

  if (resolvedPlugin === null) {
    const message = `plugin ${plugin} is not found`
    logger.error(message)
    throw new Error(message)
  }

  const pluginObject = isFunction(resolvedPlugin)
    ? resolvedPlugin(config ?? {}, app)
    : resolvedPlugin

  return pluginObject as U
}

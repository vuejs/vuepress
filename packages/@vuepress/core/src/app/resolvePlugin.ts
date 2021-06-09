import { isFunction, isString } from '@vuepress/shared'
import { chalk, logger } from '@vuepress/utils'
import type { App, Plugin, PluginObject, PluginOptions } from '../types'
import { resolvePluginModule } from './resolvePluginModule'

/**
 * Resolve a plugin according to name / path / module and config
 */
export const resolvePlugin = <
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
>(
  app: App,
  plugin: Plugin<T, U> | string,
  config: Partial<T> = {}
): U => {
  const pluginModule = isString(plugin)
    ? resolvePluginModule<T, U>(plugin)
    : plugin

  if (pluginModule === null) {
    throw logger.createError(`plugin is not found: ${chalk.magenta(plugin)}`)
  }

  const pluginObject = isFunction(pluginModule)
    ? pluginModule(config, app)
    : pluginModule

  return pluginObject as U
}

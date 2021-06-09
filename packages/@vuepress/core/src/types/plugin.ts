import type { App } from './app'
import type { HooksExposed } from './pluginApi'

/**
 * Vuepress plugin
 *
 * A plugin should be rather:
 * - an object (`PluginObject`)
 * - a function that returns an object (`PluginFunction`)
 *
 * A plugin package should have a `Plugin` as the default export
 */
export type Plugin<
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
> = U | PluginFunction<T, U>

/**
 * Vuepress plugin function
 *
 * It accepts plugin options and vuepress app, returns plugin object
 */
export type PluginFunction<
  T extends PluginOptions = PluginOptions,
  U extends PluginObject = PluginObject
> = (pluginConfig: Partial<T>, app: App) => U

/**
 * Vuepress plugin object
 */
export interface PluginObject extends Partial<HooksExposed> {
  // plugin name
  name: string

  // allow use a plugin multiple times or not
  multiple?: boolean
}

/**
 * Vuepress plugin options basic type
 */
export type PluginOptions = Record<string, any>

/**
 * Plugin config to be used in user config file
 *
 * Users can use this config to control which plugins to be used,
 * and set the plugin options
 *
 * @remark suffix `Config` means this is for user config
 */
export type PluginConfig<T extends PluginOptions = PluginOptions> =
  | string
  | Plugin<T>
  | [string | Plugin<T>]
  | [string | Plugin<T>, Partial<T> | boolean]

/**
 * Normalized plugin config
 */
export type PluginConfigNormalized<T extends PluginOptions = PluginOptions> = [
  Plugin<T> | string,
  Partial<T> | boolean
]

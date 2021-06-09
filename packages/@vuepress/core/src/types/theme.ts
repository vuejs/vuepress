import type {
  Plugin,
  PluginConfig,
  PluginFunction,
  PluginObject,
} from './plugin'

/**
 * Vuepress theme
 *
 * Theme is a special type of plugin, it should be rather:
 * - an object (`ThemeObject`)
 * - a function that returns an object (`ThemeFunction`)
 *
 * A theme package should have a `Theme` as the default export
 */
export type Theme<T extends ThemeConfig = ThemeConfig> = Plugin<T, ThemeObject>

/**
 * Vuepress theme function
 */
export type ThemeFunction<T extends ThemeConfig = ThemeConfig> = PluginFunction<
  T,
  ThemeObject
>

/**
 * Vuepress theme object
 */
export interface ThemeObject extends PluginObject {
  // theme plugin should never be multiple
  multiple?: false

  // extended parent theme
  extends?: string

  // specify the layouts directory or components map
  layouts?: string | Record<string, string>

  // allow using plugins in theme
  plugins?: PluginConfig[]
}

/**
 * Theme config to be used in user config file
 *
 * It will be used by a theme itself, but not by vuepress.
 *
 * Vuepress will only transfer this config to theme
 *
 * @remark suffix `Config` means this is for user config
 */
export type ThemeConfig = Record<string, any>

import { Options } from '../plugin-api'
import { App } from './createApp'

export interface LocaleConfig extends Omit<ThemeConfig, 'locales'> {
  path?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginConfig<T extends object = any> =
  // plugins: ['container']
  | string
  // plugins: [['container']]
  | [string]
  // plugins: [['container', options]]
  // plugins: [['container', false]]
  | [string, Partial<T> | boolean]

export interface ThemeConfig {
  locales?: LocaleConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * Config to create vuepress app
 */
export interface AppConfig<T = ThemeConfig> {
  // Meta
  title?: string
  description?: string
  head?: Array<[string, Record<string, string>]>
  locales?: LocaleConfig

  // Dev & Build
  bundler?: 'webpack'
  base?: string
  host?: string
  port?: number
  debug?: boolean
  open?: boolean

  // Dirs
  dirSource: string
  dirDest?: string
  dirTemp?: string

  // Template
  templateDev?: string
  templateSSR?: string

  // Plugins
  plugins?: PluginConfig[]

  // Theme
  theme?: string
  themeConfig?: T
}

/**
 * Type of vuepress plugin
 */
export type Plugin<
  T extends object = {},
  U extends PluginOptions = PluginOptions
> = U | PluginFunction<T, U>

/**
 * Function type of vuepress plugin
 */
export type PluginFunction<
  T extends object = {},
  U extends PluginOptions = PluginOptions
> = (pluginConfig: Partial<T>, app: App) => U

/**
 * Options type of vuepress plugin
 */
export interface PluginOptions extends Options {
  // allow use a plugin multiple times or not
  multiple?: boolean

  // allow use plugins in plugin
  plugins?: PluginConfig[]
}

/**
 * Type of vuepress theme
 */
export type Theme<T extends object = {}> = Plugin<T, ThemeOptions>

/**
 * Function type of vuepress theme
 */
export type ThemeFunction<T extends object = {}> = PluginFunction<
  T,
  ThemeOptions
>

/**
 * Options type of vuepress theme
 */
export interface ThemeOptions extends Omit<PluginOptions, 'multiple'> {
  extend?: string
  // TODO: extend -> extends
}

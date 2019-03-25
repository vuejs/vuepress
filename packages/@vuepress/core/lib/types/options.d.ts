import App from './App'
import CAC from 'cac/types/CAC'
import Page, { PageOptions } from './Page'
import ChainableConfig from 'webpack-chain'
import { MarkdownOptions } from './markdown'
import { Configuration as DevServerConfig } from 'webpack-dev-server'

type ArrayLike<T> = T | T[]
type FunctionLike<T, R extends any[] = []> = T | ((...args: R) => T)
type AsyncFunctionLike<T, R extends any[] = []> = T | ((...args: R) => T | Promise<T>)

/**
 * A general VuePress plugin config.
 */
export type PluginConfig = boolean | Record<string, any> | any[]

/**
 * Plugin config.
 * You can use either Babel style or object style.
 */
export type Plugins = (string | [string, PluginConfig?])[] | Record<string, PluginConfig>

/**
 * A general VuePress theme config.
 */
export type ThemeConfig = Record<string, any>

export interface DynamicFile {
  /**
   * name of the file
   */
  name: string

  /**
   * content of the file
   */
  content: string
}

export interface OptionAPI extends MarkdownOptions {
  /**
   * The name of the plugin.
   * 
   * Internally, vuepress will use the plugin's package name
   * as the plugin name. When your plugin is a local plugin
   * (i.e. using a pure plugin function directly), please be
   * sure to configure this option, that is good for debug tracking.
   */
  name?: string

  /**
   * The ready hook is executed after the application is
   * initialized and before some specific functional APIs
   * are executed. These functional APIs include:
   * - `clientDynamicModules`
   * - `enhanceAppFiles`
   */
  ready?(): void | Promise<void>

  /**
   * [Dev Only] Called when dev server updates.
   */
  updated?(): void

  /**
   * [Build Only] Called when a (production) build finishes.
   * @param pagePaths an array of generated page HTML paths
   */
  generated?(pagePaths: string[]): void | Promise<void>

  /**
   * A plugin can contain multiple plugins like a preset.
   */
  plugins?: Plugins

  /**
   * A simplified form of using `DefinePlugin` via `chainWebpack`.
   */
  define?: FunctionLike<Record<string, string>>

  /**
   * A simplified form of using aliases via `chainWebpack`.
   */
  alias?: FunctionLike<Record<string, string>>

  /**
   * Modify the internal webpack config with webpack-chain.
   * @param config an instance of `ChainableConfig` for webpack
   * @param isServer whether the current webpack config is applied to the server or client
   */
  chainWebpack?(config: ChainableConfig, isServer: boolean): void

  /**
   * Equivalent to `before` in webpack-dev-server.
   * 
   * You can use it to define custom handlers before all middleware is executed.
   */
  beforeDevServer: DevServerConfig['before']

  /**
   * Equivalent to `after` in webpack-dev-server.
   * You can use it to execute custom middleware after all other middleware.
   */
  afterDevServer: DevServerConfig['after']

  /**
   * This option accepts absolute file path(s) pointing
   * to the enhancement file(s), or a function that returns
   * the path(s), which allows you to do some App Level Enhancements.
   * 
   * This option also supports dynamic code which allows you to do more things
   * with the ability to touch the compilation context.
   */
  enhanceAppFiles?: AsyncFunctionLike<ArrayLike<string | DynamicFile>>

  /**
   * Generate some client dynamic modules at compile time.
   */
  clientDynamicModules?: AsyncFunctionLike<ArrayLike<DynamicFile>>

  /**
   * A function used to extend or modify the `$page` object.
   * This function will be invoking once for each page at compile time.
   * @param page a `Page` instance
   */
  extendPageData?(page: Page): void

  /**
   * A path to the mixin file which allow you to control the life cycle of root component.
   */
  clientRootMixin?: string

  /**
   * Add some pages at compile time.
   */
  additionalPages?: AsyncFunctionLike<ArrayLike<PageOptions>>

  /**
   * Inject some global UI component(s) onto somewhere on the page.
   */
  globalUIComponents?: ArrayLike<string>

  /**
   * Register a extra command to enhance the CLI of vuepress.
   * @param cli an instance of `CAC`
   */
  extendCli?(cli: CAC): void
}

export interface PluginOptions extends OptionAPI {
  /**
   * Declare that this plugin can be applied multiple times.
   */
  multiple?: boolean
}

export interface ThemeOrConfigOptions extends OptionAPI {
  /**
   * [Danger Zone] HTML template path used in dev mode.
   */
  devTemplate?: string

  /**
   * [Danger Zone] HTML template path used in build mode.
   */
  ssrTemplate?: string

  /**
   * [Danger Zone] Global layout component is a component responsible for the global layout strategy.
   */
  globalLayout?: string
}

export interface ThemeOptions extends ThemeOrConfigOptions {
  /**
   * VuePress provides the ability to inherit one theme from another.
   * VuePress will follow the concept of override and automatically
   * help you prioritize various thematic attributes.
   */
  extends?: string
}

/**
 * A general VuePress plugin entry.
 */
export type Plugin = FunctionLike<PluginOptions, [PluginConfig, App]>

/**
 * A general VuePress theme entry.
 */
export type Theme = FunctionLike<ThemeOptions, [PluginConfig, App]>

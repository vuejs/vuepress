import App from './App'
import CAC from 'cac/types/CAC'
import Config from 'webpack-chain'
import { PageOptions } from './Page'
import { Configuration as DevServerConfig } from 'webpack-dev-server'

type ArrayLike<T> = T | T[]

type FunctionLike<T, R extends any[] = []> = T | ((...args: R) => T)

type AsyncFunctionLike<T, R extends any[] = []> = T | ((...args: R) => T | Promise<T>)

type Config = boolean | Record<string, any> | any[]

type Plugins = (string | [string, Config?])[] | Record<string, Config>

export interface DynamicFile {
  name: string

  content: string
}

export interface OptionAPI {
  name?: string

  plugins?: Plugins

  define?: FunctionLike<Record<string, string>>

  alias?: FunctionLike<Record<string, string>>

  chainWebpack?(config: Config, isServer: boolean): void

  beforeDevServer: DevServerConfig['before']

  afterDevServer: DevServerConfig['after']

  // no markdown-it typings support
  extendMarkdown?(md: any): void

  chainMarkdown?(config: any): void

  enhanceAppFiles?: AsyncFunctionLike<ArrayLike<string | DynamicFile>>

  clientDynamicModules?: AsyncFunctionLike<ArrayLike<DynamicFile>>

  extendPageData?(pageData: any): void // TODO

  clientRootMixin?: string

  additionalPages?: AsyncFunctionLike<ArrayLike<PageOptions>>

  globalUIComponents?: ArrayLike<string>

  extendCli?(cli: CAC): void
}

interface PluginOptions extends OptionAPI {
  multiple?: boolean
}

interface ThemeOptions extends OptionAPI {
  extends: string

  devTemplate?: string

  ssrTemplate?: string

  globalLayout?: string
}

export type Plugin = FunctionLike<PluginOptions, [Config, App]>

export type Theme = FunctionLike<ThemeOptions, [App]>

import { Application } from 'express'
import * as Config from 'webpack-chain'
import * as WebpackDevServer from 'webpack-dev-server'
import { App, AppMarkdown } from '../../app'

export interface GeneratedFile {
  content: string
  filename: string
  dirname?: string
}

/**
 * Options type that exposed to users
 */
export interface Options {
  // plugin name
  name: string

  // webpack config
  alias?: Record<string, string> | (() => Record<string, string>)
  define?: Record<string, unknown> | (() => Record<string, unknown>)
  chainWebpack?: (config: Config, isServer: boolean) => void

  // TODO: configureWebpack

  // dev server
  beforeDevServer?: (expressApp: Application, server: WebpackDevServer) => void
  afterDevServer?: (expressApp: Application, server: WebpackDevServer) => void

  // markdown
  extendMarkdown?: (md: AppMarkdown) => void
  // TODO: ask markdown-it-chain to add types definitions
  chainMarkdown?: (config: any) => void

  // files
  clientDynamicModules?: (
    app: App
  ) =>
    | GeneratedFile
    | GeneratedFile[]
    | Promise<GeneratedFile>
    | Promise<GeneratedFile[]>

  // TODO: clientRootMixin
  // TODO: enhanceAppFiles -> clientEnhanceAppFiles
  // TODO: extendPageData
  // TODO: additionalPages
  // TODO: globalUIComponents
  // TODO: extendCli

  // life cycle hooks
  onInitialized?: (app: App) => void | Promise<void>
  onPrepared?: (app: App) => void | Promise<void>
  onUpdated?: (app: App) => void | Promise<void>
  onGenerated?: (app: App, pagePaths: string[]) => void | Promise<void>
}

/**
 * Options type that normalized for internal usage
 */
export interface OptionsNormalized
  extends Omit<
    Required<Options>,
    'name' | 'alias' | 'define' | 'clientDynamicModules'
  > {
  alias: (config: Config) => void
  define: (config: Config) => void
  clientDynamicModules: (app: App) => Promise<void>
}

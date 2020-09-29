import type { Application } from 'express'
import type * as Config from 'webpack-chain'
import type * as WebpackDevServer from 'webpack-dev-server'
import type { Markdown } from '@vuepress/markdown'
import type { App } from '../app'

// util type
type PromiseOrNot<T> = Promise<T> | T

// base hook type
export type Hook<
  Exposed,
  Normalized = Exposed,
  Result = Normalized extends (...args: any) => infer U
    ? U extends Promise<infer V>
      ? V
      : U
    : void
> = {
  exposed: Exposed
  normalized: Normalized
  result: Result
}

// life-cycle hook
export type LifeCycleHook = Hook<(app: App) => PromiseOrNot<void>>

// hook that generates client files
export type ClientFilesHook = Hook<
  string | string[] | ((app: App) => PromiseOrNot<string | string[]>),
  (app: App) => Promise<string[]>
>

// hook that returns an object
export type ReturnObjectHook = Hook<
  Record<string, string> | (() => Record<string, string>),
  () => Record<string, string>
>

// markdown hook
export type ExtendMarkdownHook = Hook<(md: Markdown) => void>

// TODO: decouple with webpack
// webpack hooks
export type ChainWebpackHook = Hook<
  (config: Config, isServer: boolean, isBuild: boolean) => void
>
export type BeforeDevServerHook = Hook<
  (expressApp: Application, server: WebpackDevServer) => void
>
export type AfterDevServerHook = Hook<
  (expressApp: Application, server: WebpackDevServer) => void
>

/**
 * List of hooks
 */
export interface Hooks {
  onInitialized: LifeCycleHook
  onPrepared: LifeCycleHook
  onUpdated: LifeCycleHook
  onGenerated: LifeCycleHook
  extendMarkdown: ExtendMarkdownHook
  clientAppSetupFiles: ClientFilesHook
  clientAppEnhanceFiles: ClientFilesHook
  alias: ReturnObjectHook
  define: ReturnObjectHook
  chainWebpack: ChainWebpackHook
  beforeDevServer: BeforeDevServerHook
  afterDevServer: AfterDevServerHook

  // TODO: extendPageData
  // TODO: extendCli
  // TODO: additionalPages
  // TODO: globalUIComponents
  // TODO: configureWebpack
}

/**
 * Name of hooks
 */
export type HooksName = keyof Hooks

/**
 * Exposed hooks API that can be accessed by a plugin
 */
export type HooksExposed = {
  [K in HooksName]: Hooks[K]['exposed']
}

/**
 * Normalized hooks
 */
export type HooksNormalized = {
  [K in HooksName]: Hooks[K]['normalized']
}

/**
 * Result of hooks
 */
export type HooksResult = {
  [K in HooksName]: Hooks[K]['result']
}

/**
 * Hook item
 */
export interface HookItem<T extends HooksName> {
  // the name of the plugin who introduce this hook
  pluginName: string
  // the normalized hook
  hook: HooksNormalized[T]
}

/**
 * Hook items queue
 */
export interface HookQueue<T extends HooksName> {
  name: T
  items: HookItem<T>[]
  add: (item: HookItem<T>) => void
  process: (
    ...args: Parameters<HooksNormalized[T]>
  ) => Promise<HooksResult[T][]>
  processSync: (...args: Parameters<HooksNormalized[T]>) => HooksResult[T][]
}

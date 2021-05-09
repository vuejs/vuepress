import type { Markdown } from '@vuepress/markdown'
import type { App } from '../app'
import type { Page, PageOptions } from '../page'

// util type
type PromiseOrNot<T> = Promise<T> | T
type Closable = { close(): void }

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
export type LifeCycleHook<T extends unknown[] = []> = Hook<
  (app: App, ...args: T) => PromiseOrNot<void>
>

// hook that generates client files
export type ClientFilesHook = Hook<
  string | string[] | ((app: App) => PromiseOrNot<string | string[]>),
  (app: App) => Promise<string[]>
>

// hook that returns an object
export type ReturnObjectHook = Hook<
  Record<string, any> | ((app: App) => PromiseOrNot<Record<string, any>>),
  (app: App) => Promise<Record<string, any>>
>

// markdown hook
export type ExtendsMarkdownHook = Hook<
  (md: Markdown, app: App) => PromiseOrNot<void>
>

// page hook
export type ExtendsPageOptionsHook = Hook<
  (filePath: string, app: App) => PromiseOrNot<PageOptions>
>
export type ExtendsPageDataHook = Hook<
  (page: Page, app: App) => PromiseOrNot<Record<string, any>>
>

/**
 * List of hooks
 */
export interface Hooks {
  onInitialized: LifeCycleHook
  onPrepared: LifeCycleHook
  onWatched: LifeCycleHook<[watchers: Closable[], restart: () => Promise<void>]>
  onGenerated: LifeCycleHook
  extendsMarkdown: ExtendsMarkdownHook
  extendsPageOptions: ExtendsPageOptionsHook
  extendsPageData: ExtendsPageDataHook
  clientAppEnhanceFiles: ClientFilesHook
  clientAppRootComponentFiles: ClientFilesHook
  clientAppSetupFiles: ClientFilesHook
  alias: ReturnObjectHook
  define: ReturnObjectHook
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
}

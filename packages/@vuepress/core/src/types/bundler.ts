import type { App } from './app'

/**
 * Vuepress bundler
 *
 * It provides abilities to:
 * - dev: run dev server for development
 * - build: bundle assets for deployment
 */
export interface Bundler {
  dev: BundlerDev
  build: BundlerBuild
}

// start dev server and return a function to close the server
export type BundlerDev = (app: App) => Promise<() => Promise<void>>
// bundle assets
export type BundlerBuild = (app: App) => Promise<void>

/**
 * A function that returns a bundler instance
 *
 * A bundler package should have a `CreateBundlerFunction` as the default export
 */
export type CreateBundlerFunction<
  BundlerOptions extends BundlerConfig = Partial<BundlerConfig>
> = (options: BundlerOptions) => Bundler

/**
 * Bundler entry type
 */
export interface BundlerEntry {
  createBundler: CreateBundlerFunction
}

/**
 * User config type of bundler
 *
 * @remark suffix `Config` means this is for user config
 */
export interface BundlerConfig {
  [key: string]: any
}

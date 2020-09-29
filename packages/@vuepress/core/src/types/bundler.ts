import type { App } from './app'

/**
 * Vuepress bundler
 *
 * It provides abilities to:
 * - dev: run dev server for development
 * - build: bundle assets for deployment
 */
export interface Bundler<T = void, U = void> {
  dev: BundlerFunc<T>
  build: BundlerFunc<U>
}

export type BundlerFunc<T = void> = (app: App) => Promise<T>

/**
 * A function that returns a bundler instance
 */
export type CreateBundlerFunction<
  BundlerOptions extends BundlerConfig = Partial<BundlerConfig>,
  T = void,
  U = void
> = (options: BundlerOptions) => Bundler<T, U>

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

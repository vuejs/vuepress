import type { loader } from 'webpack'

/**
 * Options for bundler-webpack
 */
export interface BundlerWebpackOptions {
  /**
   * postcss-loader v3 options
   *
   * @see https://github.com/webpack-contrib/postcss-loader/tree/v3.0.0#options
   */
  postcss?: {
    exec?: boolean
    parser?: string | Record<string, any> | ((...args: any[]) => any)
    syntax?: string | Record<string, any>
    stringifier?: string | Record<string, any>
    config?: {
      path?: string
      context?: Record<string, any>
      ctx?: Record<string, any>
    }
    ident?: string
    plugins?: any[] | ((...args: any[]) => any)
    sourceMap?: 'inline' | boolean
  }

  /**
   * stylus-loader options
   */
  stylus?: StylusLoaderOptions

  /**
   * sass-loader options for scss files
   */
  scss?: SassLoaderOptions

  /**
   * sass-loader options for sass files
   */
  sass?: SassLoaderOptions

  /**
   * less-loader options
   */
  less?: LessLoaderOptions
}

/**
 * Common options for some webpack loaders
 */
export interface LoaderOptions {
  sourceMap?: boolean
  webpackImporter?: boolean
  additionalData?:
    | string
    | ((content: string, loaderContext: loader.LoaderContext) => string)
}

/**
 * Common type for style pre-processor options
 */
export type StylePreprocessorOptions<
  T extends Record<string, any> = Record<string, any>
> = T | ((loaderContext: loader.LoaderContext) => TextDecodeOptions)

/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
export interface StylusLoaderOptions extends LoaderOptions {
  stylusOptions?: StylePreprocessorOptions
}

/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
export interface SassLoaderOptions extends LoaderOptions {
  implementation?: any
  sassOptions?: StylePreprocessorOptions
}

/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
export interface LessLoaderOptions extends LoaderOptions {
  lessOptions?: StylePreprocessorOptions
}

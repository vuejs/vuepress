import type { Configuration } from 'webpack'
import type * as Config from 'webpack-chain'
import { merge } from 'webpack-merge'
import type { WebpackBundlerOptions } from '../types'

export const resolveWebpackConfig = ({
  config,
  options,
  isServer,
  isBuild,
}: {
  config: Config
  options: WebpackBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Configuration => {
  // allow modify webpack config via `chainWebpack`
  if (options.chainWebpack) {
    options.chainWebpack(config, isServer, isBuild)
  }

  // generate webpack config from webpack-chain
  const webpackConfig = config.toConfig()

  // allow modify webpack config via `configureWebpack`
  if (options.configureWebpack) {
    return merge(
      webpackConfig,
      options.configureWebpack(webpackConfig, isServer, isBuild)
    )
  }

  return webpackConfig
}

import type { Configuration } from 'webpack'
import type * as Config from 'webpack-chain'
import { merge } from 'webpack-merge'
import type { App } from '@vuepress/core'
import type { WebpackBundlerOptions } from '../types'

export const resolveWebpackConfig = ({
  app,
  config,
  options,
  isServer,
  isBuild,
}: {
  app: App
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

  // TODO: move to webpack-chain when supported
  webpackConfig.infrastructureLogging = {
    level: app.env.isDebug ? 'verbose' : 'warn',
  }
  if (!isBuild) {
    webpackConfig.cache = {
      type: 'filesystem',
      cacheDirectory: app.dir.cache(),
    }
  }

  // allow modify webpack config via `configureWebpack`
  if (options.configureWebpack) {
    return merge(
      webpackConfig,
      options.configureWebpack(webpackConfig, isServer, isBuild)
    )
  }

  return webpackConfig
}

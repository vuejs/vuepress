import type { Configuration } from 'webpack'
import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack other options
 *
 * @see https://webpack.js.org/configuration/other-options
 */
export const handleOtherOptions = ({
  app,
  config,
  isServer,
  isBuild,
}: {
  app: App
  config: Config
  isServer: boolean
  isBuild: boolean
}): void => {
  // set infrastructureLogging options
  config.set('infrastructureLogging', {
    level: app.env.isDebug ? 'info' : 'error',
  } as Configuration['infrastructureLogging'])

  // set cache options
  config.set('cache', {
    type: 'filesystem',
    cacheDirectory: app.dir.cache(),
    version: JSON.stringify({
      // vuepress identifiers
      'isServer': isServer,
      'isBuild': isBuild,
      'version': app.version,
      // dependencies
      '@vue/compiler-sfc': require('@vue/compiler-sfc/package.json').version,
      'esbuild-loader': require('esbuild-loader/package.json').version,
      'vue-loader': require('vue-loader/package.json').version,
      'webpack': require('webpack/package.json').version,
    }),
  } as Configuration['cache'])
}

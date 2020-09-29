import * as Config from 'webpack-chain'
import { VueLoaderPlugin } from 'vue-loader'
import type { App } from '@vuepress/core'
import { resolveCacheLoaderOptions } from './resolveCacheLoaderOptions'

/**
 * Set webpack module to handle vue files
 */
export const handleModuleVue = ({
  app,
  config,
  isServer,
}: {
  app: App
  config: Config
  isServer: boolean
}): void => {
  const cacheLoaderOptions = resolveCacheLoaderOptions({
    app,
    identifier: {
      'vue-loader': require('vue-loader/package.json').version,
      // vue ssr app will generate different code
      // so we need `isServer` to identify the cache
      isServer,
    },
  })

  // .vue files
  config.module
    .rule('vue')
    .test(/\.vue$/)
    // use cache-loader
    .use('cache-loader')
    .loader('cache-loader')
    .options(cacheLoaderOptions)
    .end()
    // use vue-loader
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      ...cacheLoaderOptions,
    })
    .end()

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}

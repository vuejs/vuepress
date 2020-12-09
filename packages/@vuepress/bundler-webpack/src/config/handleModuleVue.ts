import * as Config from 'webpack-chain'
import { VueLoaderPlugin } from 'vue-loader'
import type { VueLoaderOptions } from 'vue-loader'
import type { App } from '@vuepress/core'

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
  // .vue files
  config.module
    .rule('vue')
    .test(/\.vue$/)
    // use vue-loader
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      isServerBuild: isServer,
    } as VueLoaderOptions)
    .end()

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}

import * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import { createBaseConfig } from '../config'
import type { WebpackBundlerOptions } from '../types'

export const createServerConfig = async (
  app: App,
  options: WebpackBundlerOptions
): Promise<Config> => {
  const isServer = true
  const isBuild = true

  const config = await createBaseConfig({
    app,
    options,
    isServer,
    isBuild,
  })

  // server output
  // remove after pages rendered
  config.output
    .path(app.dir.dest('.server'))
    .filename('app.js')
    .publicPath(app.options.base)
    .libraryTarget('commonjs2')

  // set target to node
  // vue-loader will use compiler-ssr internally
  config.target('node')

  // set externals
  config.externals([/(^(vue|vue-router)$)|(^@vue\/[^/]*$)/])

  // devtool
  config.devtool('source-map')

  // do not need to minimize server bundle
  config.optimization.minimize(false)

  // use internal vuepress-loader to handle SSR dependencies
  // TODO: remove this loader and modify `build/renderPage` when vue-loader supports SSR
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vuepress-loader')
    .before('vue-loader')
    .loader(require.resolve('./ssr/vuepressLoader'))
    .end()

  // allow users to set webpack config via webpack-chain
  options.chainWebpack?.(config, isServer, isBuild)

  return config
}

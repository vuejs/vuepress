import { HotModuleReplacementPlugin } from 'webpack'
import * as Config from 'webpack-chain'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { App } from '@vuepress/core'
import { createClientBaseConfig } from '../config'
import type { BundlerWebpackOptions } from '../types'

export const createDevConfig = (
  app: App,
  options: BundlerWebpackOptions
): Config => {
  const isServer = false
  const isBuild = false

  const config = createClientBaseConfig({
    app,
    options,
    isBuild,
  })

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template: app.options.templateDev,
    },
  ])

  config.plugin('hmr').use(HotModuleReplacementPlugin)

  // plugin hook: chainWebpack
  app.pluginApi.hooks.chainWebpack.process(config, isServer, isBuild)

  return config
}

import { HotModuleReplacementPlugin } from 'webpack'
import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { createClientBaseConfig } from '../config'
import type { WebpackBundlerOptions } from '../types'

export const createDevConfig = (
  app: App,
  options: WebpackBundlerOptions
): Config => {
  const config = createClientBaseConfig({
    app,
    options,
    isBuild: false,
  })

  config.plugin('html').use(require('html-webpack-plugin'), [
    {
      template: app.options.templateDev,
    },
  ])

  config.plugin('hmr').use(HotModuleReplacementPlugin)

  return config
}

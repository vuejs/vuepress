import { HotModuleReplacementPlugin } from 'webpack'
import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { createClientConfig } from '../config'

export const createDevConfig = (app: App): Config => {
  const config = createClientConfig(app)

  config.plugin('html').use(require('html-webpack-plugin'), [
    {
      template: app.options.templateDev,
    },
  ])

  config.plugin('hmr').use(HotModuleReplacementPlugin)

  return config
}

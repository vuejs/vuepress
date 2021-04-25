import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import type { WebpackBundlerOptions } from '../types'
import { createBaseConfig } from './createBaseConfig'

export const createClientBaseConfig = ({
  app,
  options,
  isBuild,
}: {
  app: App
  options: WebpackBundlerOptions
  isBuild: boolean
}): Config => {
  const config = createBaseConfig({
    app,
    options,
    isServer: false,
    isBuild,
  })

  // client output
  config.output
    .path(app.dir.dest())
    .filename(
      app.env.isProd
        ? 'assets/js/[name].[chunkhash:8].js'
        : 'assets/js/[name].js'
    )
    .publicPath(app.options.base)

  return config
}

import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { createBaseConfig } from './createBaseConfig'

export const createClientBaseConfig = ({
  app,
  isBuild,
}: {
  app: App
  isBuild: boolean
}): Config => {
  const config = createBaseConfig({
    app,
    isServer: false,
    isBuild,
  })

  // client entry
  config.entry('app').add(app.dir.client('lib/client.js'))

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

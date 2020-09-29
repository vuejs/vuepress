import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack output
 */
export const handleOutput = ({
  app,
  config,
  isServer,
}: {
  app: App
  config: Config
  isServer: boolean
}): void => {
  if (isServer) {
    // server output
    // remove after pages rendered
    config.output
      .path(app.dir.dest('.server'))
      .filename('app.js')
      .publicPath(app.options.base)
      .libraryTarget('commonjs2')
  } else {
    // client output
    config.output
      .path(app.dir.dest())
      .filename(
        app.env.isProd
          ? 'assets/js/[name].[chunkhash:8].js'
          : 'assets/js/[name].js'
      )
      .publicPath(app.options.base)
  }
}

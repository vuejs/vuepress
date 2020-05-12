import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'

export const createDevServer = (
  webpackConfig: webpack.Configuration,
  serverConfig: WebpackDevServer.Configuration
): WebpackDevServer => {
  const compiler = webpack(webpackConfig)

  return new WebpackDevServer(compiler, serverConfig)
}

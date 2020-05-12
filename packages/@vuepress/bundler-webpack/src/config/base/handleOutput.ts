import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'

/**
 * Set webpack output
 */
export const handleOutput = (config: Config, app: App): void => {
  config.output
    .path(app.dir.dest())
    .filename(
      app.env.isProd
        ? 'assets/js/[name].[chunkhash:8].js'
        : 'assets/js/[name].js'
    )
    .publicPath(app.options.base)
}

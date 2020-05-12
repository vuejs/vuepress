import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'

/**
 * Set webpack devtool
 */
export const handleDevtool = (config: Config, app: App): void => {
  config.devtool(
    app.env.isDebug ? 'source-map' : 'cheap-module-eval-source-map'
  )
}

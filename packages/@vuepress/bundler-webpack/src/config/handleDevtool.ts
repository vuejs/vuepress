import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack devtool
 */
export const handleDevtool = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  if (app.env.isDebug) {
    // always enable source-map in debug mode
    config.devtool('source-map')
  } else if (app.env.isDev) {
    // only enable eval-source-map in dev mode
    // TODO: remove type assertion when webpack-chain updates its types for webpack 5
    config.devtool('eval-cheap-module-source-map' as Config.DevTool)
  }
}

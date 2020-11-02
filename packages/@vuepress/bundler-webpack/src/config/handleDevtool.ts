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
    config.devtool('cheap-module-eval-source-map')
  }
}

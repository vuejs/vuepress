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
  config.devtool(
    app.env.isDebug ? 'source-map' : 'cheap-module-eval-source-map'
  )
}

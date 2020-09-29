import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack mode
 */
export const handleMode = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  config.mode(app.env.isProd ? 'production' : 'development')
}

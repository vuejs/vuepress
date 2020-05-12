import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'

/**
 * Set webpack mode
 */
export const handleMode = (config: Config, app: App): void => {
  config.mode(app.env.isProd ? 'production' : 'development')
}

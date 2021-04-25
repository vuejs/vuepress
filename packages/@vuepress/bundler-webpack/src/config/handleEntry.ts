import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack entry
 */
export const handleEntry = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  // set client app as entry point
  config.entry('app').add(app.dir.client('lib/app.js'))
}

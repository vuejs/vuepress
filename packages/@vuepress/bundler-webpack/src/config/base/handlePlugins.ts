import { DefinePlugin } from 'webpack'
import * as Config from 'webpack-chain'

/**
 * Set webpack plugins
 */
export const handlePlugins = (config: Config): void => {
  // define plugin
  config.plugin('define').use(DefinePlugin, [
    {
      VUEPRESS_VERSION: JSON.stringify(
        require('@vuepress/core/package.json').version
      ),
    },
  ])
}

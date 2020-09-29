import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin'

/**
 * Set webpack module to handle style files
 */
export const handleModuleStyles = ({
  app,
  config,
  isServer,
  isBuild,
}: {
  app: App
  config: Config
  isServer: boolean
  isBuild: boolean
}): void => {
  // TODO: postcss
  // TODO: sass
  // TODO: scss
  // TODO: less
  // TODO: stylus

  const cssRule = config.module.rule('css').test(/\.css$/)

  if (!isServer) {
    if (isBuild) {
      cssRule.use('extract-css-loader').loader(MiniCSSExtractPlugin.loader)
    } else {
      cssRule.use('style-loader').loader('style-loader')
    }
  }

  cssRule.use('css-loader').loader('css-loader').options({
    // TODO: css modules
    modules: false,
    // modules: {
    //   localIdentName: `[local]_[hash:base64:8]`,
    //   exportOnlyLocals: isServer,
    // },
    importLoaders: 1,
    sourceMap: !app.env.isProd,
  })
}

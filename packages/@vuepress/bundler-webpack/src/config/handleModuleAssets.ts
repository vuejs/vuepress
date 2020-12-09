import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack config to handle assets files
 */
export const handleModuleAssets = ({
  app,
  config,
  inlineLimit = 10000,
}: {
  app: App
  config: Config
  inlineLimit?: number
}): void => {
  // images
  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      // always add hash to avoid name conflicts
      name: 'assets/img/[name].[contenthash:8].[ext]',
    })

  // svg
  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader('file-loader')
    .options({
      // always add hash to avoid name conflicts
      name: 'assets/img/[name].[contenthash:8].[ext]',
    })

  // media
  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      // always add hash to avoid name conflicts
      name: 'assets/media/[name].[contenthash:8].[ext]',
    })

  // fonts
  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      // always add hash to avoid name conflicts
      name: 'assets/fonts/[name].[contenthash:8].[ext]',
    })
}

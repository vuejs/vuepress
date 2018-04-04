const path = require('path')

module.exports = function createBaseConfig ({
  sourceDir,
  publicPath = '/',
  layoutPath = path.resolve(__dirname, '../default-layout/Layout.vue')
}) {
  const Config = require('webpack-chain')
  const { VueLoaderPlugin } = require('vue-loader')
  const CSSExtractPlugin = require('mini-css-extract-plugin')

  const isProd = process.env.NODE_ENV === 'production'

  const config = new Config()

  config
    .set('mode', isProd ? 'production' : 'development')
    .output
      .path(path.resolve(sourceDir, 'dist'))
      .filename('[name].[chunkhash].js')
      .publicPath(publicPath)

  config.alias
    .set('~layout', layoutPath)

  config.resolve
    .set('symlinks', true)
    .extensions
      .merge(['.js', '.jsx', '.vue', '.json'])
      .end()
    .modules
      .add('node_modules')
      .add(path.resolve(sourceDir, '../node_modules'))
      .add(path.resolve(__dirname, '../../node_modules'))

  config.resolveLoader
    .set('symlinks', true)
    .modules
      .add('node_modules')
      .add(path.resolve(sourceDir, '../node_modules'))
      .add(path.resolve(__dirname, '../../node_modules'))

  config.module
    .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

  config.module
    .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: false
          }
        })

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 10000,
          name: `img/[name].[hash:8].[ext]`
        })

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: `img/[name].[hash:8].[ext]`
        })

  config.module
    .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `media/[name].[hash:8].[ext]`
        })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `fonts/[name].[hash:8].[ext]`
        })

  createCSSRule(config, 'css', /\.css$/)
  createCSSRule(config, 'scss', /\.scss$/, 'sass-loader')
  createCSSRule(config, 'sass', /\.sass$/, 'sass-loader', { indentedSyntax: true })
  createCSSRule(config, 'less', /\.less$/, 'less-loader')
  createCSSRule(config, 'stylus', /\.styl(us)?$/, 'stylus-loader')

  config
    .plugin('vue-loader')
    .use(VueLoaderPlugin)

  if (isProd) {
    config
      .plugin('extract-css')
      .use(CSSExtractPlugin, [{ filename: 'styles.css' }])
  }

  return config
}

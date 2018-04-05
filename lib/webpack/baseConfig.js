const path = require('path')

module.exports = function createBaseConfig ({
  siteConfig,
  sourceDir,
  outDir,
  publicPath,
  themePath,
  notFoundPath
}) {
  const markdown = require('../markdown')(siteConfig)
  const Config = require('webpack-chain')
  const { VueLoaderPlugin } = require('vue-loader')
  const CSSExtractPlugin = require('mini-css-extract-plugin')

  const isProd = process.env.NODE_ENV === 'production'
  const inlineLimit = 10000

  const config = new Config()

  config
    .set('mode', isProd ? 'production' : 'development')
    .output
      .path(outDir)
      .filename(isProd ? '_assets/js/[name].[chunkhash:8].js' : '_assets/js/[name].js')
      .publicPath(isProd ? publicPath : '/')

  config.resolve
    .set('symlinks', true)
    .alias
      .set('~theme', themePath)
      .set('~notFound', notFoundPath)
      .set('~source', sourceDir)
      .end()
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

  if (!siteConfig.evergreen) {
    config.module
      .rule('js')
        .test(/\.js$/)
        .exclude.add(/node_modules/).end()
        .use('buble-loader')
          .loader('buble-loader')
          .options({
            objectAssign: 'Object.assign'
          })
  }

  config.module
    .rule('markdown')
      .test(/\.md$/)
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: false
          }
        })
        .end()
      .use('markdown-loader')
        .loader(require.resolve('./markdownLoader'))
        .options({ markdown })

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `_assets/img/[name].[hash:8].[ext]`
        })

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: `_assets/img/[name].[hash:8].[ext]`
        })

  config.module
    .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `_assets/media/[name].[hash:8].[ext]`
        })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `_assets/fonts/[name].[hash:8].[ext]`
        })

  function createCSSRule (lang, test, loader, options) {
    const rule = config.module
      .rule(lang)
        .test(test)

    if (isProd) {
      rule
        .use('extract-css-loader').loader(CSSExtractPlugin.loader).end()
        .use('css-loader').loader('css-loader').options({ minimize: true })
    } else {
      rule
        .use('vue-style-loader').loader('vue-style-loader').end()
        .use('css-loader').loader('css-loader')
    }

    rule.use('postcss-loader').loader('postcss-loader').options({
      plugins: [require('autoprefixer')]
    })

    if (loader) {
      rule.use(loader).loader(loader).options(options)
    }
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('scss', /\.scss$/, 'sass-loader')
  createCSSRule('sass', /\.sass$/, 'sass-loader', { indentedSyntax: true })
  createCSSRule('less', /\.less$/, 'less-loader')
  createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader')

  config
    .plugin('vue-loader')
    .use(VueLoaderPlugin)

  if (isProd) {
    config
      .plugin('extract-css')
      .use(CSSExtractPlugin, [{ filename: '_assets/css/styles.[hash:8].css' }])
  }

  return config
}

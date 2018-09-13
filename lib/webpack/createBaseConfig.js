const path = require('path')

module.exports = function createBaseConfig ({
  siteConfig,
  siteData,
  sourceDir,
  outDir,
  publicPath,
  themePath,
  themeLayoutPath,
  themeNotFoundPath,
  isAlgoliaSearch,
  markdown
}, { debug } = {}, isServer) {
  const Config = require('webpack-chain')
  const { VueLoaderPlugin } = require('vue-loader')
  const CSSExtractPlugin = require('mini-css-extract-plugin')

  const isProd = process.env.NODE_ENV === 'production'
  const inlineLimit = 10000

  const config = new Config()

  config
    .mode(isProd && !debug ? 'production' : 'development')
    .output
      .path(outDir)
      .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
      .publicPath(isProd ? publicPath : '/')

  if (debug) {
    config.devtool('source-map')
  } else if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  config.resolve
    .set('symlinks', true)
    .alias
      .set('@theme', themePath)
      .set('@themeLayout', themeLayoutPath)
      .set('@themeNotFound', themeNotFoundPath)
      .set('@source', sourceDir)
      .set('@app', path.resolve(__dirname, '../app'))
      .set('@temp', path.resolve(__dirname, '../app/.temp'))
      .set('@default-theme', path.resolve(__dirname, '../default-theme'))
      .set('@AlgoliaSearchBox', isAlgoliaSearch
        ? path.resolve(__dirname, '../default-theme/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, './noopModule.js'))
      .end()
    .extensions
      .merge(['.js', '.jsx', '.vue', '.json', '.styl'])
      .end()
    .modules
      // prioritize our own
      .add(path.resolve(__dirname, '../../node_modules'))
      .add(path.resolve(__dirname, '../../../'))
      .add('node_modules')

  // Load extra root mixins on demand.
  const { activeHeaderLinks = true } = siteData.themeConfig
  const rootMixinsLoadingConfig = { activeHeaderLinks }
  for (const mixinName in rootMixinsLoadingConfig) {
    const enabled = rootMixinsLoadingConfig[mixinName]
    config.resolve
     .alias.set(`@${mixinName}`, enabled
       ? path.resolve(__dirname, `../app/root-mixins/${mixinName}.js`)
       : path.resolve(__dirname, './noopModule.js')
     )
  }

  config.resolveLoader
    .set('symlinks', true)
    .modules
      // prioritize our own
      .add(path.resolve(__dirname, '../../node_modules'))
      .add(path.resolve(__dirname, '../../../'))
      .add('node_modules')

  config.module
    .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

  const cacheDirectory = path.resolve(__dirname, '../../node_modules/.cache/vuepress')
  const cacheIdentifier = JSON.stringify({
    vuepress: require('../../package.json').version,
    'cache-loader': require('cache-loader').version,
    'vue-loader': require('vue-loader').version,
    isProd,
    isServer,
    config: (
      (siteConfig.markdown ? JSON.stringify(siteConfig.markdown) : '') +
      (siteConfig.chainWebpack || '').toString() +
      (siteConfig.configureWebpack || '').toString()
    )
  })

  function applyVuePipeline (rule) {
    rule
      .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory,
          cacheIdentifier
        })

    rule
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: true
          },
          cacheDirectory,
          cacheIdentifier
        })
  }

  const vueRule = config.module
    .rule('vue')
      .test(/\.vue$/)

  applyVuePipeline(vueRule)

  const mdRule = config.module
    .rule('markdown')
      .test(/\.md$/)

  applyVuePipeline(mdRule)

  mdRule
    .use('markdown-loader')
      .loader(require.resolve('./markdownLoader'))
      .options({ sourceDir, markdown })

  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

  if (!siteConfig.evergreen) {
    const libDir = path.join(__dirname, '..')
    config.module
      .rule('js')
        .test(/\.js$/)
        .exclude.add(filepath => {
          // Always transpile lib directory
          if (filepath.startsWith(libDir)) {
            return false
          }
          // always transpile js in vue files
          if (/\.vue\.js$/.test(filepath)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(filepath)
        }).end()
        .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory,
            cacheIdentifier
          })
          .end()
        .use('babel-loader')
          .loader('babel-loader')
          .options({
            // do not pick local project babel config (.babelrc)
            babelrc: false,
            // do not pick local project babel config (babel.config.js)
            // ref: http://babeljs.io/docs/en/config-files
            configFile: false,
            presets: [
              require.resolve('@vue/babel-preset-app')
            ]
          })
  }

  config.module
    .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/img/[name].[hash:8].[ext]`
        })

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: `assets/img/[name].[hash:8].[ext]`
        })

  config.module
    .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/media/[name].[hash:8].[ext]`
        })

  config.module
    .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
        .loader('url-loader')
        .options({
          limit: inlineLimit,
          name: `assets/fonts/[name].[hash:8].[ext]`
        })

  function createCSSRule (lang, test, loader, options) {
    const baseRule = config.module.rule(lang).test(test)
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')

    applyLoaders(modulesRule, true)
    applyLoaders(normalRule, false)

    function applyLoaders (rule, modules) {
      if (!isServer) {
        if (isProd) {
          rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
        } else {
          rule.use('vue-style-loader').loader('vue-style-loader')
        }
      }

      rule.use('css-loader')
        .loader(isServer ? 'css-loader/locals' : 'css-loader')
        .options({
          modules,
          localIdentName: `[local]_[hash:base64:8]`,
          importLoaders: 1,
          sourceMap: !isProd
        })

      rule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
        plugins: [require('autoprefixer')],
        sourceMap: !isProd
      }, siteConfig.postcss))

      if (loader) {
        rule.use(loader).loader(loader).options(options)
      }
    }
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/)
  createCSSRule('scss', /\.scss$/, 'sass-loader', siteConfig.scss)
  createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, siteConfig.sass))
  createCSSRule('less', /\.less$/, 'less-loader', siteConfig.less)
  createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
    preferPathResolver: 'webpack'
  }, siteConfig.stylus))

  config
    .plugin('vue-loader')
    .use(VueLoaderPlugin)

  if (isProd && !isServer) {
    config
      .plugin('extract-css')
      .use(CSSExtractPlugin, [{
        filename: 'assets/css/styles.[chunkhash:8].css'
      }])

    // ensure all css are extracted together.
    // since most of the CSS will be from the theme and very little
    // CSS will be from async chunks
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          // necessary to ensure async chunks are also extracted
          test: m => /css-extract/.test(m.type),
          chunks: 'all',
          enforce: true
        }
      }
    })
  }

  // inject constants
  config
    .plugin('injections')
    .use(require('webpack/lib/DefinePlugin'), [{
      BASE_URL: JSON.stringify(siteConfig.base || '/'),
      GA_ID: siteConfig.ga ? JSON.stringify(siteConfig.ga) : false,
      SW_ENABLED: !!siteConfig.serviceWorker,
      VUEPRESS_VERSION: JSON.stringify(require('../../package.json').version),
      LAST_COMMIT_HASH: JSON.stringify(getLastCommitHash())
    }])

  return config
}

function getLastCommitHash () {
  const spawn = require('cross-spawn')
  let hash
  try {
    hash = spawn.sync('git', ['log', '-1', '--format=%h']).stdout.toString('utf-8').trim()
  } catch (error) {}
  return hash
}

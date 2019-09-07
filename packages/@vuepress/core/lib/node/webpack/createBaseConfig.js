'use strict'

/**
 * Module dependencies.
 */

const { fs, path, logger, env } = require('@vuepress/shared-utils')

/**
 * Expose createBaseConfig method.
 */

module.exports = function createBaseConfig (context, isServer) {
  const {
    siteConfig,
    sourceDir,
    outDir,
    base: publicPath,
    markdown,
    tempPath,
    cacheDirectory,
    cacheIdentifier,
    options: {
      cache
    },
    pluginAPI
  } = context

  const Config = require('webpack-chain')
  const { VueLoaderPlugin } = require('vue-loader')
  const CSSExtractPlugin = require('mini-css-extract-plugin')

  const isProd = process.env.NODE_ENV === 'production'
  const inlineLimit = 10000

  const config = new Config()

  config
    .mode(isProd && !env.isDebug ? 'production' : 'development')
    .output
      .path(outDir)
      .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
      .publicPath(publicPath)

  if (env.isDebug) {
    config.devtool('source-map')
  } else if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  const modulePaths = getModulePaths()
  const clientDir = context.getLibFilePath('client')

  config.resolve
    .set('symlinks', true)
    .alias
      .set('@source', sourceDir)
      .set('@client', clientDir)
      .set('@app', clientDir)
      .set('@temp', tempPath)
      .set('@dynamic', path.resolve(tempPath, 'dynamic'))
      .set('@internal', path.resolve(tempPath, 'internal'))
      .end()
    .extensions
      .merge(['.js', '.jsx', '.vue', '.json', '.styl'])
      .end()
    .modules
      .merge(modulePaths)

  config.resolveLoader
    .set('symlinks', true)
    .modules
      .merge(modulePaths)

  config.module
    .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

  if (cache === false) {
    logger.tip('Clean cache...\n')
    fs.emptyDirSync(cacheDirectory)
  }

  const finalCacheIdentifier = cacheIdentifier + `isServer:${isServer}`

  function applyVuePipeline (rule) {
    rule
      .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })

    rule
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: true
          },
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
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
      .loader(require.resolve('@vuepress/markdown-loader'))
      .options({ sourceDir, markdown })

  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

  const evergreen = typeof siteConfig.evergreen === 'function'
    ? siteConfig.evergreen()
    : siteConfig.evergreen
  if (!evergreen) {
    const libDir = path.join(__dirname, '..')
    config.module
      .rule('js')
        .test(/\.js$/)
        .exclude.add(filePath => {
          // Always transpile lib directory
          if (filePath.startsWith(libDir)) {
            return false
          }
          // always transpile js in vue files
          if (/\.vue\.js$/.test(filePath)) {
            return false
          }
          // transpile all core files
          if (/(@vuepress|vuepress-)\/^((?!node_modules).)*\.js$/.test(filePath)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(filePath)
        }).end()
        .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory,
            cacheIdentifier: finalCacheIdentifier
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
        .loader('css-loader')
        .options({
          modules,
          localIdentName: `[local]_[hash:base64:8]`,
          importLoaders: 1,
          sourceMap: !isProd,
          exportOnlyLocals: isServer
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
          test: m => {
            return /css\/mini-extract/.test(m.type)
          },
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
      VUEPRESS_VERSION: JSON.stringify(require('../../../package.json').version),
      VUEPRESS_TEMP_PATH: JSON.stringify(tempPath),
      LAST_COMMIT_HASH: JSON.stringify(getLastCommitHash())
    }])

  pluginAPI.applySyncOption('define', config)
  pluginAPI.applySyncOption('alias', config)

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

function getModulePaths () {
  return module.paths.concat([path.resolve(process.cwd(), 'node_modules')])
}

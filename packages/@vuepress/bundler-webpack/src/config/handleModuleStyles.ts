import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import type { BundlerWebpackOptions } from '../types'

type StyleRule = Config.Rule<Config.Rule<Config.Module>>

/**
 * Set webpack module to handle style files
 */
export const handleModuleStyles = ({
  app,
  options,
  config,
  isServer,
  isBuild,
}: {
  app: App
  options: BundlerWebpackOptions
  config: Config
  isServer: boolean
  isBuild: boolean
}): void => {
  const createStyleRules = ({
    lang,
    test,
  }: {
    lang: string
    test: RegExp
  }): {
    modulesRule: StyleRule
    normalRule: StyleRule
  } => {
    const baseRule = config.module.rule(lang).test(test)
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')
    return {
      modulesRule,
      normalRule,
    }
  }

  const applyStyleHandlers = ({
    rule,
    cssModules,
    loaderName,
    loaderOptions = {},
  }: {
    rule: StyleRule
    cssModules: boolean
    loaderName?: string
    loaderOptions?: Record<string, unknown>
  }): void => {
    if (!isServer) {
      if (isBuild) {
        rule.use('extract-css-loader').loader(MiniCSSExtractPlugin.loader)
      } else {
        rule.use('style-loader').loader('style-loader')
      }
    }

    // use css-loader
    rule
      .use('css-loader')
      .loader('css-loader')
      .options({
        modules: cssModules
          ? {
              localIdentName: `[local]_[hash:base64:8]`,
              exportOnlyLocals: isServer,
            }
          : false,
        importLoaders: 1,
        sourceMap: !app.env.isProd,
      })

    // use postcss-loader
    rule
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        plugins: [require('autoprefixer')],
        sourceMap: !app.env.isProd,
        ...options.postcss,
      })

    // use extra loader
    if (loaderName) {
      rule.use(loaderName).loader(loaderName).options(loaderOptions)
    }
  }

  const handleStyle = ({
    lang,
    test,
    loaderName,
    loaderOptions,
  }: {
    lang: string
    test: RegExp
    loaderName?: string
    loaderOptions?: Record<string, unknown>
  }): void => {
    const { modulesRule, normalRule } = createStyleRules({
      lang,
      test,
    })

    applyStyleHandlers({
      rule: modulesRule,
      cssModules: true,
      loaderName,
      loaderOptions,
    })

    applyStyleHandlers({
      rule: normalRule,
      cssModules: false,
      loaderName,
      loaderOptions,
    })
  }

  handleStyle({
    lang: 'css',
    test: /\.css$/,
  })

  handleStyle({
    lang: 'postcss',
    test: /\.p(ost)?css$/,
  })

  handleStyle({
    lang: 'scss',
    test: /\.scss$/,
    loaderName: 'sass-loader',
    loaderOptions: options.scss,
  })

  handleStyle({
    lang: 'sass',
    test: /\.sass$/,
    loaderName: 'sass-loader',
    loaderOptions: {
      indentedSyntax: true,
      ...options.sass,
    },
  })

  handleStyle({
    lang: 'less',
    test: /\.less$/,
    loaderName: 'less-loader',
    loaderOptions: options.less,
  })

  handleStyle({
    lang: 'stylus',
    test: /\.styl(us)?$/,
    loaderName: 'stylus-loader',
    loaderOptions: options.stylus,
  })
}

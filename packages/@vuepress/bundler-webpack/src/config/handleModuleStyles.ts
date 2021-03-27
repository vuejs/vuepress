import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import type {
  WebpackBundlerOptions,
  LoaderOptions,
  SassLoaderOptions,
  LessLoaderOptions,
  StylusLoaderOptions,
} from '../types'

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
  options: WebpackBundlerOptions
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
    loaderOptions?: LoaderOptions
  }): void => {
    if (!isServer) {
      if (isBuild) {
        rule
          .use('extract-css-loader')
          .loader(require('mini-css-extract-plugin').loader)
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
              localIdentName: `[local]_[contenthash:base64:8]`,
              exportOnlyLocals: isServer,
            }
          : false,
        importLoaders: 1,
      })

    // use postcss-loader
    rule
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        postcssOptions: {
          plugins: [require('autoprefixer'), require('postcss-csso')],
        },
        ...options.postcss,
      })

    // use extra loader
    if (loaderName) {
      rule.use(loaderName).loader(loaderName).options(loaderOptions)
    }
  }

  const handleStyle = <T extends LoaderOptions = LoaderOptions>({
    lang,
    test,
    loaderName,
    loaderOptions,
  }: {
    lang: string
    test: RegExp
    loaderName?: string
    loaderOptions?: T
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

  handleStyle<SassLoaderOptions>({
    lang: 'scss',
    test: /\.scss$/,
    loaderName: 'sass-loader',
    loaderOptions: options.scss,
  })

  handleStyle<SassLoaderOptions>({
    lang: 'sass',
    test: /\.sass$/,
    loaderName: 'sass-loader',
    loaderOptions: options.sass,
  })

  handleStyle<LessLoaderOptions>({
    lang: 'less',
    test: /\.less$/,
    loaderName: 'less-loader',
    loaderOptions: options.less,
  })

  handleStyle<StylusLoaderOptions>({
    lang: 'stylus',
    test: /\.styl(us)?$/,
    loaderName: 'stylus-loader',
    loaderOptions: {
      stylusOptions: {
        // allow literal css import
        includeCSS: true,
        // no need to compress with stylus
        // we will handle it by postcss-loader
        compress: false,
      },
      ...options.stylus,
    },
  })
}

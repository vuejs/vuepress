import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveCacheLoaderOptions } from './resolveCacheLoaderOptions'
import { resolveBabelLoaderOptions } from './resolveBabelLoaderOptions'

/**
 * Set webpack module to handle js files
 */
export const handleModuleJs = ({
  app,
  config,
  isServer,
}: {
  app: App
  config: Config
  isServer: boolean
}): void => {
  // only enable babel in production client bundle
  // when `evergreen` option is set to `false`
  if (app.options.evergreen === false && app.env.isProd && !isServer) {
    const cacheLoaderOptions = resolveCacheLoaderOptions({
      app,
      identifier: {
        'babel-loader': require('babel-loader/package.json').version,
      },
    })

    const babelLoaderOptions = resolveBabelLoaderOptions({
      app,
      cacheLoaderOptions,
    })

    // TODO: webpack v5 issue https://github.com/webpack/webpack/issues/11467
    // config.module
    //   .rule('mjs')
    //   .test(/\.m?js/)
    //   .resolve.fullySpecified(false)

    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude.add((filePath) => {
        // always transpile js / jsx in vue files
        if (/\.vue\.jsx?$/.test(filePath)) {
          return false
        }
        // transpile all core packages and vuepress related packages.
        // i.e.
        // @vuepress/*
        // vuepress-*
        if (
          /(@vuepress[/\\][^/\\]*|vuepress-[^/\\]*)[/\\](?!node_modules).*\.js$/.test(
            filePath
          )
        ) {
          return false
        }
        // transpile @babel/runtime until fix for babel/babel#7597 is released
        if (filePath.includes(path.join('@babel', 'runtime'))) {
          return false
        }
        // don't transpile node_modules
        return /node_modules/.test(filePath)
      })
      .end()
      // use babel-loader
      .use('babel-loader')
      .loader('babel-loader')
      .options(babelLoaderOptions)
      .end()
  }
}

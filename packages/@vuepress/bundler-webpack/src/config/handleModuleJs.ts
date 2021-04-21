import type * as Config from 'webpack-chain'
import type { WebpackBundlerOptions } from '../types'
import { resolveEsbuildJsxOptions } from './resolveEsbuildJsxOptions'

/**
 * Set webpack module to handle js files
 */
export const handleModuleJs = ({
  options,
  config,
  isServer,
  isBuild,
}: {
  options: WebpackBundlerOptions
  config: Config
  isServer: boolean
  isBuild: boolean
}): void => {
  // only enable transpilation in production client bundle
  // when `evergreen` option is set to `false`
  if (options.evergreen !== false || !isBuild || isServer) {
    return
  }

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
      // don't transpile node_modules
      return /node_modules/.test(filePath)
    })
    .end()
    // use esbuild-loader
    .use('esbuild-loader')
    .loader('esbuild-loader')
    .options({
      target: 'es2015',
      loader: 'jsx',
      ...resolveEsbuildJsxOptions(),
    })
    .end()
}

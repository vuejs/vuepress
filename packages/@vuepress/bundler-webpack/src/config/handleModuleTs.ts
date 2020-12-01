import { ESBuildPlugin } from 'esbuild-loader'
import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import { resolveCacheLoaderOptions } from './resolveCacheLoaderOptions'
import { resolveEsbuildJsxOptions } from './resolveEsbuildJsxOptions'

/**
 * Set webpack module to handle ts files
 */
export const handleModuleTs = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  const cacheLoaderOptions = resolveCacheLoaderOptions({
    app,
    identifier: {
      'esbuild-loader': require('esbuild-loader/package.json').version,
    },
  })

  config.module
    .rule('ts')
    .test(/\.tsx?/)
    // use cache-loader
    .use('cache-loader')
    .loader('cache-loader')
    .options(cacheLoaderOptions)
    .end()
    // use esbuild-loader
    .use('esbuild-loader')
    .loader('esbuild-loader')
    .options({
      target: 'es2018',
      loader: 'tsx',
      ...resolveEsbuildJsxOptions(),
    })
    .end()

  // use esbuild-loader plugin
  config.plugin('esbuild-loader').use(ESBuildPlugin)
}

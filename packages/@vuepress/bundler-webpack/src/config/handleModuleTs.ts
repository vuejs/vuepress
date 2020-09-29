import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
import { resolveCacheLoaderOptions } from './resolveCacheLoaderOptions'

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
      'ts-loader': require('ts-loader/package.json').version,
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
    // use ts-loader
    .use('ts-loader')
    .loader('ts-loader')
    .options({
      // TODO: if we enable `transpileOnly`, we may need extra
      // type check support like fork-ts-checker-webpack-plugin
      transpileOnly: true,
      appendTsSuffixTo: [/\.vue$/],
      appendTsxSuffixTo: [/\.vue$/],
      compilerOptions: {
        declaration: false,
      },
    })
    .end()
}

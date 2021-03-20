import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'
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
  config.module
    .rule('ts')
    .test(/\.tsx?/)
    // use esbuild-loader
    .use('esbuild-loader')
    .loader('esbuild-loader')
    .options({
      target: 'es2018',
      loader: 'tsx',
      ...resolveEsbuildJsxOptions(),
    })
    .end()
}

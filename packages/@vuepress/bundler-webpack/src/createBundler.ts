import type * as WebpackDevServer from 'webpack-dev-server'
import type { CreateBundlerFunction } from '@vuepress/core'
import { createBuild } from './build'
import { createDev } from './dev'

// TODO: bundler options
export type BundlerWebpackOptions = Record<string, never>

export const createBundler: CreateBundlerFunction<
  BundlerWebpackOptions,
  WebpackDevServer
> = (options) => ({
  dev: createDev(options),
  build: createBuild(options),
})

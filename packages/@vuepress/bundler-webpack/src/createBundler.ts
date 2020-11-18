import type { CreateBundlerFunction } from '@vuepress/core'
import { createBuild } from './build'
import { createDev } from './dev'
import type { WebpackBundlerOptions } from './types'

export const createBundler: CreateBundlerFunction<WebpackBundlerOptions> = (
  options
) => ({
  dev: createDev(options),
  build: createBuild(options),
})

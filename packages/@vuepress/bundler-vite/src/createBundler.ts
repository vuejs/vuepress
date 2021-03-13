import type { CreateBundlerFunction } from '@vuepress/core'
import { createBuild } from './build'
import { createDev } from './dev'
import type { ViteBundlerOptions } from './types'

export const createBundler: CreateBundlerFunction<ViteBundlerOptions> = (
  options
) => ({
  dev: createDev(options),
  build: createBuild(options),
})

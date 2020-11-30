import type { Bundler, BundlerEntry } from '@vuepress/core'
import type { UserConfig } from './types'

export const resolveBundler = ({
  bundler = 'webpack',
  bundlerConfig = {},
}: UserConfig): Bundler => {
  switch (bundler) {
    case 'webpack':
    default: {
      const {
        createBundler,
      } = require('@vuepress/bundler-webpack') as BundlerEntry
      return createBundler(bundlerConfig)
    }
  }
}

import type { UserConfig, Bundler, BundlerEntry } from '@vuepress/core'

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

import type { AppOptions, Bundler, BundlerEntry } from '../types'

export const createAppBundler = (options: AppOptions): Bundler => {
  switch (options.bundler) {
    case 'webpack':
    default: {
      const {
        createBundler,
      } = require('@vuepress/bundler-webpack') as BundlerEntry
      return createBundler(options.bundlerConfig)
    }
  }
}

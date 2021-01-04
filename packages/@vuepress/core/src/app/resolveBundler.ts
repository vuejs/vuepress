import { normalizePackageName } from '@vuepress/shared'
import type { AppOptions, Bundler, BundlerEntry } from '../types'

export const resolveBundler = ({
  bundler,
  bundlerConfig,
}: AppOptions): Bundler => {
  const bundlerPackage = normalizePackageName(bundler, 'vuepress', 'bundler')
  const { createBundler } = require(bundlerPackage) as BundlerEntry
  return createBundler(bundlerConfig)
}

import type { Bundler, BundlerEntry } from '@vuepress/core'
import { normalizePackageName } from '@vuepress/shared'
import type { UserConfig } from './types'

export const resolveBundler = ({
  bundler = '@vuepress/bundler-webpack',
  bundlerConfig = {},
}: UserConfig): Bundler => {
  const bundlerPackage = normalizePackageName(bundler, 'vuepress', 'bundler')
  const { createBundler } = require(bundlerPackage) as BundlerEntry
  return createBundler(bundlerConfig)
}

import type { BundlerConfig, ThemeConfig } from '@vuepress/core'
import type { UserConfig } from './types'

export const defineUserConfig = <
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
>(
  config: UserConfig<T, U>
): UserConfig<T, U> => config

import type { AppOptions } from './app'
import type { BundlerConfig } from './bundler'
import type { ThemeConfig } from './theme'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppOptions` by cli:
 *
 * @remark suffix `Config` means this is for user config
 */
export type UserConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Partial<AppOptions<T>> & {
  // bundler config
  bundler?: 'webpack'
  bundlerConfig?: Partial<U>
}

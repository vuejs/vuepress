import type {
  AppOptions,
  BundlerConfig,
  PluginObject,
  ThemeConfig,
} from '@vuepress/core'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppOptions` by cli
 */
export type UserConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> = Partial<AppOptions<T, U>> &
  // user config can be used as a plugin
  Omit<PluginObject, 'name' | 'multiple'>

export type UserConfigLoader = (userConfigPath: string) => Promise<UserConfig>

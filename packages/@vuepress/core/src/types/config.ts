import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteLocaleConfig, SiteHeadConfig } from '@vuepress/shared'
import type { BundlerConfig } from './bundler'
import type { PluginConfig } from './plugin'
import type { ThemeConfig } from './theme'

/**
 * User config type of vuepress
 *
 * It will be transformed to `AppOptions` by cli:
 *
 * @remark suffix `Config` means this is for user config
 */
export interface VuepressConfig<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> {
  // site config
  base?: string
  title?: string
  description?: string
  head?: SiteHeadConfig[]
  locales?: SiteLocaleConfig

  // markdown config
  markdown?: MarkdownOptions

  // plugins config
  plugins?: PluginConfig[]

  // theme config
  theme?: string
  themeConfig?: Partial<T>

  // directory config
  dirSource: string
  dirDest?: string
  dirTemp?: string
  dirCache?: string

  // development config
  debug?: boolean
  host?: string
  port?: number
  open?: boolean
  evergreen?: boolean
  templateDev?: string
  templateSSR?: string

  // bundler config
  bundler?: 'webpack'
  bundlerConfig?: Partial<U>

  // ssr config
  shouldPreload?: ((file: string, type: string) => boolean) | null
  shouldPrefetch?: ((file: string, type: string) => boolean) | null

  // TODO
  // legacy config of v1
}

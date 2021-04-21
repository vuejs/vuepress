import type { MarkdownOptions } from '@vuepress/markdown'
import type { SiteLocaleConfig, SiteLocaleData } from '@vuepress/shared'
import type { BundlerConfig } from '../bundler'
import type { ThemeConfig } from '../theme'

/**
 * Vuepress app options
 */
export interface AppOptions<
  T extends ThemeConfig = ThemeConfig,
  U extends BundlerConfig = BundlerConfig
> extends SiteLocaleData {
  // site options
  base: string
  locales: SiteLocaleConfig

  // theme options
  theme: string
  themeConfig: Partial<T>

  // bundler options
  bundler: string
  bundlerConfig: Partial<U>

  // directory options
  source: string
  dest: string
  temp: string
  cache: string
  public: string

  // markdown options
  markdown: MarkdownOptions

  // development options
  debug: boolean
  host: string
  port: number
  open: boolean
  pagePatterns: string[]
  templateDev: string
  templateSSR: string
  shouldPreload: ((file: string, type: string) => boolean) | boolean
  shouldPrefetch: ((file: string, type: string) => boolean) | boolean
}

export type AppConfig = Partial<AppOptions> & Pick<AppOptions, 'source'>

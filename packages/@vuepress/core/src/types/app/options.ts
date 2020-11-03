import type { MarkdownOptions } from '@vuepress/markdown'
import type { HeadConfig, SiteLocaleConfig } from '@vuepress/shared'
import type { PluginConfig } from '../plugin'
import type { ThemeConfig } from '../theme'

/**
 * Vuepress app options
 */
export interface AppOptions<T extends ThemeConfig = ThemeConfig> {
  // site options
  base: string
  lang: string
  title: string
  description: string
  head: HeadConfig[]
  locales: SiteLocaleConfig

  // theme options
  theme: string
  themeConfig: Partial<T>

  // directory options
  source: string
  dest: string
  temp: string
  cache: string
  public: string

  // development options
  debug: boolean
  host: string
  port: number
  open: boolean
  evergreen: boolean
  templateDev: string
  templateSSR: string
  shouldPreload: ((file: string, type: string) => boolean) | boolean
  shouldPrefetch: ((file: string, type: string) => boolean) | boolean

  // markdown options
  markdown: MarkdownOptions

  // plugins options
  plugins: PluginConfig[]

  // pages options
  pagePatterns: string[]
}

export type AppConfig = Partial<AppOptions> & Pick<AppOptions, 'source'>

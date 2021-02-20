import type { HeadConfig } from './head'
import type { LocaleConfig } from './locale'

/**
 * Vuepress site data
 */
export interface SiteData extends SiteLocaleData {
  // site base
  base: string

  // locale config
  locales: SiteLocaleConfig
}

/**
 * Locales data of vuepress site
 *
 * If they are set in the root of site data, they will be used
 * as the default value
 *
 * If they are set in the `locales` of site data, they will be
 * used for specific locale
 */
export interface SiteLocaleData {
  // site language
  lang: string

  // site title
  title: string

  // site description
  description: string

  // tags in site <head>
  head: HeadConfig[]
}

/**
 * Site locale config
 *
 * @example
 * {
 *   '/en/': {
 *     lang: 'en-US',
 *     title: 'Hello',
 *   },
 *   '/zh/: {
 *     lang: 'zh-CN',
 *     title: '你好',
 *   }
 * }
 *
 * @remark suffix `Config` means this is for user config
 */
export type SiteLocaleConfig = LocaleConfig<SiteLocaleData>

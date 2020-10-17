/**
 * Vuepress site data
 */
export interface SiteData<T extends SiteThemeConfig = SiteThemeConfig> {
  // site base
  base: string

  // site language
  lang: string

  // site title
  title: string

  // site description
  description: string

  // tags in site <head>
  head: SiteHeadConfig[]

  // locale config
  locales: SiteLocaleConfig

  // theme config
  themeConfig: Partial<T>
}

/**
 * Site locale config
 *
 * @example
 * {
 *   '/en/': {
 *     lang: 'en-US',
 *     msg: 'hello',
 *   },
 *   '/zh/: {
 *     lang: 'zh-CN',
 *     msg: '你好',
 *   }
 * }
 *
 * @remark suffix `Config` means this is for user config
 */
export type SiteLocaleConfig = LocaleConfig<{
  lang?: string
  title?: string
  description?: string
}>

/**
 * Site head config
 *
 * @example ['link', { rel: 'icon', href: '/logo.png' }]
 * @example ['style', { type: 'text/css' }, 'p { color: red; }']
 *
 * @remark suffix `Config` means this is for user config
 */
export type SiteHeadConfig =
  | [
      Extract<SiteHeadTagConfig, 'base' | 'link' | 'meta' | 'script'>,
      SiteHeadAttrsConfig
    ]
  | [
      Exclude<SiteHeadTagConfig, 'base' | 'link' | 'meta'>,
      SiteHeadAttrsConfig,
      string
    ]

/**
 * Site head tag config
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
 *
 * @remark suffix `Config` means this is for user config
 */
export type SiteHeadTagConfig =
  | 'title'
  | 'base'
  | 'link'
  | 'style'
  | 'meta'
  | 'script'
  | 'noscript'
  | 'template'

/**
 * Site head attrs config
 *
 * @remark suffix `Config` means this is for user config
 */
export type SiteHeadAttrsConfig = Record<string, string | boolean>

/**
 * Site theme config
 *
 * @remark suffix `Config` means this is for user config
 */
export interface SiteThemeConfig {
  locales?: LocaleConfig
  [key: string]: any
}

export type LocaleConfig<
  T extends Record<string, any> = Record<string, any>
> = Record<string, LocaleConfigItem<T>>

export type LocaleConfigItem<
  T extends Record<string, any> = Record<string, any>
> = Record<string, any> & T

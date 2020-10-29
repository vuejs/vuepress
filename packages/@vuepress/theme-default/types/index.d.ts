import type { LocaleData, Theme, ThemeConfig } from '@vuepress/core'

export interface DefaultThemeOptions
  extends ThemeConfig<DefaultThemeLocaleData> {
  logo?: string
  navbar?: boolean
}

export interface DefaultThemeLocaleData extends LocaleData {
  // custom blocks default title
  tip?: string
  warning?: string
  danger?: string

  // messages for 404 page
  notFound?: string[]
  backToHome?: string

  // sr-only message in <OutboundLink>
  openInNewWindow?: string
}

declare const defaultTheme: Theme<DefaultThemeOptions>

export = defaultTheme

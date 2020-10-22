import type { LocaleConfig, Theme, ThemeConfig } from '@vuepress/core'

export interface DefaultThemeOptions extends ThemeConfig {
  logo?: string
  navbar?: boolean
  // TODO

  locales?: LocaleConfig<DefaultThemeLocales>
}

export interface DefaultThemeLocales {
  // custom blocks default title
  tip?: string
  warning?: string
  danger?: string
}

declare const defaultTheme: Theme<DefaultThemeOptions>

export = defaultTheme

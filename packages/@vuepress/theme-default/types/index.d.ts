import type { Theme, ThemeConfig } from '@vuepress/core'

export interface DefaultThemeOptions extends ThemeConfig {
  logo?: string
  navbar?: boolean
  // TODO
}

declare const defaultTheme: Theme<DefaultThemeOptions>

export = defaultTheme

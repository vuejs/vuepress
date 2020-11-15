import type { Theme } from '@vuepress/core'
import type { DefaultThemeOptions } from 'theme'

export * from './links'
export * from './theme'

declare const defaultTheme: Theme<DefaultThemeOptions>

export = defaultTheme

import type { Theme } from '@vuepress/core'
import type { DefaultThemeOptions } from 'theme'

export * from './config'
export * from './links'
export * from './page'

declare const defaultTheme: Theme<DefaultThemeOptions>

export = defaultTheme

import type { Theme } from '@vuepress/core'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export type VueThemeOptions = DefaultThemeOptions

export const vueTheme: Theme<VueThemeOptions> = () => ({
  name: '@vuepress/theme-vue',
  extends: '@vuepress/theme-default',
})

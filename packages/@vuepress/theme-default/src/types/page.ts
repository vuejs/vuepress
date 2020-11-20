import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string
}

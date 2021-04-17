import type { Markdown } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { BundlerDev, BundlerBuild } from '../bundler'
import type { Page } from '../page'
import type { Plugin, PluginOptions, PluginConfig } from '../plugin'
import type { PluginApi } from '../pluginApi'
import type { ThemeApi } from '../themeApi'
import type { AppOptions } from './options'
import type { AppDir, AppEnv, AppWriteTemp } from './utils'

/**
 * Vuepress app
 */
export interface App {
  version: string
  options: AppOptions
  dir: AppDir
  env: AppEnv
  siteData: SiteData
  markdown: Markdown
  pluginApi: PluginApi
  themeApi: ThemeApi
  pages: Page[]
  writeTemp: AppWriteTemp
  use: <T extends PluginOptions>(
    plugin: Plugin<T> | string,
    config?: Partial<T>
  ) => void
  useByConfig: <T extends PluginOptions>(pluginConfig: PluginConfig<T>) => void
  init: () => Promise<void>
  prepare: () => Promise<void>
  dev: () => ReturnType<BundlerDev>
  build: () => ReturnType<BundlerBuild>
}

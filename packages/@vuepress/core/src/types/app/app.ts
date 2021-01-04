import type { Markdown } from '@vuepress/markdown'
import type { BundlerDev, BundlerBuild } from '../bundler'
import type { Page } from '../page'
import type { Plugin, PluginOptions, PluginConfig } from '../plugin'
import type { PluginApi } from '../plugin-api'
import type { ThemeApi } from '../theme-api'
import type { AppOptions } from './options'
import type { AppDir, AppEnv, AppWriteTemp } from './utils'

/**
 * Vuepress app
 */
export interface App {
  // created
  version: string
  options: AppOptions
  dir: AppDir
  env: AppEnv
  markdown: Markdown
  pluginApi: PluginApi
  use: <T extends PluginOptions>(
    plugin: Plugin<T> | string,
    config?: Partial<T>
  ) => void
  useByConfig: <T extends PluginOptions>(pluginConfig: PluginConfig<T>) => void
  init: () => Promise<void>
  prepare: () => Promise<void>
  dev: () => ReturnType<BundlerDev>
  build: () => ReturnType<BundlerBuild>

  // initialized
  writeTemp: AppWriteTemp
  themeApi: ThemeApi
  pages: Page[]
}

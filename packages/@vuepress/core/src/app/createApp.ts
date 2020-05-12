import { PluginApi, createPluginApi } from '../plugin-api'
import { ThemeApi } from '../theme-api'
import { appInit } from './appInit'
import { appPrepare } from './appPrepare'
import { appUse } from './appUse'
import { appUseByConfig } from './appUseByConfig'
import { AppBundler, createAppBundler } from './createAppBundler'
import { AppDir, createAppDir } from './createAppDir'
import { AppEnv, createAppEnv } from './createAppEnv'
import { AppOptions, createAppOptions } from './createAppOptions'
import { AppMarkdown } from './createAppMarkdown'
import { AppWriteTemp } from './createAppWriteTemp'
import { AppPages } from './createAppPages'
import { AppConfig, PluginConfig, Plugin } from './types'

export interface App {
  // created
  options: AppOptions
  dir: AppDir
  env: AppEnv
  pluginApi: PluginApi
  use: <T extends object>(plugin: Plugin<T> | string, config?: T) => void
  useByConfig: <T extends object>(pluginConfig: PluginConfig<T>) => void
  init: () => Promise<void>
  prepare: () => Promise<void>
  dev: () => ReturnType<AppBundler['dev']>
  build: () => ReturnType<AppBundler['build']>

  // initialized
  markdown: AppMarkdown
  writeTemp: AppWriteTemp
  themeApi: ThemeApi

  // prepared
  pages: AppPages
}

/**
 * Create vuepress app
 */
export const createApp = (config: AppConfig): App => {
  const options = createAppOptions(config)
  const dir = createAppDir(options)
  const env = createAppEnv(options)
  const bundler = createAppBundler(options)
  const pluginApi = createPluginApi()

  const app = {
    options,
    dir,
    env,
    pluginApi,

    use: (...args) => appUse(app, ...args),
    useByConfig: (...args) => appUseByConfig(app, ...args),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
    dev: () => bundler.dev(app),
    build: () => bundler.build(app),
  } as App

  return app
}

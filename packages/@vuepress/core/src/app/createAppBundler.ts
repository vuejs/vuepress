import { App } from './createApp'
import { AppOptions } from './createAppOptions'

export interface AppBundler {
  dev: (app: App) => Promise<void>
  build: (app: App) => Promise<void>
}

export const createAppBundler = (options: AppOptions): AppBundler => {
  switch (options.bundler) {
    case 'webpack':
    default:
      return require('@vuepress/bundler-webpack') as AppBundler
  }
}

import { resolve } from 'path'
import { AppConfig } from './types'

/**
 * Options (normalized config) of vuepress app
 */
export type AppOptions = Required<AppConfig>

/**
 * Create options (normalized config) for vuepress app
 */
export const createAppOptions = (config: AppConfig): AppOptions => {
  return {
    // Meta
    title: '',
    description: '',
    head: [],
    locales: {},

    // Dev & Build
    bundler: 'webpack',
    base: '',
    host: '0.0.0.0',
    port: 8080,
    debug: false,
    open: false,

    // Dirs
    dirDest: resolve(config.dirSource, '.vuepress/dist'),
    dirTemp: resolve(config.dirSource, '.vuepress/.temp'),

    // Template
    templateDev: require.resolve('@vuepress/client/templates/index.dev.html'),
    templateSSR: require.resolve('@vuepress/client/templates/index.ssr.html'),

    // Plugins
    plugins: [],

    // Theme
    theme: '@vuepress/default',
    themeConfig: {},

    ...config,
  }
}

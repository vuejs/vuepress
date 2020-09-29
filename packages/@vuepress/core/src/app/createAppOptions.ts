import { path } from '@vuepress/utils'
import type { AppOptions, VuepressConfig } from '../types'

/**
 * Create options (normalized config) for vuepress app
 */
export const createAppOptions = ({
  // site config
  base = '',
  title = '',
  description = '',
  head = [],
  locales = {},

  // markdown config
  markdown = {},

  // plugins config
  plugins = [],

  // theme config
  theme = '@vuepress/default',
  themeConfig = {},

  // directory config
  dirSource,
  dirDest = path.resolve(dirSource, '.vuepress/dist'),
  dirTemp = path.resolve(dirSource, '.vuepress/.temp'),
  dirCache = path.resolve(
    require.resolve('cache-loader/package.json'),
    '../../.cache'
  ),

  // development config
  host = '0.0.0.0',
  port = 8080,
  debug = false,
  open = false,
  evergreen = false,
  templateDev = path.normalize(
    require.resolve('@vuepress/client/templates/index.dev.html')
  ),
  templateSSR = path.normalize(
    require.resolve('@vuepress/client/templates/index.ssr.html')
  ),

  // bundler config
  bundler = 'webpack',
  bundlerConfig = {},

  // ssr config
  shouldPreload = null,
  shouldPrefetch = null,
}: VuepressConfig): AppOptions => ({
  // site config
  base,
  title,
  description,
  head,
  locales,
  markdown,
  plugins,
  theme,
  themeConfig,
  dirSource,
  dirDest,
  dirTemp,
  dirCache,
  debug,
  host,
  port,
  open,
  evergreen,
  templateDev,
  templateSSR,
  bundler,
  bundlerConfig,
  shouldPreload,
  shouldPrefetch,
})

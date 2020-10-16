import { path } from '@vuepress/utils'
import type { AppConfig, AppOptions } from '../types'

/**
 * Create app options with default values
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
  source,
  dest = path.resolve(source, '.vuepress/dist'),
  temp = path.resolve(source, '.vuepress/.temp'),
  cache = path.resolve(source, '.vuepress/.cache'),

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

  // ssr config
  shouldPreload = null,
  shouldPrefetch = null,
}: AppConfig): AppOptions => ({
  base,
  title,
  description,
  head,
  locales,
  markdown,
  plugins,
  theme,
  themeConfig,
  source,
  dest,
  temp,
  cache,
  debug,
  host,
  port,
  open,
  evergreen,
  templateDev,
  templateSSR,
  shouldPreload,
  shouldPrefetch,
})

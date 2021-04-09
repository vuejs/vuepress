import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { ThemeData } from '../shared'
import { prepareThemeData } from './prepareThemeData'

/**
 * Options of @vuepress/plugin-theme-data
 */
export interface ThemeDataPluginOptions {
  /**
   * Theme data to be used in client side
   */
  themeData?: ThemeData
}

export const themeDataPlugin: Plugin<ThemeDataPluginOptions> = ({
  themeData = {},
}) => ({
  name: '@vuepress/plugin-theme-data',

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  onPrepared: (app) => prepareThemeData(app, themeData),
})

import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { ThemeData } from './types'

export type { ThemeData }

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

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

  onPrepared: async (app) => {
    const content = `\
  export const themeData = ${JSON.stringify(themeData, null, 2)}
  `

    await app.writeTemp('internal/themeData.js', content)
  },
})

export default themeDataPlugin

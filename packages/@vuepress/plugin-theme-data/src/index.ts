import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { ThemeData } from './types'

export type { ThemeData }

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
`

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
    // theme data file content
    let content = `\
  export const themeData = ${JSON.stringify(themeData, null, 2)}
  `

    // inject HMR code
    if (app.env.isDev) {
      content += HMR_CODE
    }

    await app.writeTemp('internal/themeData.js', content)
  },
})

export default themeDataPlugin

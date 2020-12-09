import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export interface GoogleAnalyticsPluginOptions {
  id: string
}

export const googleAnalyticsPlugin: Plugin<GoogleAnalyticsPluginOptions> = ({
  id,
}) => ({
  name: '@vuepress/plugin-google-analytics',

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

  define: {
    GA_ID: id || false,
  },
})

export default googleAnalyticsPlugin

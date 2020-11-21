import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

export interface GoogleAnalyticsPluginOptions {
  id?: string
}

export const googleAnalyticsPlugin: Plugin<GoogleAnalyticsPluginOptions> = ({
  id,
}) => ({
  name: '@vuepress/plugin-google-analytics',

  clientAppEnhanceFiles: resolve(__dirname, './clientAppEnhance.js'),

  define: {
    GA_ID: id || false,
  },
})

export default googleAnalyticsPlugin

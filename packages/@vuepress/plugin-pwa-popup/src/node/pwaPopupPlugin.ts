import type { Plugin } from '@vuepress/core'
import type { LocaleConfig } from '@vuepress/shared'
import { path } from '@vuepress/utils'

/**
 * Options for @vuepress/plugin-pwa-popup
 */
export interface PwaPopupPluginOptions {
  locales?: LocaleConfig<{
    message: string
    buttonText: string
  }>
}

export const pwaPopupPlugin: Plugin<PwaPopupPluginOptions> = ({ locales }) => ({
  name: '@vuepress/plugin-pwa-popup',

  clientAppRootComponentFiles: path.resolve(
    __dirname,
    '../client/components/PwaPopupWrapper.js'
  ),

  define: {
    __PWA_POPUP_LOCALES__: locales,
  },
})

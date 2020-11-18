import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

export type BackToTopPluginOptions = Record<never, never>

export const backToTopPlugin: Plugin<BackToTopPluginOptions> = {
  name: '@vuepress/plugin-back-to-top',

  clientAppRootComponentFiles: resolve(__dirname, './components/BackToTop.vue'),
}

export default backToTopPlugin

import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type BackToTopPluginOptions = Record<never, never>

export const backToTopPlugin: Plugin<BackToTopPluginOptions> = {
  name: '@vuepress/plugin-back-to-top',

  clientAppRootComponentFiles: path.resolve(
    __dirname,
    '../client/BackToTop.vue'
  ),
}

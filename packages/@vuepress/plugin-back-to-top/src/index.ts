import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'
import type { BackToTopPluginOptions } from './types'

const backToTopPlugin: Plugin<BackToTopPluginOptions> = {
  name: '@vuepress/plugin-back-to-top',

  clientAppEnhanceFiles: resolve(__dirname, './clientAppEnhance.js'),

  clientAppRootComponentFiles: resolve(__dirname, './components/BackToTop.vue'),
}

export = backToTopPlugin

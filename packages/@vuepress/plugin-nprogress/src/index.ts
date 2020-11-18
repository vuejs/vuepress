import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

export type NprogressPluginOptions = Record<never, never>

export const nprogressPlugin: Plugin<NprogressPluginOptions> = {
  name: '@vuepress/plugin-nprogress',

  clientAppSetupFiles: resolve(__dirname, './clientAppSetup.js'),
}

export default nprogressPlugin

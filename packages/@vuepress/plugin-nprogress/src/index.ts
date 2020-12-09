import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type NprogressPluginOptions = Record<never, never>

export const nprogressPlugin: Plugin<NprogressPluginOptions> = {
  name: '@vuepress/plugin-nprogress',

  clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.js'),
}

export default nprogressPlugin

import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'
import type { NprogressPluginOptions } from './types'

const nprogressPlugin: Plugin<NprogressPluginOptions> = {
  name: '@vuepress/plugin-nprogress',

  clientAppSetupFiles: resolve(__dirname, './clientAppSetup.js'),
}

export = nprogressPlugin

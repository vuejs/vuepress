import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

const plugin: Plugin = {
  name: '@vuepress/plugin-nprogress',

  clientAppSetupFiles: resolve(__dirname, './clientAppSetup.js'),
}

export = plugin

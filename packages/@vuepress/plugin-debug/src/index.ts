import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

export type DebugPluginOptions = Record<never, never>

export const debugPlugin: Plugin<DebugPluginOptions> = {
  name: '@vuepress/plugin-debug',

  clientAppRootComponentFiles: resolve(__dirname, './components/Debug.js'),
}

export default debugPlugin

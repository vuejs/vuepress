import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type DebugPluginOptions = Record<never, never>

export const debugPlugin: Plugin<DebugPluginOptions> = {
  name: '@vuepress/plugin-debug',

  clientAppRootComponentFiles: path.resolve(__dirname, './components/Debug.js'),
}

export default debugPlugin

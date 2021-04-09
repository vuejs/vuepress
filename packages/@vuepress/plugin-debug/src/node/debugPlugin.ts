import type { Plugin, PluginObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type DebugPluginOptions = Record<never, never>

export const debugPlugin: Plugin<DebugPluginOptions> = (_, app) => {
  const pluginObj: PluginObject = {
    name: '@vuepress/plugin-debug',
  }

  if (app.env.isDev || app.env.isDebug) {
    pluginObj.clientAppRootComponentFiles = path.resolve(
      __dirname,
      '../client/components/Debug.js'
    )
  }

  return pluginObj
}

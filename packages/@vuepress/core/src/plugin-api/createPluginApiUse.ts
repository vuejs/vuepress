import { PluginApiPlugins } from './createPluginApiPlugins'
import { Options } from './options'

export type PluginApiUse = (plugin: Options) => void

export const createPluginApiUse = (plugins: PluginApiPlugins): PluginApiUse => {
  const use: PluginApiUse = (plugin) => {
    plugins.push(plugin)
  }

  return use
}

import { chalk } from '@vuepress/utils'
import type { App, Plugin, PluginOptions } from '../types'
import { normalizePlugin } from './normalizePlugin'

export const appUse = <T extends PluginOptions>(
  app: App,
  rawPlugin: Plugin<T> | string,
  config?: Partial<T>
): void => {
  // normalize plugin
  const plugin = normalizePlugin(app, rawPlugin, config)

  // print log
  // TODO: logger
  console.log(`Use plugin ${chalk.magenta(plugin.name)}`)

  if (plugin.multiple !== true) {
    // remove duplicated plugin
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === plugin.name
    )
    if (duplicateIndex !== -1) {
      app.pluginApi.plugins.splice(duplicateIndex, 1)
    }
  }

  // use plugin
  app.pluginApi.plugins.push(plugin)

  // TODO: nested plugins with `multiple` may cause potential problems

  // if the plugin uses other plugins
  if (plugin.plugins) {
    plugin.plugins.forEach(app.useByConfig)
  }
}

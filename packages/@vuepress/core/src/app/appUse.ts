import { chalk, debug, warn } from '@vuepress/utils'
import type { App, Plugin, PluginOptions } from '../types'
import { normalizePlugin } from './normalizePlugin'

const log = debug('vuepress:core/app')

export const appUse = <T extends PluginOptions>(
  app: App,
  rawPlugin: Plugin<T> | string,
  config?: Partial<T>
): void => {
  // normalize plugin
  const plugin = normalizePlugin(app, rawPlugin, config)

  log(`use plugin ${chalk.magenta(plugin.name)}`)

  if (plugin.multiple !== true) {
    // remove duplicated plugin
    const duplicateIndex = app.pluginApi.plugins.findIndex(
      ({ name }) => name === plugin.name
    )
    if (duplicateIndex !== -1) {
      app.pluginApi.plugins.splice(duplicateIndex, 1)

      // show warning when duplicate plugins are detected
      warn(
        `plugin ${chalk.magenta(
          plugin.name
        )} has been used multiple times, only the last one will take effect`
      )
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

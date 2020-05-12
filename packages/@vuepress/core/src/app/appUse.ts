import { logger, chalk } from '@vuepress/shared-utils'
import { App } from './createApp'
import { normalizePlugin } from './normalizePlugin'
import { Plugin } from './types'

export const appUse = <T extends object>(
  app: App,
  rawPlugin: Plugin<T> | string,
  config?: T
): void => {
  // normalize plugin
  const plugin = normalizePlugin(app, rawPlugin, config)

  // TODO: migrate logger
  // print log
  if (plugin.name.startsWith('@vuepress/internal')) {
    logger.debug(`Use plugin ${chalk.magenta(plugin.name)}`)
  } else {
    logger.info(`Use plugin ${chalk.magenta(plugin.name)}`)
  }

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
  app.pluginApi.use(plugin)

  // TODO: nested plugins with `multiple` may cause potential problems

  // if the plugin uses other plugins
  if (plugin.plugins) {
    plugin.plugins.forEach(app.useByConfig)
  }
}

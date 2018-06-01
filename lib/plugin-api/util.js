const logger = require('../util/logger')
const chalk = require('chalk')

exports.resolvePlugin = function (pluginName) {
  if (typeof pluginName === 'function' || typeof pluginName === 'object') {
    return pluginName
  }
  if (typeof pluginName === 'string') {
    try {
      return require(pluginName.startsWith('vuepress-plugin-')
        ? pluginName
        : `vuepress-plugin-${pluginName}`
      )
    } catch (err) {
      console.error(chalk.red(logger.error(`\n[vuepress] Cannot resolve plugin: ${pluginName}\n`, false)))
      throw new Error(err)
    }
  }
  logger.warn(`\n[vuepress] Invalid plugin usage: ${chalk.yellow(pluginName)}\n`)
}

exports.inferPluginName = function (pluginName, pluginConfig) {
  if (pluginConfig.name) {
    return pluginConfig.name
  }
  if (typeof pluginName === 'string') {
    if (pluginName.startsWith('vuepress-plugin-')) {
      return pluginName.slice(16)
    }
    return pluginName
  }
  // ensure each plugin have a unique name.
  return Date.now().toString(16)
}

const { assertTypes } = require('./datatypes')
const logger = require('./logger')
const chalk = require('chalk')

module.exports = function normalizeConfig (pluginsConfig) {
  const { valid, warnMsg } = assertTypes(pluginsConfig, [Object, Array])
  if (!valid) {
    if (pluginsConfig !== undefined) {
      logger.warn(
        `[${chalk.gray('config')}] `
          + `Invalid value for "plugin" field : ${warnMsg}`
      )
    }
    pluginsConfig = []
    return pluginsConfig
  }

  if (Array.isArray(pluginsConfig)) {
    pluginsConfig = pluginsConfig.map(item => {
      return Array.isArray(item) ? item : [item]
    })
  } else if (typeof pluginsConfig === 'object') {
    pluginsConfig = Object.keys(pluginsConfig).map(item => {
      return [item, pluginsConfig[item]]
    })
  }
  return pluginsConfig
}

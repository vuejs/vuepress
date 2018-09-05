const { logger, chalk, datatypes: { assertTypes }} = require('@vuepress/shared-utils')

/**
 * Hydrates your plugin config, options and context.
 * @param {Function | Object} module
 * @param {String} name
 * @param {String} hortcut
 * @param {Object} pluginOptions
 * @param {Object} pluginContext
 */
exports.hydratePlugin = function ({ module: config, name, shortcut, isLocal }, pluginOptions, pluginContext, self) {
  const { valid, warnMsg } = assertTypes(pluginOptions, [Object, Boolean])
  if (!valid) {
    if (pluginOptions !== undefined) {
      logger.warn(
        `[${chalk.gray(shortcut)}] ` +
        `Invalid value for "pluginOptions" ${chalk.cyan(name)}: ${warnMsg}`
      )
    }
    pluginOptions = {}
  }
  let enabled = true
  if (typeof pluginOptions === 'boolean') {
    enabled = pluginOptions
    pluginOptions = {}
  }
  if (typeof config === 'function') {
    // 'Object.create' here is to give each plugin a separate context,
    // but also own the inheritance context.
    config = config(pluginOptions, Object.create(pluginContext), self)
  }
  // respect name in local plugin config
  name = isLocal && config.name || name
  return Object.assign({}, config, {
    name,
    shortcut: isLocal ? null : shortcut,
    enabled,
    $$options: pluginOptions /* used for test */
  })
}

/**
 * Normalize plugins config in `.vuepress/config.js`
 * @param pluginsConfig
 */
exports.normalizePluginsConfig = function (pluginsConfig) {
  const { valid, warnMsg } = assertTypes(pluginsConfig, [Object, Array])
  if (!valid) {
    if (pluginsConfig !== undefined) {
      logger.warn(
        `[${chalk.gray('config')}] ` +
        `Invalid value for "plugin" field : ${warnMsg}`
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

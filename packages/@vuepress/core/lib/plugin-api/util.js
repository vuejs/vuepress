'use strict'

/**
 * Module dependencies.
 */

const { logger, chalk, datatypes: { assertTypes }} = require('@vuepress/shared-utils')

/**
 * flatten your plugin config by passing in name, options and context.
 *
 * @param {function|object} module
 * @param {string} name
 * @param {string} hortcut
 * @param {object} pluginOptions
 * @param {object} pluginContext
 */

exports.flattenPlugin = function (
  { entry: config, name, shortcut, fromDep },
  pluginOptions,
  pluginContext,
  self
) {
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
  if (!fromDep && config.name) {
    name = config.name
  }

  return Object.assign({}, config, {
    name,
    shortcut: fromDep ? shortcut : null,
    enabled,
    $$options: pluginOptions /* used for test */
  })
}

/**
 * Normalize plugins config in `.vuepress/config.js`
 *
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

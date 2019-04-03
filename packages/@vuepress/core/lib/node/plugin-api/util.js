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
  const { valid, warnMsg } = assertTypes(pluginOptions, [Object, Array, Boolean])
  if (!valid) {
    if (pluginOptions !== undefined) {
      logger.warn(
        `[${chalk.gray(shortcut)}] `
        + `Invalid value for "pluginOptions" ${chalk.cyan(name)}: ${warnMsg}`
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
    const { valid, warnMsg } = assertTypes(config, [Object])
    if (!valid) {
      logger.warn(
        `[${chalk.gray(shortcut)}] `
        + `Invalid value for plugin: ${warnMsg}`
      )
      config = {}
    }
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

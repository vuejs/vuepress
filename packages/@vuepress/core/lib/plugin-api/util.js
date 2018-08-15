const chalk = require('chalk')
const { isDebug } = require('../util/logger')
const logger = require('../util/logger')
const { assertTypes } = require('../util/shared')

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/
let anonymousPluginIdx = 0

exports.resolveScopePackage = function (name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    }
  }
  return null
}

/**
 * Resolve plugin config, name, and shortcut.
 * @param pluginRaw
 * @returns {{config: Function|Object, name: string, shortcut: string}}
 */
exports.resolvePlugin = function (pluginRaw) {
  let name
  let config
  let shortcut
  if (typeof pluginRaw === 'function' || typeof pluginRaw === 'object') {
    config = pluginRaw
    name = shortcut = pluginRaw.name || `anonymous-${++anonymousPluginIdx}`
  } else if (typeof pluginRaw === 'string') {
    try {
      shortcut = pluginRaw.startsWith('vuepress-plugin-') ? pluginRaw.slice(16) : pluginRaw
      name = `vuepress-plugin-${shortcut}`
      config = require(name)
    } catch (err) {
      const pkg = exports.resolveScopePackage(pluginRaw)
      try {
        if (pkg) {
          if (pkg.org === 'vuepress') {
            shortcut = pkg.name.startsWith('plugin-') ? pkg.name.slice(7) : pkg.name
            name = `@vuepress/plugin-${shortcut}`
          } else {
            shortcut = pkg.name.startsWith('vuepress-plugin-') ? pkg.name.slice(16) : pkg.name
            name = `@${pkg.org}/vuepress-plugin-${shortcut}`
          }
          shortcut = `@${pkg.org}/${shortcut}`
          config = require(name)
        } else {
          throw new Error(`[vuepress] Invalid plugin usage ${pluginRaw}.`)
        }
      } catch (err2) {
        if (isDebug) {
          console.error(err2)
        }
        name = shortcut = pluginRaw
        config = null
      }
    }
  }
  return { config, name, shortcut }
}

/**
 * Hydrates your plugin config, options and context.
 * @param {Function | Object} config
 * @param {String} name
 * @param {String} hortcut
 * @param {Object} pluginOptions
 * @param {Object} pluginContext
 */
exports.hydratePlugin = function ({ config, name, shortcut }, pluginOptions, pluginContext) {
  const { valid, warnMsg } = assertTypes(pluginOptions, [Object, Boolean])
  if (!valid) {
    logger.warn(
      `[${chalk.gray(shortcut)}] ` +
      `Invalid value for "pluginOptions" ${chalk.cyan(name)}: ${warnMsg}`
    )
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
    config = config(pluginOptions, Object.create(pluginContext))
  }
  return Object.assign(config, { name, shortcut, enabled })
}

/**
 * Normalize plugins config in `.vuepress/config.js`
 * @param pluginsConfig
 */
exports.normalizePluginsConfig = function (pluginsConfig) {
  const { valid, warnMsg } = assertTypes(pluginsConfig, [Object, Array])
  if (!valid) {
    logger.warn(
      `[${chalk.gray('config')}] ` +
      `Invalid value for "plugin" value ${chalk.cyan(name)}: ${warnMsg}`
    )
    pluginsConfig = []
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

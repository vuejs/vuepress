const logger = require('../util/logger')
const chalk = require('chalk')

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/

exports.resolveScopePackage = function (name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    }
  }
  return null
}

exports.resolvePlugin = function (pluginRaw) {
  if (typeof pluginRaw === 'function' || typeof pluginRaw === 'object') {
    return pluginRaw
  }
  if (typeof pluginRaw === 'string') {
    try {
      return require(pluginRaw.startsWith('vuepress-plugin-') ? pluginRaw : `vuepress-plugin-${pluginRaw}`)
    } catch (err) {
      const pkg = exports.resolveScopePackage(pluginRaw)
      try {
        if (pkg) {
          if (pkg.org === 'vuepress') {
            return require(pkg.name.startsWith('plugin-') ? pluginRaw : `@vuepress/plugin-${pkg.name}`)
          } else {
            return require(pkg.name.startsWith('vuepress-plugin-') ? pluginRaw : `@${pkg.org}/vuepress-plugin-${pkg.name}`)
          }
        } else {
          throw new Error(`[vuepress] Cannot resolve ${pluginRaw}.`)
        }
      } catch (err2) {
        console.error(chalk.red(logger.error(`\n[vuepress] Cannot resolve plugin: ${pluginRaw}\n`, false)))
        throw new Error(err2)
      }
    }
  }
  logger.warn(`\n[vuepress] Invalid plugin usage: ${chalk.yellow(pluginRaw)}\n`)
}

exports.inferPluginName = function (pluginRaw, pluginConfig) {
  if (pluginConfig.name) {
    return pluginConfig.name
  }
  if (typeof pluginRaw === 'string') {
    if (pluginRaw.startsWith('vuepress-plugin-')) {
      return pluginRaw.slice(16)
    }
    return pluginRaw
  }
  // ensure each plugin have a unique name.
  return Date.now().toString(16)
}

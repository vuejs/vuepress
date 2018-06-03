const logger = require('../util/logger')
const chalk = require('chalk')

exports.resolvePlugin = function (pluginRaw) {
  if (typeof pluginRaw === 'function' || typeof pluginRaw === 'object') {
    return pluginRaw
  }
  if (typeof pluginRaw === 'string') {
    try {
      return require(pluginRaw.startsWith('vuepress-plugin-')
        ? pluginRaw
        : `vuepress-plugin-${pluginRaw}`
      )
    } catch (err) {
      console.error(chalk.red(logger.error(`\n[vuepress] Cannot resolve plugin: ${pluginRaw}\n`, false)))
      throw new Error(err)
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

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

exports.toRawType = function (value) {
  return _toString.call(value).slice(8, -1)
}

exports.getType = function (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function toNaturalMultiTypesLanguage (types) {
  const len = types.length
  if (len === 1) {
    return types.join('')
  }
  const rest = types.slice(0, len - 1)
  const last = types[len - 1]
  return rest.join(', ') + ' or ' + last
}

exports.assertTypes = function (value, types) {
  let valid
  let warnMsg
  let actualType = exports.toRawType(value)
  const expectedTypes = []
  if (actualType === 'AsyncFunction') {
    actualType = 'Function'
  }

  for (const type of types) {
    const expectedType = exports.getType(type)
    expectedTypes.push(expectedType)
    valid = actualType === expectedType
    if (valid) break
  }

  if (!valid) {
    warnMsg =
      `expected a ${chalk.green(toNaturalMultiTypesLanguage(expectedTypes))} ` +
      `but got ${chalk.yellow(actualType)}.`
  }

  return {
    valid,
    warnMsg
  }
}

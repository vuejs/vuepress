const { isDebug } = require('./env')
const {
  isString,
  assertTypes
} = require('./datatypes')

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/

/**
 * Delightful pakcage shortcut resolving utility.
 * @param {steing} type 'plugin', 'theme', or others.
 * @param {string} org
 * @returns {function}
 */
function shortcutPackageResolver (
  type = 'plugin',
  org = 'vuepress',
  allowedTypes = [String]
) {
  let anonymousPluginIdx = 0
  const NON_SCOPE_PREFIX = `${org}-${type}-`
  const SCOPE_PREFIX = `@${org}/${type}-`
  const SHORT_PREFIX_SLICE_LENGTH = type.length + 1
  const FULL_PREFIX_SLICE_LENGTH = SHORT_PREFIX_SLICE_LENGTH + org.length + 1

  return function (req) {
    let _module
    let name
    let shortcut
    let isLocal = false

    const { valid, warnMsg } = assertTypes(req, allowedTypes)
    if (!valid) {
      throw new Error(`Invalid value for "${type}": ${warnMsg}`)
    }

    if (!isString(req)) {
      _module = req
      name = shortcut = req.name || `anonymous-${++anonymousPluginIdx}`
      isLocal = true
    } else {
      try {
        shortcut = req.startsWith(NON_SCOPE_PREFIX)
          ? req.slice(FULL_PREFIX_SLICE_LENGTH)
          : req
        name = `${NON_SCOPE_PREFIX}${shortcut}`
        _module = require(name)
      } catch (err) {
        const pkg = module.exports.resolveScopePackage(req)
        try {
          if (pkg) {
            // speicial handling for default org.
            if (pkg.org === org) {
              shortcut = pkg.name.startsWith(`${type}-`)
                ? pkg.name.slice(SHORT_PREFIX_SLICE_LENGTH)
                : pkg.name
              name = `${SCOPE_PREFIX}${shortcut}`
            } else {
              shortcut = pkg.name.startsWith(NON_SCOPE_PREFIX)
                ? pkg.name.slice(FULL_PREFIX_SLICE_LENGTH)
                : pkg.name
              name = `@${pkg.org}/${NON_SCOPE_PREFIX}${shortcut}`
            }
            shortcut = `@${pkg.org}/${shortcut}`
            _module = require(name)
          } else {
            throw new Error(`Invalid ${type} usage ${req}.`)
          }
        } catch (err2) {
          if (isDebug) {
            console.error(err2)
          }
          name = shortcut = req
          _module = null
        }
      }
    }

    return { module: _module, name, shortcut, isLocal }
  }
}

module.exports = shortcutPackageResolver
module.exports.resolveScopePackage = function resolveScopePackage (name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    }
  }
  return null
}
module.exports.resolvePlugin = shortcutPackageResolver(
  'plugin', 'vuepress', [String, Function, Object]
)
module.exports.resolveTheme = shortcutPackageResolver(
  'theme', 'vuepress', [String]
)

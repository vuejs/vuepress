'use strict'

/**
 * Module dependencies.
 */

const path = require('upath')
const chalk = require('chalk')
const { resolveModule, loadModule } = require('./module')
const tryChain = require('./tryChain')
const { fsExistsFallback } = require('./fallback')
const hash = require('hash-sum')
const {
  isString,
  isFunction,
  isObject,
  isNullOrUndefined,
  assertTypes
} = require('./datatypes')

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/

/**
 * Common module constructor.
 */

class CommonModule {
  constructor (entry, name, shortcut, fromDep) {
    this.entry = entry
    this.shortcut = shortcut
    this.name = name
    this.fromDep = fromDep
  }
}

/**
 * Expose ModuleResolver.
 */

class ModuleResolver {
  constructor (type, org, allowedTypes = [String], load = false, cwd) {
    this.type = type
    this.org = org
    this.allowedTypes = allowedTypes
    this.load = load
    this.cwd = cwd || process.cwd()
    this.nonScopePrefix = `${org}-${type}-`
    this.scopePrefix = `@${org}/${type}-`
    this.typePrefixLength = type.length + 1
    /* - */
    this.prefixSlicePosition = this.typePrefixLength + org.length + 1
    /* @ */
  }

  /**
   * Resolve package.
   *
   * @param {any} req
   * @param {string} cwd
   * @api public
   */

  resolve (req, cwd) {
    if (cwd) {
      this.setCwd(cwd)
    }

    const { valid, warnMsg } = assertTypes(req, this.allowedTypes)
    if (!valid) {
      throw new Error(`Invalid value for "${chalk.cyan(this.type)}": ${warnMsg}`)
    }

    const isStringRequest = isString(req)
    const isAbsolutePath = isStringRequest && path.isAbsolute(req)

    const resolved = tryChain([
      [this.resolveNonStringPackage.bind(this), !isStringRequest],
      [this.resolveAbsolutePathPackage.bind(this), isStringRequest && isAbsolutePath],
      [this.resolveRelativePathPackage.bind(this), isStringRequest && !isAbsolutePath],
      [this.resolveDepPackage.bind(this), isStringRequest]
    ], req)

    if (!resolved) {
      return new CommonModule(null, null, null, null /* fromDep */)
    }

    return resolved
  }

  /**
   * Set current working directory.
   * @param cwd
   * @returns {module.ModuleResolver}
   * @api public
   */

  setCwd (cwd) {
    this.cwd = cwd
    return this
  }

  /**
   * Resolve non-string package, return directly.
   *
   * @param {object|function} req
   * @param {string} type
   * @returns {CommonModule}
   * @api private
   */

  resolveNonStringPackage (req) {
    const { shortcut, name } = this.normalizeRequest(req)
    return new CommonModule(req, name, shortcut, false /* fromDep */)
  }

  /**
   * Resolve module with absolute path.
   *
   * @param {string} req
   * @returns {CommonModule}
   * @api private
   */

  resolveAbsolutePathPackage (req) {
    const normalized = fsExistsFallback([
      req,
      req + '.js',
      path.resolve(req, 'index.js')
    ])

    if (!normalized) {
      throw new Error(`${req} Not Found.`)
    }

    const dirname = path.parse(normalized).name
    const { shortcut, name } = this.normalizeRequest(dirname)
    const module = this.load ? require(normalized) : normalized
    return new CommonModule(module, name, shortcut, false /* fromDep */)
  }

  /**
   * Resolve module with absolute path.
   *
   * @param {string} req
   * @returns {CommonModule}
   * @api private
   */

  resolveRelativePathPackage (req) {
    req = path.resolve(process.cwd(), req)
    return this.resolveAbsolutePathPackage(req)
  }

  /**
   * Resolve module from dependency.
   *
   * @param {string} req
   * @returns {CommonModule}
   * @api private
   */

  resolveDepPackage (req) {
    const { shortcut, name } = this.normalizeRequest(req)
    const entry = this.load
      ? loadModule(name, this.cwd)
      : resolveModule(name, this.cwd)
    return new CommonModule(entry, name, shortcut, true /* fromDep */)
  }

  /**
   * Get shortcut.
   *
   * @param {string} req
   * @returns {string}
   * @api private
   */

  getShortcut (req) {
    return req.startsWith(this.nonScopePrefix)
      ? req.slice(this.prefixSlicePosition)
      : req
  }

  /**
   * Normalize string request name.
   *
   * @param {string} req
   * @returns {object}
   * @api private
   */

  normalizeName (req) {
    let name
    let shortcut
    if (req.startsWith('@')) {
      const pkg = resolveScopePackage(req)
      if (pkg) {
        // speicial handling for default org.
        if (pkg.org === this.org) {
          shortcut = pkg.name.startsWith(`${this.type}-`)
            ? pkg.name.slice(this.typePrefixLength)
            : pkg.name
          name = `${this.scopePrefix}${shortcut}`
        } else {
          shortcut = this.getShortcut(pkg.name)
          name = `@${pkg.org}/${this.nonScopePrefix}${shortcut}`
        }
        shortcut = `@${pkg.org}/${shortcut}`
      }
    } else {
      shortcut = this.getShortcut(req)
      name = `${this.nonScopePrefix}${shortcut}`
    }

    return { name, shortcut }
  }

  /**
   * Normalize any request.
   *
   * @param {any} req
   * @returns {object}
   * @api private
   */

  normalizeRequest (req) {
    if (isString(req)) {
      return this.normalizeName(req)
    }

    if (isNullOrUndefined(req)) {
      return {
        name: null,
        shortcut: null
      }
    }

    if (isObject(req) || isFunction(req)) {
      if (isString(req.name)) {
        return this.normalizeName(req.name)
      } else {
        const shortcut = `anonymous-${hash(req)}`
        const name = `${this.nonScopePrefix}${shortcut}`
        return { name, shortcut }
      }
    }
  }
}

/**
 * Parse info of scope package.
 */

function resolveScopePackage (name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    }
  }
  return null
}

module.exports = ModuleResolver
module.exports.resolveScopePackage = resolveScopePackage

module.exports.getPluginResolver = (cwd) => new ModuleResolver(
  'plugin', 'vuepress', [String, Function, Object], true /* load module */, cwd
)

module.exports.getThemeResolver = (cwd) => new ModuleResolver(
  'theme', 'vuepress', [String], false /* load module */, cwd
)

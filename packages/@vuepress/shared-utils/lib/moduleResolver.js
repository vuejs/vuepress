const path = require('upath')
const chalk = require('chalk')
const { resolveModule, loadModule } = require('./moduleLoader')
const tryChain = require('./tryChain')
const { fsExistsFallback } = require('./fallback')
const hash = require('hash-sum')
const { isString, isFunction, isObject, assertTypes } = require('./datatypes')

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

class ModuleResolver {
  constructor (type, org, allowedTypes = [], load = false, cwd) {
    this.type = type
    this.org = org
    this.allowedTypes = allowedTypes
    this.load = load
    this.cwd = cwd || process.cwd()
    if (org) {
      this.nonScopePrefix = `${org}-${type}-`
      this.scopePrefix = `@${org}/${type}-`
    } else {
      this.nonScopePrefix = `${type}-`
    }
    this.typePrefixLength = type.length + 1
    /* - */
    this.prefixSlicePosition = this.typePrefixLength + org.length + 1
    /* @ */
  }

  /**
   * Resolve package.
   */

  resolve (req, cwd) {
    if (cwd) {
      this.setCwd(cwd)
    }

    const { valid, warnMsg } = assertTypes(req, this.allowedTypes)
    if (!valid) {
      throw new Error(
        `Invalid value for "${chalk.cyan(this.type)}": ${warnMsg}`
      )
    }

    const isStringRequest = isString(req)
    const isAbsolutePath = isStringRequest && path.isAbsolute(req)

    const resolved = tryChain(
      [
        [this.resolveNonStringPackage.bind(this), !isStringRequest],
        [
          this.resolveAbsolutePathPackage.bind(this),
          isStringRequest && isAbsolutePath
        ],
        [
          this.resolveRelativePathPackage.bind(this),
          isStringRequest && !isAbsolutePath
        ],
        [this.resolveDepPackage.bind(this), isStringRequest]
      ],
      req
    )

    if (!resolved) {
      return new CommonModule(null, null, null, null /* fromDep */)
    }

    return resolved
  }

  /**
   * Set current working directory.
   */

  setCwd (cwd) {
    this.cwd = cwd
    return this
  }

  /**
   * Resolve non-string package, return directly.
   */

  resolveNonStringPackage (req) {
    const { shortcut, name } = this.normalizeRequest(req)
    return new CommonModule(req, name, shortcut, false /* fromDep */)
  }

  /**
   * Resolve module with absolute path.
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
   */

  resolveRelativePathPackage (req) {
    req = path.resolve(process.cwd(), req)
    return this.resolveAbsolutePathPackage(req)
  }

  /**
   * Resolve module from dependency.
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
   */

  getShortcut (req) {
    return req.startsWith(this.nonScopePrefix)
      ? req.slice(this.prefixSlicePosition)
      : req
  }

  /**
   * Normalize string request name.
   */

  normalizeName (req) {
    let name
    let shortcut

    if (req.startsWith('@')) {
      const pkg = resolveScopePackage(req)
      if (pkg) {
        // speicial handling for default org.
        if (this.org && pkg.org === this.org) {
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

    // @ts-ignore
    return { name, shortcut }
  }

  /**
   * Normalize any request.
   */

  normalizeRequest (req) {
    if (isString(req)) {
      return this.normalizeName(req)
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

    return {
      name: null,
      shortcut: null
    }
  }
}

function resolveScopePackage (name) {
  if (SCOPE_PACKAGE_RE.test(name)) {
    return {
      org: RegExp.$1,
      name: RegExp.$2
    }
  }
  return {
    org: '',
    name: ''
  }
}

const getMarkdownItResolver = cwd =>
  new ModuleResolver(
    'markdown-it',
    '',
    [String, Function],
    true /* load module */,
    cwd
  )

const getPluginResolver = cwd =>
  new ModuleResolver(
    'plugin',
    'vuepress',
    [String, Function, Object],
    true /* load module */,
    cwd
  )

const getThemeResolver = cwd =>
  new ModuleResolver(
    'theme',
    'vuepress',
    [String],
    false /* load module */,
    cwd
  )

module.exports = {
  getThemeResolver,
  getPluginResolver,
  getMarkdownItResolver,
  resolveScopePackage,
  CommonModule
}

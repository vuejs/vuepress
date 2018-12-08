'use strict'

/**
 * Module dependencies.
 */

import path from 'upath'
import chalk from 'chalk'
import { resolveModule, loadModule } from './moduleLoader'
import tryChain from './tryChain'
import { fsExistsFallback } from './fallback'
import hash from 'hash-sum'
import {
  isString,
  isFunction,
  isObject,
  assertTypes
} from './datatypes'

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/

/**
 * Common module constructor.
 */

export class CommonModule {
  name: string | null
  entry: string | null
  shortcut: string | null
  fromDep: boolean | null

  constructor (
    entry: string | null,
    name: string | null,
    shortcut: string | null,
    fromDep: boolean | null,
  ) {
    this.entry = entry
    this.shortcut = shortcut
    this.name = name
    this.fromDep = fromDep
  }
}

export interface NormalizedModuleRequest {
  name: string | null
  shortcut: string | null
}

/**
 * Expose ModuleResolver.
 */

type Type = String | Number | Boolean | RegExp | Function | Object | Record<string, any> | Array<any>

class ModuleResolver {
  private type: string
  private org: string
  private allowedTypes: Type[]
  private load: boolean
  private cwd: string
  private nonScopePrefix: string
  private scopePrefix: string
  private typePrefixLength: number
  private prefixSlicePosition: number

  constructor (
    type: string,
    org: string,
    allowedTypes: Type[] = [String],
    load = false,
    cwd: string
  ) {
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
   */

  public resolve (req: string, cwd: string): CommonModule | never {
    if (cwd) {
      this.setCwd(cwd)
    }

    const { valid, warnMsg } = assertTypes(req, this.allowedTypes)
    if (!valid) {
      throw new Error(`Invalid value for "${chalk.cyan(this.type)}": ${warnMsg}`)
    }

    const isStringRequest = isString(req)
    const isAbsolutePath = isStringRequest && path.isAbsolute(req)

    const resolved = tryChain<string, CommonModule>([
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
   */

  private setCwd (cwd: string) {
    this.cwd = cwd
    return this
  }

  /**
   * Resolve non-string package, return directly.
   */

  private resolveNonStringPackage (req: string) {
    const { shortcut, name } = <NormalizedModuleRequest>this.normalizeRequest(req)
    return new CommonModule(req, name, shortcut, false /* fromDep */)
  }

  /**
   * Resolve module with absolute path.
   */

  resolveAbsolutePathPackage (req: string) {
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

  private resolveRelativePathPackage (req: string) {
    req = path.resolve(process.cwd(), req)
    return this.resolveAbsolutePathPackage(req)
  }

  /**
   * Resolve module from dependency.
   */

  private resolveDepPackage (req: string) {
    const { shortcut, name } = this.normalizeRequest(req)
    const entry = this.load
      ? loadModule(<string>name, this.cwd)
      : resolveModule(<string>name, this.cwd)
    return new CommonModule(entry, name, shortcut, true /* fromDep */)
  }

  /**
   * Get shortcut.
   */

  private getShortcut (req: string) {
    return req.startsWith(this.nonScopePrefix)
      ? req.slice(this.prefixSlicePosition)
      : req
  }

  /**
   * Normalize string request name.
   */

  normalizeName (req: string): NormalizedModuleRequest {
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

    // @ts-ignore
    return { name, shortcut }
  }

  /**
   * Normalize any request.
   */

  public normalizeRequest (req: any): NormalizedModuleRequest {
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

/**
 * Parse info of scope package.
 */

export interface ScopePackage {
  org: string;
  name: string;
}

export function resolveScopePackage (name: string) {
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

export const getPluginResolver = (cwd: string): ModuleResolver => new ModuleResolver(
  'plugin', 'vuepress', [String, Function, Object], true /* load module */, cwd
)

export const getThemeResolver = (cwd: string): ModuleResolver => new ModuleResolver(
  'theme', 'vuepress', [String], false /* load module */, cwd
)

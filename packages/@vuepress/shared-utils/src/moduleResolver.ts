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

/**
 * Parse info of scope package.
 */

const SCOPE_PACKAGE_RE = /^@(.*)\/(.*)/

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

/**
 * Common module constructor.
 */

export class CommonModule {
  constructor (
    public entry: string | null,
    public name: string | null,
    public shortcut: string | null,
    public fromDep: boolean | null,
    public error?: Error
  ) {}
}

function getNoopModule (error?: Error) {
  return new CommonModule(null, null, null, null, error)
}

export interface NormalizedModuleRequest {
  name: string | null;
  shortcut: string | null;
}

/**
 * Expose ModuleResolver.
 */

type Type = string | number | boolean | RegExp | Function | Record<string, any> | Record<string, any> | Array<any>

class ModuleResolver {
  private nonScopePrefix: string
  private scopePrefix: string
  private typePrefixLength: number
  private prefixSlicePosition: number

  constructor (
    private type: string,
    private org: string,
    private allowedTypes: Type[],
    private load = false,
    private cwd: string
  ) {
    this.type = type
    this.org = org
    this.allowedTypes = allowedTypes
    this.load = load
    this.cwd = cwd || process.cwd()
    this.typePrefixLength = type.length + 1
    if (org) {
      this.nonScopePrefix = `${org}-${type}-`
      this.scopePrefix = `@${org}/${type}-`
      this.prefixSlicePosition = this.typePrefixLength + org.length + 1
    } else {
      this.nonScopePrefix = `${type}-`
      this.prefixSlicePosition = this.typePrefixLength
    }
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

    const resolved = tryChain<string, CommonModule>([
      [this.resolveNonStringPackage.bind(this), !isStringRequest],
      [this.resolvePathPackage.bind(this), isStringRequest],
      [this.resolveDepPackage.bind(this), isStringRequest]
    ], req)

    if (!resolved) {
      return getNoopModule()
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

  private resolveNonStringPackage (req: any) {
    const { shortcut, name } = this.normalizeRequest(req)
    return new CommonModule(req, name, shortcut, false /* fromDep */)
  }

  /**
   * Resolve module with absolute/relative path.
   */

  resolvePathPackage (req: string) {
    if (!path.isAbsolute(req)) {
      req = path.resolve(this.cwd, req)
    }

    const normalized = fsExistsFallback([
      req,
      req + '.js',
      path.resolve(req, 'index.js')
    ])

    if (!normalized) {
      throw new Error(`${req} Not Found.`)
    }

    const dirname = path.parse(normalized).name
    const { shortcut, name } = this.normalizeName(dirname)
    try {
      const module = this.load ? require(normalized) : normalized
      return new CommonModule(module, name, shortcut, false /* fromDep */)
    } catch (error) {
      return getNoopModule(error)
    }
  }

  /**
   * Resolve module from dependency.
   */

  private resolveDepPackage (req: string) {
    const { shortcut, name } = this.normalizeName(req)
    try {
      const entry = this.load
        ? loadModule(name as string, this.cwd)
        : resolveModule(name as string, this.cwd)
      return new CommonModule(entry, name, shortcut, true /* fromDep */)
    } catch (error) {
      return getNoopModule(error)
    }
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
    let name: string | null = null
    let shortcut: string | null = null

    if (req.startsWith('@')) {
      const pkg = resolveScopePackage(req)
      // special handling for default org.
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
    } else {
      shortcut = this.getShortcut(req)
      name = `${this.nonScopePrefix}${shortcut}`
    }

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

export const getMarkdownItResolver = (cwd: string) => new ModuleResolver(
  'markdown-it', '', [String, Function], true /* load module */, cwd
)

export const getPluginResolver = (cwd: string): ModuleResolver => new ModuleResolver(
  'plugin', 'vuepress', [String, Function, Object], true /* load module */, cwd
)

export const getThemeResolver = (cwd: string): ModuleResolver => new ModuleResolver(
  'theme', 'vuepress', [String], false /* load module */, cwd
)

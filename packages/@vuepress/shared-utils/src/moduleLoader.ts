// Modified from https://github.com/vuejs/vue-cli/blob/dev/packages/@0vue/cli-shared-utils/lib/module.js

import semver from 'semver'
import env from './env'

function resolveFallback (request: string, options: { paths: string[] }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Module = require('module')
  const isMain = false
  const fakeParent = new Module('', null)

  const paths: string[] = []

  for (let i = 0; i < options.paths.length; i++) {
    const path = (options.paths)[i]
    fakeParent.paths = Module._nodeModulePaths(path)
    const lookupPaths = Module._resolveLookupPaths(request, fakeParent, true)

    if (!paths.includes(path)) paths.push(path)

    for (let j = 0; j < lookupPaths.length; j++) {
      if (!paths.includes(lookupPaths[j])) paths.push(lookupPaths[j])
    }
  }

  const filename = Module._findPath(request, paths, isMain)
  if (!filename) {
    const err: Error & { code?: string } = new Error(`Cannot find module '${request}'`)
    err.code = 'MODULE_NOT_FOUND'
    throw err
  }
  return filename
}

function clearRequireCache (id: string, map = new Map()) {
  const module = require.cache[id]
  if (module) {
    map.set(id, true)
    // Clear children modules
    module.children.forEach((child: any) => {
      if (!map.get(child.id)) clearRequireCache(child.id, map)
    })
    delete require.cache[id]
  }
}

const resolve = semver.satisfies(process.version, '>=10.0.0')
  ? require.resolve
  : resolveFallback

export function resolveModule (request: string, context: string): string {
  if (env.isTest) {
    return require.resolve(request)
  }

  // module.paths is for globally install packages.
  const paths = [context || process.cwd(), ...module.paths]
  const resolvedPath = resolve(request, { paths })

  return resolvedPath
}

export function loadModule (request: string, context: string, force = false) {
  const resolvedPath = resolveModule(request, context)
  if (resolvedPath) {
    if (force) {
      clearRequireCache(resolvedPath)
    }
    return require(resolvedPath)
  }
}

export function clearModule (request: string, context: string) {
  const resolvedPath = resolveModule(request, context)
  if (resolvedPath) {
    clearRequireCache(resolvedPath)
  }
}

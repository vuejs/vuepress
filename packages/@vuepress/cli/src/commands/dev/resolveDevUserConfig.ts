import { loadUserConfig } from '../../config'
import type { UserConfig } from '../../config'

/**
 * Resolve dependencies of a file if the file has been required
 * as a Node.js Module
 */
const resolveDeps = (
  filename: string,
  deps: Set<string> = new Set(),
  seen: Set<string> = new Set()
): Set<string> => {
  // check if the file has been required as a module
  const mod = require.cache[filename]
  if (!mod) return deps

  // check if the file has been seen
  if (seen.has(filename)) return deps
  seen.add(filename)

  // recursively resolve deps
  mod.children.forEach(({ id }) => {
    // exclude external modules
    if (!id.includes('node_modules')) {
      deps.add(id)
      resolveDeps(id, deps, seen)
    }
  })

  return deps
}

/**
 * Load user config file and resolve its dependencies
 */
export const resolveDevUserConfig = async (
  userConfigPath?: string
): Promise<{
  userConfig: UserConfig
  userConfigDeps: string[]
}> => {
  if (!userConfigPath) {
    return {
      userConfig: {},
      userConfigDeps: [],
    }
  }

  // clear cache to ensure user config could be reloaded correctly on changed
  resolveDeps(userConfigPath).forEach((item) => {
    delete require.cache[item]
  })
  delete require.cache[userConfigPath]

  const userConfig = await loadUserConfig(userConfigPath)
  const userConfigDeps = Array.from(resolveDeps(userConfigPath))

  return {
    userConfig,
    userConfigDeps,
  }
}

import { moduleResolver } from '@vuepress/shared-utils'
import { Plugin } from './types'

// TODO: migrate module resolver
const cwd = process.cwd()
const resolver = moduleResolver.getPluginResolver(cwd)

/**
 * Resolve a plugin according to the name string
 */
export const resolvePluginByName = (pluginName: string): Plugin | null => {
  // TODO: for current plugin resolver, the `entry` is the module
  const result = resolver.resolve(pluginName, cwd)

  if (!result.entry) {
    return null
  }

  // TODO: plugin name
  return (result.entry as unknown) as Plugin
}

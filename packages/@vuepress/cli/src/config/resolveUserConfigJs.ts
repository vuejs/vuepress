import type { UserConfig } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

/**
 * Resolve .vuepress/config.js from source directory
 */
export const resolveUserConfigJs = async (
  source: string
): Promise<UserConfig | null> => {
  const configJs = path.resolve(source, '.vuepress', 'config.js')
  if (await fs.pathExists(configJs)) {
    delete require.cache[configJs]
    return require(configJs)
  }
  return null
}

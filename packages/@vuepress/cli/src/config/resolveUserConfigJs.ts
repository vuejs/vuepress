import type { UserConfig } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

export const userConfigJsPath = '.vuepress/config.js'

/**
 * Resolve .vuepress/config.js from source directory
 */
export const resolveUserConfigJs = async (
  source: string
): Promise<UserConfig | null> => {
  const configJs = path.resolve(source, userConfigJsPath)
  if (await fs.pathExists(configJs)) {
    delete require.cache[configJs]
    return require(configJs)
  }
  return null
}

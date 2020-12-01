import { fs, path } from '@vuepress/utils'

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
  config: string,
  cwd = process.cwd()
): string => {
  const configPath = path.resolve(cwd, config)

  if (!fs.pathExistsSync(configPath)) {
    throw new Error(`The config file '${config}' does not exist`)
  }

  return configPath
}

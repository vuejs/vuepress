import { chalk, fs, logger, path } from '@vuepress/utils'

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
  config: string,
  cwd = process.cwd()
): string => {
  const configPath = path.resolve(cwd, config)

  if (!fs.pathExistsSync(configPath)) {
    throw logger.createError(
      `config file does not exist: ${chalk.magenta(config)}`
    )
  }

  return configPath
}

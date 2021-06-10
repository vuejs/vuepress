import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import { chalk, logger } from '@vuepress/utils'

export const watchUserConfigFile = ({
  userConfigPath,
  userConfigDeps,
  restart,
}: {
  userConfigPath: string
  userConfigDeps: string[]
  restart: () => Promise<void>
}): FSWatcher[] => {
  const cwd = process.cwd()

  const configWatcher = chokidar.watch(userConfigPath, {
    cwd,
    ignoreInitial: true,
  })
  configWatcher.on('change', (configFile) => {
    logger.info(`config ${chalk.magenta(configFile)} is modified`)
    restart()
  })

  const depsWatcher = chokidar.watch(userConfigDeps, {
    cwd,
    ignoreInitial: true,
  })
  depsWatcher.on('change', (depFile) => {
    logger.info(`config dependency ${chalk.magenta(depFile)} is modified`)
    restart()
  })

  return [configWatcher, depsWatcher]
}

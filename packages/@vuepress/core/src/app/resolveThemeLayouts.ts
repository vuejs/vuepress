import { isPlainObject } from '@vuepress/shared'
import { chalk, fs, path, logger } from '@vuepress/utils'
import type { ThemeObject } from '../types'

export const resolveThemeLayouts = (
  layouts: ThemeObject['layouts']
): Record<string, string> => {
  if (!layouts) {
    return {}
  }

  // use the layouts component map directly
  if (isPlainObject(layouts)) {
    return layouts
  }

  // resolve the layouts directory
  if (!fs.pathExistsSync(layouts)) {
    throw logger.createError(
      `layouts directory does not exist: ${chalk.magenta(layouts)}`
    )
  }

  // load all files in layouts directory, then take matched files
  // as theme layouts
  return Object.fromEntries(
    fs
      .readdirSync(layouts)
      .filter((file) => /\.(vue|ts|js)$/.test(file))
      .map((file) => [path.trimExt(file), path.resolve(layouts, file)])
  )
}

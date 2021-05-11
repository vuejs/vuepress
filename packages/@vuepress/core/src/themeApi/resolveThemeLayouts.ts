import { isPlainObject } from '@vuepress/shared'
import { chalk, fs, path, logger } from '@vuepress/utils'
import type { ThemeObject, ThemeLayout } from '../types'

export const resolveThemeLayouts = (
  layouts: ThemeObject['layouts']
): ThemeLayout[] => {
  if (!layouts) {
    return []
  }

  // use the layouts component map directly
  if (isPlainObject(layouts)) {
    return Object.entries(layouts).map(([name, file]) => ({
      name,
      path: file,
    }))
  }

  // resolve the layouts directory
  if (!fs.pathExistsSync(layouts)) {
    throw logger.createError(
      `layouts directory does not exist: ${chalk.magenta(layouts)}`
    )
  }

  // load all files in layouts directory, then take matched files
  // as theme layouts
  return fs
    .readdirSync(layouts)
    .filter((file) => /\.(vue|ts|js)$/.test(file))
    .map((file) => ({
      name: path.trimExt(file),
      path: path.resolve(layouts, file),
    }))
}

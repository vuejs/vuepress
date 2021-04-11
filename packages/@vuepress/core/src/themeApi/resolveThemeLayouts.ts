import { isPlainObject } from '@vuepress/shared'
import { chalk, fs, path, logger } from '@vuepress/utils'
import type { ThemeObject, ThemeLayout } from '../types'

export const resolveThemeLayouts = ({
  themePath,
  themePlugin,
}: {
  themePath: string
  themePlugin: ThemeObject
}): ThemeLayout[] => {
  if (!themePlugin.layouts) {
    return []
  }

  // use the layouts component map directly
  if (isPlainObject(themePlugin.layouts)) {
    return Object.entries(themePlugin.layouts).map(([name, file]) => ({
      name,
      path: file,
    }))
  }

  // resolve the layouts directory
  if (!fs.pathExistsSync(themePlugin.layouts)) {
    throw logger.createError(
      `layouts directory does not exist: ${chalk.magenta(themePlugin.layouts)}`
    )
  }

  // load all files in layouts directory
  const files = fs.readdirSync(themePlugin.layouts)

  // take matched files as theme layouts
  const layouts = files
    .filter((file) => /\.(vue|ts|js)$/.test(file))
    .map((file) => ({
      name: path.trimExt(file),
      path: path.resolve(themePlugin.layouts, file),
    }))

  return layouts
}

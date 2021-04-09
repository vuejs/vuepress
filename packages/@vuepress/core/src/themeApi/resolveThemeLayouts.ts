import { isPlainObject, isString } from '@vuepress/shared'
import { chalk, fs, path, logger } from '@vuepress/utils'
import type { ThemeObject, ThemeLayout } from '../types'

export const resolveThemeLayouts = ({
  themePath,
  themePlugin,
}: {
  themePath: string
  themePlugin: ThemeObject
}): ThemeLayout[] => {
  // use the layouts component map directly
  if (isPlainObject(themePlugin.layouts)) {
    return Object.entries(themePlugin.layouts).map(([name, file]) => ({
      name,
      path: file,
    }))
  }

  // resolve the layouts directory
  const dirLayout =
    isString(themePlugin.layouts) && path.isAbsolute(themePlugin.layouts)
      ? themePlugin.layouts
      : path.resolve(themePath, 'layouts')

  if (!fs.pathExistsSync(dirLayout)) {
    logger.warn(`layout path ${chalk.magenta(dirLayout)} does not exist`)
    return []
  }

  // load all files in layouts directory
  const files = fs.readdirSync(dirLayout)

  // take matched files as theme layouts
  const layouts = files
    .filter((file) => /\.(vue|ts|js)$/.test(file))
    .map((file) => ({
      name: path.trimExt(file),
      path: path.resolve(dirLayout, file),
    }))

  return layouts
}

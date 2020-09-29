import { fs, path } from '@vuepress/utils'
import type { ThemeInfo, ThemeLayout } from '../types'

export const resolveThemeLayouts = (themeInfo: ThemeInfo): ThemeLayout[] => {
  const dirLayout = path.resolve(themeInfo.path, 'layouts')

  const files = fs.readdirSync(dirLayout)

  const layouts = files
    .filter((file) => file.endsWith('.vue'))
    .map((file) => ({
      name: path.trimExt(file),
      path: path.resolve(dirLayout, file),
    }))

  return layouts
}

import { resolve } from 'path'
import { fs } from '@vuepress/utils'
import { ThemeInfo } from './resolveThemeInfo'

export interface ThemeLayout {
  /**
   * Path of layout
   */
  path: string

  /**
   * Name of layout
   */
  name: string
}

export const resolveThemeLayouts = (themeInfo: ThemeInfo): ThemeLayout[] => {
  const dirLayout = resolve(themeInfo.path, 'layouts')

  const files = fs.readdirSync(dirLayout)

  const layouts = files
    .filter((file) => file.endsWith('.vue'))
    .map((file) => ({
      name: file.replace(/.vue$/, ''),
      path: resolve(dirLayout, file),
    }))

  return layouts
}

import type { PaletteStylusPluginOptions } from '@vuepress/plugin-palette-stylus'
import type { DefaultThemeOptions } from '../types'

/**
 * Resolve options for @vuepress/plugin-palette-stylus
 */
export const resolvePaletteStylusPluginOptions = (
  options: DefaultThemeOptions
): PaletteStylusPluginOptions | boolean => {
  // this plugin should not be disabled now
  return {
    userPaletteFile: '.vuepress/styles/palette.styl',
    tempPaletteFile: 'palette.styl',
    userStyleFile: '.vuepress/styles/index.styl',
    tempStyleFile: 'style.styl',
  }
}

import type { PaletteStylusPluginOptions } from '@vuepress/plugin-palette-stylus'

/**
 * Resolve options for @vuepress/plugin-palette-stylus
 */
export const resolvePaletteStylusPluginOptions = ():
  | PaletteStylusPluginOptions
  | boolean => {
  return {
    userPaletteFile: '.vuepress/styles/palette.styl',
    tempPaletteFile: 'palette.styl',
    userStyleFile: '.vuepress/styles/index.styl',
    tempStyleFile: 'style.styl',
  }
}

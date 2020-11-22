import type { Plugin } from '@vuepress/core'
import { fs } from '@vuepress/utils'

/**
 * Options of @vuepress/plugin-palette-stylus
 */
export interface PaletteStylusPluginOptions {
  /**
   * File path of the user palette file, relative to source directory
   *
   * @default '.vuepress/styles/palette.styl'
   */
  userPaletteFile?: string

  /**
   * File path of the generated palette temp file, relative to temp directory
   *
   * @default 'palette.styl'
   */
  tempPaletteFile?: string

  /**
   * File path of the user style file, relative to source directory
   *
   * @default '.vuepress/styles/index.styl'
   */
  userStyleFile?: string

  /**
   * File path of the generated style temp file, relative to temp directory
   *
   * @default 'style.styl'
   */
  tempStyleFile?: string
}

export const paletteStylusPlugin: Plugin<PaletteStylusPluginOptions> = ({
  userPaletteFile = '.vuepress/styles/palette.styl',
  tempPaletteFile = 'palette.styl',
  userStyleFile = '.vuepress/styles/index.styl',
  tempStyleFile = 'style.styl',
}) => {
  return {
    name: '@vuepress/plugin-palette-stylus',

    onPrepared: async (app) => {
      const userPalette = app.dir.source(userPaletteFile)
      const userStyle = app.dir.source(userStyleFile)

      let paletteContent = ''
      let styleContent = ''

      if (await fs.pathExists(userPalette)) {
        paletteContent += `@require '${userPalette}'`
      }

      if (await fs.pathExists(userStyle)) {
        styleContent += `@require '${userStyle}'`
      }

      await app.writeTemp(tempPaletteFile, paletteContent)
      await app.writeTemp(tempStyleFile, styleContent)
    },
  }
}

export default paletteStylusPlugin

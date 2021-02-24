import type { Plugin } from '@vuepress/core'
import { fs } from '@vuepress/utils'

/**
 * Options of @vuepress/plugin-palette
 */
export interface PalettePluginOptions {
  /**
   * Preset of the palette
   */
  preset?: 'css' | 'sass' | 'less' | 'stylus'

  /**
   * File path of the user palette file, relative to source directory
   */
  userPaletteFile?: string

  /**
   * File path of the generated palette temp file, relative to temp directory
   */
  tempPaletteFile?: string

  /**
   * File path of the user style file, relative to source directory
   */
  userStyleFile?: string

  /**
   * File path of the generated style temp file, relative to temp directory
   */
  tempStyleFile?: string

  /**
   * Function to generate import code
   */
  importCode?: (filePath: string) => string
}

/**
 * Default options for different palette preset
 */
export const presetOptions: Record<
  Required<PalettePluginOptions>['preset'],
  Omit<Required<PalettePluginOptions>, 'preset'>
> = {
  css: {
    userPaletteFile: '.vuepress/styles/palette.css',
    tempPaletteFile: 'styles/palette.css',
    userStyleFile: '.vuepress/styles/index.css',
    tempStyleFile: 'styles/index.css',
    importCode: (filePath) => `@import '${filePath}';\n`,
  },
  sass: {
    userPaletteFile: '.vuepress/styles/palette.scss',
    tempPaletteFile: 'styles/palette.scss',
    userStyleFile: '.vuepress/styles/index.scss',
    tempStyleFile: 'styles/index.scss',
    importCode: (filePath) => `@forward '${filePath}';\n`,
  },
  less: {
    userPaletteFile: '.vuepress/styles/palette.less',
    tempPaletteFile: 'styles/palette.less',
    userStyleFile: '.vuepress/styles/index.less',
    tempStyleFile: 'styles/index.less',
    importCode: (filePath) => `@import '${filePath}';\n`,
  },
  stylus: {
    userPaletteFile: '.vuepress/styles/palette.styl',
    tempPaletteFile: 'styles/palette.styl',
    userStyleFile: '.vuepress/styles/index.styl',
    tempStyleFile: 'styles/index.styl',
    importCode: (filePath) => `@require '${filePath}';\n`,
  },
}

export const palettePlugin: Plugin<PalettePluginOptions> = (
  {
    preset = 'css',
    userPaletteFile = presetOptions[preset].userPaletteFile,
    tempPaletteFile = presetOptions[preset].tempPaletteFile,
    userStyleFile = presetOptions[preset].userStyleFile,
    tempStyleFile = presetOptions[preset].tempStyleFile,
    importCode = presetOptions[preset].importCode,
  },
  app
) => {
  const userPalette = app.dir.source(userPaletteFile)
  const userStyle = app.dir.source(userStyleFile)

  return {
    name: '@vuepress/plugin-palette',

    alias: {
      '@vuepress/plugin-palette/palette': app.dir.temp(tempPaletteFile),
      '@vuepress/plugin-palette/style': app.dir.temp(tempStyleFile),
    },

    onPrepared: async () => {
      let paletteContent = ''
      let styleContent = ''

      if (await fs.pathExists(userPalette)) {
        paletteContent += importCode(userPalette)
      }

      if (await fs.pathExists(userStyle)) {
        styleContent += importCode(userStyle)
      }

      await app.writeTemp(tempPaletteFile, paletteContent)
      await app.writeTemp(tempStyleFile, styleContent)
    },
  }
}

export default palettePlugin

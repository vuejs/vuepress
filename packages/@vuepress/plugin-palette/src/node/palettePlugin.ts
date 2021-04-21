import * as chokidar from 'chokidar'
import type { Plugin } from '@vuepress/core'
import { preparePaletteFile } from './preparePaletteFile'
import { prepareStyleFile } from './prepareStyleFile'
import { presetOptions } from './presetOptions'

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
) => ({
  name: '@vuepress/plugin-palette',

  alias: {
    '@vuepress/plugin-palette/palette': app.dir.temp(tempPaletteFile),
    '@vuepress/plugin-palette/style': app.dir.temp(tempStyleFile),
  },

  onPrepared: () =>
    Promise.all([
      preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      }),
      prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      }),
    ]),

  onWatched: (app, watchers) => {
    const paletteWatcher = chokidar.watch(userPaletteFile, {
      cwd: app.dir.source(),
      ignoreInitial: true,
    })
    paletteWatcher.on('add', () => {
      preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      })
    })
    paletteWatcher.on('unlink', () => {
      preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      })
    })
    watchers.push(paletteWatcher)

    const styleWatcher = chokidar.watch(userStyleFile, {
      cwd: app.dir.source(),
      ignoreInitial: true,
    })
    styleWatcher.on('add', () => {
      prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      })
    })
    styleWatcher.on('unlink', () => {
      prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      })
    })
    watchers.push(styleWatcher)
  },
})

export default palettePlugin

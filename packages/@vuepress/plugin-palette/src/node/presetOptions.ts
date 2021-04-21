import type { PalettePluginOptions } from './palettePlugin'

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

const {
  fs, path,
  datatypes: { isPlainObject }
} = require('@vuepress/shared-utils')

module.exports = (options, ctx) => ({
  name: '@vuepress/internal-palette',

  async ready () {
    // 1. enable config.styl globally.
    const configFile = path.resolve(__dirname, '../../app/style/config.styl')
    if (!ctx.siteConfig.stylus) {
      ctx.siteConfig.stylus = {
        import: [configFile]
      }
    } else if (isPlainObject(ctx.siteConfig.stylus)) {
      ctx.siteConfig.stylus.import = (ctx.siteConfig.stylus.import || []).concat([configFile])
    }

    // 2. write palette.styl
    const { sourceDir, writeTemp } = ctx

    const themePalette = path.resolve(ctx.themePath, 'styles/palette.styl')
    const userPalette = path.resolve(sourceDir, '.vuepress/styles/palette.styl')

    const themePaletteContent = fs.existsSync(themePalette)
      ? `@import(${JSON.stringify(themePalette)})`
      : ''

    const userPaletteContent = fs.existsSync(userPalette)
      ? `@import(${JSON.stringify(userPalette)})`
      : ''

    // user's palette can override theme's palette.
    let paletteContent = themePaletteContent + userPaletteContent

    if (ctx.parentThemePath) {
      const parentThemePalette = path.resolve(ctx.parentThemePath, 'styles/palette.styl')
      const parentThemePaletteContent = fs.existsSync(parentThemePalette)
        ? `@import(${JSON.stringify(parentThemePalette)})`
        : ''
      paletteContent = parentThemePaletteContent + paletteContent
    }

    await writeTemp('palette.styl', paletteContent)
  }
})

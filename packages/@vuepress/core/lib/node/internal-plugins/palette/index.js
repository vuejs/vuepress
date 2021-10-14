const {
  fs, path, logger,
  datatypes: { isPlainObject }
} = require('@vuepress/shared-utils')

module.exports = (options, ctx) => ({
  name: '@vuepress/internal-palette',

  async ready () {
    // 1. enable config.styl globally.
    const configFile = ctx.getLibFilePath('client/style/config.styl')
    if (!ctx.siteConfig.stylus) {
      ctx.siteConfig.stylus = {
        import: [configFile]
      }
    } else if (isPlainObject(ctx.siteConfig.stylus)) {
      ctx.siteConfig.stylus.import = (ctx.siteConfig.stylus.import || []).concat([configFile])
    }

    // 2. write variables.styl
    const { sourceDir, writeTemp } = ctx

    const themeVariables = path.resolve(ctx.themeAPI.theme.path, 'styles/variables.styl')
    const userVariables = path.resolve(sourceDir, '.vuepress/styles/variables.styl')

    // Deprecation
    const themePalette = path.resolve(ctx.themeAPI.theme.path, 'styles/palette.styl')
    const userPalette = path.resolve(sourceDir, '.vuepress/styles/palette.styl')

    const themeVariablesContent = fs.existsSync(themeVariables)
      ? `@import(${JSON.stringify(themeVariables.replace(/[\\]+/g, '/'))})`
      : (fs.existsSync(themePalette)
        ? `@import(${JSON.stringify(themePalette.replace(/[\\]+/g, '/'))})`
        : '')

    const userVariablesContent = fs.existsSync(userVariables)
      ? `@import(${JSON.stringify(userVariables.replace(/[\\]+/g, '/'))})`
      : (fs.existsSync(userPalette)
        ? `@import(${JSON.stringify(userPalette.replace(/[\\]+/g, '/'))})`
        : '')

    fs.existsSync(userPalette) || fs.existsSync(themePalette)
      ? logger.warn('palette.style is deprecation')
      : ''

    const nullComment = '// null'

    // user's palette can override theme's palette.
    let variablesContent = '// Theme\'s Palette\n'
      + (themeVariablesContent || nullComment)
      + '\n\n// User\'s Palette\n'
      + (userVariablesContent || nullComment)

    if (ctx.themeAPI.existsParentTheme) {
      const parentThemePalette = path.resolve(ctx.themeAPI.parentTheme.path, 'styles/variables.styl')
      const parentThemePaletteContent = fs.existsSync(parentThemePalette)
        ? `@import(${JSON.stringify(parentThemePalette.replace(/[\\]+/g, '/'))})`
        : ''
      variablesContent = '// Parent Theme\'s Palette\n'
        + (parentThemePaletteContent || nullComment)
        + '\n\n' + variablesContent
    }

    await writeTemp('variables.styl', variablesContent)
  }
})

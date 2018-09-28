const {
  fs, logger,
  datatypes: {
    isPlainObject,
    assertTypes,
    isString
  }
} = require('@vuepress/shared-utils')

module.exports = (options, ctx) => ({
  name: '@vuepress/internal-palette',

  async ready () {
    const { writeTemp } = ctx

    const themePalette = ctx.themePalette
    const { palette: userPalette } = ctx.siteConfig
    const themePaletteContent = resolvePaletteContent(themePalette)
    const userPaletteContent = resolvePaletteContent(userPalette)

    // user's palette can override theme's palette.
    const paletteContent = themePaletteContent + userPaletteContent
    await writeTemp('palette.styl', paletteContent)
  }
})

/**
 * resolve palette content
 * @param {string|object} palette
 * @returns {string}
 */

function resolvePaletteContent (palette) {
  const { valid, warnMsg } = assertTypes(palette, [String, Object])
  if (!valid) {
    if (palette !== undefined) {
      logger.warn(
        `[vuepress] Invalid value for "palette": ${warnMsg}`
      )
    }
    return ''
  }

  if (isString(palette)) {
    if (fs.existsSync(palette)) {
      return `@import(${JSON.stringify(palette)})\n`
    }
    return ''
  } else if (isPlainObject(palette)) {
    return Object.keys(palette).map(variableName => {
      return `${variableName} = ${palette[variableName]}`
    }).join('\n') + '\n'
  }
}

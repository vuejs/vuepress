const path = require('path')
const {
  fs, logger, chalk,
  datatypes: {
    isPlainObject,
    assertTypes,
    isString
  }
} = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress/internal-override-css',

  async ready () {
    const { sourceDir, writeTemp } = context

    const overridePath = path.resolve(sourceDir, '.vuepress/override.styl')
    const hasUserOverride = fs.existsSync(overridePath)

    if (hasUserOverride) {
      logger.tip(`${chalk.magenta('override.styl')} has been deprecated from v1.0.0, using ${chalk.cyan('config.palette')} instead.\n`)
    }

    // palette API.
    const themePalette = context.themePalette
    const { palette: userPalette } = context.siteConfig
    const themePaletteContent = resolvePaletteContent(themePalette)
    const userPaletteContent = resolvePaletteContent(userPalette)
    // user's palette can override theme's palette.
    const paletteContent = themePaletteContent + userPaletteContent
    await writeTemp('palette.styl', paletteContent)

    // style.styl API.
    const stylePath = path.resolve(sourceDir, '.vuepress/style.styl').replace(/[\\]+/g, '/')
    const hasUserStyle = fs.existsSync(stylePath)
    await writeTemp('style.styl', hasUserStyle ? `@import(${JSON.stringify(stylePath)})` : ``)

    // Temporary tip, will be removed at next release.
    if (hasUserOverride && !hasUserStyle) {
      logger.tip(
        `${chalk.magenta('override.styl')} has been split into 2 APIs, we recommend you upgrade to continue.\n` +
        `      See: ${chalk.magenta('https://vuepress.vuejs.org/default-theme-config/#simple-css-override')}`
      )
    }
  }
})

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

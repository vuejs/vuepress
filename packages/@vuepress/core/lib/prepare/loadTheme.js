const path = require('path')
const fs = require('fs')
const {
  logger, chalk,
  datatypes: { isString },
  shortcutPackageResolver: { resolveTheme }
} = require('@vuepress/shared-utils')

module.exports = async function loadTheme (theme, sourceDir, vuepressDir) {
  // resolve theme
  const localThemePath = path.resolve(vuepressDir, 'theme')
  const useLocalTheme =
    (await fs.exists(localThemePath)) && ((await fs.readdir(localThemePath)).length > 0)

  let themePath = null         // Mandatory
  let themeLayoutPath = null   // Mandatory
  let themeNotFoundPath = null // Optional
  let themeIndexFile = null    // Optional
  let themePlugins = []        // Optional
  let themeName
  let themeShortcut

  if (useLocalTheme) {
    // use local custom theme
    themePath = localThemePath
    logger.tip(`\nApply theme located at ${themePath}...`)
  } else if (isString(theme)) {
    // use external theme
    const { module: modulePath, name, shortcut } = resolveTheme(theme, sourceDir)
    if (modulePath.endsWith('.js') || modulePath.endsWith('.vue')) {
      themePath = path.parse(modulePath).dir
    }
    themeName = name
    themeShortcut = shortcut
    logger.tip(`\nApply theme ${chalk.gray(themeName)}`)
  } else {
    throw new Error(`[vuepress] You must specify a theme, or create a local custom theme. \n For more details, refer to https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes. \n`)
  }

  try {
    themeIndexFile = require(themePath)
  } catch (error) {
    console.log(error)
    themeIndexFile = {}
  }

  // handle theme api
  const { layout, notFound, plugins } = themeIndexFile
  themePlugins = plugins
  themeLayoutPath = layout
    ? path.resolve(themePath, layout)
    : path.resolve(themePath, 'Layout.vue')

  themeNotFoundPath = notFound
    ? path.resolve(themePath, notFound)
    : path.resolve(themePath, 'NotFound.vue')

  if (!fs.existsSync(themeLayoutPath)) {
    throw new Error(`[vuepress] Cannot resolve Layout.vue file in \n ${themeLayoutPath}`)
  }

  if (!fs.existsSync(themeNotFoundPath)) {
    themeNotFoundPath = path.resolve(__dirname, '../app/components/NotFound.vue')
  }

  return {
    themePath,
    themeLayoutPath,
    themeNotFoundPath,
    themeIndexFile,
    themePlugins,
    themeName,
    themeShortcut
  }
}

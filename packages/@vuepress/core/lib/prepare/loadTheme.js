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
    fs.existsSync(localThemePath) && (fs.readdirSync(localThemePath)).length > 0

  let themePath = null         // Mandatory
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
    } else {
      themePath = modulePath
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
    themeIndexFile = {}
  }

  // handle theme api
  const { plugins, layoutDir = useLocalTheme ? '.' : 'layouts' } = themeIndexFile
  themePlugins = plugins

  const layoutDirPath = path.resolve(themePath, layoutDir)

  // normalize component name
  const getComponentName = filename => {
    filename = filename.slice(0, -4)
    if (filename === '404') {
      filename = 'NotFound'
    }
    return filename
  }

  // built-in named layout or not.
  const isInternal = componentName => componentName === 'Layout' ||
    componentName === 'NotFound'

  const layoutComponentMap = fs.readdirSync(layoutDirPath)
    .filter(filename => filename.endsWith('.vue'))
    .reduce((map, filename) => {
      const componentName = getComponentName(filename)
      const componentPath = path.resolve(layoutDirPath, filename)
      map[componentName] = { filename, componentName, path: componentPath }
      if (isInternal(componentName)) {
        map[componentName].isInternal = true
      }
      return map
    }, {})

  if (!fs.existsSync(layoutComponentMap.Layout.path)) {
    throw new Error(`[vuepress] Cannot resolve Layout.vue file in \n ${layoutComponentMap.Layout.path}`)
  }

  if (!fs.existsSync(layoutComponentMap.NotFound.path)) {
    layoutComponentMap['404'].path = path.resolve(__dirname, '../app/components/NotFound.vue')
  }

  return {
    themePath,
    layoutComponentMap,
    themeIndexFile,
    themePlugins,
    themeName,
    themeShortcut
  }
}

'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const fs = require('fs')
const {
  shortcutPackageResolver: { resolveTheme },
  datatypes: { isString },
  logger, chalk
} = require('@vuepress/shared-utils')

/**
 * Resolve theme.
 *
 *   Resolving Priority:
 *
 *   1. If the theme was a absolute path and that path exists, respect it
 *      as the theme directory.
 *   2. If 'theme' directory located at vuepressDir exists, respect it as
 *      the theme directory.
 *   3. If 'theme' was a shortcut string, resolve it from deps.
 *
 * @param {string} theme
 * @param {string} sourceDir
 * @param {string} vuepressDir
 * @returns {Promise}
 */

module.exports = async function loadTheme (theme, sourceDir, vuepressDir) {
  const localThemePath = path.resolve(vuepressDir, 'theme')
  const useLocalTheme =
    !fs.existsSync(theme) &&
    fs.existsSync(localThemePath) &&
    (fs.readdirSync(localThemePath)).length > 0

  let themePath = null         // Mandatory
  let themeIndexFile = null    // Optional
  let themeName
  let themeShortcut

  if (useLocalTheme) {
    themePath = localThemePath
    logger.tip(`\nApply theme located at ${chalk.gray(themePath)}...`)
  } else if (isString(theme)) {
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
  const {
    plugins: themePlugins,
    palette: themePalette,
    layoutDir = useLocalTheme
      ? '.'
      : 'layouts'
  } = themeIndexFile

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

  if (!layoutComponentMap.Layout && !fs.existsSync(layoutComponentMap.Layout.path)) {
    throw new Error(`[vuepress] Cannot resolve Layout.vue file in \n ${layoutComponentMap.Layout.path}`)
  }

  // use default 404 component.
  if (!layoutComponentMap.NotFound || !fs.existsSync(layoutComponentMap.NotFound.path)) {
    layoutComponentMap['NotFound'] = {
      filename: 'Layout.vue',
      componentName: 'NotFound',
      path: path.resolve(__dirname, '../app/components/NotFound.vue'),
      isInternal: true
    }
  }

  return {
    themePath,
    layoutComponentMap,
    themeIndexFile,
    themePlugins,
    themePalette,
    themeName,
    themeShortcut
  }
}

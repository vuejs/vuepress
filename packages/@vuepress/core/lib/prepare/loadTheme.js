'use strict'

/**
 * Module dependencies.
 */

const {
  fs, path,
  moduleResolver: { getThemeResolver },
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

module.exports = async function loadTheme (ctx) {
  const { siteConfig, cliOptions, sourceDir, vuepressDir, pluginAPI } = ctx
  const theme = siteConfig.theme || cliOptions.theme
  const themeResolver = getThemeResolver()

  const localThemePath = path.resolve(vuepressDir, 'theme')
  const useLocalTheme =
    !fs.existsSync(theme) &&
    fs.existsSync(localThemePath) &&
    (fs.readdirSync(localThemePath)).length > 0

  let themePath = null         // Mandatory
  let themeEntryFile = null    // Optional
  let themeName
  let themeShortcut
  let parentThemePath = null       // Optional
  let parentThemeEntryFile = null  // Optional

  if (useLocalTheme) {
    themePath = localThemePath
    logger.tip(`\nApply theme located at ${chalk.gray(themePath)}...`)
  } else if (isString(theme)) {
    const resolved = themeResolver.resolve(theme, sourceDir)
    const { entry, name, shortcut } = resolved

    if (entry === null) {
      throw new Error(`Cannot resolve theme ${theme}.`)
    }

    themePath = normalizeThemePath(resolved)
    themeName = name
    themeShortcut = shortcut
    logger.tip(`\nApply theme ${chalk.gray(themeName)}`)
  } else {
    throw new Error(`[vuepress] You must specify a theme, or create a local custom theme. \n For more details, refer to https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes. \n`)
  }

  try {
    themeEntryFile = pluginAPI.normalizePlugin(themePath, ctx.themeConfig)
  } catch (error) {
    themeEntryFile = {}
  }

  themeEntryFile.name = '@vuepress/internal-theme-entry-file'
  themeEntryFile.shortcut = null

  // handle theme api
  const layoutDirs = [
    path.resolve(themePath, '.'),
    path.resolve(themePath, 'layouts')
  ]

  if (themeEntryFile.extend) {
    const resolved = themeResolver.resolve(themeEntryFile.extend, sourceDir)
    if (resolved.entry === null) {
      throw new Error(`Cannot resolve parent theme ${themeEntryFile.extend}.`)
    }
    parentThemePath = normalizeThemePath(resolved)

    try {
      parentThemeEntryFile = pluginAPI.normalizePlugin(parentThemePath, ctx.themeConfig)
    } catch (error) {
      parentThemeEntryFile = {}
    }

    parentThemeEntryFile.name = '@vuepress/internal-parent-theme-entry-file'
    parentThemeEntryFile.shortcut = null

    layoutDirs.unshift(
      path.resolve(parentThemePath, '.'),
      path.resolve(parentThemePath, 'layouts'),
    )

    themeEntryFile.alias = Object.assign(
      themeEntryFile.alias || {},
      { '@parent-theme': parentThemePath }
    )
  }

  // normalize component name
  const getComponentName = filename => {
    filename = filename.slice(0, -4)
    if (filename === '404') {
      filename = 'NotFound'
    }
    return filename
  }

  const readdirSync = dir => fs.existsSync(dir) && fs.readdirSync(dir) || []

  // built-in named layout or not.
  const isInternal = componentName => componentName === 'Layout' ||
    componentName === 'NotFound'

  const layoutComponentMap = layoutDirs
    .map(
      layourDir => readdirSync(layourDir)
        .filter(filename => filename.endsWith('.vue'))
        .map(filename => {
          const componentName = getComponentName(filename)
          return {
            filename, componentName,
            isInternal: isInternal(componentName),
            path: path.resolve(layourDir, filename)
          }
        })
    )

    .reduce((arr, next) => {
      arr.push(...next)
      return arr
    }, [])

    .reduce((map, component) => {
      map[component.componentName] = component
      return map
    }, {})

  const { Layout = {}, NotFound = {}} = layoutComponentMap

  if (!Layout && !fs.existsSync(Layout.path)) {
    throw new Error(`[vuepress] Cannot resolve Layout.vue file in \n ${Layout.path}`)
  }

  // use default 404 component.
  if (!NotFound || !fs.existsSync(NotFound.path)) {
    layoutComponentMap.NotFound = {
      filename: 'Layout.vue',
      componentName: 'NotFound',
      path: path.resolve(__dirname, '../app/components/NotFound.vue'),
      isInternal: true
    }
  }

  return {
    themePath,
    layoutComponentMap,
    themeEntryFile,
    themeName,
    themeShortcut,
    parentThemePath,
    parentThemeEntryFile
  }
}

function normalizeThemePath (resolved) {
  const { entry, name, fromDep } = resolved
  if (fromDep) {
    const pkgPath = require.resolve(`${name}/package.json`)
    return path.parse(pkgPath).dir
  } else if (entry.endsWith('.js') || entry.endsWith('.vue')) {
    return path.parse(entry).dir
  } else {
    return entry
  }
}

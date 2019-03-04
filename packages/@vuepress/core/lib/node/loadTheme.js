'use strict'

/**
 * Module dependencies.
 */

const {
  fs,
  path: { resolve, parse },
  moduleResolver: { getThemeResolver },
  datatypes: { isString },
  logger, chalk
} = require('@vuepress/shared-utils')
const ThemeAPI = require('./theme-api')

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
 * @returns {ThemeAPI}
 */

module.exports = function loadTheme (ctx) {
  const themeResolver = getThemeResolver()

  const theme = resolveTheme(ctx, themeResolver)
  if (!theme.path) {
    throw new Error(`[vuepress] You must specify a theme, or create a local custom theme. \n For more details, refer to https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes. \n`)
  }
  let applyTip = `Apply theme ${chalk.magenta(theme.name)}`
  theme.entry.name = '@vuepress/internal-theme-entry-file'

  let parentTheme = {}
  if (theme.entry.extend) {
    parentTheme = resolveTheme(ctx, themeResolver, true, theme.entry.extend)
    parentTheme.entry.name = '@vuepress/internal-parent-theme-entry-file'
    applyTip += chalk.gray(` (extends ${chalk.magenta(parentTheme.name)})`)
  }
  logger.tip(applyTip + ' ...')

  logger.debug('theme', theme.name, theme.path)
  logger.debug('parentTheme', parentTheme.name, parentTheme.path)
  return new ThemeAPI(theme, parentTheme, ctx)
}

function normalizeThemePath (resolved) {
  const { entry, name, fromDep } = resolved
  if (fromDep) {
    const packageRoot = require.resolve(`${name}/package.json`)
    const { main } = require(packageRoot)
    if (main.endsWith('.vue')) {
      // For those cases that "main" field is set to an non-index file
      // e.g. `layouts/Layout.vue`
      return packageRoot
    } else {
      // For those cases that "index.js" is not at package root
      // e.g. `lib/index.js` (#1362)
      return parse(require.resolve(name)).dir
    }
  } else if (entry.endsWith('.js') || entry.endsWith('.vue')) {
    return parse(entry).dir
  } else {
    return entry
  }
}

function resolveTheme (ctx, resolver, ignoreLocal, theme) {
  const { siteConfig, options, sourceDir, vuepressDir, pluginAPI } = ctx
  const localThemePath = resolve(vuepressDir, 'theme')
  theme = theme || siteConfig.theme || options.theme

  let path
  let name
  let shortcut
  let entry = {}

  // 1. From local
  if (!ignoreLocal
    && !fs.existsSync(theme)
    && fs.existsSync(localThemePath)
    && (fs.readdirSync(localThemePath)).length > 0
  ) {
    path = localThemePath
    name = shortcut = 'local'
    logger.tip(`Apply local theme at ${chalk.gray(path)}...`)

    // 2. From dep
  } else if (isString(theme)) {
    const resolved = resolver.resolve(theme, sourceDir)
    if (resolved.entry === null) {
      throw new Error(`Cannot resolve theme: ${theme}.`)
    }
    path = normalizeThemePath(resolved)
    name = resolved.name
    shortcut = resolved.shortcut
  } else {
    return {}
  }

  try {
    entry = pluginAPI.normalizePlugin(path, ctx.themeConfig)
  } catch (error) {
    entry = {}
  }

  return { path, name, shortcut, entry }
}

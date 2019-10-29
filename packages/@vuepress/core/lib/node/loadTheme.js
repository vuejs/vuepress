'use strict'

/**
 * Module dependencies.
 */

const {
  fs,
  path: { resolve, parse },
  moduleResolver: { getThemeResolver },
  datatypes: { isString },
  logger,
  chalk
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
    throw new Error(
      '[vuepress] You must specify a theme, or create a local custom theme. \n'
        + 'For more details, refer to https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes. \n'
    )
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
  return new ThemeAPI(theme, parentTheme)
}

function normalizeThemePath (resolved) {
  const { entry, fromDep } = resolved
  if (fromDep) {
    return parse(require.resolve(entry)).dir
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

  /**
   * 1. From `.vuepress/theme` directory.
   */
  if (
    !ignoreLocal
    && !fs.existsSync(theme)
    && fs.existsSync(localThemePath)
    && fs.readdirSync(localThemePath).length > 0
  ) {
    path = localThemePath
    name = shortcut = 'local'
    logger.tip(`Apply local theme at ${chalk.gray(path)}...`)

    /**
     * 2. From deps or custom local path.
     *    - vuepress-plugin-foo
     *    - /path/to/a-theme/index.js
     */
  } else if (isString(theme)) {
    /**
     * To let theme resolver get the correct theme name.
     */
    if (theme.endsWith('/index.js')) {
      theme = theme.replace(/\/index\.js$/, '')
    }

    const resolved = resolver.resolve(theme, sourceDir)
    if (resolved.entry === null) {
      throw new Error(`Cannot resolve theme: ${theme}.`)
    }

    path = normalizeThemePath(resolved)
    name = resolved.name
    shortcut = resolved.shortcut

    /**
     * 3. fallback
     */
  } else {
    return {}
  }

  try {
    entry = pluginAPI.normalizePlugin('theme', path, ctx.themeConfig)
  } catch (e) {
    logger.warn(e.message)
    entry = {}
  }

  return { path, name, shortcut, entry }
}

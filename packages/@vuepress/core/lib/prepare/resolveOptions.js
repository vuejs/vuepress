const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const globby = require('globby')
const createMarkdown = require('../markdown/index')
const loadConfig = require('./loadConfig')
const { sort } = require('./util')
const logger = require('../util/logger')

module.exports = async function resolveOptions (sourceDir, cliOptions) {
  function requireResolve (target) {
    return require.resolve(target, {
      paths: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(sourceDir)
      ]
    })
  }

  const vuepressDir = path.resolve(sourceDir, '.vuepress')
  const siteConfig = loadConfig(vuepressDir)

  // normalize head tag urls for base
  const base = siteConfig.base || '/'
  if (base !== '/' && siteConfig.head) {
    siteConfig.head.forEach(tag => {
      const attrs = tag[1]
      if (attrs) {
        for (const name in attrs) {
          if (name === 'src' || name === 'href') {
            const value = attrs[name]
            if (value.charAt(0) === '/') {
              attrs[name] = base + value.slice(1)
            }
          }
        }
      }
    })
  }

  // resolve outDir
  const outDir = siteConfig.dest
    ? path.resolve(siteConfig.dest)
    : path.resolve(sourceDir, '.vuepress/dist')

  // resolve theme
  const localThemePath = path.resolve(vuepressDir, 'theme')
  const useLocalTheme = fs.existsSync(localThemePath)
  const theme = siteConfig.theme || cliOptions.theme

  let themePath = null
  let themeLayoutPath = null
  let themeNotFoundPath = null
  let themeIndexFile = null
  let themePlugins = []

  if (useLocalTheme) {
    logger.tip(`\nApply theme located at ${localThemePath}...`)

    // use local custom theme
    themePath = localThemePath
    themeLayoutPath = path.resolve(localThemePath, 'Layout.vue')
    themeNotFoundPath = path.resolve(localThemePath, 'NotFound.vue')
    if (!fs.existsSync(themeLayoutPath)) {
      throw new Error(`[vuepress] Cannot resolve Layout.vue file in .vuepress/theme.`)
    }
    if (!fs.existsSync(themeNotFoundPath)) {
      throw new Error(`[vuepress] Cannot resolve NotFound.vue file in .vuepress/theme.`)
    }
  } else if (theme) {
    // use external theme
    try {
      // backward-compatible 0.x.x.
      themeLayoutPath = requireResolve(`vuepress-theme-${theme}/Layout.vue`)
      themePath = path.dirname(themeLayoutPath)
      themeNotFoundPath = path.resolve(themeLayoutPath, 'NotFound.vue')
    } catch (e) {
      try {
        themeIndexFile = requireResolve(`vuepress-theme-${theme}/index.js`)
      } catch (e) {
        try {
          themeIndexFile = requireResolve(`@vuepress/theme-${theme}`)
          themePath = path.dirname(themeIndexFile)
          themeIndexFile = require(themeIndexFile)
          themeLayoutPath = themeIndexFile.layout
          themeNotFoundPath = themeIndexFile.notFound
          themePlugins = themeIndexFile.plugins
        } catch (e) {
          throw new Error(`[vuepress] Failed to load custom theme "${theme}". File vuepress-theme-${theme}/Layout.vue does not exist.`)
        }
      }
    }
    logger.tip(`\nApply theme ${chalk.gray(theme)}`)
  } else {
    throw new Error(`[vuepress] You must specify a theme, or create a local custom theme. \n For more details, refer to https://vuepress.vuejs.org/guide/custom-themes.html#custom-themes. \n`)
  }

  // resolve theme config
  const themeConfig = siteConfig.themeConfig || {}

  // resolve markdown
  const markdown = createMarkdown(siteConfig)

  // resolve pageFiles
  const patterns = ['**/*.md', '!.vuepress', '!node_modules']
  if (siteConfig.dest) {
    // #654 exclude dest folder when dest dir was set in
    // sourceDir but not in '.vuepress'
    const outDirRelative = path.relative(sourceDir, outDir)
    if (!outDirRelative.includes('..')) {
      patterns.push('!' + outDirRelative)
    }
  }
  const pageFiles = sort(await globby(patterns, { cwd: sourceDir }))

  const options = {
    siteConfig,
    themeConfig,
    sourceDir,
    outDir,
    publicPath: base,
    pageFiles,
    themePath,
    themeLayoutPath,
    themeNotFoundPath,
    themePlugins,
    cliPlugins: cliOptions.plugins || [],
    markdown
  }

  return options
}

const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const createMarkdown = require('../markdown/index')
const loadConfig = require('./loadConfig')
const { sort } = require('./util')

module.exports = async function resolveOptions (sourceDir) {
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
  let themePath = null
  let themeLayoutPath = null
  let themeNotFoundPath = null
  let themeIndexFile = null
  let themePlugins = []

  if (useLocalTheme) {
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
  } else if (siteConfig.theme) {
    // use external theme
    try {
      // backward-compatible 0.x.x.
      themeLayoutPath = requireResolve(`vuepress-theme-${siteConfig.theme}/Layout.vue`)
      themePath = path.dirname(themeLayoutPath)
      themeNotFoundPath = path.resolve(themeLayoutPath, 'NotFound.vue')
    } catch (e) {
      try {
        themeIndexFile = requireResolve(`vuepress-theme-${siteConfig.theme}/index.js`)
      } catch (e) {
        try {
          themeIndexFile = requireResolve(`@vuepress/theme-${siteConfig.theme}`)
          themePath = path.dirname(themeIndexFile)
          themeIndexFile = require(themeIndexFile)
          themeLayoutPath = themeIndexFile.layout
          themeNotFoundPath = themeIndexFile.notFound
          themePlugins = themeIndexFile.plugins
        } catch (e) {
          throw new Error(`[vuepress] Failed to load custom theme "${siteConfig.theme}". File vuepress-theme-${siteConfig.theme}/Layout.vue does not exist.`)
        }
      }
    }
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
    markdown
  }

  return options
}

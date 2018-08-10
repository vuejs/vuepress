const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const createMarkdown = require('../markdown/index')
const loadConfig = require('./loadConfig')
const { sort } = require('./util')

module.exports = async function resolveOptions (sourceDir) {
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
  const useDefaultTheme = (
    !siteConfig.theme &&
    !fs.existsSync(path.resolve(vuepressDir, 'theme'))
  )
  const defaultThemePath = path.resolve(__dirname, '../default-theme')
  let themePath = null
  let themeLayoutPath = null
  let themeNotFoundPath = null

  console.log(useDefaultTheme)
  console.log(siteConfig)
  if (useDefaultTheme) {
    // use default theme
    themePath = defaultThemePath
    themeLayoutPath = path.resolve(defaultThemePath, 'Layout.vue')
    themeNotFoundPath = path.resolve(defaultThemePath, 'NotFound.vue')
  } else {
    // resolve theme Layout
    if (siteConfig.theme) {
      // use external theme
      // backward-compatible
      try {
        themeLayoutPath = require.resolve(`vuepress-theme-${siteConfig.theme}/Layout.vue`, {
          paths: [
            path.resolve(__dirname, '../../node_modules'),
            path.resolve(sourceDir)
          ]
        })
        themePath = path.dirname(themeLayoutPath)
      } catch (e) {
        throw new Error(`[vuepress] Failed to load custom theme "${
          siteConfig.theme
        }". File vuepress-theme-${siteConfig.theme}/Layout.vue does not exist.`)
      }
    } else {
      // use custom theme
      themePath = path.resolve(vuepressDir, 'theme')
      themeLayoutPath = path.resolve(themePath, 'Layout.vue')
      if (!fs.existsSync(themeLayoutPath)) {
        throw new Error(`[vuepress] Cannot resolve Layout.vue file in .vuepress/theme.`)
      }
    }

    // resolve theme NotFound
    themeNotFoundPath = path.resolve(themePath, 'NotFound.vue')
    if (!fs.existsSync(themeNotFoundPath)) {
      themeNotFoundPath = path.resolve(defaultThemePath, 'NotFound.vue')
    }
  }

  // resolve theme config
  const themeConfig = siteConfig.themeConfig || {}

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia ||
    Object.keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].algolia)
  )

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
    useDefaultTheme,
    isAlgoliaSearch,
    markdown
  }

  return options
}

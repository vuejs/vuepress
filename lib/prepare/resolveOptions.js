const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const createMarkdown = require('../markdown')
const loadConfig = require('./loadConfig')
const { encodePath, fileToPath, sort, getGitLastUpdatedTimeStamp } = require('./util')
const {
  inferTitle,
  extractHeaders,
  parseFrontmatter
} = require('../util/index')

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
  let themeEnhanceAppPath = null

  if (useDefaultTheme) {
    // use default theme
    themePath = defaultThemePath
    themeLayoutPath = path.resolve(defaultThemePath, 'Layout.vue')
    themeNotFoundPath = path.resolve(defaultThemePath, 'NotFound.vue')
  } else {
    // resolve theme Layout
    if (siteConfig.theme) {
      // use external theme
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

    // resolve theme enhanceApp
    themeEnhanceAppPath = path.resolve(themePath, 'enhanceApp.js')
    if (!fs.existsSync(themeEnhanceAppPath)) {
      themeEnhanceAppPath = null
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

  // resolve lastUpdated
  const shouldResolveLastUpdated = (
    themeConfig.lastUpdated ||
    Object.keys(siteConfig.locales && themeConfig.locales || {})
          .some(base => themeConfig.locales[base].lastUpdated)
  )

  // resolve pagesData
  const pagesData = await Promise.all(pageFiles.map(async (file) => {
    const filepath = path.resolve(sourceDir, file)
    const key = 'v-' + Math.random().toString(16).slice(2)
    const data = {
      key,
      path: encodePath(fileToPath(file))
    }

    if (shouldResolveLastUpdated) {
      data.lastUpdated = getGitLastUpdatedTimeStamp(filepath)
    }

    // extract yaml frontmatter
    const content = await fs.readFile(filepath, 'utf-8')
    const frontmatter = parseFrontmatter(content)
    // infer title
    const title = inferTitle(frontmatter)
    if (title) {
      data.title = title
    }
    const headers = extractHeaders(
      frontmatter.content,
      ['h2', 'h3'],
      markdown
    )
    if (headers.length) {
      data.headers = headers
    }
    if (Object.keys(frontmatter.data).length) {
      data.frontmatter = frontmatter.data
    }
    if (frontmatter.excerpt) {
      const { html } = markdown.render(frontmatter.excerpt)
      data.excerpt = html
    }
    return data
  }))

  // resolve site data
  const siteData = {
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    base,
    pages: pagesData,
    themeConfig,
    locales: siteConfig.locales
  }

  const options = {
    siteConfig,
    siteData,
    sourceDir,
    outDir,
    publicPath: base,
    pageFiles,
    pagesData,
    themePath,
    themeLayoutPath,
    themeNotFoundPath,
    themeEnhanceAppPath,
    useDefaultTheme,
    isAlgoliaSearch,
    markdown
  }

  return options
}

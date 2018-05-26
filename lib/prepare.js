const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const createMarkdown = require('./markdown')
const loadConfig = require('./util/loadConfig')
const tempPath = path.resolve(__dirname, 'app/.temp')
const {
  encodePath,
  inferTitle,
  extractHeaders,
  parseFrontmatter,
  getGitLastUpdatedTimeStamp
} = require('./util')

fs.ensureDirSync(tempPath)

const tempCache = new Map()
async function writeTemp (file, content) {
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file)
  if (cached !== content) {
    await fs.writeFile(path.join(tempPath, file), content)
    tempCache.set(file, content)
  }
}

async function writeEnhanceTemp (destName, srcPath) {
  await writeTemp(
    destName,
    fs.existsSync(srcPath)
      ? `export { default } from ${JSON.stringify(srcPath)}`
      : `export default function () {}`
  )
}

module.exports = async function prepare (sourceDir) {
  // 1. load options
  const options = await resolveOptions(sourceDir)

  // 2. generate routes & user components registration code
  const routesCode = await genRoutesFile(options)
  const componentCode = await genComponentRegistrationFile(options)

  await writeTemp('routes.js', [
    componentCode,
    routesCode
  ].join('\n'))

  // 3. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`
  await writeTemp('siteData.js', dataCode)

  // 4. handle user override
  const overridePath = path.resolve(sourceDir, '.vuepress/override.styl')
  const hasUserOverride = fs.existsSync(overridePath)
  await writeTemp(`override.styl`, hasUserOverride ? `@import(${JSON.stringify(overridePath)})` : ``)

  // 5. handle enhanceApp.js
  const enhanceAppPath = path.resolve(sourceDir, '.vuepress/enhanceApp.js')
  await writeEnhanceTemp('enhanceApp.js', enhanceAppPath)

  // 6. handle the theme enhanceApp.js
  await writeEnhanceTemp('themeEnhanceApp.js', options.themeEnhanceAppPath)

  return options
}

async function resolveOptions (sourceDir) {
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
  const defaultThemePath = path.resolve(__dirname, 'default-theme')
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
            path.resolve(__dirname, '../node_modules'),
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
  const pageFiles = sort(await globby(['**/*.md', '!.vuepress', '!node_modules'], { cwd: sourceDir }))

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

async function genComponentRegistrationFile ({ sourceDir }) {
  function genImport (file) {
    const name = fileToComponentName(file)
    const baseDir = path.resolve(sourceDir, '.vuepress/components')
    const absolutePath = path.resolve(baseDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }
  const components = (await resolveComponents(sourceDir)) || []
  return `import Vue from 'vue'\n` + components.map(genImport).join('\n')
}

const indexRE = /(^|.*\/)(index|readme)\.md$/i
const extRE = /\.(vue|md)$/

function fileToPath (file) {
  if (isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return file.replace(indexRE, '/$1')
  } else {
    // foo.md -> /foo.html
    // foo/bar.md -> /foo/bar.html
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  }
}

function fileToComponentName (file) {
  let normalizedName = file
    .replace(/\/|\\/g, '-')
    .replace(extRE, '')
  if (isIndexFile(file)) {
    normalizedName = normalizedName.replace(/readme$/i, 'index')
  }
  const pagePrefix = /\.md$/.test(file) ? `page-` : ``
  return `${pagePrefix}${normalizedName}`
}

function isIndexFile (file) {
  return indexRE.test(file)
}

async function resolveComponents (sourceDir) {
  const componentDir = path.resolve(sourceDir, '.vuepress/components')
  if (!fs.existsSync(componentDir)) {
    return
  }
  return sort(await globby(['**/*.vue'], { cwd: componentDir }))
}

async function genRoutesFile ({ siteData: { pages }, sourceDir, pageFiles }) {
  function genRoute ({ path: pagePath, key: componentName }, index) {
    const file = pageFiles[index]
    const filePath = path.resolve(sourceDir, file)
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      import(${JSON.stringify(filePath)}).then(comp => {
        Vue.component(${JSON.stringify(componentName)}, comp.default)
        next()
      })
    }
  }`

    const dncodedPath = decodeURIComponent(pagePath)
    if (dncodedPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(dncodedPath)},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    if (/\/$/.test(pagePath)) {
      code += `,
  {
    path: ${JSON.stringify(pagePath + 'index.html')},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    return code
  }

  const notFoundRoute = `,
  {
    path: '*',
    component: ThemeNotFound
  }`

  return (
    `import ThemeLayout from '@themeLayout'\n` +
    `import ThemeNotFound from '@themeNotFound'\n` +
    `import { injectMixins } from '@app/util'\n` +
    `import rootMixins from '@app/root-mixins'\n\n` +
    `injectMixins(ThemeLayout, rootMixins)\n` +
    `injectMixins(ThemeNotFound, rootMixins)\n\n` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}

function sort (arr) {
  return arr.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

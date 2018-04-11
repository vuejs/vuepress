const fs = require('fs')
const path = require('path')
const globby = require('globby')
const mkdirp = require('mkdirp')
const yaml = require('yaml-front-matter')
const tempPath = path.resolve(__dirname, 'app/.temp')
const { inferTitle, extractHeaders } = require('./util')

mkdirp(tempPath)

const tempCache = new Map()
function writeTemp (file, content) {
  // cache write to avoid hitting the dist if it didn't change
  const cached = tempCache.get(file)
  if (cached !== content) {
    fs.writeFileSync(path.join(tempPath, file), content)
    tempCache.set(file, content)
  }
}

module.exports = async function prepare (sourceDir) {
  // 1. load options
  const options = await resolveOptions(sourceDir)

  // 2. generate routes & user components registration code
  const routesCode = await genRoutesFile(options)
  const componentCode = await genComponentRegistrationFile(options)

  writeTemp('routes.js', [
    componentCode,
    routesCode
  ].join('\n\n'))

  // 3. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`
  writeTemp('siteData.js', dataCode)

  // 4. generate basic polyfill if need to support older browsers
  let polyfillCode = ``
  if (!options.siteConfig.evergreen) {
    polyfillCode =
`import 'es6-promise/auto'
if (!Object.assign) Object.assign = require('object-assign')`
  }
  writeTemp('polyfill.js', polyfillCode)

  return options
}

async function resolveOptions (sourceDir) {
  const vuepressDir = path.resolve(sourceDir, '.vuepress')
  const configPath = path.resolve(vuepressDir, 'config.js')

  delete require.cache[configPath]
  const siteConfig = fs.existsSync(configPath) ? require(configPath) : {}

  // normalize description
  if (siteConfig.description) {
    (siteConfig.head || (siteConfig.head = [])).unshift([
      'meta', { name: 'description', content: siteConfig.description }
    ])
  }

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

  const options = {
    siteConfig,
    sourceDir,
    outDir: siteConfig.dest
      ? path.resolve(siteConfig.dest)
      : path.resolve(sourceDir, '.vuepress/dist'),
    publicPath: base,
    pageFiles: sort(await globby(['**/*.md', '!.vuepress'], { cwd: sourceDir })),
    pagesData: null,
    themePath: null,
    notFoundPath: null
  }

  // resolve theme
  const hasTheme = (
    siteConfig.theme ||
    fs.existsSync(path.resolve(vuepressDir, 'theme'))
  )

  if (!hasTheme) {
    // use default theme
    options.themePath = path.resolve(__dirname, 'default-theme/Layout.vue')
    options.notFoundPath = path.resolve(__dirname, 'default-theme/NotFound.vue')
  } else {
    // resolve custom theme
    const themeDir = siteConfig.theme
      ? path.resolve(__dirname, `../../vuepress-theme-${siteConfig.theme}`)
      : path.resolve(sourceDir, 'theme')

    const themePath = path.resolve(themeDir, 'Layout.vue')
    if (fs.existsSync(themePath)) {
      options.themePath = themePath
    } else {
      throw new Error(`[vuepress] Cannot resolve Layout.vue file for custom theme${
        siteConfig.theme ? ` "${siteConfig.theme}"` : ``
      }.`)
    }

    const notFoundPath = path.resolve(themeDir, '/NotFound.vue')
    if (fs.existsSync(notFoundPath)) {
      options.notFoundPath = notFoundPath
    } else {
      options.notFoundPath = path.resolve(__dirname, 'default-theme/NotFound.vue')
    }
  }

  // resolve pages
  const pagesData = options.pageFiles.map(file => {
    const data = {
      path: fileToPath(file)
    }

    // extract yaml frontmatter
    const content = fs.readFileSync(path.resolve(sourceDir, file), 'utf-8')
    const frontmatter = yaml.loadFront(content)
    // infer title
    const title = inferTitle(frontmatter)
    if (title) {
      data.title = title
    }
    const headers = extractHeaders(frontmatter.__content, ['h2', 'h3'])
    if (headers.length) {
      data.headers = headers
    }
    delete frontmatter.__content
    if (Object.keys(frontmatter).length) {
      data.frontmatter = frontmatter
    }
    return data
  })

  // resolve site data
  options.siteData = {
    title: siteConfig.title || '',
    description: siteConfig.description || '',
    base: siteConfig.base || '/',
    pages: pagesData,
    themeConfig: siteConfig.themeConfig || {}
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

const indexRE = /\breadme\.md$/i
const extRE = /\.(vue|md)$/

function fileToPath (file) {
  if (isIndexFile(file)) {
    // README.md -> /
    // foo/README.md -> /foo/
    return '/' + file.replace(indexRE, '')
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
  function genRoute ({ path: pagePath }, index) {
    const file = pageFiles[index]
    const filePath = path.resolve(sourceDir, file)
    const code = `
    {
      path: ${JSON.stringify(pagePath)},
      component: Theme,
      beforeEnter: (to, from, next) => {
        import(${JSON.stringify(filePath)}).then(comp => {
          Vue.component(${JSON.stringify(fileToComponentName(file))}, comp.default)
          next()
        })
      }
    }`
    return code
  }

  return (
    `import Theme from '~theme'\n` +
    `export const routes = [${pages.map(genRoute).join(',')}\n]`
  )
}

function sort (arr) {
  return arr.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

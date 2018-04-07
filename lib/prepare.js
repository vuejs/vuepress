const fs = require('fs')
const path = require('path')
const globby = require('globby')
const mkdirp = require('mkdirp')
const yaml = require('yaml-front-matter')
const tempPath = path.resolve(__dirname, 'app/.temp')

mkdirp(tempPath)

module.exports = async function prepare (sourceDir) {
  // 1. load options
  const options = await resolveOptions(sourceDir)

  // 2. generate dynamic component registration file
  const componentCode = await genComponentRegistrationFile(options)

  // 3. generate routes
  const routesCode = await genRoutesFile(options)

  // 4. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`

  fs.writeFileSync(
    path.join(tempPath, 'siteData.js'),
    [
      componentCode,
      routesCode,
      dataCode
    ].join('\n\n')
  )

  // 5. generate basic polyfill if need to support older browsers
  let polyfillCode = ``
  if (!options.siteConfig.evergreen) {
    polyfillCode =
`import 'es6-promise/auto'
if (!Object.assign) Object.assign = require('object-assign')`
  }
  fs.writeFileSync(path.join(tempPath, 'polyfill.js'), polyfillCode)

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

  const options = {
    siteConfig,
    sourceDir,
    outDir: siteConfig.dest
      ? path.resolve(siteConfig.dest)
      : path.resolve(sourceDir, '.vuepress/dist'),
    publicPath: siteConfig.base || '/',
    pageFiles: await globby(['**/*.md', '!.vuepress'], { cwd: sourceDir }),
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
    const urlPath = isIndexFile(file)
      ? '/'
      : `/${file.replace(/\.md$/, '').replace(/\\/g, '/')}.html`
    const content = fs.readFileSync(path.resolve(sourceDir, file), 'utf-8')
    const data = {
      path: urlPath
    }

    // extract yaml frontmatter
    const frontmatter = yaml.loadFront(content)
    // infer title
    const titleMatch = frontmatter.__content.trim().match(/^#+\s+(.*)/)
    if (titleMatch) {
      data.title = titleMatch[1]
    }
    delete frontmatter.__content
    if (Object.keys(frontmatter).length) {
      data.frontmatter = frontmatter
    }
    return data
  })

  // resolve site data
  options.siteData = {
    title: siteConfig.title,
    description: siteConfig.description,
    base: siteConfig.base || '/',
    pages: pagesData,
    themeConfig: siteConfig.themeConfig
  }

  return options
}

async function genComponentRegistrationFile ({ sourceDir, pageFiles }) {
  function genImport (file) {
    const name = toComponentName(file)
    const baseDir = /\.md$/.test(file)
      ? sourceDir
      : path.resolve(sourceDir, '.vuepress/components')
    const absolutePath = path.resolve(baseDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }

  const components = (await resolveComponents(sourceDir)) || []
  const all = [...pageFiles, ...components]
  return `import Vue from 'vue'\n` + all.map(genImport).join('\n')
}

function toComponentName (file) {
  const isPage = /\.md$/.test(file)
  const isIndex = isIndexFile(file)
  const normalizedName = isIndex
    ? 'index'
    : file.replace(/\.(vue|md)$/, '').replace(/\/|\\/g, '-')
  return isPage ? `page-${normalizedName}` : normalizedName
}

function isIndexFile (file) {
  return /^(index|readme)\.md$/i.test(file)
}

async function resolveComponents (sourceDir) {
  const componentDir = path.resolve(sourceDir, '.vuepress/components')
  if (!fs.existsSync(componentDir)) {
    return
  }
  return await globby(['**/*.vue'], { cwd: componentDir })
}

async function genRoutesFile ({ siteData: { pages }}) {
  function genRoute ({ path }) {
    const code = `
    {
      path: ${JSON.stringify(path)},
      component: Theme
    }`
    return code
  }

  return (
    `import Theme from '~theme'\n` +
    `export const routes = [${pages.map(genRoute).join(',')}\n]`
  )
}

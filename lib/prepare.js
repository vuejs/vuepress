const fs = require('fs')
const path = require('path')
const globby = require('globby')
const yaml = require('yaml-front-matter')
const tempPath = path.resolve(__dirname, 'app/.temp')

module.exports = async function prepare (sourceDir) {
  // 1. load options
  const options = await resolveOptions(sourceDir)

  // 2. generate dynamic component registration file
  await genComponentRegistrationFile(options)

  // 3. generate routes
  await genRoutesFile(options)

  return options
}

async function resolveOptions (sourceDir) {
  const configPath = path.resolve(sourceDir, 'vuepress.config.js')
  const siteConfig = fs.existsSync(configPath) ? require(configPath) : {}

  const options = {
    siteConfig,
    sourceDir,
    publicPath: siteConfig.baseUrl || '/',
    themePath: path.resolve(__dirname, 'default-theme/App.vue'),
    pages: await globby(['**/*.md'], { cwd: sourceDir })
  }

  // resolve theme
  const themePath = path.resolve(sourceDir, '_theme/App.vue')
  if (fs.existsSync(themePath)) {
    options.themePath = themePath
  }

  const pagesData = {}
  options.pages.forEach(file => {
    const name = file.replace(/\.md$/, '').replace(/\\/g, '/')
    const urlPath = '/' + (name === 'index' ? '' : (name + '.html'))
    const content = fs.readFileSync(path.resolve(sourceDir, file), 'utf-8')
    const data = pagesData[urlPath] = {
      path: urlPath
    }
    const frontmatter = yaml.loadFront(content)
    delete frontmatter.__content
    if (Object.keys(frontmatter).length) {
      data.frontmatter = frontmatter
    }
  })

  options.siteData = Object.assign({}, siteConfig.data, {
    pages: pagesData
  })

  return options
}

async function genComponentRegistrationFile ({ sourceDir, pages }) {
  function genImport (file) {
    const name = toComponentName(file)
    const baseDir = /\.md$/.test(file)
      ? sourceDir
      : path.resolve(sourceDir, '_components')
    const absolutePath = path.resolve(baseDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }

  const components = (await resolveComponents(sourceDir)) || []
  const all = [...pages, ...components]
  const file = `import Vue from 'vue'\n` + all.map(genImport).join('\n')
  fs.writeFileSync(path.join(tempPath, 'register-components.js'), file)
}

function toComponentName (file) {
  const isPage = /\.md$/.test(file)
  return (
    (isPage ? `page-` : ``) +
    file
      .replace(/\.(vue|md)$/, '')
      .replace(/\/|\\/g, '-')
  )
}

async function resolveComponents (sourceDir) {
  const componentDir = path.resolve(sourceDir, '_components')
  if (!fs.existsSync(componentDir)) {
    return
  }
  return await globby(['*.vue'], { cwd: componentDir })
}

async function genRoutesFile ({ sourceDir, siteData: { pages }}) {
  function genRoute (path) {
    const code = `
    {
      path: ${JSON.stringify(path)},
      component: Theme
    }`
    return code
  }

  const file =
    `import Theme from '~theme'\n` +
    `export default [${Object.keys(pages).map(genRoute).join(',')}\n]`
  fs.writeFileSync(path.join(tempPath, 'routes.js'), file)
}

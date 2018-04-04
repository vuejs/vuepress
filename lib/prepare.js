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
    templatePath: path.resolve(__dirname, 'default-theme/index.html'),
    pages: await globby(['**/*.md'], { cwd: sourceDir })
  }

  // resolve theme & index template
  const themeDir = path.resolve(sourceDir, '_theme')
  if (fs.existsSync(themeDir)) {
    const template = path.resolve(themeDir, 'index.html')
    if (fs.existsSync(template)) {
      options.templatePath = template
    }

    const app = path.resolve(themeDir, 'App.vue')
    if (fs.existsSync(app)) {
      options.themePath = app
    }
  }

  const pagesData = {}
  options.pages.forEach(file => {
    const name = file.replace(/\.md$/, '')
    const urlPath = '/' + (name === 'index' ? '' : name)
    const componentName = toComponentName(file)
    const content = fs.readFileSync(path.resolve(sourceDir, file), 'utf-8')
    const frontmatter = yaml.loadFront(content)
    delete frontmatter.__content
    pagesData[urlPath] = {
      name,
      path: urlPath,
      componentName,
      frontmatter
    }
  })

  options.siteData = Object.assign({}, siteConfig.data, {
    pages: pagesData
  })

  return options
}

function toComponentName (file) {
  const isPage = /\.md$/.test(file)
  return (
    (isPage ? `page-` : ``) +
    file
      .replace(/\.(vue|md)$/, '')
      .replace(/\/|\\/, '-')
  )
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

async function resolveComponents (sourceDir) {
  const componentDir = path.resolve(sourceDir, '_components')
  if (!fs.existsSync(componentDir)) {
    return
  }
  return await globby(['*.vue'], { cwd: componentDir })
}

async function genRoutesFile ({ sourceDir, pages }) {
  function genRoute (file) {
    const name = file.replace(/\.md$/, '')
    const code = `
    {
      path: ${JSON.stringify('/' + (name === 'index' ? '' : name))},
      component: Theme
    }`
    return code
  }

  const file =
    `import Theme from '~theme'\n` +
    `export default [${pages.map(genRoute).join(',')}\n]`
  fs.writeFileSync(path.join(tempPath, 'routes.js'), file)
}

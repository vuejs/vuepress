const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const globby = require('globby')
const webpack = require('webpack')
const tempPath = path.resolve(__dirname, 'app/.temp')
const createClientConfig = require('./webpack/clientConfig')
const createServerConfig = require('./webpack/serverConfig')

exports.build = async function build (sourceDir) {
  // 1. loadConfig
  // const config = await resolveConfig(sourceDir)

  // 2. generate dynamic component registration file
  await genComponentRegistrationFile(sourceDir)

  // 3. generate routes
  await genRoutesFile(sourceDir)

  // 4. client build
  const clientConfig = createClientConfig({ sourceDir }).toConfig()
  return new Promise((resolve, reject) => {
    rimraf.sync(clientConfig.output.path)
    webpack(clientConfig, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        return reject(stats.toJson().errors)
      }
      resolve()
    })
  })
}

async function genComponentRegistrationFile (sourceDir) {
  const pages = await globby(['**/*.md'], { cwd: sourceDir })
  const components = (await resolveComponents(sourceDir)) || []

  function genImport (file) {
    const isPage = /\.md$/.test(file)
    const name = (isPage ? `page-` : ``) + file.replace(/\.(vue|md)$/, '').replace(/\/|\\/, '-')
    const baseDir = isPage ? sourceDir : path.resolve(sourceDir, '_components')
    const absolutePath = path.resolve(baseDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }

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

async function genRoutesFile (sourceDir) {
  const pages = await globby(['**/*.md'], { cwd: sourceDir })

  function genRoute (file) {
    const name = file.replace(/\.md$/, '')
    const code = `
    {
      path: ${JSON.stringify('/' + (name === 'index' ? '' : name))},
      component: Layout
    }`
    return code
  }

  const file =
    `import Layout from '~layout'\n` +
    `export default [${pages.map(genRoute).join(',')}\n]`
  fs.writeFileSync(path.join(tempPath, 'routes.js'), file)
}

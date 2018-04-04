const fs = require('fs')
const path = require('path')
const globby = require('globby')
const webpack = require('webpack')
const tempPath = path.resolve(__dirname, 'app/.temp')

exports.build = async function build (sourceDir) {
  // 1. loadConfig
  // const config = await resolveConfig(sourceDir)

  // 2. generate dynamic component registration file
  await genComponentRegistrationFile(sourceDir)

  // 3. generate routes
  await genRoutesFile(sourceDir)

  // 4. build
}

async function genComponentRegistrationFile (sourceDir) {
  const componentDir = path.resolve(sourceDir, '_components')
  if (!fs.existsSync(componentDir)) {
    return
  }

  const components = await globby(['*.vue'], { cwd: componentDir })
  if (!components.length) {
    return
  }

  const file = `import Vue from 'vue'\n` + components.map(file => {
    const name = file.replace(/\.vue$/, '')
    const absolutePath = path.resolve(componentDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }).join('\n')

  fs.writeFileSync(path.join(tempPath, 'register-components.js'), file)
}

async function genRoutesFile () {

}

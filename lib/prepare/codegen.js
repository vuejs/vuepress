const path = require('path')
const { fileToComponentName, resolveComponents } = require('./util')

exports.genRoutesFile = async function ({
  siteData: { pages },
  sourceDir,
  pageFiles
}) {
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

exports.genComponentRegistrationFile = async function ({ sourceDir, components, componentsDir }) {
  function genFileImport (file) {
    const name = fileToComponentName(file)
    return genImport(name, file)
  }

  function genCustomImport (component) {
    const { name, file } = component
    return genImport(name, file, true)
  }

  function genImport (name, file, isCustomComponent = false) {
    const baseDir = isCustomComponent ? path.resolve(sourceDir) : path.resolve(sourceDir, componentsDir)
    const absolutePath = path.resolve(baseDir, file)
    const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    return code
  }

  const componentsFromFolder = (await resolveComponents(sourceDir, componentsDir)) || []
  return `import Vue from 'vue'\n` + componentsFromFolder.map(genFileImport).join('\n') + components.map(genCustomImport).join('\n')
}


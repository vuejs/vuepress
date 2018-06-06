const path = require('path')
const { writeTemp } = require('./util')

exports.pathsToModuleCode = function (files) {
  let index = 0
  let code = ''

  code += files
    .map(filepath => `import m${index++} from ${JSON.stringify(filepath)}`)
    .join('\n')

  code += '\n\nexport default [\n'

  for (let i = 0; i < index; i++) {
    code += `  m${i}`
    code += i === index - 1 ? '\n' : ',\n'
  }

  code += ']\n'

  return code
}

exports.genRoutesFile = async function ({
  siteData: { pages },
  sourceDir,
  pageFiles,
  plugin
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

  // TODO move it to a single file?
  const builtInRootMixins = [
    path.resolve(__dirname, '../app/root-mixins/updateMeta.js')
  ]
  const rootMixins = [
    ...builtInRootMixins,
    ...plugin.options.clientRootMixin.values
  ]
  await writeTemp('root-mixins.js', exports.pathsToModuleCode(rootMixins))

  return (
    `import Vue from 'vue'\n` +
    `import ThemeLayout from '@themeLayout'\n` +
    `import ThemeNotFound from '@themeNotFound'\n` +
    `import { injectMixins } from '@app/util'\n` +
    `import rootMixins from '@temp/root-mixins'\n\n` +
    `injectMixins(ThemeLayout, rootMixins)\n` +
    `injectMixins(ThemeNotFound, rootMixins)\n\n` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}

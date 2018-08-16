exports.pathsToModuleCode = function (files) {
  let index = 0
  let code = ''

  code += files
    .map(filePath => `import m${index++} from ${JSON.stringify(filePath)}`)
    .join('\n')

  code += '\n\nexport default [\n'

  for (let i = 0; i < index; i++) {
    code += `  m${i}`
    code += i === index - 1 ? '\n' : ',\n'
  }

  code += ']\n'

  return code
}

exports.genRoutesFile = async function (pages) {
  function genRoute ({ path: pagePath, filePath, key: componentName }) {
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    component: ThemeLayout,
    beforeEnter: (to, from, next) => {
      registerComponent(${JSON.stringify(componentName)}).then(() => next())
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
    `import { injectMixins, registerComponent } from '@app/util'\n` +
    `import rootMixins from '@dynamic/root-mixins'\n\n` +
    `injectMixins(ThemeLayout, rootMixins)\n` +
    `injectMixins(ThemeNotFound, rootMixins)\n\n` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}

exports.genImportAsyncComponentFile = function (pages) {
  return `export function loadComponent (key) {
  switch (key) {
${pages.map(({ key, filePath }) => `    case "${key}": return import("${filePath}");`).join('\n')}
  }
}`
}

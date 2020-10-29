module.exports = (options, ctx) => ({
  name: '@vuepress/internal-routes',

  // @internal/routes
  async clientDynamicModules () {
    const code = importCode(ctx.globalLayout) + routesCode(ctx.pages)
    return { name: 'routes.js', content: code, dirname: 'internal' }
  }
})

/**
 * Import utilities
 * @param {string} globalLayout path of global layout component
 * @returns {string}
 */
function importCode (globalLayout) {
  return `
import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from ${JSON.stringify(globalLayout)}

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
`
}

/**
 * Get Vue routes code.
 * @param {array} pages
 * @returns {string}
 */
function routesCode (pages) {
  function genRoute ({
    path: pagePath,
    key: componentName,
    frontmatter: {
      layout
    },
    regularPath,
    _meta
  }) {
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded(${JSON.stringify(layout || 'Layout')}, ${JSON.stringify(componentName)}).then(next)
    },${_meta ? `\n    meta: ${JSON.stringify(_meta)}` : ''}
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

    const decodedRegularPath = decodeURIComponent(regularPath)

    if (decodedRegularPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(decodedRegularPath)},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    return code
  }

  const notFoundRoute = `,
  {
    path: '*',
    component: GlobalLayout
  }`

  return (
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}


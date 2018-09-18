module.exports = (options, ctx) => ({
  name: '@vuepress/internal-routes',

  // @internal/routes
  async clientDynamicModules () {
    const code = importCode() + routesCode(ctx.pages)
    return { name: 'routes.js', content: code, dirname: 'internal' }
  }
})

/**
 * Import utilities
 * @returns {string}
 */
function importCode () {
  return `
import { injectComponentOption } from '@app/util'
import rootMixins from '@internal/root-mixins'
import components from '@internal/layout-components'
import LayoutDistributor from '@app/components/LayoutDistributor.vue'

injectComponentOption(LayoutDistributor, 'mixins', rootMixins)
injectComponentOption(LayoutDistributor, 'components', components)
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
    regularPath,
    _meta
  }) {
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(pagePath)},
    component: LayoutDistributor,${_meta ? `\n    meta: ${JSON.stringify(_meta)}` : ''}
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

    if (regularPath !== pagePath) {
      code += `,
  {
    path: ${JSON.stringify(regularPath)},
    redirect: ${JSON.stringify(pagePath)}
  }`
    }

    return code
  }

  const notFoundRoute = `,
  {
    path: '*',
    component: LayoutDistributor
  }`

  return (
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}


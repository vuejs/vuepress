module.exports = (options, context) => ({
  name: '@vuepress/internal-routes',

  // @internal/routes
  async clientDynamicModules () {
    const routesCode = await genRoutesFile(context.pages)
    return { name: 'routes.js', content: routesCode, dirname: 'internal' }
  }
})

/**
 * Generate routes meta data file.
 * @param pages
 * @returns {Promise<string>}
 */
async function genRoutesFile (pages) {
  function genRoute ({
    path: pagePath,
    key: componentName,
    frontmatter = {}
  }) {
    let code = `
  {
    name: ${JSON.stringify(componentName)},
    path: ${JSON.stringify(frontmatter.permalink || pagePath)},
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
    `import rootMixins from '@internal/root-mixins'\n\n` +
    `injectMixins(ThemeLayout, rootMixins)\n` +
    `injectMixins(ThemeNotFound, rootMixins)\n\n` +
    `export const routes = [${pages.map(genRoute).join(',')}${notFoundRoute}\n]`
  )
}


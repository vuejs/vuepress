const { genRoutesFile, genImportAsyncComponentFile } = require('./codegen')

module.exports = (options, context, self) => ({
  name: '@vuepress/internal-routes',

  async clientDynamicModules () {
    const routesCode = await genRoutesFile(context.siteData.pages)
    const importAsyncComponentCode = genImportAsyncComponentFile(context.siteData.pages)

    return [
      { name: 'routes.js', content: routesCode },
      { name: 'async-component.js', content: importAsyncComponentCode }
    ]
  }
})

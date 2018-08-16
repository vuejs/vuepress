const path = require('path')
const { genRoutesFile, pathsToModuleCode, genImportAsyncComponentFile } = require('./codegen')

module.exports = (options, context, self) => ({
  name: '@vuepress/internal-routes',

  async clientDynamicModules () {
    const builtInRootMixins = [
      path.resolve(__dirname, '../../app/root-mixins/updateMeta.js')
    ]

    const rootMixins = [
      ...builtInRootMixins,
      ...self.options.clientRootMixin.values
    ]

    const routesCode = await genRoutesFile(context.siteData.pages)
    const rootMixinsCode = pathsToModuleCode(rootMixins)
    const importAsyncComponentCode = genImportAsyncComponentFile(context.siteData.pages)

    return [
      { name: 'routes.js', content: routesCode },
      { name: 'root-mixins.js', content: rootMixinsCode },
      { name: 'async-component.js', content: importAsyncComponentCode }
    ]
  }
})

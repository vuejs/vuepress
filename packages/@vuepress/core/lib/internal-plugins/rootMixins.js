const path = require('path')
const { codegen: { pathsToModuleCode }} = require('@vuepress/shared-utils')

module.exports = (options, context, api) => ({
  name: '@vuepress/internal-root-mixins',

  // @internal/root-mixins
  async clientDynamicModules () {
    const builtInRootMixins = [
      path.resolve(__dirname, '../app/root-mixins/updateMeta.js')
    ]

    const rootMixins = [
      ...builtInRootMixins,
      ...api.options.clientRootMixin.values
    ]

    const rootMixinsCode = pathsToModuleCode(rootMixins)
    return { name: 'root-mixins.js', content: rootMixinsCode, dirname: 'internal' }
  }
})

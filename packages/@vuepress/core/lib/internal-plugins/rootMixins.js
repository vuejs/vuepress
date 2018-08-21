const path = require('path')
const { codegen: { pathsToModuleCode }} = require('@vuepress/shared-utils')

module.exports = (options, context, self) => ({
  name: '@vuepress/internal-root-mixins',

  // @dynamic/root-mixins
  async clientDynamicModules () {
    const builtInRootMixins = [
      path.resolve(__dirname, '../app/root-mixins/updateMeta.js')
    ]

    const rootMixins = [
      ...builtInRootMixins,
      ...self.options.clientRootMixin.values
    ]

    const rootMixinsCode = pathsToModuleCode(rootMixins)
    return { name: 'root-mixins.js', content: rootMixinsCode, dirname: 'internal' }
  }
})

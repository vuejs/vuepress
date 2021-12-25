const { codegen: { pathsToModuleCode }} = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin<{}, import('@vuepress/types').DefaultThemeConfig>}
 */
module.exports = (options, ctx, api) => ({
  name: '@vuepress/internal-root-mixins',

  // @internal/root-mixins
  async clientDynamicModules () {
    const builtInRootMixins = [
      ctx.getLibFilePath('client/root-mixins/updateMeta.js')
    ]

    const rootMixins = [
      ...builtInRootMixins,
      ...api.options.clientRootMixin.values
    ]

    const rootMixinsCode = pathsToModuleCode(rootMixins)
    return { name: 'root-mixins.js', content: rootMixinsCode, dirname: 'internal' }
  }
})

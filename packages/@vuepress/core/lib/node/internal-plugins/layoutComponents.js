/**
 * @type {import('@vuepress/types').Plugin<{}, import('@vuepress/types').DefaultThemeConfig>}
 */
module.exports = (options, ctx) => {
  return {
    name: '@vuepress/internal-layout-components',

    async clientDynamicModules () {
      const componentNames = Object.keys(ctx.themeAPI.layoutComponentMap)
      const code = `export default {\n${componentNames
        .map(name => `  ${JSON.stringify(name)}: () => import(${JSON.stringify(ctx.themeAPI.layoutComponentMap[name].path)})`)
        .join(',\n')} \n}`
      return { name: 'layout-components.js', content: code, dirname: 'internal' }
    }
  }
}

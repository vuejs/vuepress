module.exports = (options, ctx) => {
  const { layoutComponentMap } = ctx
  const componentNames = Object.keys(layoutComponentMap)

  return {
    name: '@vuepress/internal-layout-components',

    async clientDynamicModules () {
      const code = `export default {\n${componentNames
        .map(name => `  ${JSON.stringify(name)}: () => import(${JSON.stringify(layoutComponentMap[name].path)})`)
        .join(',\n')} \n}`
      return { name: 'layout-components.js', content: code, dirname: 'internal' }
    },

    chainWebpack (config, isServer) {
      const setAlias = (alias, raw) => config.resolve.alias.set(alias, raw)
      componentNames.forEach(name => {
        setAlias(`@${name}`, layoutComponentMap[name].path)
      })
    }
  }
}

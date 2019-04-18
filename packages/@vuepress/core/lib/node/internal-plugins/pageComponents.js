module.exports = (options, ctx) => {
  const { pages } = ctx
  // const componentNames = Object.keys(layoutComponentMap)

  return {
    name: '@vuepress/internal-page-components',

    async clientDynamicModules () {
      const code = `export default {\n${pages
        .filter(({ _filePath }) => _filePath)
        .map(({ key, _filePath }) => `  ${JSON.stringify(key)}: () => import(${JSON.stringify(_filePath)})`)
        .join(',\n')} \n}`
      return { name: 'page-components.js', content: code, dirname: 'internal' }
    }
  }
}

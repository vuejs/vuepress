const { pascalize } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  const { pages } = ctx
  // const componentNames = Object.keys(layoutComponentMap)

  return {
    name: '@vuepress/internal-page-components',

    async enhanceAppFiles () {
      const code = `import Vue from 'vue'\n${pages
        .filter(({ _filePath }) => _filePath)
        .map(({ key, _filePath }) => `Vue.component(${JSON.stringify(pascalize(key))}, () => import(${JSON.stringify(_filePath)}))`)
        .join(',\n')} \n`
      return {
        name: 'page-components.js',
        content: code
      }
    }
  }
}

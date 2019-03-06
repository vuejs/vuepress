const { pascalize } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  return {
    name: '@vuepress/internal-layout-components',

    async enhanceAppFiles () {
      const componentNames = Object.keys(ctx.themeAPI.layoutComponentMap)
      const code = `import Vue from 'vue'\n${componentNames
        .map(name => `Vue.component(${JSON.stringify(pascalize(name))}, () => import(${JSON.stringify(ctx.themeAPI.layoutComponentMap[name].path)}))`)
        .join(',\n')} \n`
      return {
        name: 'layout-components.js',
        content: code
      }
    }
  }
}

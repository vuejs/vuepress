const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress/internal-enhance-app',

  enhanceAppFiles () {
    const { sourceDir, themePath } = context
    const enhanceAppPath = path.resolve(sourceDir, '.vuepress/enhanceApp.js')
    const themeEnhanceAppPath = path.resolve(themePath, 'enhanceApp.js')
    return [
      enhanceAppPath,
      themeEnhanceAppPath
    ]
  }
})

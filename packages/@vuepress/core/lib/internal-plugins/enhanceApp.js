const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress/internal-enhance-app',

  enhanceAppFiles () {
    const { sourceDir, themeAPI } = context
    const enhanceAppPath = path.resolve(sourceDir, '.vuepress/enhanceApp.js')
    const themeEnhanceAppPath = path.resolve(themeAPI.theme.path, 'enhanceApp.js')
    const files = [
      enhanceAppPath,
      themeEnhanceAppPath
    ]
    if (themeAPI.existsParentTheme) {
      files.push(path.resolve(themeAPI.parentTheme.path, 'enhanceApp.js'))
    }
    return files
  }
})

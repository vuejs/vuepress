const { path } = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin<{}, import('@vuepress/types').DefaultThemeConfig>}
 */
module.exports = (options, ctx) => ({
  name: '@vuepress/internal-enhance-app',

  enhanceAppFiles () {
    const { sourceDir, themeAPI } = ctx
    const enhanceAppPath = path.resolve(sourceDir, '.vuepress/enhanceApp.js')
    const files = [enhanceAppPath]
    if (themeAPI.existsParentTheme) {
      files.push(path.resolve(themeAPI.parentTheme.path, 'enhanceApp.js'))
    }
    const themeEnhanceAppPath = path.resolve(themeAPI.theme.path, 'enhanceApp.js')
    files.push(themeEnhanceAppPath)
    return files
  }
})

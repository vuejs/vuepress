const path = require('path')
const { fs } = require('@vuepress/shared-utils')

// This plugin generate a mirror es module of 'lib/prepare/I18n.js'
// Since for now Webpack doesn't allow 'ES6 import' to import a a commonjs
// module.
//
// Ref: https://github.com/webpack/webpack/issues/4039
module.exports = () => ({
  name: '@vuepress/internal-i18n-temp',

  // @internal/i18n
  async clientDynamicModules () {
    const i18nCommonjsModule = await fs.readFile(path.resolve(__dirname, '../prepare/I18n.js'), 'utf-8')
    const i18nEsModule = i18nCommonjsModule.replace('module.exports =', 'export default')
    return { name: 'i18n.js', content: i18nEsModule, dirname: 'internal' }
  }
})

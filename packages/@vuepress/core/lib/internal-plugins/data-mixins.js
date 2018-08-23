const path = require('path')
const { fs } = require('@vuepress/shared-utils')

// This plugin generate a mirror es module of '/core/lib/data-mixins/base.js'
// Since for now Webpack cannot allow 'ES6 import' to import a a commonjs
// module.
//
// Ref: https://github.com/webpack/webpack/issues/4039
module.exports = (options, context) => ({
  name: '@vuepress/internal-enhance-app',

  // @internal/data-mixins
  async clientDynamicModules () {
    const dataMixinsCommonjsModule = await fs.readFile(path.resolve(__dirname, '../data-mixins/base.js'), 'utf-8')
    const dataMixinsEsModule = dataMixinsCommonjsModule.replace('module.exports =', 'export default')
    return { name: 'data-mixins.js', content: dataMixinsEsModule, dirname: 'internal' }
  }
})

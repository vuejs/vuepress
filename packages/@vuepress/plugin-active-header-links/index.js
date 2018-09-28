const { path } = require('@vuepress/shared-utils')

module.exports = {
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}

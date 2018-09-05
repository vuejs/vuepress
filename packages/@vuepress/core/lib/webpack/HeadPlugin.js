const { normalizeHeadTag } = require('../util/index')

module.exports = class SiteDataPlugin {
  constructor ({ tags }) {
    this.tags = tags
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('vuepress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('vuepress-site-data', (data, cb) => {
        try {
          this.tags.forEach(tag => {
            data.head.push(normalizeHeadTag(tag))
          })
        } catch (e) {
          return cb(e)
        }
        cb(null, data)
      })
    })
  }
}

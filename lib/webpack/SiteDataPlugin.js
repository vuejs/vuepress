module.exports = class SiteDataPlugin {
  constructor (data) {
    this.data = data
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('vuepress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('vuepress-site-data', (data, cb) => {
        try {
          data.head.push({
            tagName: 'script',
            closeTag: true,
            innerHTML: `window.VUEPRESS_DATA = ${JSON.stringify(this.data)}`
          })
        } catch (e) {
          return cb(e)
        }
        cb(null, data)
      })
    })
  }
}

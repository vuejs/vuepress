module.exports = class SiteDataPlugin {
  constructor (tags = []) {
    this.tags = tags
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('vuepress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('vuepress-site-data', (data, cb) => {
        try {
          this.tags.forEach(t => {
            data.head.push({
              tagName: t.tag,
              closeTag: !(t.tag === 'meta' || t.tag === 'link'),
              attributes: t.attributes,
              innerHTML: t.innerHTML || ''
            })
          })
        } catch (e) {
          return cb(e)
        }
        cb(null, data)
      })
    })
  }
}

module.exports = class SiteDataPlugin {
  constructor (data, head = []) {
    this.data = data
    this.head = head
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('vuepress-site-data', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('vuepress-site-data', (data, cb) => {
        try {
          this.head.forEach(t => {
            data.head.push({
              tagName: t.tag,
              closeTag: !(t.tag === 'meta' || t.tag === 'link'),
              attributes: t.attributes,
              innerHTML: t.innerHTML || ''
            })
          })

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

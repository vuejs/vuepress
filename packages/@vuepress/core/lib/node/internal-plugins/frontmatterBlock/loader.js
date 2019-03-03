const { parseVueFrontmatter: { parseStrippedFrontmatter }} = require('@vuepress/shared-utils')
const { frontmatterEmitter } = require('@vuepress/markdown-loader')
const LRU = require('lru-cache')
const cache = new LRU({ max: 1000 })

module.exports = function (source, map) {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    const file = this.resourcePath
    // frontmatter changed... need to do a full reload
    const cached = cache.get(file)
    const parsed = parseStrippedFrontmatter(source)

    if (cached
      && cached.data
      && parsed
      && parsed.data
      && JSON.stringify(cached.data) !== JSON.stringify(parsed.data)
    ) {
      frontmatterEmitter.emit('update', file)
    }

    cache.set(file, parsed)
  }

  this.callback(null, '', map)
}

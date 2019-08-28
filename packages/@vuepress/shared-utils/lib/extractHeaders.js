const LRU = require('lru-cache')
const deeplyParseHeaders = require('./deeplyParseHeaders')

const cache = new LRU({ max: 1000 })

module.exports = function (content, include = [], md) {
  const key = content + include.join(',')
  const hit = cache.get(key)
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})

  const res = []
  tokens.forEach((t, i) => {
    // @ts-ignore
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const title = tokens[i + 1].content
      // @ts-ignore
      const slug = t.attrs.find(([name]) => name === 'id')[1]
      res.push({
        level: parseInt(t.tag.slice(1), 10),
        title: deeplyParseHeaders(title),
        slug: slug || md.slugify(title)
      })
    }
  })

  cache.set(key, res)
  return res
}

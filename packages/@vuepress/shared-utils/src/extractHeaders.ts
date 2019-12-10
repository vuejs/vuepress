import LRU from 'lru-cache'
import deeplyParseHeaders from './deeplyParseHeaders'

/**
 * Extract headers from markdown source content.
 *
 * @param {string} content
 * @param {array} include
 * @param {object} md
 * @returns {array}
 */

const cache = new LRU({ max: 1000 })

export = function (content: string, include: any[] = [], md: any) {
  const key = content + include.join(',')
  const hit = cache.get(key)
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})

  const res: any[] = []
  tokens.forEach((t: any, i: any) => {
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const title = tokens[i + 1].content
      const slug = t.attrs.find(([name]: any[]) => name === 'id')[1]
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

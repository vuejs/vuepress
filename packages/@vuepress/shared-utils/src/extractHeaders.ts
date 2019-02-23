import LRU from 'lru-cache'
import deeplyParseHeaders from './deeplyParseHeaders'

/**
 * Extract heeaders from markdown source content.
 *
 * @param {string} content
 * @param {array} include
 * @param {object} md
 * @returns {array}
 */

const cache = new LRU({ max: 1000 })

export = function (content: string, include = [], md: any) {
  const key = content + include.join(',')
  const hit = cache.get(key)
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})

  const res: any[] = []
  tokens.forEach((t: any, i: any) => {
    // @ts-ignore
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const title = tokens[i + 1].content
      // @ts-ignore
      const slug = (t.attrs).find(([name]) => name === 'id')[1]
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

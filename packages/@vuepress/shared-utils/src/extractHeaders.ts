import LRU from 'lru-cache'
import deeplyParseHeaders from './deeplyParseHeaders'

interface Heading {
  level: number;
  title: string;
  slug: string;
}

interface ParseFunc {
  (token: any, content: any, md: any): Heading | null;
}

const cache = new LRU({ max: 1000 })

const parseDefaultHeading: ParseFunc = (token: any, content: any, md: any): Heading | null => {
  const slug = token.attrs.find(([name]) => name === 'id')[1]
  return {
    level: parseInt(token.tag.slice(1)),
    title: deeplyParseHeaders(content),
    slug: slug || md.slugify(content)
  }
}

/**
 * Extract headers from markdown source content.
 *
 * @param {string} content
 * @param {array} include
 * @param {object} md
 * @returns {array}
 */
export = function (content: string, include: any[] = [], md: any): Heading[] {
  const key = content + include.join(',')
  const hit = cache.get(key) as Heading[]
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})

  const parserMap = include.reduce((map, value) => {
    if (Array.isArray(value)) {
      map.set(value[0], value[1])
    } else {
      map.set(value, parseDefaultHeading)
    }
    return map
  }, new Map())
  const res: Heading[] = []
  tokens.forEach((t: any, i: any) => {
    if (t.type === 'heading_open' && parserMap.has(t.tag)) {
      const headingContent = tokens[i + 1].content
      const parseHeading = parserMap.get(t.tag) as ParseFunc
      const heading = parseHeading(t, headingContent, md)
      if (heading !== null) {
        res.push(heading)
      }
    }
  })

  cache.set(key, res)
  return res
}

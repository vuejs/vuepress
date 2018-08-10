const { deeplyParseHeaders } = require('./parseHeaders')

exports.normalizeHeadTag = function (tag) {
  if (typeof tag === 'string') {
    tag = [tag]
  }
  const tagName = tag[0]
  return {
    tagName,
    attributes: tag[1] || {},
    innerHTML: tag[2] || '',
    closeTag: !(tagName === 'meta' || tagName === 'link')
  }
}

exports.applyUserWebpackConfig = function (userConfig, config, isServer) {
  const merge = require('webpack-merge')
  if (typeof userConfig === 'object') {
    return merge(config, userConfig)
  }
  if (typeof userConfig === 'function') {
    const res = userConfig(config, isServer)
    if (res && typeof res === 'object') {
      return merge(config, res)
    }
  }
  return config
}

exports.inferTitle = function (frontmatter) {
  if (frontmatter.data.home) {
    return 'Home'
  }
  if (frontmatter.data.title) {
    return deeplyParseHeaders(frontmatter.data.title)
  }
  const match = frontmatter.content.trim().match(/^#+\s+(.*)/)
  if (match) {
    return deeplyParseHeaders(match[1])
  }
}

exports.parseFrontmatter = function (content) {
  const matter = require('gray-matter')
  const toml = require('toml')

  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}

const LRU = require('lru-cache')
const cache = LRU({ max: 1000 })

exports.extractHeaders = function (content, include = [], md) {
  const key = content + include.join(',')
  const hit = cache.get(key)
  if (hit) {
    return hit
  }

  const tokens = md.parse(content, {})

  const res = []
  tokens.forEach((t, i) => {
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const title = tokens[i + 1].content
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

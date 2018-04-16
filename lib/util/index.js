exports.normalizeHeadTag = tag => {
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
  if (frontmatter.home) {
    return 'Home'
  }
  if (frontmatter.title) {
    return frontmatter.title
  }
  const match = frontmatter.__content.trim().match(/^#+\s+(.*)/)
  if (match) {
    return match[1]
  }
}

exports.parseFrontmatter = content => {
  const yaml = require('yaml-front-matter')
  return yaml.loadFront(content)
}

const LRU = require('lru-cache')
const cache = LRU({ max: 1000 })
const md = require('../markdown')()

exports.extractHeaders = (content, include = []) => {
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
      res.push({
        level: parseInt(t.tag.slice(1), 10),
        title,
        slug: md.slugify(title)
      })
    }
  })

  cache.set(key, res)
  return res
}

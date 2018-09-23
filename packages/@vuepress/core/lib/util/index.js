'use strict'

/**
 * Module dependencies.
 */

const { deeplyParseHeaders } = require('@vuepress/shared-utils')

/**
 * Normalize head tag config.
 *
 * @param {string|array} tag
 * @returns {object}
 */

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

/**
 * Use webpack-merge to merge user's config into default config.
 *
 * @param {object} userConfig
 * @param {object} config
 * @param {boolean} isServer
 * @returns {object}
 */

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

/**
 * Infer a page's title via frontmatter and content.
 *
 * @param frontmatter
 * @param strippedContent
 * @returns {*}
 */

exports.inferTitle = function (frontmatter, strippedContent) {
  if (frontmatter.home) {
    return 'Home'
  }
  if (frontmatter.title) {
    return deeplyParseHeaders(frontmatter.title)
  }
  const match = strippedContent.trim().match(/^#+\s+(.*)/)
  if (match) {
    return deeplyParseHeaders(match[1])
  }
}

const LRU = require('lru-cache')
const cache = LRU({ max: 1000 })

/**
 * Extract heeaders from markdown source content.
 *
 * @param {string} content
 * @param {array} include
 * @param {object} md
 * @returns {array}
 */

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
